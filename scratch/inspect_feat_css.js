const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

const featCssIdx = lines.findIndex(l => l.includes('.features-section'));
console.log('--- FEATURES CSS ---');
console.log(lines.slice(featCssIdx, featCssIdx + 80).join('\n'));

