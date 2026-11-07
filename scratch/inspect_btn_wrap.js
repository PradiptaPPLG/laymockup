const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const btnWrapStart = idx.indexOf('.etalase-btn-wrap {');
console.log(idx.substring(btnWrapStart, btnWrapStart + 600));

