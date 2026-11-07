const fs = require('fs');
const vm = require('vm');

const files = [
  'index.html',
  'beranda.html',
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html',
  'studio-7-landscape.html',
  'studio-mobile-7.html',
  'js/demo-generator.js'
];

let allOk = true;

for (const f of files) {
  if (!fs.existsSync(f)) {
    console.error('File not found:', f);
    allOk = false;
    continue;
  }
  const content = fs.readFileSync(f, 'utf8');

  if (f.endsWith('.js')) {
    try {
      new vm.Script(content);
      console.log(`✅ [OK] ${f}`);
    } catch (err) {
      console.error(`❌ [ERR] ${f}:`, err.message);
      allOk = false;
    }
  } else {
    // Extract <script> tags
    const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let scriptIdx = 0;
    let fileOk = true;
    while ((match = scriptRegex.exec(content)) !== null) {
      scriptIdx++;
      const code = match[1];
      try {
        new vm.Script(code);
      } catch (err) {
        console.error(`❌ [ERR in script #${scriptIdx}] ${f}:`, err.message);
        fileOk = false;
        allOk = false;
      }
    }
    if (fileOk) {
      console.log(`✅ [OK] ${f} (${scriptIdx} inline scripts validated)`);
    }
  }
}

if (allOk) {
  console.log('\n🎉 ALL FILES PASSED SYNTAX & INTEGRITY CHECK!');
} else {
  console.error('\n⚠️ SOME FILES HAVE ERRORS!');
  process.exit(1);
}

