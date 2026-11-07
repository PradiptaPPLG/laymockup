const fs = require('fs');

const m7 = fs.readFileSync('studio-mobile-7.html', 'utf8');

console.log('--- studio-mobile-7.html structure overview ---');
console.log('Total length:', m7.length);
console.log('Has topbar:', m7.includes('<header class="topbar">'));
console.log('Has sidebar:', m7.includes('<aside class="sidebar"'));
console.log('Has bottom dock:', m7.includes('bottom-dock'));
console.log('Has slot modal:', m7.includes('slot-modal'));
console.log('Has export modal:', m7.includes('export-modal'));
console.log('Has confetti:', m7.includes('confetti'));

