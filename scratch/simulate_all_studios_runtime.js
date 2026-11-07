const fs = require('fs');
const vm = require('vm');

const studios = [
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

studios.forEach(filename => {
  console.log(`\n========================================`);
  console.log(`Testing Studio: ${filename}`);
  console.log(`========================================`);

  const html = fs.readFileSync(filename, 'utf8');

  // Find all id="..." in HTML
  const allIds = new Set();
  const idMatches = html.matchAll(/id="([^"]+)"/g);
  for (const m of idMatches) {
    allIds.add(m[1]);
  }
  console.log(`Total DOM IDs in HTML: ${allIds.size}`);

  // Find all getElementById in script
  const scriptMatch = html.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!scriptMatch) {
    console.error(`[ERROR] No inline script in ${filename}!`);
    return;
  }
  const scriptContent = scriptMatch[1];
  const gebiMatches = [...scriptContent.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
  const uniqueGebi = [...new Set(gebiMatches)];
  console.log(`getElementById calls: ${uniqueGebi.length}`);

  let missingIds = [];
  uniqueGebi.forEach(id => {
    if (!allIds.has(id)) {
      missingIds.push(id);
    }
  });

  if (missingIds.length > 0) {
    console.error(`[CRITICAL ERROR] Missing element IDs in HTML for ${filename}:`, missingIds);
  } else {
    console.log(`[PASS] All ${uniqueGebi.length} getElementById targets exist in HTML.`);
  }

  // Also check querySelector / querySelectorAll
  const qsMatches = [...scriptContent.matchAll(/querySelector\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
  console.log(`querySelector calls: ${[...new Set(qsMatches)].join(', ')}`);
});
