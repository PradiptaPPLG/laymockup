const fs = require('fs');
const content = fs.readFileSync('refrensi-asset/1-mobile.html', 'utf8');
const bodyStart = content.indexOf('<body>');
const scriptStart = content.indexOf('<script>');
console.log(content.slice(bodyStart + 1500, scriptStart));

