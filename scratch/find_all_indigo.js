const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
let idx = 0;
while ((idx = mob.indexOf('indigo', idx)) !== -1) {
  console.log('indigo at', idx, ':', mob.substring(idx - 25, idx + 65).replace(/\n/g, ' '));
  idx += 6;
}

