const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const classRenderer = mob.indexOf('render(');
console.log(mob.substring(classRenderer, classRenderer + 2000));

