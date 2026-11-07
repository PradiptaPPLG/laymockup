const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const etalaseStart = idx.indexOf('<!-- TEMPLATE 1: CENTERED DIAMOND');
const etalaseEnd = idx.indexOf('</section>', etalaseStart);
console.log(idx.substring(etalaseStart, etalaseEnd));

