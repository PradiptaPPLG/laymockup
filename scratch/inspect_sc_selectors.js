const fs = require('fs');

const sc = fs.readFileSync('studio-centered.html', 'utf8');
const scStyle = sc.match(/<style>([\s\S]*?)<\/style>/)[1];

const lines = scStyle.split('\n');
console.log('Total CSS lines in studio-centered:', lines.length);

// Print all selectors
lines.forEach((l, i) => {
  if (l.includes('{') && !l.includes('@media')) {
    if (i < 40 || i > lines.length - 60) {
      console.log(`Line ${i + 1}: ${l.trim()}`);
    }
  }
});

