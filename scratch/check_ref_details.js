const fs = require('fs');

function checkFile(file) {
  const c = fs.readFileSync(file, 'utf8');
  console.log(`\n=== Checking ${file} ===`);
  console.log('Title:', (c.match(/<title>([\s\S]*?)<\/title>/) || [])[1]);
  console.log('Topbar brand:', (c.match(/<a class="topbar-brand"[\s\S]*?<\/a>/) || [])[0]);
  console.log('Sidebar section titles:', [...c.matchAll(/<div class="section-title">([\s\S]*?)<\/div>/g)].map(m => m[1].trim()));
}

checkFile('refrensi-asset/1-mobile.html');
checkFile('refrensi-asset/2-mobile.html');
checkFile('refrensi-asset/3-3-mobile.html');

