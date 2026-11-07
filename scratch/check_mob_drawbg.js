const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const drawBg = mob.indexOf('drawBackground(');
console.log(mob.substring(drawBg, drawBg + 1500));

