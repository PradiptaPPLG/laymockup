/**
 * ADAPTIVE THEME & SOLID COLOR DROPDOWN EXTRACTOR
 * LayMockup × PixelCam
 * 
 * Fitur:
 * 1. 100% Solid Color (Bebas gradien, murni warna solid studio)
 * 2. Mode "Sesuaikan Gambar (Auto)": Ekstraksi warna solid harmonis dari screenshot secara real-time
 * 3. Dropdown Selection Color:
 *    - Mode Utama: ⚙️ Sesuaikan Gambar (Auto), ☀️ Solid Light, 🌙 Solid Dark
 *    - 14 Swatch Warna Solid Populer (Putih, Abu, Hitam, Mint, Emerald, Rose, Crimson, Sky, Blue, Lavender, Violet, Amber, Peach, Sand)
 *    - Custom Color Picker Bebas (Hex Input)
 */

(function (window) {
  'use strict';

  class AdaptiveThemeExtractor {
    /**
     * Mengekstrak rona dan menghitung warna solid yang harmonis dari screenshot.
     */
    static extractFromSources(sources, userImages = null) {
      let sampleList = [];

      if (userImages && Array.isArray(userImages)) {
        sampleList = userImages.filter(img => img && ((img.tagName === 'IMG' && img.naturalWidth > 0) || (img.tagName === 'CANVAS' && img.width > 0)));
      }

      if (!sampleList.length && sources && Array.isArray(sources)) {
        sampleList = sources.filter(s => s && ((s.tagName === 'IMG' && s.naturalWidth > 0) || (s.tagName === 'CANVAS' && s.width > 0)));
      }

      if (!sampleList.length) {
        return {
          hasColor: false,
          hue: 215,
          sat: 0.1,
          light: 0.94,
          isDarkUI: false,
          solidColor: '#f1f5f9',
          accentColor: '#0f766e',
          bgCanvasCss: '#f1f5f9'
        };
      }

      if (typeof document === 'undefined') {
        return {
          hasColor: true,
          hue: 0,
          sat: 0.75,
          light: 0.5,
          isDarkUI: false,
          solidColor: 'hsl(0, 40%, 93%)',
          accentColor: 'hsl(0, 75%, 45%)',
          bgCanvasCss: 'hsl(0, 40%, 93%)'
        };
      }

      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = 36;
      sampleCanvas.height = 36;
      const sCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
      if (!sCtx) {
        return {
          hasColor: false,
          hue: 215,
          sat: 0.1,
          light: 0.94,
          isDarkUI: false,
          solidColor: '#f1f5f9',
          accentColor: '#0f766e',
          bgCanvasCss: '#f1f5f9'
        };
      }

      const bins = new Float32Array(24);
      const binHues = Array.from({ length: 24 }, () => []);
      const binSats = Array.from({ length: 24 }, () => []);
      const binLights = Array.from({ length: 24 }, () => []);

      let totalLightness = 0;
      let sampledPixelCount = 0;

      const targets = sampleList.slice(0, 3);
      for (const src of targets) {
        try {
          sCtx.clearRect(0, 0, 36, 36);
          sCtx.drawImage(src, 0, 0, 36, 36);
          const imgData = sCtx.getImageData(0, 0, 36, 36).data;

          for (let i = 0; i < imgData.length; i += 4) {
            const alpha = imgData[i + 3];
            if (alpha < 128) continue;

            const r = imgData[i] / 255;
            const g = imgData[i + 1] / 255;
            const b = imgData[i + 2] / 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h = 0, s = 0;
            const l = (max + min) / 2;
            const d = max - min;

            if (d > 0.001) {
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
              }
              h *= 60;
            }

            totalLightness += l;
            sampledPixelCount++;

            if (s >= 0.12 && l >= 0.08 && l <= 0.92) {
              const weight = s * (1.0 - Math.abs(l - 0.5) * 1.25);
              if (weight > 0) {
                const binIdx = Math.floor(h / 15) % 24;
                bins[binIdx] += weight;
                binHues[binIdx].push({ h, w: weight });
                binSats[binIdx].push(s);
                binLights[binIdx].push(l);
              }
            }
          }
        } catch (e) {}
      }

      const avgL = sampledPixelCount > 0 ? (totalLightness / sampledPixelCount) : 0.5;
      const isDarkUI = avgL < 0.42;

      let maxWeight = 0;
      let bestBin = -1;
      for (let b = 0; b < 24; b++) {
        if (bins[b] > maxWeight) {
          maxWeight = bins[b];
          bestBin = b;
        }
      }

      if (bestBin !== -1 && maxWeight > 0.4) {
        const items = binHues[bestBin];
        const sumW = items.reduce((acc, cur) => acc + cur.w, 0);
        const domH = items.reduce((acc, cur) => acc + cur.h * cur.w, 0) / (sumW || 1);
        const roundH = Math.round(domH);

        // Murni warna solid studio (tanpa gradasi)
        const solidColor = isDarkUI
          ? `hsl(${roundH}, 35%, 10%)`
          : `hsl(${roundH}, 40%, 93%)`;

        return {
          hasColor: true,
          hue: roundH,
          sat: binSats[bestBin].reduce((a, b) => a + b, 0) / binSats[bestBin].length,
          light: binLights[bestBin].reduce((a, b) => a + b, 0) / binLights[bestBin].length,
          isDarkUI: isDarkUI,
          solidColor: solidColor,
          bgCanvasCss: solidColor,
          accentColor: `hsl(${roundH}, 75%, 45%)`
        };
      }

      const solidColor = isDarkUI ? '#0b0f17' : '#f1f5f9';
      return {
        hasColor: false,
        hue: 215,
        sat: 0.1,
        light: avgL,
        isDarkUI: isDarkUI,
        solidColor: solidColor,
        bgCanvasCss: solidColor,
        accentColor: '#0f766e'
      };
    }

    /**
     * Menggambar latar kanvas 100% Solid Color (Tanpa Gradasi)
     */
    static drawSolidBackground(ctx, width, height, color) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = color || '#f1f5f9';
      ctx.fillRect(0, 0, width, height);
    }

    static getGearIconSvg() {
      return '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>';
    }

    static getSunIconSvg() {
      return '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    }

    static getMoonIconSvg() {
      return '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }

    static getPaletteIconSvg() {
      return '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>';
    }
  }

  // Injeksi CSS dropdown warna solid jika belum ada
  function injectDropdownStyles() {
    if (document.getElementById('color-dropdown-styles')) return;
    const style = document.createElement('style');
    style.id = 'color-dropdown-styles';
    style.textContent = `
      .change-color-wrap {
        position: relative !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 9px !important;
      }
      .color-dropdown {
        display: none;
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        width: 310px;
        background: #ffffff;
        border: 1px solid rgba(15, 23, 42, 0.12);
        border-radius: 14px;
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16), 0 4px 12px rgba(15, 23, 42, 0.06);
        padding: 14px;
        z-index: 1050;
        box-sizing: border-box;
        flex-direction: column;
        gap: 12px;
        transform-origin: top right;
        animation: colorDropPop 0.16s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .color-dropdown.open {
        display: flex !important;
      }
      @keyframes colorDropPop {
        from { opacity: 0; transform: translateY(-6px) scale(0.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .color-dropdown-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 2px;
        border-bottom: 1px solid rgba(15, 23, 42, 0.08);
      }
      .color-dropdown-title {
        font-size: 13px;
        font-weight: 700;
        color: #0f172a;
      }
      .color-dropdown-close {
        background: transparent;
        border: none;
        color: #94a3b8;
        font-size: 18px;
        line-height: 1;
        padding: 2px 6px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .color-dropdown-close:hover {
        background: #f1f5f9;
        color: #0f172a;
      }
      .color-options-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .color-option-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 10px;
        border-radius: 10px;
        border: 1.5px solid transparent;
        background: #f8fafc;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .color-option-btn:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
      }
      .color-option-btn.active {
        background: #eff6ff;
        border-color: #3b82f6;
      }
      .color-option-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .color-option-icon {
        font-size: 16px;
        line-height: 1;
      }
      .color-option-name {
        font-size: 12px;
        font-weight: 700;
        color: #0f172a;
        line-height: 1.2;
      }
      .color-option-desc {
        font-size: 10px;
        color: #64748b;
        margin-top: 1px;
      }
      .color-preview-pill {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 1.5px solid rgba(15, 23, 42, 0.15);
        flex-shrink: 0;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.06);
      }
      .color-section-label {
        font-size: 11px;
        font-weight: 700;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-top: 2px;
      }
      .color-swatches-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
      }
      .color-swatch-btn {
        width: 100%;
        aspect-ratio: 1;
        border-radius: 8px;
        border: 1.5px solid rgba(15, 23, 42, 0.12);
        cursor: pointer;
        padding: 0;
        transition: all 0.15s ease;
        position: relative;
      }
      .color-swatch-btn:hover {
        transform: scale(1.14);
        box-shadow: 0 4px 8px rgba(0,0,0,0.12);
        z-index: 2;
      }
      .color-swatch-btn.active {
        border-color: #2563eb !important;
        box-shadow: 0 0 0 2px #2563eb, 0 2px 6px rgba(0,0,0,0.15);
      }
      .color-custom-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding-top: 6px;
        border-top: 1px solid rgba(15, 23, 42, 0.08);
      }
      .color-custom-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        font-weight: 600;
        color: #334155;
        cursor: pointer;
      }
      .color-picker-input {
        width: 26px;
        height: 26px;
        padding: 0;
        border: 1.5px solid rgba(15, 23, 42, 0.2);
        border-radius: 6px;
        cursor: pointer;
        background: transparent;
      }
      .color-hex-tag {
        font-family: ui-monospace, monospace;
        font-size: 11px;
        font-weight: 700;
        color: #475569;
        background: #f1f5f9;
        padding: 3px 7px;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Menyiapkan dropdown pemilihan warna solid di sebelah tombol Change Color
   */
  function setupColorDropdown() {
    const btnToggle = document.getElementById('btn-theme-toggle');
    if (!btnToggle) return;

    injectDropdownStyles();

    // Pastikan container tombol memiliki class .change-color-wrap
    let wrap = btnToggle.closest('.change-color-wrap');
    if (!wrap) {
      wrap = btnToggle.parentElement;
      wrap.classList.add('change-color-wrap');
    }

    // Jika dropdown sudah ada, jangan buat ganda
    let dropdown = document.getElementById('color-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.id = 'color-dropdown';
      dropdown.className = 'color-dropdown';
      dropdown.innerHTML = `
        <div class="color-dropdown-header">
          <div class="color-dropdown-title">Pilih Warna Latar Solid</div>
          <button id="btn-close-color-dropdown" class="color-dropdown-close" title="Tutup">&times;</button>
        </div>

        <div class="color-options-group">
          <div class="color-option-btn active" data-mode="auto" title="Otomatis mengikuti warna gambar">
            <div class="color-option-left">
              <span class="color-option-icon">⚙️</span>
              <div class="color-option-text">
                <div class="color-option-name">Sesuaikan Gambar (Auto)</div>
                <div class="color-option-desc">Warna solid adaptif dari screenshot</div>
              </div>
            </div>
            <div class="color-preview-pill" id="auto-color-indicator" style="background:#e2f6eb;"></div>
          </div>

          <div class="color-option-btn" data-mode="light" title="Warna solid terang netral">
            <div class="color-option-left">
              <span class="color-option-icon">☀️</span>
              <div class="color-option-text">
                <div class="color-option-name">Solid Light</div>
                <div class="color-option-desc">Studio abu-terang netral (#f1f5f9)</div>
              </div>
            </div>
            <div class="color-preview-pill" style="background: #f1f5f9; border: 1px solid #cbd5e1;"></div>
          </div>

          <div class="color-option-btn" data-mode="dark" title="Warna solid gelap obsidian">
            <div class="color-option-left">
              <span class="color-option-icon">🌙</span>
              <div class="color-option-text">
                <div class="color-option-name">Solid Dark</div>
                <div class="color-option-desc">Studio hitam-obsidian (#0b0f17)</div>
              </div>
            </div>
            <div class="color-preview-pill" style="background: #0b0f17; border: 1px solid #334155;"></div>
          </div>
        </div>

        <div class="color-section-label">Preset Warna Solid</div>
        <div class="color-swatches-grid">
          <button class="color-swatch-btn" data-color="#ffffff" title="Putih Bersih" style="background:#ffffff;"></button>
          <button class="color-swatch-btn" data-color="#f1f5f9" title="Abu Studio" style="background:#f1f5f9;"></button>
          <button class="color-swatch-btn" data-color="#e2e8f0" title="Cool Grey" style="background:#e2e8f0;"></button>
          <button class="color-swatch-btn" data-color="#0b0f17" title="Obsidian Gelap" style="background:#0b0f17;"></button>
          <button class="color-swatch-btn" data-color="#dcfce7" title="Mint Pastel" style="background:#dcfce7;"></button>
          <button class="color-swatch-btn" data-color="#166534" title="Hijau Emerald" style="background:#166534;"></button>
          <button class="color-swatch-btn" data-color="#ffe4e6" title="Rose Pastel" style="background:#ffe4e6;"></button>
          <button class="color-swatch-btn" data-color="#991b1b" title="Merah Crimson" style="background:#991b1b;"></button>
          <button class="color-swatch-btn" data-color="#e0f2fe" title="Sky Pastel" style="background:#e0f2fe;"></button>
          <button class="color-swatch-btn" data-color="#1e40af" title="Royal Blue" style="background:#1e40af;"></button>
          <button class="color-swatch-btn" data-color="#f3e8ff" title="Lavender Pastel" style="background:#f3e8ff;"></button>
          <button class="color-swatch-btn" data-color="#6b21a8" title="Deep Violet" style="background:#6b21a8;"></button>
          <button class="color-swatch-btn" data-color="#fef3c7" title="Amber Pastel" style="background:#fef3c7;"></button>
          <button class="color-swatch-btn" data-color="#ffedd5" title="Peach Pastel" style="background:#ffedd5;"></button>
        </div>

        <div class="color-custom-row">
          <label for="custom-color-picker" class="color-custom-label">
            <input type="color" id="custom-color-picker" value="#f1f5f9" class="color-picker-input">
            <span>Pilih Warna Bebas</span>
          </label>
          <span id="custom-color-hex" class="color-hex-tag">#f1f5f9</span>
        </div>
      `;
      wrap.appendChild(dropdown);
    }

    // Toggle Dropdown saat tombol diklik
    btnToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
      // Update indikator warna auto saat dropdown terbuka
      updateAutoIndicator();
    });

    // Cegah klik di dalam dropdown menutup dropdown
    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Tombol close
    const btnClose = document.getElementById('btn-close-color-dropdown');
    if (btnClose) {
      btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.remove('open');
      });
    }

    // Klik di luar menutup dropdown
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !btnToggle.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });

    function updateAutoIndicator() {
      const ind = document.getElementById('auto-color-indicator');
      if (ind && typeof getActiveSlots === 'function') {
        const pal = AdaptiveThemeExtractor.extractFromSources(getActiveSlots(), typeof userImages !== 'undefined' ? userImages : null);
        if (pal && pal.solidColor) {
          ind.style.background = pal.solidColor;
        }
      }
    }

    function setActiveOption(mode, customColor = null) {
      document.querySelectorAll('.color-option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
      });
      document.querySelectorAll('.color-swatch-btn').forEach(sw => {
        sw.classList.toggle('active', sw.dataset.color === customColor);
      });
      const hexTag = document.getElementById('custom-color-hex');
      const colorPicker = document.getElementById('custom-color-picker');
      if (customColor) {
        if (hexTag) hexTag.textContent = customColor;
        if (colorPicker) colorPicker.value = customColor.startsWith('#') ? customColor : '#f1f5f9';
      }
    }

    // Handler Mode Utama (Auto, Light, Dark)
    document.querySelectorAll('.color-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        setActiveOption(mode);

        if (typeof window.applyStudioColorChoice === 'function') {
          window.applyStudioColorChoice(mode, null);
        }

        dropdown.classList.remove('open');
      });
    });

    // Handler Preset Swatch Warna Solid
    document.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        setActiveOption('custom', color);

        if (typeof window.applyStudioColorChoice === 'function') {
          window.applyStudioColorChoice('custom', color);
        }

        dropdown.classList.remove('open');
      });
    });

    // Handler Custom Color Picker
    const picker = document.getElementById('custom-color-picker');
    if (picker) {
      picker.addEventListener('input', (e) => {
        const color = e.target.value;
        const hexTag = document.getElementById('custom-color-hex');
        if (hexTag) hexTag.textContent = color;
        setActiveOption('custom', color);

        if (typeof window.applyStudioColorChoice === 'function') {
          window.applyStudioColorChoice('custom', color);
        }
      });
    }

    window.updateColorDropdownIndicator = updateAutoIndicator;
  }

  // Jalankan inisialisasi dropdown saat DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupColorDropdown);
  } else {
    setupColorDropdown();
  }

  window.AdaptiveThemeExtractor = AdaptiveThemeExtractor;
})(window);
