const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const matches = [...idx.matchAll(/function\s+([a-zA-Z0-9_]+)/g)];
console.log('Functions found:');
for (const m of matches) {
  console.log(m[1], 'at index', m.index);
}

