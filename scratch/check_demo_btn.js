const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
console.log(mob.substring(33400, 34200));

