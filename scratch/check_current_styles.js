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
  const content = fs.readFileSync(s, 'utf8');
  const style = content.match(/<style>([\s\S]*?)<\/style>/)[1];
  console.log(`${s}: current style length = ${style.length}`);
});

