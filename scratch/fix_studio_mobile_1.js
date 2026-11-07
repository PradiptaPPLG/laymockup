const fs = require('fs');

let src = fs.readFileSync('refrensi-asset/1-mobile.html', 'utf8');

// 1. Replace title
src = src.replace(/<title>[\s\S]*?<\/title>/, '<title>1 Layar Single Phone 3D Studio - LayMockup × PixelCam</title>');

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

// 4. Update ONLY the <div class="brand"> block
const oldBrand = `    <div class="brand">
      <div class="brand-icon">📱</div>
      <div class="brand-title">3D Single Phone Studio</div>
      <span id="theme-badge" class="brand-badge">Studio Light Mode</span>
    </div>`;

const newBrand = `    <div class="brand">
      <a href="index.html" class="nav-back-btn" title="Kembali ke Beranda"
        style="text-decoration:none; display:inline-flex; align-items:center; gap:6px; color:#475569; font-size:12px; font-weight:600; padding:5px 11px; background:#f1f5f9; border-radius:8px; border:1px solid #cbd5e1; margin-right:8px; transition:all 0.2s;">
        <span>←</span> Beranda
      </a>
      <div class="brand-icon">📱</div>
      <div class="brand-title">1 Layar Single Phone 3D</div>
      <span id="theme-badge" class="brand-badge" style="background:#FFE3ED; color:#9d174d; border:1px solid #FFB8D2; font-weight:700;">Solo Flagship</span>
    </div>`;

if (!src.includes(oldBrand)) {
  console.error('[ERROR] oldBrand not found in 1-mobile.html!');
} else {
  src = src.replace(oldBrand, newBrand);
}

// 5. Update topbar center buttons
const oldPills = `    <div class="topbar-center">
      <button id="btn-bg-light" class="btn-pill active" title="Background Studio Terang (Default Awal)">
        <span>☀️ Studio Light BG</span>
      </button>
      <button id="btn-bg-warm" class="btn-pill" title="Background Studio Abu Terang (Seperti Referensi Satuan)">
        <span>⚪ Warm Grey BG</span>
      </button>
      <button id="btn-bg-dark" class="btn-pill" title="Background Studio Gelap">
        <span>🌙 Dark Studio BG</span>
      </button>
    </div>`;

const newPills = `    <div class="topbar-center">
      <button id="btn-bg-light" class="btn-pill active" title="Background Studio Pastel Mint (Default)">
        <span>🌸 Pastel Light</span>
      </button>
      <button id="btn-bg-warm" class="btn-pill" title="Background Studio Abu Terang (Seperti Referensi Satuan)">
        <span>⚪ Warm Grey BG</span>
      </button>
      <button id="btn-bg-dark" class="btn-pill" title="Background Studio Gelap">
        <span>🌙 Dark Studio BG</span>
      </button>
    </div>`;

