const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('.etalase-grid') || l.includes('.etalase-title') || l.includes('.specs-grid') || l.includes('.etalase-btn-wrap')) {
    console.log(i + 1, l);
  }
});

