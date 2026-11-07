const fs = require('fs');

const f3 = fs.readFileSync('refrensi-asset/3-3-mobile.html', 'utf8');
const rIdx = f3.indexOf('class VerticalStaggeredRenderer');
console.log(f3.substring(rIdx + 1200, rIdx + 2800));

