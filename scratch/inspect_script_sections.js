const fs = require('fs');

function inspectStructure(file) {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n=== Structure of ${file} ===`);
  const scriptStart = content.indexOf('<script>');
  const scriptEnd = content.indexOf('</script>', scriptStart);
  const script = content.substring(scriptStart, scriptEnd);
  
  const comments = [...script.matchAll(/\/\/\s*[-=]{2,}[\s\S]*?\n/g)].map(m => m[0].trim());
  console.log('Major script sections:', comments);
}

inspectStructure('refrensi-asset/1-mobile.html');
inspectStructure('refrensi-asset/2-mobile.html');
inspectStructure('refrensi-asset/3-3-mobile.html');

