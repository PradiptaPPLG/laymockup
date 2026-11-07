const fs = require('fs');

const diff = fs.readFileSync('scratch/diff_centered.patch', 'utf8');
const lines = diff.split('\n');
console.log('--- DIFF SAMPLE ---');
console.log(lines.slice(0, 100).join('\n'));

