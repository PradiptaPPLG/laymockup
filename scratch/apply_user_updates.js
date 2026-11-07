const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Add CSS for tutorial section
const tutorialCSS = `
    /* Tutorial Section — Step by Step Guide before Features */
    .tutorial-section {
      padding: 70px 0 86px 0;
      background: #ffffff;
      border-top: 1px solid #eef5f3;
      border-bottom: 1px solid #eef5f3;
    }

    .tutorial-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-top: 40px;
    }

    .tutorial-card {
      background: #FFFDF9;
      border: 1.5px solid #e8f2ef;
      border-radius: 18px;
      padding: 26px 22px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 4px 16px rgba(155, 227, 222, 0.08);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .tutorial-card:hover {
      transform: translateY(-4px);
      border-color: #9BE3DE;
      box-shadow: 0 12px 28px -8px rgba(155, 227, 222, 0.35);
    }

    .tutorial-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .tutorial-step-badge {
      display: inline-flex;
      align-items: center;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 999px;
    }

    .tutorial-icon-box {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }

    .tutorial-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .tutorial-title {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.01em;
      line-height: 1.35;
    }

    .tutorial-desc {
      font-size: 13.5px;
      color: #475569;
      line-height: 1.6;
    }

    .tutorial-pill-tag {
      margin-top: auto;
      padding-top: 10px;
      font-size: 11.5px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* Tutorial Bottom Banner */
    .tutorial-cta-box {
      margin-top: 44px;
      background: linear-gradient(135deg, #FFFDF9 0%, #FFF0F5 50%, #EBF9F8 100%);
      border: 1.5px solid #e2edea;
      border-radius: 20px;
      padding: 30px 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      box-shadow: 0 8px 24px -8px rgba(155, 227, 222, 0.25);
    }

    .tutorial-cta-title {
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
      letter-spacing: -0.01em;
    }

    .tutorial-cta-desc {
      font-size: 13.5px;
      color: #475569;
      line-height: 1.5;
    }
`;

// Insert tutorial CSS right before features-section CSS
content = content.replace('.features-section {', tutorialCSS + '\n    .features-section {');

// Responsive queries for tutorial
const tutorialMQ992 = `
      .tutorial-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
        width: 100%;
      }
      .tutorial-cta-box {
        flex-direction: column;
        text-align: center;
        padding: 26px 20px;
      }
`;
content = content.replace('.features-grid {', tutorialMQ992 + '      .features-grid {');

const tutorialMQ640 = `
      .tutorial-grid {
        grid-template-columns: minmax(0, 1fr);
        gap: 14px;
      }
`;
const lastMQFeatures = content.lastIndexOf('.features-grid {');
content = content.slice(0, lastMQFeatures) + tutorialMQ640 + '      ' + content.slice(lastMQFeatures);

// 2. Update Navbar:
// Replace desktop nav-links to include Tutorial
const oldNavLinks = `<nav class="nav-links" aria-label="Menu Utama">
        <a href="#etalase">Etalase Template</a>
        <a href="#features">Fitur</a>
      </nav>`;

const newNavLinks = `<nav class="nav-links" aria-label="Menu Utama">
        <a href="#etalase">Etalase Template</a>
        <a href="#tutorial">Tutorial</a>
        <a href="#features">Fitur</a>
      </nav>`;
content = content.replace(oldNavLinks, newNavLinks);

// 3. Remove "Studio ->" button from navbar header
const oldNavActions = `      <!-- Desktop Nav Actions -->
      <div class="nav-actions">
        <a href="#etalase" class="btn btn-primary" style="font-weight:600; padding:8px 18px; border-radius:12px;">
          Studio &rarr;
        </a>
      </div>`;

content = content.replace(oldNavActions, '');

// Also update mobile drawer to include Tutorial
const oldMobileNavLinks = `<a href="#etalase" class="mobile-nav-link" data-close>
        <span class="icon">💎</span>
        <div>
          <div class="title">Etalase Template</div>
          <div class="sub">4 Formasi Mockup Isometrik</div>
        </div>
      </a>
      <a href="#features" class="mobile-nav-link" data-close>`;

