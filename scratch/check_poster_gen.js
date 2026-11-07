const fs = require('fs');

const f1 = fs.readFileSync('refrensi-asset/1-mobile.html', 'utf8');
const pIdx = f1.indexOf('class ReferencePosterGenerator');
console.log('ReferencePosterGenerator snippet:');
console.log(f1.substring(pIdx, pIdx + 1200));

