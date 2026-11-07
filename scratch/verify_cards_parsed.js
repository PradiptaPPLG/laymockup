const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const cards = idx.match(/<article class="etalase-card[\s\S]*?<\/article>/g);

cards.forEach((c, i) => {
  const idMatch = c.match(/id="([^"]+)"/);
  const classMatch = c.match(/class="([^"]+)"/);
  const hasBadge = c.includes('class="etalase-badge-recommended"');
  const hasTag = c.includes('class="tag-recommended"');
  console.log(`Card #${i+1} [${idMatch ? idMatch[1] : '?'}] -> class: "${classMatch ? classMatch[1] : '?'}" | hasBadge: ${hasBadge} | hasTag: ${hasTag}`);
});

