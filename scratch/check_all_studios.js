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
  const theme = content.match(/this\.theme\s*=\s*'([^']+)'/);
  const activeBtn = content.match(/id="(btn-theme-[^"]+)"\s+class="[^"]*active[^"]*"/);
  const gen = content.match(/DemoGenerator\.generateSet\('([^']+)'/);
  console.log(`${s} -> theme: ${theme ? theme[1] : '?'}, activeBtn: ${activeBtn ? activeBtn[1] : '?'}, genTheme: ${gen ? gen[1] : '?'}`);
}

