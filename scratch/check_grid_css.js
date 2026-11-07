const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const gIdx = idx.indexOf('.etalase-grid {');
console.log(idx.substring(gIdx, gIdx + 500));

