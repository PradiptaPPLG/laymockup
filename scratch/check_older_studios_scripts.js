const fs = require('fs');

const studios = [
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html'
];

studios.forEach(filename => {
  const html = fs.readFileSync(filename, 'utf8');
  const allIds = new Set();
  for (const m of html.matchAll(/id="([^"]+)"/g)) allIds.add(m[1]);

  const scriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
  console.log(`\n${filename}: ${scriptMatches.length} scripts`);
  scriptMatches.forEach((sm, i) => {
    const gebis = [...sm[1].matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
    const missing = gebis.filter(id => !allIds.has(id));
    console.log(`  Script #${i + 1}: ${gebis.length} getElementById calls, missing: ${missing.length ? missing : 'none'}`);
  });
});
