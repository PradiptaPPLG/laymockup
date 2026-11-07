const fs = require('fs');

const f1 = fs.readFileSync('refrensi-asset/1-mobile.html', 'utf8');
let idx = f1.indexOf('export');
while (idx !== -1) {
  console.log('f1 export at', idx, ':', f1.substring(idx - 10, idx + 80).replace(/\n/g, ' '));
  idx = f1.indexOf('export', idx + 10);
}

