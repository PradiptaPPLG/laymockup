const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const bIdx = idx.indexOf('.brand-badge');
console.log(idx.substring(bIdx, bIdx + 400));

