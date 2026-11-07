const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const regex = /<article class="etalase-card[\s\S]*?<\/article>/g;
const cards = idx.match(regex);

cards.forEach((c, i) => {
  console.log(`\n================ CARD ${i+1} ================`);
  const title = (c.match(/<h3 class="etalase-title">([\s\S]*?)<\/h3>/) || [])[1];
  console.log('Title:', title ? title.trim() : '');
  const specs = [...c.matchAll(/<div class="spec-item">\s*<span class="spec-key">([\s\S]*?)<\/span>\s*<span class="spec-val">([\s\S]*?)<\/span>\s*<\/div>/g)];
  specs.forEach(s => {
    console.log(`  [${s[1].trim()}]: ${s[2].trim()}`);
  });
  const btn = (c.match(/<div class="etalase-btn-wrap">([\s\S]*?)<\/div>/) || [])[1];
  console.log('Button:', btn ? btn.replace(/\s+/g, ' ').trim() : '');
});

