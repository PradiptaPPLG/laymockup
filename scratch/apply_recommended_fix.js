const fs = require('fs');

function applyRecommendedAndCleanEmojis(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // 1. Add CSS for recommended card and badge
  const oldFeaturedCss = `.etalase-card.featured {
      border-color: rgba(155, 227, 222, 0.6);
    }`;

  const newFeaturedCss = `.etalase-card.featured {
      border-color: rgba(155, 227, 222, 0.6);
    }

    .etalase-card.recommended {
      border: 2px solid #0f172a !important;
      box-shadow: 0 8px 30px rgba(15, 23, 42, 0.12);
    }

    .etalase-badge-recommended {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #0f172a;
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.18);
      z-index: 3;
      line-height: 1.2;
    }

    .tag-recommended {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 6px;
      background: #0f172a;
      color: #ffffff;
      line-height: 1.2;
      display: inline-flex;
      align-items: center;
    }`;

  content = content.replace(oldFeaturedCss, newFeaturedCss);

  // 2. Update Card 2 (Template 02: Full-Bleed Stretch - kedua teratas) with class "recommended" and badges
  const oldCard2Head = `<article class="etalase-card" id="template-stretch-card" onclick="window.location.href='studio-stretch.html'">
            <div class="etalase-preview-box">
              <canvas id="canvas-stretch-preview" width="560" height="315"></canvas>
              <div class="etalase-badge-top emerald">`;

  const newCard2Head = `<article class="etalase-card recommended" id="template-stretch-card" onclick="window.location.href='studio-stretch.html'">
            <div class="etalase-preview-box">
              <canvas id="canvas-stretch-preview" width="560" height="315"></canvas>
              <div class="etalase-badge-recommended">REKOMENDASI</div>
              <div class="etalase-badge-top emerald">`;

  if (!content.includes(oldCard2Head)) {
    console.error('oldCard2Head not found in', filename);
    return false;
  }
  content = content.replace(oldCard2Head, newCard2Head);

  // Card 2 meta tag
  const oldCard2Meta = `<div class="etalase-meta">
                <span class="etalase-tag emerald">TEMPLATE 02 · 12 FOTO</span>
              </div>`;

  const newCard2Meta = `<div class="etalase-meta">
                <span class="etalase-tag emerald">TEMPLATE 02 · 12 FOTO</span>
                <span class="tag-recommended">REKOMENDASI</span>
              </div>`;

  if (!content.includes(oldCard2Meta)) {
    console.error('oldCard2Meta not found in', filename);
    return false;
  }
  content = content.replace(oldCard2Meta, newCard2Meta);

  // 3. Clean emojis from Card 2, 4, 6 buttons
  content = content.replace(/Buka Studio 🌸/g, 'Buka Studio');

  // 4. Clean emoji from Card 5 spec
  content = content.replace(
    `<span class="spec-val">✨ Hero Center Floating</span>`,
    `<span class="spec-val">Hero Center Floating</span>`
  );

  // 5. Clean emojis from Top Ribbon
  content = content.replace(
    '<span class="badge-sparkle">🌸 PASTEL EDITION</span>',
    '<span class="badge-sparkle">PASTEL EDITION</span>'
  );

  // 6. Clean emojis from Hero Section
  content = content.replace(
    '🌸 Pastel Studio Edition · Browser-Based 3D Engine · No Figma · No Blender Required',
    'Pastel Studio Edition · Browser-Based 3D Engine · No Figma · No Blender Required'
  );
  content = content.replace(
    '🌸 6 Template Isometrik',
    '6 Template Isometrik'
  );
  content = content.replace(
    '💎 100% Client-Side Private',
    '100% Client-Side Private'
  );
  content = content.replace(
    '⚡ 4K PNG Resolusi Asli',
    '4K PNG Resolusi Asli'
  );
  content = content.replace(
    'Jelajahi 6 Template 💎',
    'Jelajahi 6 Template'
  );
  content = content.replace(
    'Buka Studio Langsung 🌸 &rarr;',
    'Buka Studio Langsung &rarr;'
  );

  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Successfully updated ${filename}`);
  return true;
}

applyRecommendedAndCleanEmojis('index.html');
applyRecommendedAndCleanEmojis('beranda.html');

