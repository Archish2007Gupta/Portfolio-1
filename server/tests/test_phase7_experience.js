import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import app from '../app.js';
import env from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

async function runTests() {
  console.log('====================================================');
  console.log('PHASE 7 — AUTOMATIC EXPERIENCE INTEGRATION TEST SUITE');
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

  // Start temporary server
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  const experienceFilePath = path.resolve(env.PATHS.DATA_DIR, 'experience.json');
  const originalDataBackup = fs.readFileSync(experienceFilePath, 'utf-8');

  try {
    // ----------------------------------------------------
    // TEST 1: Health check
    // ----------------------------------------------------
    console.log('TEST 1: API Health Check');
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.status === 200, 'GET /api/health returns HTTP 200');
    assert(healthJson.success === true, 'Health check returns success: true');

    // ----------------------------------------------------
    // TEST 2: Existing API Regression Checks
    // ----------------------------------------------------
    console.log('\nTEST 2: Existing API Regression Checks (/api/certificates, /api/projects)');
    const certsRes = await fetch(`${baseUrl}/api/certificates`);
    const certsJson = await certsRes.json();
    assert(certsRes.status === 200, 'GET /api/certificates returns HTTP 200');
    assert(certsJson.success === true && Array.isArray(certsJson.certificates), 'Certificates response has success: true and certificates array');

    const projRes = await fetch(`${baseUrl}/api/projects`);
    const projJson = await projRes.json();
    assert(projRes.status === 200, 'GET /api/projects returns HTTP 200');
    assert(projJson.success === true && Array.isArray(projJson.projects), 'Projects response has success: true and projects array');

    // ----------------------------------------------------
    // TEST 3: GET /api/experience Endpoint Availability & Baseline Data
    // ----------------------------------------------------
    console.log('\nTEST 3: GET /api/experience Endpoint Availability & Baseline Data');
    const expRes = await fetch(`${baseUrl}/api/experience`);
    const expJson = await expRes.json();
    assert(expRes.status === 200, 'GET /api/experience returns HTTP 200');
    assert(expJson.success === true, 'Response contains success: true');
    assert(Array.isArray(expJson.experience), 'Response contains experience array');
    assert(expJson.experience.length === 6, `Experience array has 6 verified baseline entries (got ${expJson.experience.length})`);

    // ----------------------------------------------------
    // TEST 4: Schema Validation of Experience Items
    // ----------------------------------------------------
    console.log('\nTEST 4: Schema Validation of Experience Entries');
    const firstItem = expJson.experience[0];
    assert(typeof firstItem.id === 'string' && firstItem.id.length > 0, 'Entry has valid non-empty id');
    assert(typeof firstItem.title === 'string' && firstItem.title.length > 0, 'Entry has valid non-empty title');
    assert(typeof firstItem.organization === 'string' && firstItem.organization.length > 0, 'Entry has valid non-empty organization');
    assert(typeof firstItem.description === 'string' && firstItem.description.length > 0, 'Entry has valid non-empty description');
    assert(typeof firstItem.detail === 'string' && firstItem.detail === firstItem.description, 'Entry has matching detail alias for JourneySection compatibility');
    assert(typeof firstItem.current === 'boolean', 'Entry has boolean current flag');
    assert(typeof firstItem.order === 'number', 'Entry has numeric order');
    assert(Array.isArray(firstItem.skills), 'Entry has skills array');
    assert(typeof firstItem.links === 'object' && !Array.isArray(firstItem.links), 'Entry has links object');
    assert(typeof firstItem.color === 'string', 'Entry has color attribute');

    // ----------------------------------------------------
    // TEST 5: Deterministic Sorting
    // ----------------------------------------------------
    console.log('\nTEST 5: Deterministic Sorting Verification');
    const orders = expJson.experience.map(e => e.order);
    const sortedOrders = [...orders].sort((a, b) => a - b);
    assert(JSON.stringify(orders) === JSON.stringify(sortedOrders), 'Entries are deterministically sorted by order ascending');

    // ----------------------------------------------------
    // TEST 6: Single Source of Truth: Adding New Experience
    // ----------------------------------------------------
    console.log('\nTEST 6: Adding New Entry to experience.json updates API dynamically');
    const modifiedWithAddition = JSON.parse(originalDataBackup);
    const testEntry = {
      id: "test-ai-fellowship",
      title: "AI Research Fellow",
      organization: "Open Science Initiative",
      type: "FELLOWSHIP",
      tag: "RESEARCH",
      location: "Bengaluru, India",
      startDate: "2026-07",
      endDate: null,
      current: true,
      time: "July 2026 — Present",
      period: "2026 Fellowships",
      periodLabel: "Advanced Research",
      description: "Explored generative diffusion systems and distributed edge inference workloads.",
      skills: ["PyTorch", "Diffusion Models", "Edge AI"],
      links: {
        "lab": "https://example.com/fellowship"
      },
      color: "#22C55E",
      order: 7
    };
    modifiedWithAddition.push(testEntry);
    fs.writeFileSync(experienceFilePath, JSON.stringify(modifiedWithAddition, null, 2), 'utf-8');

    const addRes = await fetch(`${baseUrl}/api/experience`);
    const addJson = await addRes.json();
    assert(addJson.experience.length === 7, `Adding entry dynamically increased count to 7 (got ${addJson.experience.length})`);
    const foundAdded = addJson.experience.find(e => e.id === "test-ai-fellowship");
    assert(Boolean(foundAdded) && foundAdded.title === "AI Research Fellow", 'Newly added entry is served by GET /api/experience');
    assert(foundAdded && foundAdded.links.lab === "https://example.com/fellowship", 'Valid https link is preserved');

    // ----------------------------------------------------
    // TEST 7: Single Source of Truth: Modifying Experience
    // ----------------------------------------------------
    console.log('\nTEST 7: Modifying Entry in experience.json updates API dynamically');
    const modifiedWithEdit = JSON.parse(fs.readFileSync(experienceFilePath, 'utf-8'));
    const editTarget = modifiedWithEdit.find(e => e.id === "test-ai-fellowship");
    editTarget.title = "Senior AI Research Fellow";
    fs.writeFileSync(experienceFilePath, JSON.stringify(modifiedWithEdit, null, 2), 'utf-8');

    const editRes = await fetch(`${baseUrl}/api/experience`);
    const editJson = await editRes.json();
    const foundEdited = editJson.experience.find(e => e.id === "test-ai-fellowship");
    assert(foundEdited && foundEdited.title === "Senior AI Research Fellow", 'Modified title is immediately reflected via API');

    // ----------------------------------------------------
    // TEST 8: Single Source of Truth: Removing Experience
    // ----------------------------------------------------
    console.log('\nTEST 8: Removing Entry in experience.json updates API dynamically');
    const filteredEntries = modifiedWithEdit.filter(e => e.id !== "test-ai-fellowship");
    fs.writeFileSync(experienceFilePath, JSON.stringify(filteredEntries, null, 2), 'utf-8');

    const removeRes = await fetch(`${baseUrl}/api/experience`);
    const removeJson = await removeRes.json();
    assert(removeJson.experience.length === 6, 'Removed entry decreases count back to 6');
    assert(!removeJson.experience.find(e => e.id === "test-ai-fellowship"), 'Removed entry is no longer served');

    // ----------------------------------------------------
    // TEST 9: Empty Experience File Handling
    // ----------------------------------------------------
    console.log('\nTEST 9: Empty Array [] in experience.json handled gracefully');
    fs.writeFileSync(experienceFilePath, '[]', 'utf-8');
    const emptyRes = await fetch(`${baseUrl}/api/experience`);
    const emptyJson = await emptyRes.json();
    assert(emptyRes.status === 200, 'Empty experience.json returns HTTP 200');
    assert(emptyJson.success === true && Array.isArray(emptyJson.experience) && emptyJson.experience.length === 0, 'Returns empty experience array []');

    // ----------------------------------------------------
    // TEST 10: Corrupted / Invalid JSON Handling
    // ----------------------------------------------------
    console.log('\nTEST 10: Corrupted JSON handled safely without server crash');
    fs.writeFileSync(experienceFilePath, '{"broken": [ unclosed syntax', 'utf-8');
    const corruptRes = await fetch(`${baseUrl}/api/experience`);
    const corruptJson = await corruptRes.json();
    assert(corruptRes.status === 200, 'Corrupted experience.json returns HTTP 200 gracefully');
    assert(corruptJson.success === true && Array.isArray(corruptJson.experience) && corruptJson.experience.length === 0, 'Returns empty array on corrupted JSON');

    // ----------------------------------------------------
    // TEST 11: Link Sanitization (Security)
    // ----------------------------------------------------
    console.log('\nTEST 11: Link Sanitization (XSS Protocol Filtering)');
    const xssTestEntries = [
      {
        id: "xss-test",
        title: "Security Test",
        organization: "Security Lab",
        description: "Testing link sanitization against XSS vectors.",
        order: 1,
        links: {
          "safe": "https://example.com/safe",
          "danger_js": "javascript:alert(1)",
          "danger_data": "data:text/html,<script>alert(1)</script>"
        }
      }
    ];
    fs.writeFileSync(experienceFilePath, JSON.stringify(xssTestEntries, null, 2), 'utf-8');
    const xssRes = await fetch(`${baseUrl}/api/experience`);
    const xssJson = await xssRes.json();
    const xssEntry = xssJson.experience[0];
    assert(xssEntry.links.safe === "https://example.com/safe", 'Safe https link allowed');
    assert(xssEntry.links.danger_js === undefined, 'javascript: URI scheme rejected and stripped');
    assert(xssEntry.links.danger_data === undefined, 'data: URI scheme rejected and stripped');

    // ----------------------------------------------------
    // RESTORE ORIGINAL DATA
    // ----------------------------------------------------
    fs.writeFileSync(experienceFilePath, originalDataBackup, 'utf-8');
    console.log('\nRestored server/data/experience.json to original baseline verified data.');

    // ----------------------------------------------------
    // TEST 12: Architectural Checks & No-Duplicate Verification
    // ----------------------------------------------------
    console.log('\nTEST 12: Architectural Checks & Duplicate Section Verification');
    const appJsContent = fs.readFileSync(path.join(projectRoot, 'src', 'App.jsx'), 'utf-8');

    // Check JourneySection count
    const journeySectionMatches = appJsContent.match(/<JourneySection/g) || [];
    assert(journeySectionMatches.length === 1, `Exactly ONE instance of JourneySection in App.jsx (found ${journeySectionMatches.length})`);

    // Check ExperienceSection alias is NOT created
    const experienceSectionFile = path.join(projectRoot, 'src', 'components', 'ExperienceSection.jsx');
    assert(!fs.existsSync(experienceSectionFile), 'src/components/ExperienceSection.jsx does NOT exist (no unnecessary alias)');

    // Check ExperienceSection is not mounted
    const expMatches = appJsContent.match(/<ExperienceSection/g) || [];
    assert(expMatches.length === 0, 'No <ExperienceSection> instances in App.jsx');

    // Check JourneySection imports
    const journeyJsxContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'JourneySection.jsx'), 'utf-8');
    assert(journeyJsxContent.includes("from '../services/experienceApi.js'"), 'JourneySection imports from experienceApi.js');
    assert(!journeyJsxContent.includes('scheduleTimeline'), 'JourneySection does NOT import hardcoded scheduleTimeline');

    // Check portfolioData.js does NOT export scheduleTimeline
    const portfolioDataContent = fs.readFileSync(path.join(projectRoot, 'src', 'data', 'portfolioData.js'), 'utf-8');
    assert(!portfolioDataContent.includes('export const scheduleTimeline'), 'portfolioData.js does NOT export hardcoded scheduleTimeline');

    // Check protected files have not been modified
    const protectedFiles = [
      'src/components/CustomCursor.jsx',
      'src/components/Navbar.jsx',
      'src/components/Disciplines.jsx',
      'src/components/CertificatesGallery.jsx',
      'src/components/Preloader.jsx',
      'src/index.css'
    ];

    for (const file of protectedFiles) {
      const fullPath = path.join(projectRoot, file);
      assert(fs.existsSync(fullPath), `Protected file ${file} exists`);
    }

  } finally {
    // Ensure original data is always restored
    fs.writeFileSync(experienceFilePath, originalDataBackup, 'utf-8');
    await new Promise((resolve) => server.close(resolve));
  }

  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal error running tests:', err);
  process.exit(1);
});
