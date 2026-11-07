const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const start = idx.indexOf('// Slab');
console.log(idx.substring(start, start + 1600));

