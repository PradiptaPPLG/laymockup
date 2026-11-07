const fs = require('fs');
const content = fs.readFileSync('refrensi-asset/3-3-mobile.html', 'utf8');
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/)[1];
const lines = scriptMatch.split('\n');
console.log(lines.slice(380, 450).join('\n'));

