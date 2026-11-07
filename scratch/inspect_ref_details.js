const fs = require('fs');

function inspectRef(path) {
  const content = fs.readFileSync(path, 'utf8');
  console.log(`\n================== ${path} ==================`);
  
  // Find slots count or TOTAL_SLOTS
  const slotsMatch = content.match(/TOTAL_SLOTS\s*=\s*(\d+)/i) || content.match(/slots\s*:\s*(\d+)/i);
  console.log('Slots:', slotsMatch ? slotsMatch[0] : 'not found');
  
  // Find classes
  const classes = [...content.matchAll(/class\s+([a-zA-Z0-9_]+)/g)].map(m => m[1]);
  console.log('Classes:', classes);
  
  // Find formation or layout
  const layoutMatches = content.match(/layout\s*=\s*\[[\s\S]*?\];/i) || content.match(/get[a-zA-Z0-9_]*Formation[\s\S]*?\{[\s\S]*?\}/i);
  if (layoutMatches) {
    console.log('Formation snippet:', layoutMatches[0].substring(0, 300).replace(/\n/g, ' '));
  } else {
    // search for col / row
    const colRow = [...content.matchAll(/col\s*:\s*[^,]+,\s*row\s*:\s*[^}]+/g)].map(m => m[0]);
    console.log('Col/Row items:', colRow);
  }
}

inspectRef('refrensi-asset/1-mobile.html');
inspectRef('refrensi-asset/2-mobile.html');
inspectRef('refrensi-asset/3-3-mobile.html');

