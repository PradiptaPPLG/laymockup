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
  const rootStart = content.indexOf(':root {');
  const rootEnd = content.indexOf('}', rootStart);
  console.log(`=== ${s} :root ===`);
  console.log(content.substring(rootStart, rootEnd + 1));
}

