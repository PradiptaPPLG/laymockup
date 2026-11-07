const fs = require('fs');
const vm = require('vm');
const path = require('path');

console.log('=== COMPREHENSIVE PROJECT HEALTH CHECK ===\n');

// 1. Check all HTML files
const htmlFiles = [
  'index.html',
  'beranda.html',
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html',
  'studio-7-landscape.html',
  'studio-mobile-7.html',
  'studio-mobile-1.html',
  'studio-mobile-2.html',
  'studio-mobile-6.html'
];

let totalErrors = 0;

htmlFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`[ERROR] File missing: ${file}`);
    totalErrors++;
    return;
  }

  const content = fs.readFileSync(file, 'utf8');
  console.log(`Checking ${file} (${content.length} bytes)...`);

  // Extract inline scripts
  const scriptMatches = content.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi);
  let scriptCount = 0;
  for (const match of scriptMatches) {
    scriptCount++;
    try {
      new vm.Script(match[1]);
    } catch (err) {
      console.error(`[SYNTAX ERROR] in ${file} script #${scriptCount}:`, err.message);
      totalErrors++;
    }
  }
  console.log(`  -> ${scriptCount} inline scripts verified OK.`);
});

// 2. Verify index.html === beranda.html
const idxBuf = fs.readFileSync('index.html');
const berBuf = fs.readFileSync('beranda.html');
if (idxBuf.equals(berBuf)) {
  console.log('\n[PASS] index.html and beranda.html are 100% byte-for-byte identical.');
} else {
  console.error('\n[FAIL] index.html and beranda.html differ!');
  totalErrors++;
}

// 3. Check etalase cards in index.html
const idxContent = fs.readFileSync('index.html', 'utf8');
const etalaseMatch = idxContent.match(/<section id="etalase"[\s\S]*?<\/section>/);
if (etalaseMatch) {
  const cards = etalaseMatch[0].match(/<article class="etalase-card[\s\S]*?<\/article>/g);
  console.log(`\nFound ${cards ? cards.length : 0} templates in #etalase:`);
  if (!cards || cards.length !== 9) {
    console.error(`[ERROR] Expected 9 cards, found ${cards ? cards.length : 0}`);
    totalErrors++;
  } else {
    cards.forEach((c, i) => {
      const titleMatch = c.match(/<h3 class="etalase-title">([\s\S]*?)<\/h3>/);
      const title = titleMatch ? titleMatch[1].trim() : 'UNKNOWN';
      const linkMatch = c.match(/href="([^"]+)"/);
      const link = linkMatch ? linkMatch[1] : 'NONE';
      const fileExists = fs.existsSync(link);
      const btnText = c.match(/<div class="etalase-btn-wrap">[\s\S]*?<\/div>/);
      const hasEmoji = /[\u{1F300}-\u{1FAFF}]/u.test(btnText ? btnText[0] : '');

      console.log(`  Card ${i + 1}: [${title}] -> ${link} (exists: ${fileExists}, emojiInBtn: ${hasEmoji})`);
      if (!fileExists) {
        console.error(`[ERROR] Link target does not exist: ${link}`);
        totalErrors++;
      }
      if (hasEmoji) {
        console.error(`[ERROR] Emoji found in button: ${btnText[0]}`);
        totalErrors++;
      }
    });
  }
}

// 4. Check CSS alignment rules
const cssChecks = [
  { name: '.etalase-title min-height', regex: /\.etalase-title\s*\{[^}]*min-height:\s*54px/ },
  { name: '.specs-grid min-height', regex: /\.specs-grid\s*\{[^}]*min-height:\s*140px/ },
  { name: '.etalase-btn-wrap margin-top: auto', regex: /\.etalase-btn-wrap\s*\{[^}]*margin-top:\s*auto/ },
  { name: '.etalase-btn-wrap .btn height', regex: /\.etalase-btn-wrap\s+\.btn\s*\{[^}]*height:\s*46px/ }
];

console.log('\nChecking CSS alignment rules in index.html:');
cssChecks.forEach(chk => {
  const passed = chk.regex.test(idxContent);
  console.log(`  ${chk.name}: ${passed ? 'PASS' : 'FAIL'}`);
  if (!passed) totalErrors++;
});

console.log(`\n========================================`);
console.log(`TOTAL ERRORS FOUND: ${totalErrors}`);
console.log(`HEALTH CHECK STATUS: ${totalErrors === 0 ? 'SUCCESS ALL SYSTEMS GO' : 'NEEDS FIXING'}`);
console.log(`========================================`);
