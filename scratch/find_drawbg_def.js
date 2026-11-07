const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const defDrawBg = mob.indexOf('drawBackground(ctx, w, h)');
console.log(mob.substring(defDrawBg, defDrawBg + 1500));

