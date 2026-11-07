const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const c2Start = idx.indexOf('id="template-stretch-card"');
console.log(idx.substring(c2Start - 40, c2Start + 900));

