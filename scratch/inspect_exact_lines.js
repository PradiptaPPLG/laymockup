const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

// Find navbar actions
const naIdx = lines.findIndex(l => l.includes('class="nav-actions"'));
console.log('--- NAV ACTIONS (lines ' + (naIdx+1) + ') ---');
console.log(lines.slice(naIdx - 10, naIdx + 15).join('\n'));

// Find hero actions
const haIdx = lines.findIndex(l => l.includes('class="hero-actions"'));
console.log('--- HERO ACTIONS (lines ' + (haIdx+1) + ') ---');
console.log(lines.slice(haIdx - 5, haIdx + 25).join('\n'));

// Find etalase end & features start
const featIdx = lines.findIndex(l => l.includes('id="features"'));
console.log('--- BEFORE FEATURES (lines ' + (featIdx+1) + ') ---');
console.log(lines.slice(featIdx - 15, featIdx + 10).join('\n'));
