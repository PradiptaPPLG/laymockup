const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const topbarIdx = mob.indexOf('topbar-center');
console.log(mob.substring(topbarIdx - 20, topbarIdx + 400));

