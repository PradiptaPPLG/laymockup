const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

function findOccurrences(regex, label) {
  let match;
  console.log(`=== Matches for ${label} ===`);
  while ((match = regex.exec(idx)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(idx.length, match.index + 60);
    console.log(`Line ~${idx.substring(0, match.index).split('\n').length}:`, idx.substring(start, end).replace(/\n/g, ' '));
  }
}

findOccurrences(/#10b981/g, '#10b981');
findOccurrences(/#d2ff00/g, '#d2ff00');
findOccurrences(/var\(--accent\)/g, 'var(--accent)');
findOccurrences(/var\(--volt\)/g, 'var(--volt)');

