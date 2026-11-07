const { execSync } = require('child_process');

const diff = execSync('git diff 13379b6~1 13379b6 -- studio-centered.html', { encoding: 'utf8' });
const lines = diff.split('\n');

const deletedLines = [];
let inDelete = false;

lines.forEach(l => {
  if (l.startsWith('-') && !l.startsWith('---')) {
    deletedLines.push(l.slice(1));
  }
});

console.log('Total deleted lines:', deletedLines.length);
console.log(deletedLines.slice(0, 150).join('\n'));

