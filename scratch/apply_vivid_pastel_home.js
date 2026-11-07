const fs = require('fs');

function applyVividPastelHome(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // 1. Top Ribbon CSS
  const oldRibbonCss = `.top-ribbon {
      background: #090d16;
      color: #e2e8f0;
      border-bottom: 1px solid rgba(155, 227, 222, 0.25);
      padding: 7px 16px;
      font-size: 11.5px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      letter-spacing: 0.01em;
    }`;

  const newRibbonCss = `.top-ribbon {
      background: linear-gradient(90deg, #FFE3ED 0%, #FFFDF9 50%, #BEEBE9 100%);
      color: #0f172a;
      border-bottom: 1.5px solid #FFB8D2;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      letter-spacing: 0.01em;
    }`;

  content = content.replace(oldRibbonCss, newRibbonCss);

  // Top Ribbon Badges
  content = content.replace(
    /\.top-ribbon \.badge-sparkle\s*\{[\s\S]*?padding:\s*2px 7px;[\s\S]*?\}/,
    `.top-ribbon .badge-sparkle {
      background: #9BE3DE;
      color: #044343;
      border: 1px solid #7cd1cb;
      padding: 3px 9px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.03em;
    }`
  );

  // Top Ribbon HTML
  content = content.replace(
    /<span class="badge-sparkle">BARU<\/span>\s*<span><strong>LayMockup × PixelCam<\/strong> · Studio 3D Isometric Mockup Multi-Template<\/span>/,
    '<span class="badge-sparkle">🌸 PASTEL EDITION</span><span><strong>LayMockup × PixelCam</strong> · 6 Studio 3D Isometrik Siap Pakai</span>'
  );

  // 2. Brand Badge in Navbar
  content = content.replace(
    /\.brand-badge\s*\{[\s\S]*?background:\s*#f3f4f6;[\s\S]*?color:\s*#4b5563;[\s\S]*?\}/,
    `.brand-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      background: #FFE3ED;
      color: #9d174d;
      border-radius: 8px;
      border: 1.5px solid #FFB8D2;
    }`
  );

  // 3. Hero Pill
  content = content.replace(
    /\.hero-pill\s*\{[\s\S]*?background:\s*#ffffff;[\s\S]*?border:\s*1px solid var\(--border-color\);[\s\S]*?\}/,
    `.hero-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 7px 18px;
      border-radius: var(--radius-full);
      background: #FFE3ED;
      border: 1.5px solid #FFB8D2;
      font-size: 12.5px;
      font-weight: 700;
      color: #9d174d;
      box-shadow: 0 4px 14px rgba(255, 184, 210, 0.4);
      margin: 0 auto 22px auto;
      max-width: calc(100% - 24px);
      line-height: 1.4;
      text-align: center;
      word-break: break-word;
      box-sizing: border-box;
    }`
  );

  // 4. Hero Gradient Text
  content = content.replace(
    /background: linear-gradient\(135deg, #0d7973 0%, #14b8a6 30%, #9BE3DE 60%, #ec4899 90%, #FFE3ED 100%\);/,
    'background: linear-gradient(135deg, #0f766e 0%, #0d9488 22%, #9BE3DE 38%, #ec4899 65%, #f43f5e 85%, #FFE3ED 100%);'
  );

  // 5. Section Overline
  content = content.replace(
    /\.section-overline\s*\{[\s\S]*?color:\s*var\(--fg-muted\);[\s\S]*?\}/,
    `.section-overline {
      display: inline-block;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #9d174d;
      margin-bottom: 8px;
      text-transform: uppercase;
      background: #FFE3ED;
      border: 1px solid #FFB8D2;
      padding: 4px 12px;
      border-radius: 999px;
    }`
  );

  // 6. Etalase Card 2, 4, 6 button & badge styling
  // Replace Template 2 button with pink
  const oldT2Btn = `<div class="etalase-btn-wrap">
                <a href="studio-stretch.html" class="btn btn-primary" title="Buka Template Full-Bleed Stretch">
                  Buka Studio
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>`;

  const newT2Btn = `<div class="etalase-btn-wrap">
                <a href="studio-stretch.html" class="btn" style="background:#FFE3ED; color:#9d174d; font-weight:700; border:1.5px solid #FFB8D2; box-shadow:0 4px 14px rgba(255,184,210,0.4);" title="Buka Template Full-Bleed Stretch">
                  Buka Studio 🌸
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>`;

  content = content.replace(oldT2Btn, newT2Btn);

  // Replace Template 4 button with pink
  const oldT4Btn = `<div class="etalase-btn-wrap">
                <a href="studio-9-stretch.html" class="btn btn-primary" title="Buka Template 9 Stretch">
                  Buka Studio
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>`;

  const newT4Btn = `<div class="etalase-btn-wrap">
                <a href="studio-9-stretch.html" class="btn" style="background:#FFE3ED; color:#9d174d; font-weight:700; border:1.5px solid #FFB8D2; box-shadow:0 4px 14px rgba(255,184,210,0.4);" title="Buka Template 9 Stretch">
                  Buka Studio 🌸
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>`;

  content = content.replace(oldT4Btn, newT4Btn);

  // Replace Template 6 button with pink
  const oldT6Btn = `<div class="etalase-btn-wrap">
                <a href="studio-mobile-7.html" class="btn btn-primary" title="Buka Template 2-3-2 Mobile Phone">
                  Buka Studio
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>`;

  const newT6Btn = `<div class="etalase-btn-wrap">
                <a href="studio-mobile-7.html" class="btn" style="background:#FFE3ED; color:#9d174d; font-weight:700; border:1.5px solid #FFB8D2; box-shadow:0 4px 14px rgba(255,184,210,0.4);" title="Buka Template 2-3-2 Mobile Phone">
                  Buka Studio 🌸
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>`;

  content = content.replace(oldT6Btn, newT6Btn);

  // Replace Template 3 button with Ice Cyan
  const oldT3Btn = `<div class="etalase-btn-wrap">
                <a href="studio-9-zoomout.html" class="btn btn-primary" title="Buka Template 9 Zoom-Out">
                  Buka Studio
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>`;

  const newT3Btn = `<div class="etalase-btn-wrap">
                <a href="studio-9-zoomout.html" class="btn" style="background:#BEEBE9; color:#0f3b42; font-weight:700; border:1.5px solid #9BE3DE; box-shadow:0 4px 14px rgba(190,235,233,0.45);" title="Buka Template 9 Zoom-Out">
                  Buka Studio ❄️
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>`;

  content = content.replace(oldT3Btn, newT3Btn);

  // 7. Replace drawMiniIsometricPreview function with colorful pastel version
  const oldFuncStart = content.indexOf('function drawMiniIsometricPreview');
  const oldFuncEnd = content.indexOf('document.addEventListener(\'DOMContentLoaded\'', oldFuncStart);

  if (oldFuncStart === -1 || oldFuncEnd === -1) {
    console.error('drawMiniIsometricPreview not found in', filename);
    return false;
  }

  const newFunc = `function drawMiniIsometricPreview(canvasId, type) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      // 1. Background Kanvas Pastel Estetik (Warm Ivory -> Sakura Rose -> Ice Mint -> Pastel Pink)
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#FFFDF9');
      grad.addColorStop(0.35, '#FFF0F5');
      grad.addColorStop(0.7, '#EBF9F8');
      grad.addColorStop(1, '#FFE8F0');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Grid dekoratif halus bernuansa pastel rose pink
      ctx.strokeStyle = 'rgba(255, 184, 210, 0.35)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 22) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 22) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // 2. Transformasi Isometrik
      const rad = (-32 * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const sy = 0.86;

      let zoomFactor = 0.88;
      let gapX = 40, gapY = 40;
      let layout = [];
      let isPhone = false;
      let cardW = 920;
      let cardH = 580;

      if (type === 'centered' || type === false) {
        zoomFactor = 0.88;
        gapX = 40; gapY = 40;
        layout = [
          { col: -0.5, row: -2 },
          { col: -1.5, row: -1 }, { col: -0.5, row: -1 }, { col: 0.5, row: -1 },
          { col: -1.5, row: 0 }, { col: -0.5, row: 0, focal: true }, { col: 0.5, row: 0, focal: true }, { col: 1.5, row: 0 },
          { col: -0.5, row: 1 }, { col: 0.5, row: 1 }, { col: 1.5, row: 1 },
          { col: 0.5, row: 2 }
        ];
      } else if (type === 'stretch' || type === true) {
        zoomFactor = 1.18;
        gapX = 36; gapY = 36;
        layout = [
          { col: -0.5, row: -2 },
          { col: -1.5, row: -1 }, { col: -0.5, row: -1 }, { col: 0.5, row: -1 },
          { col: -1.5, row: 0 }, { col: -0.5, row: 0, focal: true }, { col: 0.5, row: 0, focal: true }, { col: 1.5, row: 0 },
          { col: -0.5, row: 1 }, { col: 0.5, row: 1 }, { col: 1.5, row: 1 },
          { col: 0.5, row: 2 }
        ];
      } else if (type === '9-zoomout') {
        zoomFactor = 0.82;
        gapX = 40; gapY = 40;
        layout = [
          { col: 0, row: -2 },
          { col: -1, row: -1 }, { col: 0, row: -1 },
          { col: -1, row: 0 }, { col: 0, row: 0, focal: true }, { col: 1, row: 0, focal: true },
          { col: 0, row: 1 }, { col: 1, row: 1 },
          { col: 0, row: 2 }
        ];
      } else if (type === '9-stretch') {
        zoomFactor = 1.32;
        gapX = 36; gapY = 36;
        layout = [
          { col: 0, row: -2 },
          { col: -1, row: -1 }, { col: 0, row: -1 },
          { col: -1, row: 0 }, { col: 0, row: 0, focal: true }, { col: 1, row: 0, focal: true },
          { col: 0, row: 1 }, { col: 1, row: 1 },
          { col: 0, row: 2 }
        ];
      } else if (type === '7-landscape') {
        zoomFactor = 1.08;
        gapX = 38; gapY = 38;
        layout = [
          { col: -1, row: -0.5 }, { col: 0, row: -1 },
          { col: -1, row: 0.5 }, { col: 0, row: 0, focal: true }, { col: 1, row: -0.5 },
          { col: 0, row: 1 }, { col: 1, row: 0.5 }
        ];
      } else if (type === 'mobile-7') {
        zoomFactor = 1.14;
        gapX = 42; gapY = 42;
        isPhone = true;
        cardW = 540;
        cardH = 1100;
        layout = [
          { col: -1, row: -0.52 }, { col: -1, row: 0.48 },
          { col: 0, row: -1.0 }, { col: 0, row: 0, focal: true }, { col: 0, row: 1.0 },
          { col: 1, row: -0.62 }, { col: 1, row: 0.38 }
        ];
      }

      const S = (w / 2752) * zoomFactor;
      const ux = cos * S;
      const uy = sin * sy * S;
      const vx = -sin * S;
      const vy = cos * sy * S;

      const originX = w * 0.5;
      const originY = h * 0.5;

      const stepX = cardW + gapX;
      const stepY = cardH + gapY;

      const cards = layout.map((item, idx) => {
        const px = item.col * stepX;
        const py = item.row * stepY;
        const sx = originX + px * ux + py * vx;
        const sy_ = originY + px * uy + py * vy;
        return { ...item, px, py, sx, sy_, originalIdx: idx };
      });

      cards.sort((a, b) => a.sy_ - b.sy_);

      ctx.save();
      ctx.setTransform(ux, uy, vx, vy, originX, originY);

      // Warna pastel bergantian untuk kartu non-focal: Pink (#FFE3ED), Mint (#9BE3DE), Ice (#BEEBE9)
      const pastelHeaders = ['#FFE3ED', '#9BE3DE', '#BEEBE9', '#FFE3ED', '#9BE3DE', '#BEEBE9'];

      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        const x = c.px - cardW / 2;
        const y = c.py - cardH / 2;
        const radius = isPhone ? 42 : 22;

        // Shadow lembut berbayang pastel
        ctx.fillStyle = 'rgba(255, 184, 210, 0.28)';
        ctx.beginPath();
        ctx.roundRect(x + 14, y + 18, cardW, cardH, radius);
        ctx.fill();

        // Slab (Alas 3D bernuansa pastel hangat)
        ctx.fillStyle = c.focal ? '#FFB8D2' : '#ecdcd8';
        ctx.beginPath();
        ctx.roundRect(x, y + (isPhone ? 8 : 6), cardW, cardH, radius);
        ctx.fill();

        // Surface (Putih gading bersih)
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.roundRect(x, y, cardW, cardH, radius);
        ctx.fill();

        if (c.focal) {
          // ===============================
          // FOCAL CENTERPIECE: PINK & MINT
          // ===============================
          // Header Bar: Sakura Pink (#FFE3ED) dengan Top Accent Bar (#FFB8D2)
          ctx.fillStyle = '#FFE3ED';
          ctx.beginPath();
          if (isPhone) {
            ctx.roundRect(x + 24, y + 24, cardW - 48, 160, 24);
          } else {
            ctx.roundRect(x + 28, y + 28, cardW - 56, 92, 12);
          }
          ctx.fill();

          // Sub-bar pill: Mint Aqua (#9BE3DE)
          ctx.fillStyle = '#9BE3DE';
          ctx.beginPath();
          if (isPhone) {
            ctx.roundRect(x + 44, y + 54, 180, 36, 12);
            // Hero Dropzone Box bernuansa Sakura Pink
            ctx.fillStyle = 'rgba(255, 227, 237, 0.45)';
            ctx.roundRect(x + 28, y + 220, cardW - 56, 320, 20);
          } else {
            ctx.roundRect(x + 50, y + 50, 160, 28, 8);
            // Hero Dropzone Box bernuansa Sakura Pink
            ctx.fillStyle = 'rgba(255, 227, 237, 0.45)';
            ctx.roundRect(x + 28, y + 144, cardW - 56, 210, 14);
          }
          ctx.fill();

          // Garis aksen mint di dalam hero dropzone
          ctx.fillStyle = '#9BE3DE';
          ctx.beginPath();
          if (isPhone) {
            ctx.roundRect(x + 54, y + 280, 220, 24, 8);
            ctx.fillStyle = '#BEEBE9';
            ctx.roundRect(x + 54, y + 330, 320, 16, 6);
          } else {
            ctx.roundRect(x + 54, y + 180, 220, 20, 6);
            ctx.fillStyle = '#BEEBE9';
            ctx.roundRect(x + 54, y + 220, 360, 14, 5);
          }
          ctx.fill();

          // Glow Border Sakura Pink pada Kartu Fokus Utama
          ctx.strokeStyle = '#FF8EB2';
          ctx.lineWidth = 4.5;
          ctx.beginPath();
          ctx.roundRect(x, y, cardW, cardH, radius);
          ctx.stroke();

        } else {
          // ===============================
          // NON-FOCAL CARDS: PASTEL RAINBOW
          // Alternating Pink (#FFE3ED), Mint (#9BE3DE), Ice Cyan (#BEEBE9)
          // ===============================
          const cardHeaderColor = pastelHeaders[c.originalIdx % pastelHeaders.length];
          ctx.fillStyle = cardHeaderColor;
          ctx.beginPath();
          if (isPhone) {
            ctx.roundRect(x + 24, y + 24, cardW - 48, 80, 16);
            ctx.fillStyle = '#f1f7f6';
            ctx.roundRect(x + 24, y + 130, 240, 24, 6);
            ctx.roundRect(x + 24, y + 180, cardW - 48, 140, 12);
          } else {
            ctx.roundRect(x + 28, y + 28, cardW - 56, 46, 8);
            ctx.fillStyle = '#f1f7f6';
            ctx.roundRect(x + 28, y + 96, 200, 20, 6);
            ctx.roundRect(x + 28, y + 136, 420, 14, 4);
          }
          ctx.fill();

          // Garis pembatas kartu
          ctx.strokeStyle = 'rgba(255, 184, 210, 0.4)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.roundRect(x, y, cardW, cardH, radius);
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    `;

  content = content.substring(0, oldFuncStart) + newFunc + content.substring(oldFuncEnd);

  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Updated ${filename} successfully`);
  return true;
}

applyVividPastelHome('index.html');
applyVividPastelHome('beranda.html');

