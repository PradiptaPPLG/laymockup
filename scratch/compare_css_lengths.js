const fs = require('fs');

const m1 = fs.readFileSync('studio-mobile-1.html', 'utf8');
const sc = fs.readFileSync('studio-centered.html', 'utf8');

const m1Style = m1.match(/<style>([\s\S]*?)<\/style>/)[1];
const scStyle = sc.match(/<style>([\s\S]*?)<\/style>/)[1];

console.log('studio-mobile-1 CSS length:', m1Style.length);
console.log('studio-centered CSS length:', scStyle.length);

