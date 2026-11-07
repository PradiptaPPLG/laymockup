const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');

const themeMatch = mob.match(/this\.theme\s*=\s*'([^']+)'/);
console.log('studio-mobile-7 this.theme:', themeMatch ? themeMatch[1] : 'not found');

const btnIndigo = mob.indexOf('id="btn-theme-indigo" class="btn-pill active"');
const btnLight = mob.indexOf('id="btn-theme-light" class="btn-pill active"');
console.log('btn-theme-indigo active index:', btnIndigo);
console.log('btn-theme-light active index:', btnLight);

const genMatch = mob.match(/DemoGenerator\.generateSet\('([^']+)'/);
console.log('DemoGenerator.generateSet theme:', genMatch ? genMatch[1] : 'not found');

