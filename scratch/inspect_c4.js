const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const c4Start = idx.indexOf('id="template-9-stretch-card"');
console.log(idx.substring(c4Start - 40, c4Start + 900));

