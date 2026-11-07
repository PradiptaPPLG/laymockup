const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const classIdx = mob.indexOf('class ');
console.log(mob.substring(classIdx, classIdx + 1500));

