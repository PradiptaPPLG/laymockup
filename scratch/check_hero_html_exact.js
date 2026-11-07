const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const heroIdx = idx.indexOf('<section class="hero-section">');
console.log(idx.substring(heroIdx, heroIdx + 1100));

