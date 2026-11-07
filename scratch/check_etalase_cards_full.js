const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const cards = [...idx.matchAll(/<article class="etalase-card[\s\S]*?<\/article>/g)].map(m => m[0]);
console.log('Total etalase cards:', cards.length);

cards.forEach((card, i) => {
  const title = card.match(/<h3 class="etalase-title">([\s\S]*?)<\/h3>/)[1].trim();
  const canvas = card.match(/<canvas id="([^"]+)"/);
  const link = card.match(/href="([^"]+)"/);
  const onclick = card.match(/onclick="([^"]+)"/);
  const badge = card.match(/class="etalase-badge-top">([\s\S]*?)<\/div>/);

  console.log(`Card ${i + 1}: [${title}]`);
  console.log(`   Canvas ID: ${canvas ? canvas[1] : 'MISSING!'}`);
  console.log(`   Link: ${link ? link[1] : 'MISSING!'}`);
  console.log(`   Onclick: ${onclick ? onclick[1] : 'MISSING!'}`);
  console.log(`   File exists: ${link ? fs.existsSync(link[1]) : false}`);
  console.log(`   Badge: ${badge ? badge[1].replace(/<[^>]+>/g, '').trim() : 'none'}`);
});
