const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const lines = idx.split('\n');

console.log('--- Scanning all lines with emoji in index.html ---');
lines.forEach((l, i) => {
  if (/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(l)) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});

