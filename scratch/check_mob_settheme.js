const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const themeFuncIdx = mob.indexOf('setTheme(');
console.log(mob.substring(themeFuncIdx - 50, themeFuncIdx + 700));

