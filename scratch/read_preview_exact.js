const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const start = idx.indexOf('function drawMiniIsometricPreview');
const end = idx.indexOf('window.addEventListener(\'load\'', start);
console.log(idx.substring(start, end));

