const fs = require('fs');

// Check all studio files for recent changes or content
const studios = [
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html',
  'studio-7-landscape.html',
  'studio-mobile-7.html',
  'studio-mobile-1.html',
  'studio-mobile-2.html',
  'studio-mobile-6.html'
];

studios.forEach(s => {
  if (fs.existsSync(s)) {
    const c = fs.readFileSync(s, 'utf8');
    const title = c.match(/<title>(.*?)<\/title>/);
    const hasSidebar = c.includes('sidebar');
    const hasHud = c.includes('hud');
    const hasDemo = c.includes('DemoGenerator');
    const demoGenCode = c.includes('Slot #') || c.includes('Siap Diisi');
    console.log(`${s}: title="${title ? title[1] : ''}", len=${c.length}, sidebar=${hasSidebar}, hud=${hasHud}, demoGen=${demoGenCode}`);
  }
});

