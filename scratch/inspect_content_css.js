const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const contentCssStart = idx.indexOf('.etalase-content {');
console.log(idx.substring(contentCssStart, contentCssStart + 1500));

