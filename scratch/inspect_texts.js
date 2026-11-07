const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.match(/6\s*(template|pilihan|formasi|layout)/i) || l.includes('6 Template') || l.includes('6 Formasi')) {
    console.log(i + 1, l);
  }
});

