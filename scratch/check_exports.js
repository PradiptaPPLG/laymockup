const fs = require('fs');

function checkExport(file) {
  const c = fs.readFileSync(file, 'utf8');
  console.log(`=== Export in ${file} ===`);
  const modal = c.match(/<div id="export-modal"[\s\S]*?<\/div>\s*<\/div>/);
  console.log('Export modal exists:', !!modal);
  const scriptExport = c.match(/btn-download-png[\s\S]*?\{[\s\S]*?\}/);
  console.log('Download logic:', scriptExport ? scriptExport[0].substring(0, 150).replace(/\n/g, ' ') : 'None');
}

checkExport('refrensi-asset/1-mobile.html');
checkExport('refrensi-asset/2-mobile.html');
checkExport('refrensi-asset/3-3-mobile.html');

