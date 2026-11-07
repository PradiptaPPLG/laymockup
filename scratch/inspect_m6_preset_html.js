const fs = require('fs');

const m6 = fs.readFileSync('studio-mobile-6.html', 'utf8');
const lines = m6.split('\n');

lines.forEach((l, i) => {
  if (l.includes('btn-swap-posters') || l.includes('btn-duplicate-remaining') || l.includes('btn-reset-posters')) {
    console.log(i + 1, l);
    console.log(lines.slice(i - 4, i + 15).join('\n'));
  }
});
