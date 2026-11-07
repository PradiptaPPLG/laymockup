const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const drawIdx = mob.indexOf('draw(items) {');
console.log(mob.substring(drawIdx, drawIdx + 1200));

