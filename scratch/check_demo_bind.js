const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const bindIdx = mob.indexOf('addEventListener(\'click\'', mob.indexOf('btn-load-indigo-demo'));
console.log(mob.substring(bindIdx - 50, bindIdx + 800));

