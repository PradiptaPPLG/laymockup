const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

console.log('Testing card alignment CSS rules...');
console.log('etalase-card found:', idx.includes('.etalase-card {'));
console.log('etalase-content found:', idx.includes('.etalase-content {'));
console.log('specs-grid found:', idx.includes('.specs-grid {'));
console.log('etalase-btn-wrap found:', idx.includes('.etalase-btn-wrap {'));

