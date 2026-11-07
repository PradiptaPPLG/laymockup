const fs = require('fs');

let src = fs.readFileSync('refrensi-asset/3-3-mobile.html', 'utf8');

// 1. Replace title
src = src.replace(/<title>[\s\S]*?<\/title>/, '<title>6 Layar Vertical 3-Kolom Studio - LayMockup × PixelCam</title>');

// 2. Replace :root styles with pastel palette
const pastelRoot = `:root {
      --bg-primary: #FFFDF9;
      --bg-secondary: #ffffff;
      --bg-canvas: #d7eae6;
      --bg-glass: rgba(255, 253, 249, 0.94);
      --border-glass: #e2edea;
      --accent-primary: #9BE3DE;
      --accent-hover: #7fd6d0;
      --accent-dark: #0f766e;
      --accent-mint: #9BE3DE;
      --accent-pink: #FFE3ED;
      --accent-ice: #BEEBE9;
      --text-main: #0f172a;
      --text-muted: #475569;
      --text-dim: #94a3b8;
      --radius-lg: 16px;
      --radius-md: 10px;
      --shadow-panel: 0 10px 35px -10px rgba(155, 227, 222, 0.25), 0 0 1px rgba(0, 0, 0, 0.08);
    }`;
src = src.replace(/:root\s*\{[\s\S]*?--shadow-panel:[^\}]*?\}/, pastelRoot);

// 3. Update .btn-primary in CSS
src = src.replace(/\.btn-primary\s*\{[\s\S]*?\}/, `.btn-primary {
      background-color: var(--accent-primary);
      color: var(--accent-dark);
      font-weight: 700;
      border: 1.5px solid var(--accent-hover);
      border-radius: var(--radius-md);
      padding: 8px 16px;
      font-size: 13px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 12px rgba(155, 227, 222, 0.35);
    }
    .btn-primary:hover {
      background-color: var(--accent-hover);
      transform: translateY(-1px);
    }`);

// 4. Update brand & back button in topbar
const brandBack = `<div class="brand">
      <a href="index.html" class="nav-back-btn" title="Kembali ke Beranda"
        style="text-decoration:none; display:inline-flex; align-items:center; gap:6px; color:#475569; font-size:12px; font-weight:600; padding:5px 11px; background:#f1f5f9; border-radius:8px; border:1px solid #cbd5e1; margin-right:8px; transition:all 0.2s;">
        <span>←</span> Beranda
      </a>
      <div class="brand-icon">📱</div>
      <div class="brand-title">6 Layar Vertical 3-Kolom</div>
      <span id="theme-badge" class="brand-badge" style="background:#FFE3ED; color:#9d174d; border:1px solid #FFB8D2; font-weight:700;">3-Kolom Staggered</span>
    </div>`;
src = src.replace(/<div class="brand">[\s\S]*?<span id="theme-badge" class="brand-badge">[^<]*<\/span>\s*<\/div>/, brandBack);

// 5. Update topbar center buttons
const centerPills = `<div class="topbar-center">
      <button id="btn-bg-light" class="btn-pill active" title="Background Studio Pastel Mint (Default)">
        <span>🌸 Pastel Light</span>
      </button>
      <button id="btn-bg-lavender" class="btn-pill" title="Background Lavender Halus">
        <span>💜 Soft Lavender BG</span>
      </button>
      <button id="btn-bg-dark" class="btn-pill" title="Background Studio Gelap">
        <span>🌙 Dark Studio BG</span>
      </button>
    </div>`;
src = src.replace(/<div class="topbar-center">[\s\S]*?<\/div>/, centerPills);

// 6. Update drawStudioBackground for light mode
const oldDrawLight = `if (this.bgTheme === 'light') {
          // Gaya Studio Terang Awal (Cool Slate-Grey Bersih)
          const grad = ctx.createLinearGradient(0, 0, width, height);
          grad.addColorStop(0, '#e8edf5');
          grad.addColorStop(0.5, '#dde4ef');
          grad.addColorStop(1, '#cfd8e6');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);`;

const newDrawLight = `if (this.bgTheme === 'light') {
          // Gaya Studio Pastel Light (Mint-Ice-Rose Estetik)
          const grad = ctx.createLinearGradient(0, 0, width, height);
          grad.addColorStop(0, '#e8f7f5');
          grad.addColorStop(0.5, '#dcf2ef');
          grad.addColorStop(1, '#cfe8e4');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);`;

