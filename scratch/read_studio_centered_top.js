const fs = require('fs');
const content = fs.readFileSync('studio-centered.html', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(515, 570).join('\n'));

