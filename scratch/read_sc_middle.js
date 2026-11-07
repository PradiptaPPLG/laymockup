const fs = require('fs');

const sc = fs.readFileSync('studio-centered.html', 'utf8');
const scStyle = sc.match(/<style>([\s\S]*?)<\/style>/)[1];
const lines = scStyle.split('\n');

for (let i = 120; i < 250; i += 20) {
  console.log(`--- Lines ${i} to ${i + 20} ---`);
  console.log(lines.slice(i, i + 20).join('\n'));
}

