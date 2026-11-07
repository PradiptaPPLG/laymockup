const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const sIdx = idx.indexOf('class="specs-grid"');
console.log(idx.substring(sIdx - 100, sIdx + 600));

