const fs = require('fs');

const files = [
  'index.html',
  'beranda.html',
  'js/demo-generator.js',
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html',
  'studio-7-landscape.html',
  'studio-mobile-7.html'
];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const voltMatches = content.match(/#d2ff00/gi) || [];
  const emeraldMatches = content.match(/#10b981/gi) || [];
  console.log(`${f} -> #10b981 count: ${emeraldMatches.length}, #d2ff00 count: ${voltMatches.length}`);
}

