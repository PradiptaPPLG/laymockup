const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const lines = idx.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('#10b981') || line.includes('#d2ff00') || line.includes('#059669') || line.includes('#82cd47') || line.includes('volt') || line.includes('emerald')) {
    console.log(`L${i+1}: ${line.trim()}`);
  }
}