const newMobileNavLinks = `<a href="#etalase" class="mobile-nav-link" data-close>
        <span class="icon">💎</span>
        <div>
          <div class="title">Etalase Template</div>
          <div class="sub">9 Formasi Mockup Isometrik</div>
        </div>
      </a>
      <a href="#tutorial" class="mobile-nav-link" data-close>
        <span class="icon">📖</span>
        <div>
          <div class="title">Tutorial</div>
          <div class="sub">4 Langkah Mudah & Cepat</div>
        </div>
      </a>
      <a href="#features" class="mobile-nav-link" data-close>`;

content = content.replace(oldMobileNavLinks, newMobileNavLinks);

// 4. Update hero buttons:
const oldHeroActions = `<div class="hero-actions" style="justify-content: center; gap: 14px;">
          <a href="#etalase" class="btn btn-primary btn-lg" style="background:#9BE3DE; color:#044343; font-weight:700; border:1.5px solid #7ed5cf; box-shadow:0 6px 20px rgba(155,227,222,0.5);">
            Jelajahi 9 Template
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </a>
          <a href="studio-centered.html" class="btn btn-lg" style="background:#FFE3ED; color:#9d174d; font-weight:700; border:1.5px solid #FFB8D2; box-shadow:0 6px 20px rgba(255,184,210,0.45);">
            Buka Studio Langsung &rarr;
          </a>
        </div>`;

const newHeroActions = `<div class="hero-actions" style="justify-content: center; gap: 14px;">
          <a href="#etalase" class="btn btn-primary btn-lg" style="background:#9BE3DE; color:#044343; font-weight:700; border:1.5px solid #7ed5cf; box-shadow:0 6px 20px rgba(155,227,222,0.5);">
            Jelajahi 9 Template
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </a>
          <a href="https://nector-ui.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn btn-lg" style="background:#FFE3ED; color:#9d174d; font-weight:700; border:1.5px solid #FFB8D2; box-shadow:0 6px 20px rgba(255,184,210,0.45);" title="Buka Photobooth Studio (Nector UI)">
            Buka Photobooth
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <a href="https://pixelcam-flame.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn btn-lg" style="background:#edf9f8; color:#0f3b42; font-weight:700; border:1.5px solid #BEEBE9; box-shadow:0 6px 20px rgba(190,235,233,0.35);" title="Jelajahi Template Website PixelCam">
            Jelajahi Template Website
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>`;

content = content.replace(oldHeroActions, newHeroActions);

