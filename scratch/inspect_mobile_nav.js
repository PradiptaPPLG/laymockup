const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
const navIdx = lines.findIndex(l => l.includes('<header class="navbar"'));
console.log(lines.slice(navIdx + 45, navIdx + 120).join('\n'));

