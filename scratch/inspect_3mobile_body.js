const fs = require('fs');
const content = fs.readFileSync('refrensi-asset/3-3-mobile.html', 'utf8');
const bodyStart = content.indexOf('<body>');
const scriptStart = content.indexOf('<script>');
console.log('3-3-mobile Body length:', scriptStart - bodyStart);
console.log(content.slice(bodyStart, bodyStart + 1500));

