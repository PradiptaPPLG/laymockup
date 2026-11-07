const fs = require('fs');

function cleanIndex(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // .btn-primary
  content = content.replace(
    /\.btn-primary\s*\{[\s\S]*?background:\s*#10b981;[\s\S]*?color:\s*#ffffff;[\s\S]*?border:\s*1px solid #10b981;[\s\S]*?\}/,
    `.btn-primary {
      background: #9BE3DE;
      color: #0f172a;
      border: 1px solid #7ed5cf;
      font-weight: 700;
      box-shadow: 0 4px 16px rgba(155, 227, 222, 0.4);
    }`
  );
  content = content.replace(
    /\.btn-primary:hover\s*\{[\s\S]*?background:\s*#059669;[\s\S]*?border-color:\s*#059669;[\s\S]*?\}/,
    `.btn-primary:hover {
      background: #85dfd9;
      border-color: #6fcbc5;
      color: #0f172a;
      box-shadow: 0 8px 24px rgba(155, 227, 222, 0.55);
      transform: translateY(-1px);
    }`
  );

  // .hero-pill-dot
  content = content.replace(
    /background:\s*#d2ff00;\s*box-shadow:\s*0 0 8px rgba\(210, 255, 0, 0\.9\), 0 0 0 2px rgba\(16, 185, 129, 0\.3\);/g,
    'background: #9BE3DE;\n      box-shadow: 0 0 8px rgba(155, 227, 222, 0.9), 0 0 0 2px rgba(255, 227, 237, 0.5);'
  );

  // etalase-badge-top
  content = content.replace(
    /background:\s*rgba\(9, 13, 22, 0\.88\);\s*backdrop-filter:\s*blur\(8px\);\s*color:\s*#d2ff00;\s*border:\s*1px solid rgba\(210, 255, 0, 0\.35\);/g,
    'background: rgba(9, 13, 22, 0.88);\n      backdrop-filter: blur(8px);\n      color: #FFE3ED;\n      border: 1px solid rgba(255, 227, 237, 0.45);'
  );

  // .laymockup-stroke
  content = content.replace(
    /filter:\s*drop-shadow\(0 0 16px rgba\(210, 255, 0, 0\.45\)\);/g,
    'filter: drop-shadow(0 0 16px rgba(155, 227, 222, 0.65)) drop-shadow(0 0 24px rgba(255, 227, 237, 0.5));'
  );
  content = content.replace(
    /stroke:\s*#d2ff00;\s*stroke-width:\s*4\.5px;/g,
    'stroke: #9BE3DE;\n        stroke-width: 4.5px;'
  );

  // .intro-bar
  content = content.replace(
    /background:\s*#d2ff00;\s*border-radius:\s*999px;\s*box-shadow:\s*0 0 8px rgba\(210, 255, 0, 0\.6\);/g,
    'background: linear-gradient(90deg, #9BE3DE 0%, #BEEBE9 50%, #FFE3ED 100%);\n        border-radius: 999px;\n        box-shadow: 0 0 12px rgba(155, 227, 222, 0.85);'
  );

  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Cleaned ${filename}`);
}

cleanIndex('index.html');
cleanIndex('beranda.html');

// Studios
const studios = [
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html',
  'studio-7-landscape.html',
  'studio-mobile-7.html'
];

for (const s of studios) {
  let sc = fs.readFileSync(s, 'utf8');
  sc = sc.replace(/ctx\.strokeStyle\s*=\s*isFocal\s*\?\s*'#10b981'\s*:\s*\(isDark\s*\?\s*'#334155'\s*:\s*'#cbd5e1'\);/g, "ctx.strokeStyle = isFocal ? '#9BE3DE' : (isDark ? '#334155' : '#cbd5e1');");
  sc = sc.replace(/ctx\.fillStyle\s*=\s*isFocal\s*\?\s*'rgba\(16, 185, 129, 0\.05\)'\s*:\s*\(isDark\s*\?\s*'#0d131f'\s*:\s*'#ffffff'\);/g, "ctx.fillStyle = isFocal ? 'rgba(155, 227, 222, 0.08)' : (isDark ? '#0d131f' : '#ffffff');");
  sc = sc.replace(/ctx\.fillStyle\s*=\s*isFocal && i === 0\s*\?\s*'rgba\(16, 185, 129, 0\.3\)'\s*:\s*\(isDark\s*\?\s*'#334155'\s*:\s*'#e2e8f0'\);/g, "ctx.fillStyle = isFocal && i === 0 ? 'rgba(155, 227, 222, 0.5)' : (isDark ? '#334155' : '#e2e8f0');");
  sc = sc.replace(/--accent-emerald:\s*#10b981;/g, "--accent-mint: #9BE3DE;");
  sc = sc.replace(/--accent-volt:\s*#d2ff00;/g, "--accent-pink: #FFE3ED;");
  fs.writeFileSync(s, sc, 'utf8');
  console.log(`Cleaned ${s}`);
}

