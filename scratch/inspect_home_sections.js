const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

// Let's inspect top-ribbon in index.html
const ribbonIdx = idx.indexOf('.top-ribbon');
console.log('--- Top Ribbon CSS ---');
console.log(idx.substring(ribbonIdx, ribbonIdx + 600));

// Let's inspect hero section in index.html
const heroIdx = idx.indexOf('.hero {');
console.log('--- Hero CSS ---');
console.log(idx.substring(heroIdx, heroIdx + 800));

