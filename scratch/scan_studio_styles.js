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
  console.log(`=== ${s} ===`);
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('accent-') || line.includes('#10b981') || line.includes('#d2ff00')) {
      console.log(`  L${i+1}: ${line.trim()}`);
    }
  }
}

