import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import app from '../app.js';
import env from '../config/env.js';
import resumeService from '../services/resume.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

async function runTests() {
  console.log('====================================================');
  console.log('PHASE 9 — AUTOMATIC RESUME / CV INTEGRATION TESTS');
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

  const resumeDir = path.resolve(projectRoot, 'public', 'resume');
  const resumeFile = path.resolve(resumeDir, 'resume.pdf');
  const backupFile = path.resolve(resumeDir, 'resume.pdf.bak');

  // Verify initial setup
  assert(fs.existsSync(resumeFile), 'Initial resume file exists at public/resume/resume.pdf');
  const originalStats = fs.statSync(resumeFile);
  const originalSize = originalStats.size;

  // Start ephemeral test server
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // ----------------------------------------------------
    // TEST 1: Resume endpoint exists
    // ----------------------------------------------------
    console.log('\nTEST 1: Resume endpoint existence (GET /api/resume)');
    const res = await fetch(`${baseUrl}/api/resume`);
    assert(res.status === 200, 'GET /api/resume returns HTTP 200');

    // ----------------------------------------------------
    // TEST 2: Existing PDF is detected
    // ----------------------------------------------------
    console.log('\nTEST 2: Existing PDF detection');
    const json = await res.json();
    assert(json.success === true, 'Response has success: true');
    assert(json.available === true, 'Response has available: true');

    // ----------------------------------------------------
    // TEST 3: Correct metadata is returned
    // ----------------------------------------------------
    console.log('\nTEST 3: Correct metadata fields');
    assert(json.url === '/resume/resume.pdf', `url is '/resume/resume.pdf' (got '${json.url}')`);
    assert(json.filename === 'resume.pdf', `filename is 'resume.pdf' (got '${json.filename}')`);
    assert(json.size === originalSize, `size matches file size (${originalSize} bytes)`);
    assert(typeof json.updatedAt === 'string' && !isNaN(Date.parse(json.updatedAt)), 'updatedAt is valid ISO timestamp');
    assert(json.downloadUrl === '/api/resume/download', `downloadUrl is '/api/resume/download' (got '${json.downloadUrl}')`);

    // ----------------------------------------------------
    // TEST 4: URL is safe
    // ----------------------------------------------------
    console.log('\nTEST 4: URL safety verification');
    assert(json.url.startsWith('/resume/'), 'URL is relative and within /resume/');
    assert(!json.url.includes('..') && !json.url.includes('\\'), 'URL contains no path traversal sequences');

    // ----------------------------------------------------
    // TEST 5: Server filesystem path is not exposed
    // ----------------------------------------------------
    console.log('\nTEST 5: Server filesystem privacy');
    const rawJson = JSON.stringify(json);
    assert(!rawJson.includes(projectRoot), 'Response does not contain absolute project root path');
    assert(!rawJson.includes('C:\\') && !rawJson.includes('/Users/'), 'Response does not leak operating system paths');
    assert(!rawJson.includes('server'), 'Response does not leak server directory structure');

    // ----------------------------------------------------
    // TEST 6: Missing resume is handled gracefully
    // ----------------------------------------------------
    console.log('\nTEST 6: Missing resume handling');
    // Rename resume.pdf to backup
    fs.renameSync(resumeFile, backupFile);
    try {
      const resMissing = await fetch(`${baseUrl}/api/resume`);
      assert(resMissing.status === 200, 'GET /api/resume returns HTTP 200 when resume is missing');
      const jsonMissing = await resMissing.json();
      assert(jsonMissing.success === true, 'success is true when resume is missing');
      assert(jsonMissing.available === false, 'available is false when resume is missing');
      assert(jsonMissing.url === undefined, 'No URL is returned when resume is missing');
    } finally {
      // Restore file
      if (fs.existsSync(backupFile)) {
        fs.renameSync(backupFile, resumeFile);
      }
    }

    // ----------------------------------------------------
    // TEST 7: Invalid / non-PDF file is rejected
    // ----------------------------------------------------
    console.log('\nTEST 7: Invalid / non-PDF file rejection');
    fs.renameSync(resumeFile, backupFile);
    try {
      // Create a fake non-PDF text file
      fs.writeFileSync(resumeFile, 'This is plain text and definitely not a valid PDF file.');
      const resInvalid = await fetch(`${baseUrl}/api/resume`);
      assert(resInvalid.status === 200, 'GET /api/resume returns HTTP 200 for invalid file');
      const jsonInvalid = await resInvalid.json();
      assert(jsonInvalid.available === false, 'Invalid non-PDF file is marked available: false');
    } finally {
      // Restore file
      if (fs.existsSync(backupFile)) {
        if (fs.existsSync(resumeFile)) fs.unlinkSync(resumeFile);
        fs.renameSync(backupFile, resumeFile);
      }
    }

    // ----------------------------------------------------
    // TEST 8: Path traversal attempts are rejected
    // ----------------------------------------------------
    console.log('\nTEST 8: Path traversal security check');
    assert(resumeService.resolveResumePath('../../server/config/env.js') === null, 'Rejects ../ traversal');
    assert(resumeService.resolveResumePath('..\\..\\server\\config\\env.js') === null, 'Rejects ..\\ traversal');
    assert(resumeService.resolveResumePath('/etc/passwd') === null, 'Rejects absolute unix path');
    assert(resumeService.resolveResumePath('portfolio.db') === null, 'Rejects non-pdf extension');

    // ----------------------------------------------------
    // TEST 9 & 10: Resume replacement detection & updated metadata
    // ----------------------------------------------------
    console.log('\nTEST 9 & 10: Dynamic resume replacement detection');
    fs.renameSync(resumeFile, backupFile);
    try {
      // Write a minimal valid PDF with different content
      const dummyPdfContent = '%PDF-1.4\n%âãÏÓ\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000015 00000 n\n0000000060 00000 n\n0000000111 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n178\n%%EOF';
      fs.writeFileSync(resumeFile, dummyPdfContent);
      const replacedStats = fs.statSync(resumeFile);

      const resReplaced = await fetch(`${baseUrl}/api/resume`);
      const jsonReplaced = await resReplaced.json();
      assert(jsonReplaced.available === true, 'Replaced valid PDF is detected as available: true');
      assert(jsonReplaced.size === replacedStats.size, `Replaced PDF size matches (${jsonReplaced.size} === ${replacedStats.size})`);
      assert(jsonReplaced.size !== originalSize, 'Replaced PDF size differs from original size');
    } finally {
      // Restore original file
      if (fs.existsSync(backupFile)) {
        if (fs.existsSync(resumeFile)) fs.unlinkSync(resumeFile);
        fs.renameSync(backupFile, resumeFile);
      }
    }

    // Confirm original restored
    const restoredRes = await fetch(`${baseUrl}/api/resume`);
    const restoredJson = await restoredRes.json();
    assert(restoredJson.size === originalSize, `Original resume restored and detected (${originalSize} bytes)`);

    // ----------------------------------------------------
    // TEST 11: Download and View endpoints work
    // ----------------------------------------------------
    console.log('\nTEST 11: Download and View endpoints functionality');
    // Static view endpoint
    const staticRes = await fetch(`${baseUrl}/resume/resume.pdf`);
    assert(staticRes.status === 200, 'GET /resume/resume.pdf returns HTTP 200');
    assert(staticRes.headers.get('content-type') === 'application/pdf', 'Static resume has Content-Type: application/pdf');
    const staticBuf = await staticRes.arrayBuffer();
    assert(staticBuf.byteLength === originalSize, `Static download size matches (${staticBuf.byteLength} bytes)`);

    // Download endpoint
    const downloadRes = await fetch(`${baseUrl}/api/resume/download`);
    assert(downloadRes.status === 200, 'GET /api/resume/download returns HTTP 200');
    assert(downloadRes.headers.get('content-disposition')?.includes('attachment'), 'Content-Disposition includes attachment');
    assert(downloadRes.headers.get('content-disposition')?.includes('Archisha_Gupta_Resume.pdf'), 'Content-Disposition has friendly filename');
    assert(downloadRes.headers.get('content-type') === 'application/pdf', 'Download endpoint has Content-Type: application/pdf');
    const downloadBuf = await downloadRes.arrayBuffer();
    assert(downloadBuf.byteLength === originalSize, `Download stream size matches (${downloadBuf.byteLength} bytes)`);

    // ----------------------------------------------------
    // TEST 12: Backend failure handling on download endpoint
    // ----------------------------------------------------
    console.log('\nTEST 12: Missing file on download endpoint');
    fs.renameSync(resumeFile, backupFile);
    try {
      const resMissingDownload = await fetch(`${baseUrl}/api/resume/download`);
      assert(resMissingDownload.status === 404, 'GET /api/resume/download returns HTTP 404 when file is missing');
      const jsonMissingDownload = await resMissingDownload.json();
      assert(jsonMissingDownload.success === false, 'Returns success: false for missing download');
    } finally {
      if (fs.existsSync(backupFile)) {
        fs.renameSync(backupFile, resumeFile);
      }
    }

    // ----------------------------------------------------
    // TEST 13: No secrets appear in API responses
    // ----------------------------------------------------
    console.log('\nTEST 13: Secret and credential leak check');
    const checkRes = await fetch(`${baseUrl}/api/resume`);
    const checkText = await checkRes.text();
    assert(!checkText.includes(env.SESSION_SECRET), 'Response does not leak SESSION_SECRET');
    assert(!checkText.includes(env.ADMIN_PASSWORD_HASH), 'Response does not leak ADMIN_PASSWORD_HASH');
    assert(!checkText.includes('portfolio.db'), 'Response does not leak database filename');

    // ----------------------------------------------------
    // TEST 14: Phase 1–8 functionality regression check
    // ----------------------------------------------------
    console.log('\nTEST 14: Phase 1–8 Regression Checks');
    
    // /api/health
    const healthRes = await fetch(`${baseUrl}/api/health`);
    assert(healthRes.status === 200, 'GET /api/health returns HTTP 200');

    // /api/projects
    const projRes = await fetch(`${baseUrl}/api/projects`);
    assert(projRes.status === 200, 'GET /api/projects returns HTTP 200');

    // /api/certificates
    const certRes = await fetch(`${baseUrl}/api/certificates`);
    assert(certRes.status === 200, 'GET /api/certificates returns HTTP 200');

    // /api/experience
    const expRes = await fetch(`${baseUrl}/api/experience`);
    assert(expRes.status === 200, 'GET /api/experience returns HTTP 200');

    // /api/skills
    const skillsRes = await fetch(`${baseUrl}/api/skills`);
    assert(skillsRes.status === 200, 'GET /api/skills returns HTTP 200');

    // /api/contact validation
    const contactRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' })
    });
    assert(contactRes.status === 400, 'POST /api/contact correctly rejects invalid payload with HTTP 400');

    // ----------------------------------------------------
    // TEST 15: Protected Files and Frontend Structure Verification
    // ----------------------------------------------------
    console.log('\nTEST 15: Protected files and architecture checks');
    const resumeApiFile = path.resolve(projectRoot, 'src', 'services', 'resumeApi.js');
    assert(fs.existsSync(resumeApiFile), 'src/services/resumeApi.js exists');

    const useResumeFile = path.resolve(projectRoot, 'src', 'hooks', 'useResume.js');
    assert(fs.existsSync(useResumeFile), 'src/hooks/useResume.js exists');

    const heroFile = path.resolve(projectRoot, 'src', 'components', 'Hero.jsx');
    const heroContent = fs.readFileSync(heroFile, 'utf-8');
    assert(heroContent.includes('useResume'), 'Hero.jsx integrates useResume hook');
    assert(heroContent.includes('VIEW CV'), 'Hero.jsx contains VIEW CV button');

    const footerFile = path.resolve(projectRoot, 'src', 'components', 'Footer.jsx');
    const footerContent = fs.readFileSync(footerFile, 'utf-8');
    assert(footerContent.includes('useResume'), 'Footer.jsx integrates useResume hook');
    assert(footerContent.includes('View CV ↗'), 'Footer.jsx contains View CV link');
    assert(footerContent.includes('Download CV ↓'), 'Footer.jsx contains Download CV link');

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    // Ensure original resume file is restored if test was aborted midway
    if (fs.existsSync(backupFile)) {
      if (fs.existsSync(resumeFile)) fs.unlinkSync(resumeFile);
      fs.renameSync(backupFile, resumeFile);
    }
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
