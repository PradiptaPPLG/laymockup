const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const start = idx.indexOf('ctx.fillStyle = isPhone ? \'#1e293b\'');
console.log(idx.substring(start, start + 800));

