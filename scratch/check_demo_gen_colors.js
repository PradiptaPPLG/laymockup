const fs = require('fs');

const gen = fs.readFileSync('js/demo-generator.js', 'utf8');

function findOccurrences(regex, label) {
  let match;
  console.log(`=== Matches in demo-generator.js for ${label} ===`);
  while ((match = regex.exec(gen)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(gen.length, match.index + 60);
    console.log(`Line ~${gen.substring(0, match.index).split('\n').length}:`, gen.substring(start, end).replace(/\n/g, ' '));
  }
}

findOccurrences(/#10b981/g, '#10b981');
findOccurrences(/#d2ff00/g, '#d2ff00');

