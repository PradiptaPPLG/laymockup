const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const lines = idx.split('\n');

const introIdx = lines.findIndex(l => l.includes('initCleanIntro'));
console.log(lines.slice(introIdx, introIdx + 60).join('\n'));
