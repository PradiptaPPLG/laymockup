const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('class="steps-section"') || l.includes('class="steps-grid"') || l.includes('id="steps"') || l.includes('id="how-it-works"')) {
    console.log(i + 1, l);
    console.log(lines.slice(i, i + 20).join('\n'));
  }
});

