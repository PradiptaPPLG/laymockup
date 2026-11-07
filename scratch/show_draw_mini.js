const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
console.log(idx.substring(82996, 90835));

