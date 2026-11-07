const fs = require('fs');

const studioFiles = [
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html',
  'studio-7-landscape.html',
  'studio-mobile-7.html',
  'studio-mobile-1.html',
  'studio-mobile-2.html',
  'studio-mobile-6.html'
];

studioFiles.forEach(f => {
  if (!fs.existsSync(f)) {
    console.log(`FILE MISSING: ${f}`);
    return;
  }
  const content = fs.readFileSync(f, 'utf8');
  const hasBack = content.includes('href="index.html"');
  const hasExport = content.includes('btn-open-export') || content.includes('Export PNG');
  const hasCanvas = content.includes('mockup-canvas');
  console.log(`${f}: backLink=${hasBack}, export=${hasExport}, canvas=${hasCanvas}`);
});