if (src.includes(oldDrawLight)) {
  src = src.replace(oldDrawLight, newDrawLight);
}

// 7. Insert DemoGenerator class right before ReferencePosterGenerator
const demoGenClass = `    /**
     * DemoGenerator - Wireframe Skeleton Generator (Kotak Putih Abu Bersih)
     */
    class DemoGenerator {
      static generateSet(theme = 'light', isMobile = true, count = 6) {
        const cards = [];
        for (let i = 0; i < count; i++) {
          cards.push(this.createPlaceholderCard(i, theme, count, isMobile));
        }
        return cards;
      }

      static createPlaceholderCard(index = 0, theme = 'light', count = 6, isMobile = true) {
        const c = document.createElement('canvas');
        const w = 736;
        const h = 1520;
        c.width = w;
        c.height = h;
        const ctx = c.getContext('2d');

        const isDark = theme === 'dark';
        const isHero = index === 3; // Slot #4 adalah Hero Utama di tengah!

        // 1. Surface Background (Kotak Putih Abu Bersih)
        ctx.fillStyle = isDark ? '#0b0f17' : '#f8fafc';
        ctx.fillRect(0, 0, w, h);

        // 2. Subtle Grid
        ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(15, 23, 42, 0.025)';
        const tileSize = 32;
        for (let y = 0; y < h; y += tileSize) {
          for (let x = 0; x < w; x += tileSize) {
            if (((x / tileSize) + (y / tileSize)) % 2 === 0) {
              ctx.fillRect(x, y, tileSize, tileSize);
            }
          }
        }

        // Outer Border
        ctx.strokeStyle = isHero ? '#FFB8D2' : (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)');
        ctx.lineWidth = isHero ? 3 : 2;
        ctx.strokeRect(1, 1, w - 2, h - 2);

        // Dynamic Island Notch
        ctx.fillStyle = isDark ? '#1e293b' : '#e2e8f0';
        ctx.beginPath();
        ctx.roundRect((w - 180) / 2, 24, 180, 36, 18);
        ctx.fill();

        // Status Bar
        ctx.fillStyle = isDark ? '#475569' : '#94a3b8';
        ctx.font = 'bold 20px ui-monospace, monospace';
        ctx.fillText('9:41', 42, 48);
        ctx.beginPath();
        ctx.roundRect(w - 90, 30, 48, 20, 6);
        ctx.fill();

        // Topbar
        const topBarY = 80;
        ctx.fillStyle = isHero ? '#FFE3ED' : (index % 2 === 0 ? '#9BE3DE' : '#BEEBE9');
        ctx.beginPath();
        ctx.roundRect(28, topBarY, w - 56, 76, 18);
        ctx.fill();
        ctx.strokeStyle = isHero ? '#FFB8D2' : '#7fd6d0';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = isHero ? '#9d174d' : '#0f172a';
        ctx.font = 'bold 24px sans-serif';
        const label = isHero ? '🌸 SLOT #4 ★ HERO UTAMA (TENGAH)' : \`📱 SLOT #\${index + 1}\`;
        ctx.fillText(label, 52, topBarY + 48);

        // Hero Skeleton Card
        const heroY = topBarY + 104;
        ctx.fillStyle = isDark ? '#161f30' : '#ffffff';
        ctx.beginPath();
        ctx.roundRect(28, heroY, w - 56, 320, 22);
        ctx.fill();
        ctx.strokeStyle = isDark ? '#334155' : '#e2e8f0';
        ctx.stroke();

        ctx.fillStyle = isHero ? 'rgba(255, 184, 210, 0.6)' : 'rgba(155, 227, 222, 0.5)';
        ctx.beginPath();
        ctx.roundRect(52, heroY + 36, w - 104, 38, 10);
        ctx.fill();
        ctx.fillStyle = isDark ? '#243247' : '#f1f5f9';
        ctx.beginPath();
        ctx.roundRect(52, heroY + 98, (w - 104) * 0.72, 24, 8);
        ctx.roundRect(52, heroY + 138, (w - 104) * 0.88, 24, 8);
        ctx.fill();

        // Center Dropzone
        const dropY = heroY + 350;
        ctx.fillStyle = isHero ? 'rgba(255, 227, 237, 0.35)' : 'rgba(155, 227, 222, 0.14)';
        ctx.strokeStyle = isHero ? '#FFB8D2' : '#9BE3DE';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([10, 8]);
        ctx.beginPath();
        ctx.roundRect(28, dropY, w - 56, 380, 24);
        ctx.fill();
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = isHero ? '#be185d' : '#0f766e';
        ctx.font = '64px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(isHero ? '⭐' : '📱', w / 2, dropY + 110);

        ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText(\`Slot #\${index + 1}: Siap Diisi Foto HP\`, w / 2, dropY + 175);

        ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
        ctx.font = '18px sans-serif';
        ctx.fillText('Ketuk atau tarik screenshot 9:16 ke sini', w / 2, dropY + 225);

        ctx.fillStyle = isHero ? '#9d174d' : '#0f766e';
        ctx.font = 'bold 16px ui-monospace, monospace';
        ctx.fillText(isHero ? '⭐ FOKUS UTAMA: LAYAR TAMPIL UTUH' : 'FORMAT: JPG / PNG / WEBP', w / 2, dropY + 280);
        ctx.textAlign = 'left';

        // Bottom List Items
        const listY = dropY + 410;
        for (let i = 0; i < 4; i++) {
          const itemY = listY + i * 84;
          if (itemY + 70 > h - 40) break;
          ctx.fillStyle = isDark ? '#161f30' : '#ffffff';
          ctx.beginPath();
          ctx.roundRect(28, itemY, w - 56, 70, 16);
          ctx.fill();
          ctx.strokeStyle = isDark ? '#1e293b' : '#f1f5f9';
          ctx.stroke();

          ctx.fillStyle = isDark ? '#334155' : '#e2e8f0';
          ctx.beginPath();
          ctx.roundRect(50, itemY + 18, 34, 34, 8);
          ctx.roundRect(100, itemY + 24, 240, 22, 6);
          ctx.fill();
        }

        return c;
      }
    }\n\n`;

