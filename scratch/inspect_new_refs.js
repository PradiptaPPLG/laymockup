const fs = require('fs');

const files = [
  'refrensi-asset/1-mobile.html',
  'refrensi-asset/2-mobile.html',
  'refrensi-asset/3-3-mobile.html'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    const stats = fs.statSync(f);
    const content = fs.readFileSync(f, 'utf8');
    const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
    console.log(`=== ${f} (${stats.size} bytes) ===`);
    console.log(`Title: ${titleMatch ? titleMatch[1].trim() : 'No title'}`);
    console.log(`Lines: ${content.split('\n').length}`);
  } else {
    console.log(`File not found: ${f}`);
  }
}

