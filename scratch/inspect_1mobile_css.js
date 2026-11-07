const fs = require('fs');
const content = fs.readFileSync('refrensi-asset/1-mobile.html', 'utf8');
console.log(content.slice(content.indexOf('<style>'), content.indexOf('<style>') + 600));

