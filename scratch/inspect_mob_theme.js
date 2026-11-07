const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');

console.log('--- Theme buttons in studio-mobile-7.html ---');
const btnIdx = mob.indexOf('btn-theme-');
console.log(mob.substring(btnIdx - 50, btnIdx + 300));

console.log('--- this.theme setup ---');
const themeIdx = mob.indexOf('this.theme =');
console.log(mob.substring(themeIdx - 50, themeIdx + 200));

console.log('--- DemoGenerator call ---');
const genIdx = mob.indexOf('DemoGenerator.generateSet(');
console.log(mob.substring(genIdx - 50, genIdx + 200));

