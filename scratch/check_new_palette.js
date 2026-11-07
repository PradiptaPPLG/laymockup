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
  const c = fs.readFileSync(f, 'utf8');
  const m1 = (c.match(/#9BE3DE/gi) || []).length;
  const m2 = (c.match(/#BEEBE9/gi) || []).length;
  const m3 = (c.match(/#FFFDF9/gi) || []).length;
  const m4 = (c.match(/#FFE3ED/gi) || []).length;
  console.log(`${f} -> Mint(#9BE3DE): ${m1}, Ice(#BEEBE9): ${m2}, Ivory(#FFFDF9): ${m3}, Pink(#FFE3ED): ${m4}`);
}

