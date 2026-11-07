const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

const navCssIdx = lines.findIndex(l => l.includes('.nav-links {'));
console.log(lines.slice(navCssIdx, navCssIdx + 40).join('\n'));

