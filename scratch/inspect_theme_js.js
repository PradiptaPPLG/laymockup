const fs = require('fs');
const content = fs.readFileSync('studio-mobile-7.html', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(1495, 1545).join('\n'));

