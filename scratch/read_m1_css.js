const fs = require('fs');

const m1 = fs.readFileSync('studio-mobile-1.html', 'utf8');
const m1Style = m1.match(/<style>([\s\S]*?)<\/style>/)[1];
const lines = m1Style.split('\n');

console.log('--- Lines 100 to 300 in studio-mobile-1 CSS ---');
console.log(lines.slice(100, 300).join('\n'));

