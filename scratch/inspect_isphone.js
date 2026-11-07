const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
const drawIdx = lines.findIndex(l => l.includes('function drawMiniIsometricPreview'));
for (let i = drawIdx; i < drawIdx + 200; i++) {
  if (lines[i] && lines[i].includes('isPhone')) {
    console.log(i + 1, lines[i]);
  }
}

