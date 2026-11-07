const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Update text mentions from 6 to 9
content = content.replace('6 Template Isometrik', '9 Template Isometrik');
content = content.replace('Jelajahi 6 Template', 'Jelajahi 9 Template');
content = content.replace('6 Formasi Isometrik Eksklusif', '9 Formasi Isometrik Eksklusif');
content = content.replace(
  'Pilih formasi yang paling tepat: Formasi Intan 12 Kartu, Formasi Ramping 9 Kartu, Formasi Landscape 7 Kartu (Staggered Hero), hingga Mockup Layar HP 3D Smartphone (9:16).',
  'Pilih formasi yang paling tepat: Formasi Intan 12 Kartu, Formasi Ramping 9 Kartu, Formasi Landscape 7 Kartu, hingga Mockup Layar Smartphone 3D (Single Phone, Dual Phone, dan 3-Kolom Vertical).'
);

// 2. Add 3 new cards to .etalase-grid after Template 06
const newCards = `
          <!-- TEMPLATE 07: 1 LAYAR SINGLE PHONE 3D -->
          <article class="etalase-card featured" id="template-mobile-1-card" onclick="window.location.href='studio-mobile-1.html'">
            <div class="etalase-preview-box">
              <canvas id="canvas-mobile-1-preview" width="560" height="315"></canvas>
              <div class="etalase-badge-top">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
                1 Layar Solo (9:16)
              </div>
            </div>

            <div class="etalase-content">
              <div class="etalase-meta">
                <span class="etalase-tag volt">TEMPLATE 07 · SINGLE PHONE 3D</span>
              </div>
              <h3 class="etalase-title">1 Layar Single Phone 3D</h3>
              <div class="specs-grid">
                <div class="spec-item">
                  <span class="spec-key">Formasi Grid</span>
                  <span class="spec-val">1 Layar Flagship Solo</span>
                </div>
                <div class="spec-item">
                  <span class="spec-key">Rasio Layar</span>
                  <span class="spec-val">9:16 Portrait HP</span>
                </div>
                <div class="spec-item">
                  <span class="spec-key">Bodi HP 3D</span>
                  <span class="spec-val">Dynamic Island 3D</span>
                </div>
                <div class="spec-item">
                  <span class="spec-key">Karakter</span>
                  <span class="spec-val">Fokus Detail 1 Aplikasi</span>
                </div>
              </div>

              <div class="etalase-btn-wrap">
                <a href="studio-mobile-1.html" class="btn btn-primary" title="Buka Template 1 Layar Single Phone 3D">
                  Buka Studio
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </article>

          <!-- TEMPLATE 08: 2 LAYAR DUAL PHONE 3D -->
          <article class="etalase-card featured" id="template-mobile-2-card" onclick="window.location.href='studio-mobile-2.html'">
            <div class="etalase-preview-box">
              <canvas id="canvas-mobile-2-preview" width="560" height="315"></canvas>
              <div class="etalase-badge-top">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
                2 Layar Dual (9:16)
              </div>
            </div>

            <div class="etalase-content">
              <div class="etalase-meta">
                <span class="etalase-tag volt">TEMPLATE 08 · DUAL PHONE 3D</span>
              </div>
              <h3 class="etalase-title">2 Layar Dual Phone 3D</h3>
              <div class="specs-grid">
                <div class="spec-item">
                  <span class="spec-key">Formasi Grid</span>
                  <span class="spec-val">2 Layar Berdampingan</span>
                </div>
                <div class="spec-item">
                  <span class="spec-key">Rasio Layar</span>
                  <span class="spec-val">9:16 Dual Portrait</span>
                </div>
                <div class="spec-item">
                  <span class="spec-key">Bodi HP 3D</span>
                  <span class="spec-val">Staggered Isometrik</span>
                </div>
                <div class="spec-item">
                  <span class="spec-key">Karakter</span>
                  <span class="spec-val">Komparasi 2 Tampilan</span>
                </div>
              </div>

              <div class="etalase-btn-wrap">
                <a href="studio-mobile-2.html" class="btn" style="background:#FFE3ED; color:#9d174d; font-weight:700; border:1.5px solid #FFB8D2; box-shadow:0 4px 14px rgba(255,184,210,0.4);" title="Buka Template 2 Layar Dual Phone 3D">
                  Buka Studio
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </article>

          <!-- TEMPLATE 09: 6 LAYAR VERTICAL 3-KOLOM -->
          <article class="etalase-card featured" id="template-mobile-6-card" onclick="window.location.href='studio-mobile-6.html'">
            <div class="etalase-preview-box">
              <canvas id="canvas-mobile-6-preview" width="560" height="315"></canvas>
              <div class="etalase-badge-top">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
                6 Layar 3-Kolom (9:16)
              </div>
            </div>

            <div class="etalase-content">
              <div class="etalase-meta">
                <span class="etalase-tag volt">TEMPLATE 09 · 3-KOLOM PHONE 3D</span>
              </div>
              <h3 class="etalase-title">6 Layar Vertical 3-Kolom</h3>
              <div class="specs-grid">
                <div class="spec-item">
                  <span class="spec-key">Formasi Grid</span>
                  <span class="spec-val">3 Kolom (2-2-2 Tegak)</span>
                </div>
                <div class="spec-item">
                  <span class="spec-key">Rasio Layar</span>
                  <span class="spec-val">9:16 Vertical Stagger</span>
                </div>
                <div class="spec-item">
                  <span class="spec-key">Fitur Khusus</span>
                  <span class="spec-val">Hero Utama di Tengah</span>
                </div>
                <div class="spec-item">
                  <span class="spec-key">Karakter</span>
                  <span class="spec-val">Showcase Multi-Screen</span>
                </div>
              </div>

              <div class="etalase-btn-wrap">
                <a href="studio-mobile-6.html" class="btn btn-primary" title="Buka Template 6 Layar Vertical 3-Kolom">
                  Buka Studio
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
`;

