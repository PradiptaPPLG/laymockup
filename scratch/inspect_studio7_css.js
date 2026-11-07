const fs = require('fs');
const content = fs.readFileSync('studio-mobile-7.html', 'utf8');

console.log('CSS block length:', content.indexOf('</style>') - content.indexOf('<style>'));
console.log('Top CSS lines:');
console.log(content.slice(content.indexOf('<style>'), content.indexOf('<style>') + 800));

