const fs = require('fs');

const f1 = fs.readFileSync('refrensi-asset/1-mobile.html', 'utf8');

console.log('--- 1-mobile.html details ---');
// Let's check how many script tags, what functions exist
const scripts = [...f1.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Inline scripts count:', scripts.length);

// Let's check how slots are handled
const slotRelated = f1.match(/userImage[\s\S]*?;/g);
console.log('userImage occurrences:', slotRelated);

// Let's check SinglePhoneStudioRenderer methods
const rIdx = f1.indexOf('class SinglePhoneStudioRenderer');
const rEnd = f1.indexOf('</script>', rIdx);
const rCode = f1.substring(rIdx, rEnd);
const methods = [...rCode.matchAll(/([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/g)].map(m => m[1]);
console.log('SinglePhoneStudioRenderer methods:', methods);

