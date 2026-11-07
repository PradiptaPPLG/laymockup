const fs = require('fs');

function applyAlignmentFix(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // 1. Update CSS
  const oldCssBlock = `.etalase-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .etalase-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-card);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .etalase-card:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-4px);
      border-color: #d1d5db;
    }

    .etalase-card.featured {
      border-color: rgba(79, 70, 229, 0.35);
    }

    .etalase-preview-box {
      width: 100%;
      aspect-ratio: 16 / 9;
      height: auto;
      min-height: 200px;
      background: #edf2f7;
      border-bottom: 1px solid var(--border-color);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .etalase-preview-box canvas {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .etalase-badge-top {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(9, 13, 22, 0.88);
      backdrop-filter: blur(8px);
      color: #FFE3ED;
      border: 1px solid rgba(255, 227, 237, 0.45);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.02em;
      display: flex;
      align-items: center;
      gap: 5px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 2;
    }

    .etalase-badge-top.emerald {
      background: rgba(13, 121, 115, 0.92);
      color: #FFE3ED;
      border-color: rgba(255, 227, 237, 0.45);
    }

    .etalase-content {
      padding: 26px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .etalase-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .etalase-tag {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent);
    }

    .etalase-tag.emerald {
      color: #0f766e;
      background: #eafaf8;
      border: 1px solid #bceae6;
    }

    .etalase-title {
      font-size: 21px;
      font-weight: 700;
      color: var(--fg);
      margin-bottom: 14px;
      letter-spacing: -0.02em;
    }

    .etalase-description {
      font-size: 14px;
      color: var(--fg-muted);
      line-height: 1.6;
      margin-bottom: 20px;
      flex-grow: 1;
    }

    .specs-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      padding: 14px 16px;
      background: #f9fafb;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      margin-bottom: 22px;
    }

    .spec-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .spec-key {
      font-size: 11px;
      color: var(--fg-subtle);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }

    .spec-val {
      font-size: 13px;
      font-weight: 600;
      color: var(--fg);
    }

    .etalase-btn-wrap {
      display: flex;
      align-items: center;

      gap: 10px;
    }

    .etalase-btn-wrap .btn {
      flex: 1;
    }`;

  const newCssBlock = `.etalase-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      align-items: stretch; /* Menjamin semua kartu dalam 1 baris sama tinggi persis */
    }

    .etalase-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-card);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      position: relative;
      height: 100%; /* Stretch penuh sesuai tinggi baris */
    }

    .etalase-card:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-4px);
      border-color: #d1d5db;
    }

    .etalase-card.featured {
      border-color: rgba(155, 227, 222, 0.6);
    }

    .etalase-preview-box {
      width: 100%;
      aspect-ratio: 16 / 9;
      height: auto;
      min-height: 200px;
      background: #edf2f7;
      border-bottom: 1px solid var(--border-color);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0; /* Preview kanvas tidak boleh mengecil */
    }

    .etalase-preview-box canvas {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .etalase-badge-top {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(9, 13, 22, 0.88);
      backdrop-filter: blur(8px);
      color: #FFE3ED;
      border: 1px solid rgba(255, 227, 237, 0.45);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.02em;
      display: flex;
      align-items: center;
      gap: 5px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 2;
    }

    .etalase-badge-top.emerald {
      background: rgba(13, 121, 115, 0.92);
      color: #FFE3ED;
      border-color: rgba(255, 227, 237, 0.45);
    }

    .etalase-content {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex: 1 1 auto; /* Mengisi penuh kartu agar tombol terdorong ke dasar */
    }

    .etalase-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      flex-shrink: 0;
    }

    .etalase-tag {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent);
    }

    .etalase-tag.emerald {
      color: #0f766e;
      background: #eafaf8;
      border: 1px solid #bceae6;
    }

    .etalase-title {
      font-size: 20px;
      line-height: 1.35;
      font-weight: 700;
      color: var(--fg);
      margin-bottom: 14px;
      letter-spacing: -0.02em;
      min-height: 54px; /* Menjamin 2 baris judul sejajar sempurna di semua kartu */
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .etalase-description {
      font-size: 14px;
      color: var(--fg-muted);
      line-height: 1.6;
      margin-bottom: 20px;
      flex-grow: 1;
    }

    .specs-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px 14px;
      padding: 14px 16px;
      background: #f9fafb;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      margin-bottom: 20px;
      min-height: 140px; /* Menjamin kotak spesifikasi selalu berukuran sama */
      box-sizing: border-box;
      align-content: space-between;
    }

    .spec-item {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-height: 48px; /* Menjamin baris 1 dan baris 2 item sejajar presisi */
      justify-content: flex-start;
    }

    .spec-key {
      font-size: 11px;
      color: var(--fg-subtle);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }

    .spec-val {
      font-size: 12.5px;
      line-height: 1.35;
      font-weight: 600;
      color: var(--fg);
    }

    .etalase-btn-wrap {
      margin-top: auto; /* Mendorong tombol sejajar sempurna di garis bawah kartu */
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding-top: 4px;
    }

    .etalase-btn-wrap .btn {
      flex: 1;
      height: 46px; /* Tinggi tombol seragam presisi */
      min-height: 46px;
      max-height: 46px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-sizing: border-box;
      font-size: 13.5px;
      font-weight: 700;
      border-radius: 12px;
      text-decoration: none;
    }`;

  if (!content.includes(oldCssBlock)) {
    console.error('oldCssBlock not found in', filename);
    return false;
  }

  content = content.replace(oldCssBlock, newCssBlock);

  // 2. Harmonize spec values in HTML so they are clean and perfectly balanced
  // Card 1
  content = content.replace(
    `<span class="spec-val">1 - 3 - 4 - 3 - 1 Terpusat</span>`,
    `<span class="spec-val">1-3-4-3-1 Terpusat</span>`
  );
  content = content.replace(
    `<span class="spec-val">0.88x (1:1) & 0.55x (Fit)</span>`,
    `<span class="spec-val">0.88x (1:1 Standar)</span>`
  );
  content = content.replace(
    `<span class="spec-val">40px × 40px</span>`,
    `<span class="spec-val">40px × 40px Rapi</span>`
  );
  content = content.replace(
    `<span class="spec-val">Simetris & Fokus Tengah</span>`,
    `<span class="spec-val">Simetris & Fokus</span>`
  );

  // Card 2
  content = content.replace(
    `<span class="spec-val">1 - 3 - 4 - 3 - 1 Stretch</span>`,
    `<span class="spec-val">1-3-4-3-1 Stretch</span>`
  );
  content = content.replace(
    `<span class="spec-val">1.18x (Edge Fill Sinematik)</span>`,
    `<span class="spec-val">1.18x (Edge Sinematik)</span>`
  );
  content = content.replace(
    `<span class="spec-val">Tepi Penuh Sinematik</span>`,
    `<span class="spec-val">Tepi Penuh Layar</span>`
  );

  // Card 3
  content = content.replace(
    `<span class="spec-val">1 - 2 - 3 - 2 - 1 Ramping</span>`,
    `<span class="spec-val">1-2-3-2-1 Ramping</span>`
  );
  content = content.replace(
    `<span class="spec-val">0.82x (Normal Proporsional)</span>`,
    `<span class="spec-val">0.82x (Zoom-Out Lega)</span>`
  );
  content = content.replace(
    `<span class="spec-val">Ringan & Bernafas Lega</span>`,
    `<span class="spec-val">Proporsional & Bersih</span>`
  );

  // Card 4
  content = content.replace(
    `<span class="spec-val">1 - 2 - 3 - 2 - 1 Melebar</span>`,
    `<span class="spec-val">1-2-3-2-1 Melebar</span>`
  );
  content = content.replace(
    `<span class="spec-val">1.32x (Stretch Full-Bleed)</span>`,
    `<span class="spec-val">1.32x (Stretch Full)</span>`
  );
  content = content.replace(
    `<span class="spec-val">36px × 36px Rapat Presisi</span>`,
    `<span class="spec-val">36px × 36px Rapat</span>`
  );
  content = content.replace(
    `<span class="spec-val">Visual Besar & Dramatis</span>`,
    `<span class="spec-val">Visual Besar Dramatis</span>`
  );

  // Card 5
  content = content.replace(
    `<span class="spec-val">2 - 3 - 2 Staggered</span>`,
    `<span class="spec-val">2-3-2 Staggered</span>`
  );

  // Card 6
  content = content.replace(
    `<span class="spec-val">2 - 3 - 2 Layar HP</span>`,
    `<span class="spec-val">2-3-2 Layar HP</span>`
  );
  content = content.replace(
    `<span class="spec-val">9:16 Portrait Mobile</span>`,
    `<span class="spec-val">9:16 Portrait HP</span>`
  );
  content = content.replace(
    `<span class="spec-val">Flagship Frame & Dynamic Pill</span>`,
    `<span class="spec-val">Titanium Frame 3D</span>`
  );
  content = content.replace(
    `<span class="spec-val">Khusus UI Aplikasi HP</span>`,
    `<span class="spec-val">Khusus UI Mobile App</span>`
  );

  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Successfully applied alignment fix to ${filename}`);
  return true;
}

applyAlignmentFix('index.html');
applyAlignmentFix('beranda.html');

