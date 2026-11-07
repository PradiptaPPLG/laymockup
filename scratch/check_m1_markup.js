const fs = require('fs');

const m1 = fs.readFileSync('studio-mobile-1.html', 'utf8');
console.log('Contains mockup-canvas:', m1.includes('mockup-canvas'));
const lines = m1.split('\n');
lines.forEach((l, i) => {
  if (l.includes('mockup-canvas') || l.includes('topbar') || l.includes('main-content')) {
    if (i < 500) console.log(i + 1, l);
  }
});
