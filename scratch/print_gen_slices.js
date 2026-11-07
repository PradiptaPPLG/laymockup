const fs = require('fs');

const gen = fs.readFileSync('js/demo-generator.js', 'utf8');
const lines = gen.split('\n');
console.log('--- Lines 65 to 145 ---');
console.log(lines.slice(65, 145).join('\n'));
console.log('--- Lines 160 to 260 ---');
console.log(lines.slice(160, 260).join('\n'));

