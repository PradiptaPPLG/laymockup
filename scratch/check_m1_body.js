const fs = require('fs');

const m1 = fs.readFileSync('studio-mobile-1.html', 'utf8');
const bodyIdx = m1.indexOf('<body>');
const body = m1.slice(bodyIdx);
console.log('In body, includes mockup-canvas:', body.includes('mockup-canvas'));
console.log('In body, includes <canvas:', body.includes('<canvas'));
console.log('Body start lines:');
console.log(body.slice(0, 1500));
