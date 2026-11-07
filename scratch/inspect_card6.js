const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const etalaseMatch = content.match(/<section id="etalase"[\s\S]*?<\/section>/);
const cards = etalaseMatch[0].match(/<article class="etalase-card[\s\S]*?<\/article>/g);
console.log('--- CARD 6 (mobile-7) ---');
console.log(cards[5]);

