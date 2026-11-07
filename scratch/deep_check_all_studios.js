const fs = require('fs');

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

let totalIssues = 0;

studios.forEach(filename => {
  console.log(`\n========================================`);
  console.log(`Deep Inspecting: ${filename}`);
  console.log(`========================================`);

  const html = fs.readFileSync(filename, 'utf8');

  // 1. Check canvas
  const hasCanvas = html.includes('<canvas id="mockup-canvas"');
  if (!hasCanvas) {
    console.error(`[CRITICAL ERROR] ${filename} is MISSING <canvas id="mockup-canvas">!`);
    totalIssues++;
  } else {
    console.log(`[PASS] <canvas id="mockup-canvas"> exists.`);
  }

  // 2. Collect all IDs in HTML
  const allIds = new Set();
  const idMatches = html.matchAll(/id="([^"]+)"/g);
  for (const m of idMatches) {
    allIds.add(m[1]);
  }

  // 3. Find ALL inline script blocks
  const scriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
  console.log(`Inline script tags found: ${scriptMatches.length}`);

  scriptMatches.forEach((sm, sIdx) => {
    const script = sm[1];
    const gebiMatches = [...script.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
    const uniqueGebi = [...new Set(gebiMatches)];

    uniqueGebi.forEach(id => {
      if (!allIds.has(id)) {
        console.error(`[CRITICAL ERROR] in ${filename} script #${sIdx + 1}: getElementById('${id}') does NOT exist in HTML!`);
        totalIssues++;
      }
    });
  });
});

console.log(`\n========================================`);
console.log(`TOTAL RUNTIME ISSUES DETECTED: ${totalIssues}`);
console.log(`========================================`);
