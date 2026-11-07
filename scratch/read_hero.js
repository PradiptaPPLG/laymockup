const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const drawHero = mob.indexOf('draw3DSmartphoneHero(');
console.log(mob.substring(drawHero, drawHero + 2000));

