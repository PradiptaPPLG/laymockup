const fs = require('fs');

const orig = fs.readFileSync('refrensi-asset/stretch.html', 'utf8');
const origStyle = orig.match(/<style>([\s\S]*?)<\/style>/)[1];

console.log('Original stretch.html CSS length:', origStyle.length);
console.log('Contains .canvas-viewport:', origStyle.includes('.canvas-viewport'));
console.log('Contains .sidebar {:', origStyle.includes('.sidebar {'));
console.log('Contains #mockup-canvas:', origStyle.includes('#mockup-canvas'));

