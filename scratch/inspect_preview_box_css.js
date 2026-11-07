const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const lines = idx.split('\n');

lines.forEach((l, i) => {
  if (l.includes('.etalase-preview-box') || (l.includes('canvas') && l.includes('.etalase'))) {
    console.log(i + 1, l);
    console.log(lines.slice(i, i + 15).join('\n'));
  }
});
