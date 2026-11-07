const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const regex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
let m;
const found = new Set();
while ((m = regex.exec(idx)) !== null) {
  found.add(m[0]);
}
console.log('Emojis found in index.html:', [...found]);

