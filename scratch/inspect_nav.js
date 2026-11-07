const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

const navIdx = lines.findIndex(l => l.includes('<header') || l.includes('class="navbar"'));
console.log('--- NAVBAR ---');
console.log(lines.slice(navIdx, navIdx + 50).join('\n'));

const heroActIdx = lines.findIndex(l => l.includes('hero-actions'));
console.log('--- HERO ACTIONS ---');
console.log(lines.slice(heroActIdx - 5, heroActIdx + 30).join('\n'));

const featIdx = lines.findIndex(l => l.includes('id="features"'));
console.log('--- BEFORE FEATURES ---');
console.log(lines.slice(featIdx - 20, featIdx + 20).join('\n'));

