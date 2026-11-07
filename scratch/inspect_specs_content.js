const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const regex = /<h3 class="etalase-title">([\s\S]*?)<\/h3>[\s\S]*?<div class="specs-grid">([\s\S]*?)<\/div>/g;
let m;
while ((m = regex.exec(idx)) !== null) {
  console.log('--- Title:', m[1].trim());
  const specs = m[2].match(/<span class="spec-val">([\s\S]*?)<\/span>/g);
  if (specs) {
    console.log('Specs:', specs.map(s => s.replace(/<[^>]+>/g, '').trim()));
  }
}

