const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

// 1. Check all canvas elements in #etalase
const etalase = content.match(/<section id="etalase"[\s\S]*?<\/section>/)[0];
const canvasMatches = etalase.match(/<canvas id="([^"]+)"/g);
console.log('Canvas elements in #etalase:');
const canvasIdsInHtml = canvasMatches.map(m => m.match(/id="([^"]+)"/)[1]);
console.log(canvasIdsInHtml);

// 2. Check DOMContentLoaded calls in index.html
const dclMatch = content.match(/document\.addEventListener\('DOMContentLoaded', \(\) => \{([\s\S]*?)\}\);/);
console.log('\nDOMContentLoaded calls in index.html:');
console.log(dclMatch ? dclMatch[1].trim() : 'NOT FOUND');

// 3. Check drawMiniIsometricPreview function body
const funcMatch = content.match(/function drawMiniIsometricPreview\(canvasId, type\) \{([\s\S]*?)\n    \}/);
const funcBody = funcMatch ? funcMatch[1] : '';

// Check which types are handled
const typesHandled = [...funcBody.matchAll(/type === '([^']+)'/g)].map(m => m[1]);
console.log('\nTypes handled in drawMiniIsometricPreview:');
console.log(typesHandled);
