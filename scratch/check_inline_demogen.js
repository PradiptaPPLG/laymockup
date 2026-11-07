const fs = require('fs');

const studios = [
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html',
  'studio-7-landscape.html',
  'studio-mobile-7.html'
];

for (const s of studios) {
  const content = fs.readFileSync(s, 'utf8');
  console.log(`${s} has DemoGenerator class inline:`, content.includes('class DemoGenerator'));
}

