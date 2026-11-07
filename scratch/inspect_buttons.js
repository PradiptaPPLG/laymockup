const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const etalaseMatch = content.match(/<section id="etalase"[\s\S]*?<\/section>/);
const cards = etalaseMatch[0].match(/<article class="etalase-card[\s\S]*?<\/article>/g);
cards.forEach((c, i) => {
  const btn = c.match(/<div class="etalase-btn-wrap">[\s\S]*?<\/div>/);
  console.log(`Card ${i + 1} button:`, btn ? btn[0].replace(/\s+/g, ' ') : 'none');
});

