const fs = require('fs');
const content = fs.readFileSync('studio-mobile-7.html', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('btn-theme-light') || l.includes('btn-theme-dark') || l.includes('body.dark-mode') || l.includes('.dark-mode')) {
    console.log(i + 1, l);
  }
});

