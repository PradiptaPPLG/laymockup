const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');
const beranda = fs.readFileSync('beranda.html', 'utf8');

console.log('index.html length:', index.length);
console.log('beranda.html length:', beranda.length);
console.log('index.html === beranda.html:', index === beranda);

const darkPreviewMatches = index.match(/isPhone \? '#090d16'/g);
console.log('dark preview in index.html:', darkPreviewMatches ? darkPreviewMatches.length : 0);