// 5. Add Tutorial Section right before Features section
const tutorialSectionHTML = `    <!-- TUTORIAL SECTION (Panduan Praktis Tepat Sebelum Fitur) -->
    <section id="tutorial" class="tutorial-section" aria-labelledby="tutorial-heading">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <span class="section-overline">PANDUAN PRAKTIS</span>
          <h2 id="tutorial-heading" class="section-title">Cara Mudah Membuat Mockup Isometrik 3D</h2>
          <p class="section-desc">
            Hanya butuh 4 langkah cepat tanpa keahlian desain, Figma, maupun Blender. Dari screenshot mentah hingga render 3D studio memukau dalam hitungan detik.
          </p>
        </div>

        <!-- 4 Step Cards Grid -->
        <div class="tutorial-grid">
          <!-- Step 1 -->
          <div class="tutorial-card">
            <div class="tutorial-card-header">
              <span class="tutorial-step-badge" style="background:#eafaf8; color:#0f766e; border:1px solid #9BE3DE;">
                Langkah 01
              </span>
              <div class="tutorial-icon-box" style="background:#eafaf8; color:#0f766e;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
            </div>
            <div class="tutorial-info">
              <h3 class="tutorial-title">Pilih Formasi & Template</h3>
              <p class="tutorial-desc">
                Tentukan layout yang pas di etalase: 12 kartu Diamond, 9 kartu Stretch, 7 kartu Landscape, atau bodi HP 3D (Single, Dual, & 3-Kolom).
              </p>
            </div>
            <div class="tutorial-pill-tag" style="color:#0f766e;">
              <span>✓ 9 Formasi Presisi Siap Pakai</span>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="tutorial-card">
            <div class="tutorial-card-header">
              <span class="tutorial-step-badge" style="background:#FFE3ED; color:#9d174d; border:1px solid #FFB8D2;">
                Langkah 02
              </span>
              <div class="tutorial-icon-box" style="background:#FFE3ED; color:#9d174d;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
            </div>
            <div class="tutorial-info">
              <h3 class="tutorial-title">Unggah Tangkapan Layar</h3>
              <p class="tutorial-desc">
                Tarik & lepas (drag & drop) gambar aplikasi Anda ke kanvas atau klik slot untuk memilih file/kamera. Mendukung format JPG, PNG, & WebP.
              </p>
            </div>
            <div class="tutorial-pill-tag" style="color:#9d174d;">
              <span>✓ Drag & Drop Cepat & Otomatis</span>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="tutorial-card">
            <div class="tutorial-card-header">
              <span class="tutorial-step-badge" style="background:#edf9f8; color:#0f3b42; border:1px solid #BEEBE9;">
                Langkah 03
              </span>
              <div class="tutorial-icon-box" style="background:#edf9f8; color:#0f3b42;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
            </div>
            <div class="tutorial-info">
              <h3 class="tutorial-title">Sesuaikan Sudut & Tema</h3>
              <p class="tutorial-desc">
                Atur zoom kamera, pilih latar belakang (Pastel Light, Dark Studio, dsb.), serta aktifkan bodi smartphone 3D dan Dynamic Island sesuka Anda.
              </p>
            </div>
            <div class="tutorial-pill-tag" style="color:#0f3b42;">
              <span>✓ Kontrol Zoom & Efek Real-Time</span>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="tutorial-card">
            <div class="tutorial-card-header">
              <span class="tutorial-step-badge" style="background:#FFF0F5; color:#be185d; border:1px solid #FFB8D2;">
                Langkah 04
              </span>
              <div class="tutorial-icon-box" style="background:#FFF0F5; color:#be185d;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
            </div>
            <div class="tutorial-info">
              <h3 class="tutorial-title">Ekspor Resolusi Studio 4K</h3>
              <p class="tutorial-desc">
                Tekan tombol Export PNG untuk langsung mengunduh hasil beresolusi 2752×1536 hingga 4K. Aman, tanpa watermark, dan 100% diproses di browser.
              </p>
            </div>
            <div class="tutorial-pill-tag" style="color:#be185d;">
              <span>✓ 100% Private Tanpa Server Luar</span>
            </div>
          </div>
        </div>

        <!-- Tutorial CTA Banner -->
        <div class="tutorial-cta-box">
          <div>
            <h3 class="tutorial-cta-title">Siap Mencoba Membuat Mockup Anda?</h3>
            <p class="tutorial-cta-desc">
              Pilih salah satu dari 9 formasi template studio di atas dan wujudkan presentasi profesional sekarang juga.
            </p>
          </div>
          <a href="#etalase" class="btn btn-primary" style="background:#9BE3DE; color:#044343; font-weight:700; border:1.5px solid #7ed5cf; padding:12px 24px; border-radius:12px; box-shadow:0 6px 18px rgba(155,227,222,0.4); white-space:nowrap;">
            Pilih Template Sekarang
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>

`;

const featuresSectionPattern = `    <!-- FEATURES SECTION (Persis seperti screenshot PixelCam yang diberikan user) -->\n    <section id="features"`;
content = content.replace(featuresSectionPattern, tutorialSectionHTML + featuresSectionPattern);

// 6. Update footer navigasi menu
const oldFooterNav = `<div class="footer-col">
            <h4 class="footer-col-title">Navigasi</h4>
            <ul class="footer-menu">
              <li><a href="#etalase">Etalase Template</a></li>
              <li><a href="#features">Fitur Unggulan</a></li>
              <li><a href="#" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;">Kembali ke Atas ↑</a></li>
            </ul>
          </div>`;

const newFooterNav = `<div class="footer-col">
            <h4 class="footer-col-title">Navigasi</h4>
            <ul class="footer-menu">
              <li><a href="#etalase">Etalase Template</a></li>
              <li><a href="#tutorial">Tutorial</a></li>
              <li><a href="#features">Fitur Unggulan</a></li>
              <li><a href="#" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;">Kembali ke Atas ↑</a></li>
            </ul>
          </div>`;

content = content.replace(oldFooterNav, newFooterNav);

// Write both index.html and beranda.html
fs.writeFileSync('index.html', content, 'utf8');
fs.writeFileSync('beranda.html', content, 'utf8');

console.log('Updated index.html and beranda.html successfully! Length:', content.length);

