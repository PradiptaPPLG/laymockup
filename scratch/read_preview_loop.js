const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const pStart = idx.indexOf('function drawMiniIsometricPreview');
const pEnd = idx.indexOf('document.addEventListener(\'DOMContentLoaded\'', pStart);
console.log(idx.substring(pStart, pEnd));

