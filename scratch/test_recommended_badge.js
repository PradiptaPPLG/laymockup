const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

console.log('Testing template-stretch-card placement...');
const pos = idx.indexOf('id="template-stretch-card"');
console.log('Found template-stretch-card at pos:', pos);

