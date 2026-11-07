const { execSync } = require('child_process');

const diff = execSync('git diff 13379b6~1 13379b6 -- studio-centered.html', { encoding: 'utf8' });
const lines = diff.split('\n');

let outsideStyle = false;
let outsideStyleChanges = [];

lines.forEach(l => {
  if (l.includes('</style>')) outsideStyle = true;
  if (outsideStyle && (l.startsWith('+') || l.startsWith('-')) && !l.startsWith('+++') && !l.startsWith('---')) {
    outsideStyleChanges.push(l);
  }
});

console.log('Changes outside <style> count:', outsideStyleChanges.length);
console.log(outsideStyleChanges.slice(0, 30).join('\n'));

