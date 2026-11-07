const fs = require('fs');

const gen = fs.readFileSync('js/demo-generator.js', 'utf8');
const lines = gen.split('\n');
console.log('--- Lines 70 to 140 ---');
console.log(lines.slice(70, 140).join('\n'));
console.log('--- Lines 160 to 230 ---');
console.log(lines.slice(160, 230).join('\n'));

