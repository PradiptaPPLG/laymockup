const fs = require('fs');
const content = fs.readFileSync('refrensi-asset/1-mobile.html', 'utf8');

// Get HTML body
const bodyStart = content.indexOf('<body>');
const scriptStart = content.indexOf('<script>');
console.log('Body length:', scriptStart - bodyStart);
console.log(content.slice(bodyStart, bodyStart + 1500));

