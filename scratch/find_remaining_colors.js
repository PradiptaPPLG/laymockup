const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const lines = idx.split('\n');
lines.forEach((l, i) => {
  if (l.includes('#10b981') || l.includes('#d2ff00')) {
    console.log(`index.html L${i+1}: ${l.trim()}`);
  }
});

const s = fs.readFileSync('studio-centered.html', 'utf8');
const slines = s.split('\n');
slines.forEach((l, i) => {
  if (l.includes('#10b981') || l.includes('#d2ff00')) {
    console.log(`studio-centered.html L${i+1}: ${l.trim()}`);
  }
});

