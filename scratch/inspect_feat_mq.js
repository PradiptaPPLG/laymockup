const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('.features-grid')) {
    console.log(i + 1, l);
    console.log(lines.slice(i, i + 10).join('\n'));
  }
});

