import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import app from '../app.js';
import env from '../config/env.js';
import { getDb } from '../db/database.js';
import { normalizeTech, extractConservativeTechFromText } from '../services/skills.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

async function runTests() {
  console.log('====================================================');
  console.log('PHASE 8 — AUTOMATIC SKILLS & TECH STACK INTEGRATION');
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

  // Backup original skills.json content
  const skillsJsonPath = path.resolve(env.PATHS.DATA_DIR, 'skills.json');
  const originalSkillsJson = fs.readFileSync(skillsJsonPath, 'utf-8');

  // Start ephemeral test server
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // ----------------------------------------------------
    // TEST 1: API Availability
    // ----------------------------------------------------
    console.log('TEST 1: API Availability (GET /api/skills)');
    const res = await fetch(`${baseUrl}/api/skills`);
    assert(res.status === 200, 'GET /api/skills returns HTTP 200');

    // ----------------------------------------------------
    // TEST 2: Valid Response Structure
    // ----------------------------------------------------
    console.log('\nTEST 2: Valid Response Structure');
    const json = await res.json();
    assert(json.success === true, 'Response contains success: true');
    assert(Array.isArray(json.skills), 'Response contains skills array');
    assert(json.skills.length > 0, `Skills array contains items (found ${json.skills.length})`);

    const firstSkill = json.skills[0];
    assert(typeof firstSkill.id === 'string', 'Skill has valid id');
    assert(typeof firstSkill.name === 'string', 'Skill has valid name');
    assert(typeof firstSkill.category === 'string', 'Skill has valid category');
    assert(['github', 'manual'].includes(firstSkill.source), `Skill source is "github" or "manual" (got ${firstSkill.source})`);
    assert(typeof firstSkill.count === 'number', 'Skill has numeric count');
    assert(Array.isArray(firstSkill.projects), 'Skill has projects array');

    // ----------------------------------------------------
    // TEST 3: Skill Normalization Engine
    // ----------------------------------------------------
    console.log('\nTEST 3: Skill Normalization Engine');
    const normReact1 = normalizeTech('react');
    const normReact2 = normalizeTech('reactjs');
    const normReact3 = normalizeTech('ReactJS');
    assert(normReact1 && normReact1.name === 'React', 'Normalizes "react" -> React');
    assert(normReact2 && normReact2.name === 'React', 'Normalizes "reactjs" -> React');
    assert(normReact3 && normReact3.name === 'React', 'Normalizes "ReactJS" -> React');
    assert(normReact1.id === normReact2.id && normReact2.id === normReact3.id, 'Same canonical id for all React aliases');

    const normNode1 = normalizeTech('node');
    const normNode2 = normalizeTech('nodejs');
    assert(normNode1 && normNode1.name === 'Node.js', 'Normalizes "node" -> Node.js');
    assert(normNode2 && normNode2.name === 'Node.js', 'Normalizes "nodejs" -> Node.js');

    const normCpp1 = normalizeTech('cpp');
    const normCpp2 = normalizeTech('c++');
    assert(normCpp1 && normCpp1.name === 'C++', 'Normalizes "cpp" -> C++');
    assert(normCpp2 && normCpp2.name === 'C++', 'Normalizes "c++" -> C++');

    // ----------------------------------------------------
    // TEST 4: Deduplication & Unique Repository Count
    // ----------------------------------------------------
    console.log('\nTEST 4: Deduplication & Unique Repository Count');
    // Ensure that count matches projects.length exactly
    for (const skill of json.skills) {
      if (skill.source === 'github') {
        const uniqueProjects = new Set(skill.projects);
        assert(
          skill.count === uniqueProjects.size && skill.projects.length === uniqueProjects.size,
          `Skill ${skill.name} count (${skill.count}) matches unique projects (${uniqueProjects.size}) without duplicates`
        );
      }
    }

    // ----------------------------------------------------
    // TEST 5: Category Assignment
    // ----------------------------------------------------
    console.log('\nTEST 5: Category Assignment');
    const pyDef = normalizeTech('python');
    const reactDef = normalizeTech('react');
    const nodeDef = normalizeTech('nodejs');
    const sqliteDef = normalizeTech('sqlite');
    const esp32Def = normalizeTech('esp32');

    assert(pyDef && pyDef.category === 'Languages', 'Python is classified as Languages');
    assert(reactDef && reactDef.category === 'Frontend', 'React is classified as Frontend');
    assert(nodeDef && nodeDef.category === 'Backend', 'Node.js is classified as Backend');
    assert(sqliteDef && sqliteDef.category === 'Database', 'SQLite is classified as Database');
    assert(esp32Def && esp32Def.category === 'Hardware / IoT', 'ESP32 is classified as Hardware / IoT');

    // ----------------------------------------------------
    // TEST 6: Real Project Associations
    // ----------------------------------------------------
    console.log('\nTEST 6: Real Project Associations');
    const jsSkill = json.skills.find(s => s.id === 'javascript');
    assert(Boolean(jsSkill), 'JavaScript is detected from GitHub repositories');
    if (jsSkill) {
      assert(jsSkill.projects.length >= 1, `JavaScript associated with at least 1 repo (${jsSkill.projects.join(', ')})`);
      assert(jsSkill.source === 'github', 'JavaScript source is "github"');
    }

    const htmlSkill = json.skills.find(s => s.id === 'html');
    assert(Boolean(htmlSkill), 'HTML is detected from GitHub repositories');
    if (htmlSkill) {
      assert(htmlSkill.projects.length >= 1, `HTML associated with repos (${htmlSkill.projects.join(', ')})`);
    }

    // ----------------------------------------------------
    // TEST 7: Manual Overrides
    // ----------------------------------------------------
    console.log('\nTEST 7: Manual Overrides via server/data/skills.json');
    const testOverrideConfig = JSON.parse(originalSkillsJson);
    testOverrideConfig.overrides.push({
      id: "javascript",
      name: "JavaScript (Modern ES6+)",
      category: "Languages",
      order: 1
    });
    fs.writeFileSync(skillsJsonPath, JSON.stringify(testOverrideConfig, null, 2), 'utf-8');

    const ovRes = await fetch(`${baseUrl}/api/skills`);
    const ovJson = await ovRes.json();
    const ovJs = ovJson.skills.find(s => s.id === 'javascript');
    assert(ovJs && ovJs.name === 'JavaScript (Modern ES6+)', 'Override display name applied to JavaScript');
    assert(ovJs && ovJs.order === 1, 'Override order applied');

    // ----------------------------------------------------
    // TEST 8: Hidden Skill Filtering
    // ----------------------------------------------------
    console.log('\nTEST 8: Hidden Skill Filtering');
    testOverrideConfig.hidden.push('html');
    fs.writeFileSync(skillsJsonPath, JSON.stringify(testOverrideConfig, null, 2), 'utf-8');

    const hideRes = await fetch(`${baseUrl}/api/skills`);
    const hideJson = await hideRes.json();
    const hiddenHtml = hideJson.skills.find(s => s.id === 'html');
    assert(!hiddenHtml, 'Hidden skill "html" is excluded from API output');

    // ----------------------------------------------------
    // TEST 9: Additional Curated Skills
    // ----------------------------------------------------
    console.log('\nTEST 9: Additional Curated Skills');
    testOverrideConfig.additional.push({
      id: "test-curated-skill",
      name: "Test Curated Skill",
      category: "Tools",
      order: 99
    });
    fs.writeFileSync(skillsJsonPath, JSON.stringify(testOverrideConfig, null, 2), 'utf-8');

    const addRes = await fetch(`${baseUrl}/api/skills`);
    const addJson = await addRes.json();
    const curatedFound = addJson.skills.find(s => s.id === 'test-curated-skill');
    assert(Boolean(curatedFound), 'Manually curated skill is returned in API');
    assert(curatedFound && curatedFound.source === 'manual', 'Curated skill has source: "manual"');
    assert(curatedFound && curatedFound.category === 'Tools', 'Curated skill category matches');

    // Restore original skills.json immediately
    fs.writeFileSync(skillsJsonPath, originalSkillsJson, 'utf-8');
    console.log('  ✓ Restored server/data/skills.json to baseline');

    // ----------------------------------------------------
    // TEST 10: Conservative Detection & No Fabricated Skills
    // ----------------------------------------------------
    console.log('\nTEST 10: Conservative Detection & No Fabricated Skills');
    // Verify Prompt Engineering is NOT extracted automatically from speculative README text
    const speculativeText1 = 'Future improvements may include Docker and Kubernetes. Learn more about React and Prompt Engineering.';
    const detectedSpeculative = extractConservativeTechFromText(speculativeText1);
    assert(!detectedSpeculative.has('docker'), 'Speculative Docker mention is NOT detected');
    assert(!detectedSpeculative.has('kubernetes'), 'Speculative Kubernetes mention is NOT detected');
    assert(!detectedSpeculative.has('prompt-engineering'), 'Prompt Engineering is NOT automatically detected');

    const genuineUsageText = 'Built using React, Vite, and SQLite for data persistence.';
    const detectedGenuine = extractConservativeTechFromText(genuineUsageText);
    assert(detectedGenuine.has('react'), 'Active "Built using React" is detected');
    assert(detectedGenuine.has('vite'), 'Active "Vite" is detected');
    assert(detectedGenuine.has('sqlite'), 'Active "SQLite" is detected');

    // ----------------------------------------------------
    // TEST 11: Security & Token Leak Prevention
    // ----------------------------------------------------
    console.log('\nTEST 11: Security & Token Leak Prevention');
    const freshSkillsRes = await fetch(`${baseUrl}/api/skills`);
    const rawResponseBody = await freshSkillsRes.text();
    assert(!rawResponseBody.includes(env.GITHUB_TOKEN || 'ghp_'), 'API response does not leak GITHUB_TOKEN');
    assert(!rawResponseBody.includes(env.SESSION_SECRET), 'API response does not leak SESSION_SECRET');
    assert(!rawResponseBody.includes('portfolio.db'), 'API response does not leak internal filesystem paths');

    // ----------------------------------------------------
    // TEST 12: Existing APIs Regression
    // ----------------------------------------------------
    console.log('\nTEST 12: Existing APIs Regression Checks');
    const healthRes = await fetch(`${baseUrl}/api/health`);
    assert(healthRes.status === 200, 'GET /api/health returns 200');

    const projectsRes = await fetch(`${baseUrl}/api/projects`);
    assert(projectsRes.status === 200, 'GET /api/projects returns 200');

    const certsRes = await fetch(`${baseUrl}/api/certificates`);
    assert(certsRes.status === 200, 'GET /api/certificates returns 200');

    const expRes = await fetch(`${baseUrl}/api/experience`);
    assert(expRes.status === 200, 'GET /api/experience returns 200');

    // ----------------------------------------------------
    // TEST 13: Dynamic GitHub Topic Verification (Rule 27 & Rule 11 Isolation)
    // ----------------------------------------------------
    console.log('\nTEST 13: Dynamic GitHub Topic Verification (Rule 27 with Strict Cache Isolation)');
    const db = getDb();
    
    // Choose an existing project from cache to test
    const targetRow = db.prepare('SELECT github_id, name, topics, data_json FROM projects_cache LIMIT 1').get();
    assert(Boolean(targetRow), 'Found target project row in projects_cache for isolated test');

    if (targetRow) {
      const originalTopics = targetRow.topics;
      const originalDataJson = targetRow.data_json;

      try {
        // Step B: Inject temporary topic "sqlite" into this project's cache
        const testTopics = ['sqlite'];
        const parsedData = JSON.parse(originalDataJson);
        parsedData.topics = testTopics;

        db.prepare('UPDATE projects_cache SET topics = ?, data_json = ? WHERE github_id = ?')
          .run(JSON.stringify(testTopics), JSON.stringify(parsedData), targetRow.github_id);

        // Step D: Call GET /api/skills and verify SQLite is detected in this project
        const dynRes1 = await fetch(`${baseUrl}/api/skills`);
        const dynJson1 = await dynRes1.json();
        const sqliteSkill = dynJson1.skills.find(s => s.id === 'sqlite');

        assert(Boolean(sqliteSkill), 'Adding "sqlite" topic dynamically made SQLite appear in skills API');
        assert(sqliteSkill && sqliteSkill.projects.includes(targetRow.name), `Target project ${targetRow.name} is listed in SQLite projects`);

        // Step E: Remove the topic and re-test
        db.prepare('UPDATE projects_cache SET topics = ?, data_json = ? WHERE github_id = ?')
          .run(originalTopics, originalDataJson, targetRow.github_id);

        const dynRes2 = await fetch(`${baseUrl}/api/skills`);
        const dynJson2 = await dynRes2.json();
        const sqliteAfter = dynJson2.skills.find(s => s.id === 'sqlite');
        const isAssociated = sqliteAfter && sqliteAfter.projects.includes(targetRow.name);
        assert(!isAssociated, 'Removing "sqlite" topic removed project association from SQLite skill');

      } finally {
        // Step 11: Guarantee absolute restoration of SQLite cache row
        db.prepare('UPDATE projects_cache SET topics = ?, data_json = ? WHERE github_id = ?')
          .run(originalTopics, originalDataJson, targetRow.github_id);
        console.log('  ✓ Restored projects_cache row to original state');
      }
    }

    // ----------------------------------------------------
    // TEST 14: Single Section & Architecture Check
    // ----------------------------------------------------
    console.log('\nTEST 14: Single Section & Architecture Verification');
    const appJsContent = fs.readFileSync(path.join(projectRoot, 'src', 'App.jsx'), 'utf-8');
    const skillsSectionMatches = appJsContent.match(/<SkillsSection/g) || [];
    assert(skillsSectionMatches.length === 1, `SkillsSection is mounted exactly ONCE in App.jsx (found ${skillsSectionMatches.length})`);

    const skillsSectionFile = path.join(projectRoot, 'src', 'components', 'SkillsSection.jsx');
    assert(fs.existsSync(skillsSectionFile), 'src/components/SkillsSection.jsx exists');

    const skillsApiFile = path.join(projectRoot, 'src', 'services', 'skillsApi.js');
    assert(fs.existsSync(skillsApiFile), 'src/services/skillsApi.js exists');

    // Verify Disciplines.jsx was NOT modified
    const disciplinesContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'Disciplines.jsx'), 'utf-8');
    assert(disciplinesContent.includes('domainTracks'), 'Disciplines.jsx retains domainTracks');

  } finally {
    // Final restoration guarantee
    fs.writeFileSync(skillsJsonPath, originalSkillsJson, 'utf-8');
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
  console.error('Fatal error running Phase 8 tests:', err);
  process.exit(1);
});
