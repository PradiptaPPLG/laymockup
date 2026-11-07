const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const sIdx = idx.indexOf('specs-grid');
console.log(idx.substring(sIdx - 50, sIdx + 700));

