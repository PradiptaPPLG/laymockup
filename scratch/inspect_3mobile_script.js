const fs = require('fs');
const content = fs.readFileSync('refrensi-asset/3-3-mobile.html', 'utf8');

const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/)[1];
const lines = scriptMatch.split('\n');

// Find where slotsData is defined
lines.forEach((l, i) => {
  if (l.includes('slotsData') || l.includes('ReferencePosterGenerator') || l.includes('btn-preset')) {
    if (i < 200 || i > lines.length - 200) {
      console.log(i + 1, l);
    }
  }
});

