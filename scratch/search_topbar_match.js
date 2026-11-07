const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('Reference Light') || content.includes('3D Mockup Studio')) {
    console.log(`Match in ${f}:`);
    const lines = content.split('\n');
    lines.forEach((l, i) => {
      if (l.includes('3D Mockup Studio') || l.includes('Reference Light')) {
        console.log(`  Line ${i + 1}: ${l.trim()}`);
      }
    });
  }
});

