const fs = require('fs');
const content = fs.readFileSync('studio-centered.html', 'utf8');
const lines = content.split('\n');

const demoIdx = lines.findIndex(l => l.includes('class DemoGenerator'));
console.log(lines.slice(demoIdx + 80, demoIdx + 180).join('\n'));

