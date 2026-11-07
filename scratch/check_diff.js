const fs = require('fs');
const { execSync } = require('child_process');

try {
  const diff = execSync('git diff 13379b6~1 13379b6 -- studio-centered.html', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  fs.writeFileSync('scratch/diff_centered.patch', diff.slice(0, 50000));
  console.log('Diff length:', diff.length);
  console.log('Saved first 50k chars of diff');
} catch (e) {
  console.error(e.message);
}

