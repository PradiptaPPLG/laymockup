const fs = require('fs');
const content = fs.readFileSync('studio-centered.html', 'utf8');
const lines = content.split('\n');

const demoIdx = lines.findIndex(l => l.includes('LANDSCAPE WIREFRAME CARD'));
console.log(lines.slice(demoIdx, demoIdx + 80).join('\n'));

