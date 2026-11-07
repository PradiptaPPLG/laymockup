const fs = require('fs');

const m6 = fs.readFileSync('studio-mobile-6.html', 'utf8');
console.log('Includes btn-reset-wireframe in HTML:', m6.includes('id="btn-reset-wireframe"'));
console.log('Includes fast-actions-grid:', m6.includes('fast-actions-grid'));
