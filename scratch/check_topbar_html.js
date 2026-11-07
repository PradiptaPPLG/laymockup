const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const topbarHtml = mob.indexOf('class="topbar-center"');
console.log(mob.substring(topbarHtml - 20, topbarHtml + 450));