if (src.includes(oldPills)) {
  src = src.replace(oldPills, newPills);
}

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
      static createPlaceholderCard(index = 0, theme = 'light', count = 1, isMobile = true) {
        const c = document.createElement('canvas');
        const w = 540;
        const h = 1140;
        c.width = w;
        c.height = h;
        const ctx = c.getContext('2d');

        const isDark = theme === 'dark';

        // 1. Surface Background (Kotak Putih Abu Bersih)
        ctx.fillStyle = isDark ? '#0b0f17' : '#f8fafc';
        ctx.fillRect(0, 0, w, h);

        // 2. Subtle Grid
        ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(15, 23, 42, 0.025)';
        const tileSize = 24;
        for (let y = 0; y < h; y += tileSize) {
          for (let x = 0; x < w; x += tileSize) {
            if (((x / tileSize) + (y / tileSize)) % 2 === 0) {
              ctx.fillRect(x, y, tileSize, tileSize);
            }
          }
        }

        // Outer Border
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, w - 2, h - 2);

        // Dynamic Island Notch
        ctx.fillStyle = isDark ? '#1e293b' : '#e2e8f0';
        ctx.beginPath();
        ctx.roundRect((w - 120) / 2, 16, 120, 24, 12);
        ctx.fill();

        // Status Bar
        ctx.fillStyle = isDark ? '#475569' : '#94a3b8';
        ctx.font = 'bold 14px ui-monospace, monospace';
        ctx.fillText('9:41', 28, 34);
        ctx.beginPath();
        ctx.roundRect(w - 60, 20, 32, 14, 4);
        ctx.fill();

        // Topbar
        const topBarY = 56;
        ctx.fillStyle = '#FFE3ED';
        ctx.beginPath();
        ctx.roundRect(20, topBarY, w - 40, 58, 14);
        ctx.fill();
        ctx.strokeStyle = '#FFB8D2';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('🌸 SLOT #1 · SOLO FLAGSHIP', 38, topBarY + 36);

        // Hero Skeleton
        const heroY = topBarY + 76;
        ctx.fillStyle = isDark ? '#161f30' : '#ffffff';
        ctx.beginPath();
        ctx.roundRect(20, heroY, w - 40, 230, 18);
        ctx.fill();
        ctx.strokeStyle = isDark ? '#334155' : '#e2e8f0';
        ctx.stroke();

        ctx.fillStyle = 'rgba(155, 227, 222, 0.45)';
        ctx.beginPath();
        ctx.roundRect(38, heroY + 24, w - 76, 28, 8);
        ctx.fill();
        ctx.fillStyle = isDark ? '#243247' : '#f1f5f9';
        ctx.beginPath();
        ctx.roundRect(38, heroY + 70, (w - 76) * 0.7, 18, 6);
        ctx.roundRect(38, heroY + 102, (w - 76) * 0.85, 18, 6);
        ctx.fill();

        // Dropzone Area
        const dropY = heroY + 252;
        ctx.fillStyle = isDark ? 'rgba(155, 227, 222, 0.08)' : 'rgba(155, 227, 222, 0.12)';
        ctx.strokeStyle = '#9BE3DE';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.roundRect(20, dropY, w - 40, 290, 20);
        ctx.fill();
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#0f766e';
        ctx.font = '46px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('📱', w / 2, dropY + 85);

        ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
        ctx.font = 'bold 21px sans-serif';
        ctx.fillText('Slot #1: Siap Diisi Foto HP', w / 2, dropY + 132);

        ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
        ctx.font = '14px sans-serif';
        ctx.fillText('Ketuk atau tarik screenshot 9:16 ke sini', w / 2, dropY + 168);

        ctx.fillStyle = '#0f766e';
        ctx.font = 'bold 13px ui-monospace, monospace';
        ctx.fillText('FORMAT: JPG / PNG / WEBP', w / 2, dropY + 210);
        ctx.textAlign = 'left';

        // Bottom List Items
        const listY = dropY + 314;
        for (let i = 0; i < 3; i++) {
          const itemY = listY + i * 62;
          if (itemY + 50 > h - 40) break;
          ctx.fillStyle = isDark ? '#161f30' : '#ffffff';
          ctx.beginPath();
          ctx.roundRect(20, itemY, w - 40, 52, 12);
          ctx.fill();
          ctx.strokeStyle = isDark ? '#1e293b' : '#f1f5f9';
          ctx.stroke();

          ctx.fillStyle = isDark ? '#334155' : '#e2e8f0';
          ctx.beginPath();
          ctx.roundRect(36, itemY + 14, 24, 24, 6);
          ctx.roundRect(72, itemY + 18, 180, 16, 5);
          ctx.fill();
        }

        return c;
      }
    }\n\n`;

src = src.replace('class ReferencePosterGenerator', demoGenClass + '    class ReferencePosterGenerator');

// 8. Change default currentSource from Pink Petal to DemoGenerator wireframe
src = src.replace(
  `let currentSource = ReferencePosterGenerator.createPinkPetalPoster();`,
  `let currentSource = DemoGenerator.createPlaceholderCard(0, 'light', 1, true);`
);

// 9. Update initial tag text
src = src.replace(
  `document.getElementById('slot-tag-0').textContent = 'Pink Petal Poster';`,
  `document.getElementById('slot-tag-0').textContent = 'Wireframe Bersih';`
);

// 10. In reset / clear all, restore DemoGenerator wireframe
src = src.replace(
  `currentSource = ReferencePosterGenerator.createPinkPetalPoster();\n        document.getElementById('slot-tag-0').textContent = 'Pink Petal Poster';`,
  `currentSource = DemoGenerator.createPlaceholderCard(0, 'light', 1, true);\n        document.getElementById('slot-tag-0').textContent = 'Wireframe Bersih';`
);

// 11. In preset grid, add Wireframe Bersih button
const oldPresetGrid = `<div class="preset-grid">
            <button id="btn-poster-pink" class="btn-preset">`;

const newPresetGrid = `<div class="preset-grid">
            <button id="btn-poster-wireframe" class="btn-preset" style="background:#FFE3ED; border:1px solid #FFB8D2; font-weight:700;">
              <span>🌸 Wireframe Bersih</span>
            </button>
            <button id="btn-poster-pink" class="btn-preset">`;

src = src.replace(oldPresetGrid, newPresetGrid);

// In script, add event listener for btn-poster-wireframe
const wireframeListener = `      document.getElementById('btn-poster-wireframe').addEventListener('click', () => {
        currentSource = DemoGenerator.createPlaceholderCard(0, renderer.bgTheme === 'dark' ? 'dark' : 'light', 1, true);
        document.getElementById('slot-tag-0').textContent = 'Wireframe Bersih';
        refreshCanvas();
        updateThumbnail();
        showToast('Kembali ke Wireframe Bersih (Kotak Putih Abu)');
      });\n`;
src = src.replace("document.getElementById('btn-poster-pink').addEventListener", wireframeListener + "      document.getElementById('btn-poster-pink').addEventListener");

// Write to studio-mobile-1.html
fs.writeFileSync('studio-mobile-1.html', src, 'utf8');
console.log('Fixed studio-mobile-1.html successfully, length:', src.length);
