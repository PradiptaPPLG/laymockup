const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const etalaseMatch = content.match(/<section id="etalase"[\s\S]*?<\/section>/);
if (etalaseMatch) {
  const cards = etalaseMatch[0].match(/<article class="etalase-card[\s\S]*?<\/article>/g);
  console.log('Total etalase cards:', cards ? cards.length : 0);
  if (cards) {
    cards.forEach((c, i) => {
      const title = c.match(/<h3 class="etalase-title">([\s\S]*?)<\/h3>/);
      const canvas = c.match(/<canvas id="([^"]+)"/);
      const btn = c.match(/href="([^"]+)" class="btn/);
      const tag = c.match(/<span class="etalase-tag">([\s\S]*?)<\/span>/);
      console.log(`Card ${i + 1}: ${title ? title[1].trim() : ''} | Tag: ${tag ? tag[1].trim() : ''} | Canvas: ${canvas ? canvas[1] : ''} | Link: ${btn ? btn[1] : ''}`);
    });
  }
}

