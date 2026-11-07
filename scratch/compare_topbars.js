const fs = require('fs');

const f1 = fs.readFileSync('refrensi-asset/1-mobile.html', 'utf8');
const topbarMatch = f1.match(/<header class="topbar">[\s\S]*?<\/header>/);
console.log('--- Topbar in 1-mobile.html ---');
console.log(topbarMatch ? topbarMatch[0] : 'None');

const f7 = fs.readFileSync('studio-mobile-7.html', 'utf8');
const topbar7Match = f7.match(/<header class="topbar">[\s\S]*?<\/header>/);
console.log('--- Topbar in studio-mobile-7.html ---');
console.log(topbar7Match ? topbar7Match[0] : 'None');

