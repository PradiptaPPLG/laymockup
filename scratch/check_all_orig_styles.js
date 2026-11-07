const { execSync } = require('child_process');

const studios = [
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html',
  'studio-7-landscape.html',
  'studio-mobile-7.html'
];

studios.forEach(s => {
  try {
    const orig = execSync(`git show 13379b6~1:${s}`, { encoding: 'utf8' });
    const origStyle = orig.match(/<style>([\s\S]*?)<\/style>/)[1];
    console.log(`${s}: original style length = ${origStyle.length}`);
  } catch (e) {
    console.log(`${s}: error ${e.message}`);
  }
});

