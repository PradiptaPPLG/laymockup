const fs = require('fs');

const s = fs.readFileSync('studio-centered.html', 'utf8');

function findOccurrences(regex, label) {
  let match;
  console.log(`=== Matches in studio-centered.html for ${label} ===`);
  while ((match = regex.exec(s)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(s.length, match.index + 60);
    console.log(`Line ~${s.substring(0, match.index).split('\n').length}:`, s.substring(start, end).replace(/\n/g, ' '));
  }
}

findOccurrences(/#10b981/g, '#10b981');
findOccurrences(/#d2ff00/g, '#d2ff00');
findOccurrences(/var\(--accent-primary\)/g, 'var(--accent-primary)');
findOccurrences(/var\(--accent-volt\)/g, 'var(--accent-volt)');

