const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

// Let's inspect Card 1, Card 2, Card 3 HTML around etalase-meta and etalase-preview-box
const c1Idx = idx.indexOf('id="template-centered-card"');
console.log('--- Card 1 Snippet ---');
console.log(idx.substring(c1Idx, c1Idx + 700));

const c2Idx = idx.indexOf('id="template-stretch-card"');
console.log('--- Card 2 Snippet ---');
console.log(idx.substring(c2Idx, c2Idx + 700));

