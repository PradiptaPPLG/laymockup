const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const rootStart = idx.indexOf(':root {');
const rootEnd = idx.indexOf('}', rootStart);
console.log('--- :root in index.html ---');
console.log(idx.substring(rootStart, rootEnd + 1));

