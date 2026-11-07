const fs = require('fs');
const content = fs.readFileSync('studio-centered.html', 'utf8');
const lines = content.split('\n');

const demoIdx = lines.findIndex(l => l.includes('class DemoGenerator') || l.includes('Siap Diisi'));
console.log('--- DEMOGENERATOR IN STUDIO-CENTERED ---');
console.log(lines.slice(demoIdx - 2, demoIdx + 100).join('\n'));

