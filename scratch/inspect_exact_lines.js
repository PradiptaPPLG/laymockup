const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const lines = idx.split('\n');
console.log('--- L405-420 ---');
console.log(lines.slice(404, 420).join('\n'));
console.log('--- L520-530 ---');
console.log(lines.slice(519, 530).join('\n'));
console.log('--- L630-640 ---');
console.log(lines.slice(629, 640).join('\n'));
console.log('--- L1840-1850 ---');
console.log(lines.slice(1839, 1850).join('\n'));
console.log('--- L1925-1935 ---');
console.log(lines.slice(1924, 1935).join('\n'));

const s = fs.readFileSync('studio-centered.html', 'utf8');
const slines = s.split('\n');
console.log('--- studio-centered L1055-1065 ---');
console.log(slines.slice(1054, 1065).join('\n'));

