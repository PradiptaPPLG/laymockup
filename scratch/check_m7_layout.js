const fs = require('fs');

const m7 = fs.readFileSync('studio-mobile-7.html', 'utf8');

const aside = m7.match(/<aside[\s\S]*?>/);
console.log('aside tag:', aside ? aside[0] : 'None');

const main = m7.match(/<main[\s\S]*?>/);
console.log('main tag:', main ? main[0] : 'None');

const hud = m7.match(/class="[^"]*hud[^"]*"/g);
console.log('hud classes:', hud);

const bottom = m7.match(/class="[^"]*bottom[^"]*"/g);
console.log('bottom classes:', bottom);

