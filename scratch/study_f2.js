const fs = require('fs');

const f2 = fs.readFileSync('refrensi-asset/2-mobile.html', 'utf8');

const drawPhoneIdx = f2.indexOf('draw3DDualPhone(') !== -1 ? f2.indexOf('draw3DDualPhone(') : f2.indexOf('drawPhone(');
if (drawPhoneIdx !== -1) {
  console.log(f2.substring(drawPhoneIdx, drawPhoneIdx + 1200));
} else {
  const rIdx = f2.indexOf('class DualPhoneStudioRenderer');
  console.log(f2.substring(rIdx + 1000, rIdx + 2500));
}

