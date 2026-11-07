const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const classIdx = mob.indexOf('class IsometricMobileRenderer');
const classEnd = mob.indexOf('// --- UI Controller & Event Handlers ---');
const classContent = mob.substring(classIdx, classEnd);

const methods = [...classContent.matchAll(/([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/g)];
console.log('Renderer methods:');
for (const m of methods) {
  console.log(m[1]);
}

