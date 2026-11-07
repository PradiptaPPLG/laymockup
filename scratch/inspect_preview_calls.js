const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
const callIdx = lines.findIndex(l => l.includes("drawMiniIsometricPreview('canvas-centered-preview'"));
console.log(lines.slice(callIdx - 10, callIdx + 30).join('\n'));

