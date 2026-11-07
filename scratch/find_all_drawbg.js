const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
let idx = 0;
while ((idx = mob.indexOf('drawBackground', idx)) !== -1) {
  console.log('Found at', idx, ':', mob.substring(idx - 20, idx + 80).replace(/\n/g, ' '));
  idx += 14;
}

