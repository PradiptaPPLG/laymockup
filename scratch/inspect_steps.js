const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('.steps-grid') || l.includes('steps-section') || l.includes('step-card')) {
    console.log(i + 1, l);
  }
});

