const fs = require('fs');

const orig3 = fs.readFileSync('refrensi-asset/3-3-mobile.html', 'utf8');
const lines = orig3.split('\n');

lines.forEach((l, i) => {
  if (l.includes('btn-') && (l.includes('reset') || l.includes('clear') || l.includes('swap') || l.includes('poster'))) {
    console.log(i + 1, l.trim());
  }
});
