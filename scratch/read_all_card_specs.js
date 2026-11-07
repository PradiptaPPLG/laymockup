const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const regex = /<article class="etalase-card[\s\S]*?<div class="specs-grid">([\s\S]*?)<\/div>/g;
let m;
let cardNum = 1;
while ((m = regex.exec(idx)) !== null) {
  console.log(`=== Card ${cardNum++} Specs ===`);
  const items = m[1].match(/<div class="spec-item">([\s\S]*?)<\/div>/g);
  if (items) {
    items.forEach(item => {
      const key = (item.match(/<span class="spec-key">([\s\S]*?)<\/span>/) || [])[1];
      const val = (item.match(/<span class="spec-val">([\s\S]*?)<\/span>/) || [])[1];
      console.log(`  ${key ? key.trim() : '?'}: ${val ? val.trim() : '?'}`);
    });
  }
}

