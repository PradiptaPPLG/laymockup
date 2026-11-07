const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('.nav-links') && i > 1100) {
    console.log(i + 1, l);
    console.log(lines.slice(i - 2, i + 8).join('\n'));
  }
});

