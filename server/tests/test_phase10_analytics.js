import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import app from '../app.js';
import env from '../config/env.js';
import { getDb } from '../db/database.js';
import analyticsService from '../services/analytics.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

async function runTests() {
  console.log('====================================================');
  console.log('PHASE 10 — PRIVACY-CONSCIOUS ANALYTICS TESTS');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  const db = getDb();
  const testSessionPrefix = `test_p10_${Date.now()}_`;
  const testSessionId1 = `${testSessionPrefix}sess1`;
  const testSessionId2 = `${testSessionPrefix}sess2`;
  const testAdminUser = `test_admin_${Date.now()}`;
  const testAdminPassword = 'TestPassword123!';

  // Helper to clean up test rows
  const cleanupTestData = () => {
    try {
      db.prepare(`DELETE FROM analytics_events WHERE session_id LIKE ?`).run(`${testSessionPrefix}%`);
      db.prepare(`DELETE FROM admin_users WHERE username = ?`).run(testAdminUser);
    } catch (e) {
      // Ignore cleanup error
    }
  };

  cleanupTestData();

  // Seed temporary test admin for authenticated route checks
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(testAdminPassword, salt);
  db.prepare(`
    INSERT INTO admin_users (username, password_hash, created_at, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `).run(testAdminUser, passwordHash);

  // Start ephemeral test server
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  let authCookie = '';

  try {
    // ----------------------------------------------------
    // TEST 1: Endpoint Existence
    // ----------------------------------------------------
    console.log('TEST 1: Endpoint Existence (POST /api/analytics/events)');
    const resEmpty = await fetch(`${baseUrl}/api/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert(resEmpty.status === 400, 'POST /api/analytics/events is listening and rejects empty payload with HTTP 400');

    // ----------------------------------------------------
    // TEST 2: Valid Event Accepted
    // ----------------------------------------------------
    console.log('\nTEST 2: Valid Event Ingestion');
    const resValid = await fetch(`${baseUrl}/api/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        section: 'hero',
        session_id: testSessionId1
      })
    });
    assert(resValid.status === 200, 'Valid page_view returns HTTP 200');
    const jsonValid = await resValid.json();
    assert(jsonValid.success === true, 'Response returns success: true');

    // ----------------------------------------------------
    // TEST 3: Unknown Event Type Rejected
    // ----------------------------------------------------
    console.log('\nTEST 3: Unknown Event Rejection');
    const resUnknown = await fetch(`${baseUrl}/api/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'malicious_tracking_event',
        session_id: testSessionId1
      })
    });
    assert(resUnknown.status === 400, 'Unknown event type returns HTTP 400');
    const jsonUnknown = await resUnknown.json();
    assert(jsonUnknown.success === false, 'Returns success: false for unknown event');

    // ----------------------------------------------------
    // TEST 4: Invalid Payload Format Rejected
    // ----------------------------------------------------
    console.log('\nTEST 4: Invalid Payload Format Rejection');
    const resMissingSession = await fetch(`${baseUrl}/api/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view'
      })
    });
    assert(resMissingSession.status === 400, 'Missing session_id is rejected with HTTP 400');

    const resInvalidSession = await fetch(`${baseUrl}/api/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        session_id: 'short' // too short (< 8 chars)
      })
    });
    assert(resInvalidSession.status === 400, 'Malformed session_id format is rejected with HTTP 400');

    // ----------------------------------------------------
    // TEST 5: Oversized Payload & Extra Fields Rejected
    // ----------------------------------------------------
    console.log('\nTEST 5: Oversized Payload & Extra Fields Check');
    const resExtraField = await fetch(`${baseUrl}/api/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        session_id: testSessionId1,
        unapproved_tracking_metadata: { ip: '127.0.0.1', device: 'laptop' }
      })
    });
    assert(resExtraField.status === 400, 'Payload with unapproved extra fields is rejected with HTTP 400');

    const hugeString = 'a'.repeat(3000);
    const resHuge = await fetch(`${baseUrl}/api/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        session_id: testSessionId1,
        target: hugeString
      })
    });
    assert(resHuge.status === 400, 'Oversized payload (>2KB) is rejected with HTTP 400');

    // ----------------------------------------------------
    // TEST 6: SQL Injection Protection
    // ----------------------------------------------------
    console.log('\nTEST 6: SQL Injection Protection');
    const sqliAttempt = `'; DROP TABLE analytics_events; --`;
    const resSqli = await fetch(`${baseUrl}/api/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'project_click',
        section: sqliAttempt,
        target: sqliAttempt,
        session_id: testSessionId1
      })
    });
    assert(resSqli.status === 200, 'Handles SQL injection payload safely via parameterized queries');
    const tableCheck = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='analytics_events'`).get();
    assert(Boolean(tableCheck), 'Database table analytics_events is intact and was not dropped');

    // ----------------------------------------------------
    // TEST 7: Privacy Verification (Zero IP / Zero PII Storage)
    // ----------------------------------------------------
    console.log('\nTEST 7: Privacy & Zero PII Storage Verification');
    const tableInfo = db.prepare(`PRAGMA table_info(analytics_events)`).all();
    const columnNames = tableInfo.map(c => c.name.toLowerCase());
    assert(!columnNames.includes('ip'), 'No IP column exists in analytics_events table');
    assert(!columnNames.includes('ip_address'), 'No ip_address column exists in analytics_events table');
    assert(!columnNames.includes('user_agent'), 'No user_agent column exists in analytics_events table');
    assert(!columnNames.includes('email'), 'No email column exists in analytics_events table');
    assert(!columnNames.includes('name'), 'No name column exists in analytics_events table');

    const insertedRows = db.prepare(`SELECT * FROM analytics_events WHERE session_id = ?`).all(testSessionId1);
    for (const r of insertedRows) {
      assert(!r.target?.includes('password') && !r.section?.includes('password'), 'Row contains no secret strings');
      assert(!r.session_id.includes('127.0.0.1'), 'Session ID is purely random and does not encode IP');
    }

    // ----------------------------------------------------
    // TEST 8: Target Validation & Sanitization
    // ----------------------------------------------------
    console.log('\nTEST 8: Target Validation & Sanitization');
    const validTarget = analyticsService.validateAndSanitizeTarget('project_click', 'EchoNex');
    assert(typeof validTarget === 'string' && validTarget.length > 0, 'Valid project target is sanitized');

    const generalTarget = analyticsService.validateAndSanitizeTarget('resume_view', 'resume.pdf');
    assert(generalTarget === 'resume.pdf', 'General target resume.pdf is preserved');

    // ----------------------------------------------------
    // TEST 9: Ingest Multi-Event Set for Aggregation Verification
    // ----------------------------------------------------
    console.log('\nTEST 9: Ingest Multi-Event Set');
    const testEvents = [
      { event: 'page_view', section: 'portfolio', session_id: testSessionId2 },
      { event: 'section_view', section: 'projects', session_id: testSessionId1 },
      { event: 'section_view', section: 'projects', session_id: testSessionId2 },
      { event: 'project_view', section: 'projects', target: 'EchoNex', session_id: testSessionId1 },
      { event: 'project_click', section: 'projects', target: 'EchoNex', session_id: testSessionId1 },
      { event: 'github_click', section: 'github', target: 'Portfolio-1', session_id: testSessionId1 },
      { event: 'resume_view', section: 'resume', target: 'resume.pdf', session_id: testSessionId1 },
      { event: 'resume_download', section: 'resume', target: 'resume.pdf', session_id: testSessionId2 },
      { event: 'contact_success', section: 'contact', target: 'contact_form', session_id: testSessionId1 }
    ];

    for (const ev of testEvents) {
      const resEv = await fetch(`${baseUrl}/api/analytics/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ev)
      });
      assert(resEv.status === 200, `Event ${ev.event} successfully recorded`);
    }

    // ----------------------------------------------------
    // TEST 10: Admin Authentication Protection
    // ----------------------------------------------------
    console.log('\nTEST 10: Admin Authentication Protection');
    const resUnauthSummary = await fetch(`${baseUrl}/api/admin/analytics/summary`);
    assert(resUnauthSummary.status === 401, 'GET /api/admin/analytics/summary rejects unauthenticated request with HTTP 401');

    const resUnauthTimeseries = await fetch(`${baseUrl}/api/admin/analytics/timeseries?range=30d`);
    assert(resUnauthTimeseries.status === 401, 'GET /api/admin/analytics/timeseries rejects unauthenticated request with HTTP 401');

    const resUnauthEvents = await fetch(`${baseUrl}/api/admin/analytics/events?limit=10`);
    assert(resUnauthEvents.status === 401, 'GET /api/admin/analytics/events rejects unauthenticated request with HTTP 401');

    // ----------------------------------------------------
    // TEST 11: Admin Login & Session Cookie Retrieval
    // ----------------------------------------------------
    console.log('\nTEST 11: Admin Login & Session Acquisition');
    const loginRes = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: testAdminUser,
        password: testAdminPassword
      })
    });
    assert(loginRes.status === 200, 'Admin login succeeds with HTTP 200');
    authCookie = loginRes.headers.get('set-cookie')?.split(';')[0] || '';
    assert(authCookie.includes('portfolio_sid'), 'Received portfolio_sid session cookie');

    // ----------------------------------------------------
    // TEST 12: Admin Summary Metrics Accuracy
    // ----------------------------------------------------
    console.log('\nTEST 12: Admin Summary Metrics Accuracy');
    const resAuthSummary = await fetch(`${baseUrl}/api/admin/analytics/summary`, {
      headers: { Cookie: authCookie }
    });
    assert(resAuthSummary.status === 200, 'GET /api/admin/analytics/summary returns HTTP 200 with session');
    const summaryJson = await resAuthSummary.json();
    assert(summaryJson.success === true, 'Summary returns success: true');
    const s = summaryJson.summary;
    assert(typeof s.totalVisits === 'number' && s.totalVisits >= 2, `totalVisits >= 2 (found ${s.totalVisits})`);
    assert(typeof s.uniqueSessions === 'number' && s.uniqueSessions >= 2, `uniqueSessions >= 2 (found ${s.uniqueSessions})`);
    assert(typeof s.projectInteractions === 'number' && s.projectInteractions >= 2, `projectInteractions >= 2 (found ${s.projectInteractions})`);
    assert(typeof s.githubClicks === 'number' && s.githubClicks >= 1, `githubClicks >= 1 (found ${s.githubClicks})`);
    assert(typeof s.resumeViews === 'number' && s.resumeViews >= 1, `resumeViews >= 1 (found ${s.resumeViews})`);
    assert(typeof s.resumeDownloads === 'number' && s.resumeDownloads >= 1, `resumeDownloads >= 1 (found ${s.resumeDownloads})`);
    assert(typeof s.contactSuccesses === 'number' && s.contactSuccesses >= 1, `contactSuccesses >= 1 (found ${s.contactSuccesses})`);
    assert(typeof s.conversionRate === 'string' && s.conversionRate.endsWith('%'), `conversionRate is formatted percentage (${s.conversionRate})`);

    // ----------------------------------------------------
    // TEST 13: Admin Time-Series Ranges (7d, 30d, 90d)
    // ----------------------------------------------------
    console.log('\nTEST 13: Admin Time-Series Ranges (7d, 30d, 90d)');
    for (const [range, days] of [['7d', 7], ['30d', 30], ['90d', 90]]) {
      const resRange = await fetch(`${baseUrl}/api/admin/analytics/timeseries?range=${range}`, {
        headers: { Cookie: authCookie }
      });
      assert(resRange.status === 200, `GET /api/admin/analytics/timeseries?range=${range} returns HTTP 200`);
      const rangeJson = await resRange.json();
      assert(rangeJson.success === true, `Range ${range} returns success: true`);
      assert(rangeJson.timeline.length === days, `Range ${range} contains exactly ${days} daily points`);
    }

    // Invalid range rejection
    const resBadRange = await fetch(`${baseUrl}/api/admin/analytics/timeseries?range=1year`, {
      headers: { Cookie: authCookie }
    });
    assert(resBadRange.status === 400, 'Invalid range parameter returns HTTP 400');

    // ----------------------------------------------------
    // TEST 14: Recent Events Endpoint
    // ----------------------------------------------------
    console.log('\nTEST 14: Recent Events Endpoint');
    const resRecent = await fetch(`${baseUrl}/api/admin/analytics/events?limit=10`, {
      headers: { Cookie: authCookie }
    });
    assert(resRecent.status === 200, 'GET /api/admin/analytics/events returns HTTP 200');
    const recentJson = await resRecent.json();
    assert(Array.isArray(recentJson.events), 'Returns events array');
    assert(recentJson.events.length > 0, 'Recent events array contains events');
    const firstEvent = recentJson.events[0];
    assert(!firstEvent.ip && !firstEvent.session_id, 'Recent events output does not leak IP or session ID');

    // ----------------------------------------------------
    // TEST 15: 90-Day Retention Policy Isolation Check
    // ----------------------------------------------------
    console.log('\nTEST 15: 90-Day Retention Policy Isolation Check');
    // Insert an artificial old event from 120 days ago
    db.prepare(`
      INSERT INTO analytics_events (event_type, section, target, session_id, created_at)
      VALUES ('page_view', 'hero', 'home', ?, datetime('now', '-120 days'))
    `).run(`${testSessionPrefix}old`);

    const preContactsCount = db.prepare(`SELECT COUNT(*) as c FROM contacts`).get().c;
    const preProjectsCount = db.prepare(`SELECT COUNT(*) as c FROM projects_cache`).get().c;
    const preCertificatesCount = db.prepare(`SELECT COUNT(*) as c FROM certificates`).get().c;

    // Run retention cleanup
    const deletedCount = analyticsService.cleanupOldEvents(90);
    assert(deletedCount >= 1, `Cleaned up at least 1 expired event (>90 days old)`);

    // Verify other tables were NOT modified
    const postContactsCount = db.prepare(`SELECT COUNT(*) as c FROM contacts`).get().c;
    const postProjectsCount = db.prepare(`SELECT COUNT(*) as c FROM projects_cache`).get().c;
    const postCertificatesCount = db.prepare(`SELECT COUNT(*) as c FROM certificates`).get().c;
    assert(preContactsCount === postContactsCount, 'Retention cleanup did NOT touch contacts table');
    assert(preProjectsCount === postProjectsCount, 'Retention cleanup did NOT touch projects_cache table');
    assert(preCertificatesCount === postCertificatesCount, 'Retention cleanup did NOT touch certificates table');

    // ----------------------------------------------------
    // TEST 16: Phase 1–9 Regression Checks
    // ----------------------------------------------------
    console.log('\nTEST 16: Phase 1–9 Regression Checks');
    const rHealth = await fetch(`${baseUrl}/api/health`);
    assert(rHealth.status === 200, 'GET /api/health returns HTTP 200');

    const rProjects = await fetch(`${baseUrl}/api/projects`);
    assert(rProjects.status === 200, 'GET /api/projects returns HTTP 200');

    const rCerts = await fetch(`${baseUrl}/api/certificates`);
    assert(rCerts.status === 200, 'GET /api/certificates returns HTTP 200');

    const rExp = await fetch(`${baseUrl}/api/experience`);
    assert(rExp.status === 200, 'GET /api/experience returns HTTP 200');

    const rSkills = await fetch(`${baseUrl}/api/skills`);
    assert(rSkills.status === 200, 'GET /api/skills returns HTTP 200');

    const rResume = await fetch(`${baseUrl}/api/resume`);
    assert(rResume.status === 200, 'GET /api/resume returns HTTP 200');

    // ----------------------------------------------------
    // TEST 17: Protected Files & Frontend Code Integrity
    // ----------------------------------------------------
    console.log('\nTEST 17: Protected Files & Frontend Code Integrity');
    const analyticsApiFile = path.resolve(projectRoot, 'src', 'services', 'analyticsApi.js');
    assert(fs.existsSync(analyticsApiFile), 'src/services/analyticsApi.js exists');

    const useAnalyticsFile = path.resolve(projectRoot, 'src', 'hooks', 'useAnalytics.js');
    assert(fs.existsSync(useAnalyticsFile), 'src/hooks/useAnalytics.js exists');

    const appJsx = fs.readFileSync(path.resolve(projectRoot, 'src', 'App.jsx'), 'utf-8');
    assert(appJsx.includes('useAnalytics'), 'App.jsx integrates useAnalytics');
    assert(appJsx.includes('trackPageView'), 'App.jsx calls trackPageView');

    const adminPage = fs.readFileSync(path.resolve(projectRoot, 'src', 'components', 'AdminPage.jsx'), 'utf-8');
    assert(adminPage.includes('admin-tab-analytics'), 'AdminPage.jsx contains analytics tab');
    assert(adminPage.includes('TOTAL VISITS'), 'AdminPage.jsx displays Total Visits');

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    // Clean up all temporary test records completely
    cleanupTestData();
    server.close();
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY:`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
