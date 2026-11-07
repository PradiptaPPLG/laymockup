const fs = require('fs');

const orig1 = fs.readFileSync('refrensi-asset/1-mobile.html', 'utf8');
const bodyStart = orig1.indexOf('<body>');
console.log(orig1.slice(bodyStart, bodyStart + 1500));
