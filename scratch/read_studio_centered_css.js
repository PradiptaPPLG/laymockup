const fs = require('fs');
const content = fs.readFileSync('studio-centered.html', 'utf8');
const lines = content.split('\n');
console.log('--- LINES 110-170 IN studio-centered.html ---');
console.log(lines.slice(110, 170).join('\n'));

