const fs = require('fs');

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
  const c = fs.readFileSync(s, 'utf8');
  const styleBlock = c.match(/<style>([\s\S]*?)<\/style>/);
  if (!styleBlock) {
    console.log(`${s}: NO STYLE BLOCK!`);
    return;
  }
  const css = styleBlock[1];
  const hasViewport = css.includes('.canvas-viewport');
  const hasSidebar = css.includes('.sidebar {') || css.includes('\n    .sidebar {');
  const hasHud = css.includes('.hud-status');
  const hasDropzone = css.includes('.dropzone');
  const hasBtnPrimary = css.includes('.btn-primary');

  console.log(`${s}: viewport=${hasViewport}, sidebar=${hasSidebar}, hud=${hasHud}, dropzone=${hasDropzone}, btnPrimary=${hasBtnPrimary}`);
});

