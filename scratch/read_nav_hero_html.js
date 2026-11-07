const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const navStart = idx.indexOf('<header');
const heroEnd = idx.indexOf('<!-- ETALASE TEMPLATE', navStart);
console.log(idx.substring(navStart, heroEnd));

