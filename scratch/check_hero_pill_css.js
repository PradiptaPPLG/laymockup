const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const pIdx = idx.indexOf('.hero-pill');
console.log(idx.substring(pIdx, pIdx + 600));