const card6EndTag = `</article>\n        </div>\n      </div>\n    </section>`;
if (content.includes(card6EndTag)) {
  content = content.replace(card6EndTag, `</article>${newCards}        </div>\n      </div>\n    </section>`);
} else {
  // Try matching etalase-grid closing
  content = content.replace('id="template-mobile-7-card"', 'id="template-mobile-7-card"');
  const m = content.match(/<article class="etalase-card featured" id="template-mobile-7-card"[\s\S]*?<\/article>/);
  if (m) {
    content = content.replace(m[0], m[0] + newCards);
  }
}

// 3. Update drawMiniIsometricPreview logic
const oldMobile7Branch = `      } else if (type === 'mobile-7') {
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
      }`;

const newMobileBranches = `      } else if (type === 'mobile-7') {
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
      } else if (type === 'mobile-1') {
        zoomFactor = 1.35;
        gapX = 0; gapY = 0;
        isPhone = true;
        cardW = 540;
        cardH = 1140;
        layout = [
          { col: 0, row: 0, focal: true }
        ];
      } else if (type === 'mobile-2') {
        zoomFactor = 1.05;
        gapX = 42; gapY = 42;
        isPhone = true;
        cardW = 540;
        cardH = 1140;
        layout = [
          { col: -0.65, row: -0.05 },
          { col: 0.65, row: 0.05, focal: true }
        ];
      } else if (type === 'mobile-6') {
        zoomFactor = 0.85;
        gapX = 36; gapY = 36;
        isPhone = true;
        cardW = 500;
        cardH = 1040;
        layout = [
          { col: -1, row: -0.65 }, { col: -1, row: 0.50 },
          { col: 0, row: -0.85 }, { col: 0, row: 0.15, focal: true },
          { col: 1, row: -0.55 }, { col: 1, row: 0.65 }
        ];
      }`;

content = content.replace(oldMobile7Branch, newMobileBranches);

// 4. Update DOMContentLoaded calls
const oldCalls = `      drawMiniIsometricPreview('canvas-7-landscape-preview', '7-landscape');
      drawMiniIsometricPreview('canvas-mobile-7-preview', 'mobile-7');
    });`;

const newCalls = `      drawMiniIsometricPreview('canvas-7-landscape-preview', '7-landscape');
      drawMiniIsometricPreview('canvas-mobile-7-preview', 'mobile-7');
      drawMiniIsometricPreview('canvas-mobile-1-preview', 'mobile-1');
      drawMiniIsometricPreview('canvas-mobile-2-preview', 'mobile-2');
      drawMiniIsometricPreview('canvas-mobile-6-preview', 'mobile-6');
    });`;

content = content.replace(oldCalls, newCalls);

// 5. Update footer template list
const oldFooterMenu = `<ul class="footer-menu">
              <li><a href="studio-centered.html">12 Centered Diamond</a></li>
              <li><a href="studio-stretch.html">12 Full-Bleed Stretch</a></li>
              <li><a href="studio-9-zoomout.html">9 Kartu Zoom-Out</a></li>
              <li><a href="studio-9-stretch.html">9 Kartu Stretch Full</a></li>
              <li><a href="studio-7-landscape.html">7 Kartu Landscape (Baru)</a></li>
              <li><a href="studio-mobile-7.html">7 Layar Mobile App 3D (Baru)</a></li>
            </ul>`;

const newFooterMenu = `<ul class="footer-menu">
              <li><a href="studio-centered.html">12 Centered Diamond</a></li>
              <li><a href="studio-stretch.html">12 Full-Bleed Stretch</a></li>
              <li><a href="studio-9-zoomout.html">9 Kartu Zoom-Out</a></li>
              <li><a href="studio-9-stretch.html">9 Kartu Stretch Full</a></li>
              <li><a href="studio-7-landscape.html">7 Kartu Landscape</a></li>
              <li><a href="studio-mobile-7.html">7 Layar Mobile App 3D</a></li>
              <li><a href="studio-mobile-1.html">1 Layar Single Phone 3D (Baru)</a></li>
              <li><a href="studio-mobile-2.html">2 Layar Dual Phone 3D (Baru)</a></li>
              <li><a href="studio-mobile-6.html">6 Layar Vertical 3-Kolom (Baru)</a></li>
            </ul>`;

content = content.replace(oldFooterMenu, newFooterMenu);

fs.writeFileSync('index.html', content, 'utf8');
fs.writeFileSync('beranda.html', content, 'utf8');

console.log('index.html and beranda.html successfully updated! Length:', content.length);

