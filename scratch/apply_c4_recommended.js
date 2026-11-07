const fs = require('fs');

function applyCard4Recommended(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // Replace Card 4 opening tag and preview box
  const oldCard4Head = `<article class="etalase-card featured" id="template-9-stretch-card" onclick="window.location.href='studio-9-stretch.html'">
            <div class="etalase-preview-box">
              <canvas id="canvas-9-stretch-preview" width="560" height="315"></canvas>
              <div class="etalase-badge-top emerald">`;

  const newCard4Head = `<article class="etalase-card recommended" id="template-9-stretch-card" onclick="window.location.href='studio-9-stretch.html'">
            <div class="etalase-preview-box">
              <canvas id="canvas-9-stretch-preview" width="560" height="315"></canvas>
              <div class="etalase-badge-recommended">REKOMENDASI</div>
              <div class="etalase-badge-top emerald">`;

  if (!content.includes(oldCard4Head)) {
    console.error('oldCard4Head not found in', filename);
    return false;
  }
  content = content.replace(oldCard4Head, newCard4Head);

  // Replace Card 4 meta
  const oldCard4Meta = `<div class="etalase-meta">
                <span class="etalase-tag emerald">TEMPLATE 04 · 9 FOTO</span>
              </div>`;

  const newCard4Meta = `<div class="etalase-meta">
                <span class="etalase-tag emerald">TEMPLATE 04 · 9 FOTO</span>
                <span class="tag-recommended">REKOMENDASI</span>
              </div>`;

  if (!content.includes(oldCard4Meta)) {
    console.error('oldCard4Meta not found in', filename);
    return false;
  }
  content = content.replace(oldCard4Meta, newCard4Meta);

  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Updated Card 4 to recommended in ${filename}`);
  return true;
}

applyCard4Recommended('index.html');
applyCard4Recommended('beranda.html');

