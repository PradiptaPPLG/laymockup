const fs = require('fs');

const f1 = fs.readFileSync('refrensi-asset/1-mobile.html', 'utf8');
const drawPhoneIdx = f1.indexOf('draw3DSinglePhone(');
console.log(f1.substring(drawPhoneIdx, drawPhoneIdx + 2000));

