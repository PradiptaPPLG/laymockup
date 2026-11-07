const fs = require('fs');

function updateHeroSection(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  const oldHero = `<section class="hero-section">
      <div class="container">
        <div class="hero-pill">
          <span class="hero-pill-dot" aria-hidden="true"></span>
          Browser-Based 3D Engine · No Figma · No Blender Required
        </div>

        <h1 class="hero-title">
          Transform Your Screenshots Into <span class="gradient-text">Stunning 3D Mockups</span>
        </h1>

        <p class="hero-desc">
          Studio mockup isometrik berbasis browser dengan formasi presisi 1-3-4-3-1 tanpa distorsi. Hadirkan presentasi
          aplikasi web, mobile, dan dashboard kelas dunia dalam hitungan detik.
        </p>

        <div class="hero-actions" style="justify-content: center;">
          <a href="#etalase" class="btn btn-primary btn-lg">
            Jelajahi Template Isometrik
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>`;

  const newHero = `<section class="hero-section">
      <div class="container">
        <div class="hero-pill">
          <span class="hero-pill-dot" aria-hidden="true"></span>
          🌸 Pastel Studio Edition · Browser-Based 3D Engine · No Figma · No Blender Required
        </div>

        <h1 class="hero-title">
          Transform Your Screenshots Into <span class="gradient-text">Stunning 3D Mockups</span>
        </h1>

        <p class="hero-desc">
          Studio mockup isometrik berbasis browser dengan formasi presisi tanpa distorsi. Hadirkan presentasi
          aplikasi web, mobile, dan dashboard kelas dunia dalam hitungan detik.
        </p>

        <!-- Cute Pastel Chips -->
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin: 20px 0 28px 0;">
          <span style="display:inline-flex; align-items:center; gap:6px; background:#FFE3ED; border:1.5px solid #FFB8D2; color:#9d174d; font-weight:700; font-size:12px; padding:6px 14px; border-radius:999px; box-shadow:0 2px 8px rgba(255,184,210,0.35);">
            🌸 6 Template Isometrik
          </span>
          <span style="display:inline-flex; align-items:center; gap:6px; background:#eafaf8; border:1.5px solid #9BE3DE; color:#044343; font-weight:700; font-size:12px; padding:6px 14px; border-radius:999px; box-shadow:0 2px 8px rgba(155,227,222,0.3);">
            💎 100% Client-Side Private
          </span>
          <span style="display:inline-flex; align-items:center; gap:6px; background:#edf9f8; border:1.5px solid #BEEBE9; color:#0f3b42; font-weight:700; font-size:12px; padding:6px 14px; border-radius:999px; box-shadow:0 2px 8px rgba(190,235,233,0.3);">
            ⚡ 4K PNG Resolusi Asli
          </span>
        </div>

        <div class="hero-actions" style="justify-content: center; gap: 14px;">
          <a href="#etalase" class="btn btn-primary btn-lg" style="background:#9BE3DE; color:#044343; font-weight:700; border:1.5px solid #7ed5cf; box-shadow:0 6px 20px rgba(155,227,222,0.5);">
            Jelajahi 6 Template 💎
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </a>
          <a href="studio-centered.html" class="btn btn-lg" style="background:#FFE3ED; color:#9d174d; font-weight:700; border:1.5px solid #FFB8D2; box-shadow:0 6px 20px rgba(255,184,210,0.45);">
            Buka Studio Langsung 🌸 &rarr;
          </a>
        </div>
      </div>
    </section>`;

  if (!content.includes(oldHero)) {
    console.error('oldHero not found in', filename);
    return false;
  }

  content = content.replace(oldHero, newHero);
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Updated Hero in ${filename}`);
  return true;
}

updateHeroSection('index.html');
updateHeroSection('beranda.html');

