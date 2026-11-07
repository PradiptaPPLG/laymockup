const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const etalaseStart = idx.indexOf('<!-- ETALASE TEMPLATE');
const etalaseEnd = idx.indexOf('<!-- FITUR UNGGULAN', etalaseStart);
console.log(idx.substring(etalaseStart, etalaseStart + 1500));

