const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const classIdx = mob.indexOf('class IsometricMobileRenderer');
console.log('Renderer start index:', classIdx);
console.log(mob.substring(classIdx, classIdx + 6000));

