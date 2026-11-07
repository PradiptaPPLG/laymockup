const fs = require('fs');

function inspectUI(file) {
  const c = fs.readFileSync(file, 'utf8');
  console.log(`\n================= UI in ${file} =================`);
  const topbar = c.match(/<div class="topbar-center">[\s\S]*?<\/div>/);
  if (topbar) console.log('Topbar center:', topbar[0].replace(/\s+/g, ' '));
  
  const presets = c.match(/<div class="preset-grid">[\s\S]*?<\/div>/);
  if (presets) console.log('Presets:', presets[0].replace(/\s+/g, ' '));

  const slots = c.match(/TOTAL_SLOTS[\s\S]*?;/);
  console.log('TOTAL_SLOTS:', slots ? slots[0] : 'None');
}

inspectUI('refrensi-asset/1-mobile.html');
inspectUI('refrensi-asset/2-mobile.html');
inspectUI('refrensi-asset/3-3-mobile.html');

