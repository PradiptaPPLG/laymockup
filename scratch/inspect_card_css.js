const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const cardCssStart = idx.indexOf('.etalase-card {');
const cardCssEnd = idx.indexOf('/* How It Works Section', cardCssStart);
console.log(idx.substring(cardCssStart, cardCssStart + 1500));

