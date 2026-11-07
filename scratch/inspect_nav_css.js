const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

const navCssIdx = lines.findIndex(l => l.includes('.navbar {') || l.includes('.nav-inner {'));
console.log('--- NAVBAR CSS ---');
console.log(lines.slice(navCssIdx, navCssIdx + 60).join('\n'));

