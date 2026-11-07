const fs = require('fs');

const centered = fs.readFileSync('studio-centered.html', 'utf8');
const btnIdx = centered.indexOf('btn-theme-');
console.log(centered.substring(btnIdx - 50, btnIdx + 300));

