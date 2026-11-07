const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const lines = idx.split('\n');
lines.forEach((l, i) => {
  if (l.includes('🌸') || l.includes('💎') || l.includes('✨') || l.includes('⚡')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});

