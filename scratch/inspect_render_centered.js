const fs = require('fs');
const content = fs.readFileSync('studio-centered.html', 'utf8');
const lines = content.split('\n');

const renderIdx = lines.findIndex(l => l.includes('render(') || l.includes('getFormation'));
console.log('--- RENDER IN STUDIO-CENTERED ---');
console.log(lines.slice(renderIdx - 5, renderIdx + 90).join('\n'));