src = src.replace('class ReferencePosterGenerator', demoGenClass + '    class ReferencePosterGenerator');

// 8. Replace default defaultPosters initialization with DemoGenerator
src = src.replace(
  `let defaultPosters = ReferencePosterGenerator.generateSixSet(invertPosters);`,
  `let defaultPosters = DemoGenerator.generateSet('light', true, TOTAL_SLOTS);`
);

// 9. In reset / clear all, restore DemoGenerator wireframes
src = src.replace(
  `defaultPosters = ReferencePosterGenerator.generateSixSet(false);
        refreshCanvas();
        showToast('Poster referensi dimuat ulang');`,
  `defaultPosters = DemoGenerator.generateSet(renderer.bgTheme === 'dark' ? 'dark' : 'light', true, TOTAL_SLOTS);
        refreshCanvas();
        showToast('Kembali ke Wireframe Bersih (Kotak Putih Abu)');`
);

src = src.replace(
  `userImages.fill(null);
        invertPosters = false;
        defaultPosters = ReferencePosterGenerator.generateSixSet(false);
        setStudioBg('light');`,
  `userImages.fill(null);
        invertPosters = false;
        defaultPosters = DemoGenerator.generateSet('light', true, TOTAL_SLOTS);
        setStudioBg('light');`
);

// 10. In Tombol Aksi Cepat, add Wireframe Bersih action button
const fastActionsWireframe = `<button id="btn-reset-wireframe" class="btn-pill" style="justify-content: center; background:#FFE3ED; border:1px solid #FFB8D2; font-weight:700;">
              <span>🌸 Wireframe Bersih (6 HP)</span>
            </button>\n          `;
src = src.replace('<div class="fast-actions-grid">', '<div class="fast-actions-grid">\n          ' + fastActionsWireframe);

const wireframeListener = `      document.getElementById('btn-reset-wireframe').addEventListener('click', () => {
        userImages.fill(null);
        defaultPosters = DemoGenerator.generateSet(renderer.bgTheme === 'dark' ? 'dark' : 'light', true, TOTAL_SLOTS);
        refreshCanvas();
        showToast('Semua slot kembali ke Wireframe Bersih (Kotak Putih Abu)');
      });\n`;
src = src.replace("document.getElementById('btn-swap-posters').addEventListener", wireframeListener + "      document.getElementById('btn-swap-posters').addEventListener");

// Write to studio-mobile-6.html
fs.writeFileSync('studio-mobile-6.html', src, 'utf8');
console.log('Successfully written studio-mobile-6.html, length:', src.length);

