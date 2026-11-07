const { execSync } = require('child_process');
const fs = require('fs');

const orig = execSync('git show 13379b6~1:studio-centered.html', { encoding: 'utf8' });
const origStyle = orig.match(/<style>([\s\S]*?)<\/style>/)[1];
const lines = origStyle.split('\n');

console.log('Original lines 90-250:');
console.log(lines.slice(90, 250).join('\n'));

