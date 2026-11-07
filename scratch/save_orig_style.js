const { execSync } = require('child_process');
const fs = require('fs');

const orig = execSync('git show 13379b6~1:studio-centered.html', { encoding: 'utf8' });
const origStyle = orig.match(/<style>([\s\S]*?)<\/style>/)[1];

fs.writeFileSync('scratch/orig_style.css', origStyle);
console.log('Saved orig_style.css, length:', origStyle.length);

