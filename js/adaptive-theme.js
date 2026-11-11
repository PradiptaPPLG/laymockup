/**
 * ADAPTIVE THEME EXTRACTOR - LayMockup × PixelCam
 * Ekstraksi rona warna dominan & harmonisasi latar studio secara otomatis (Real-Time Client-Side).
 * Mendukung deteksi gambar dominan (merah, hijau, biru, ungu, oranye, dll.)
 * agar latar studio mockup menyatu ("nyambung") secara estetis dengan UI pengguna.
 */

(function (window) {
  'use strict';

  class AdaptiveThemeExtractor {
    /**
     * Mengekstrak rona (hue), saturasi, kecerahan, dan tone dominan dari gambar aktif.
     * @param {Array} sources - Array elemen gambar atau kanvas (dari getActiveSlots())
     * @param {Array} [userImages] - Array gambar yang diunggah pengguna (diprioritaskan)
     * @returns {Object} { hasColor, hue, sat, light, isDarkUI, hex, bgCanvasCss, accentColor }
     */
    static extractFromSources(sources, userImages = null) {
      let sampleList = [];

      // 1. Prioritaskan gambar asli yang diunggah user
      if (userImages && Array.isArray(userImages)) {
        sampleList = userImages.filter(img => img && ((img.tagName === 'IMG' && img.naturalWidth > 0) || (img.tagName === 'CANVAS' && img.width > 0)));
      }

      // 2. Jika user belum mengunggah gambar, gunakan kartu aktif (demo cards)
      if (!sampleList.length && sources && Array.isArray(sources)) {
        sampleList = sources.filter(s => s && ((s.tagName === 'IMG' && s.naturalWidth > 0) || (s.tagName === 'CANVAS' && s.width > 0)));
      }

      // Jika tidak ada gambar sama sekali, fallback ke tema netral
      if (!sampleList.length) {
        return {
          hasColor: false,
          hue: 165,
          sat: 0.3,
          light: 0.5,
          isDarkUI: false,
          bgCanvasCss: '#dbe2ec',
          accentColor: '#0f766e'
        };
      }

      // Gunakan kanvas kecil (36x36) untuk sampling super cepat (< 1ms)
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = 36;
      sampleCanvas.height = 36;
      const sCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
      if (!sCtx) {
        return {
          hasColor: false,
          hue: 165,
          sat: 0.3,
          light: 0.5,
          isDarkUI: false,
          bgCanvasCss: '#dbe2ec',
          accentColor: '#0f766e'
        };
      }

      const bins = new Float32Array(24);
      const binHues = Array.from({ length: 24 }, () => []);
      const binSats = Array.from({ length: 24 }, () => []);
      const binLights = Array.from({ length: 24 }, () => []);

      let totalLightness = 0;
      let sampledPixelCount = 0;

      // Ambil hingga 3 gambar (fokus hero dan sekitarnya)
      const targets = sampleList.slice(0, 3);
      for (const src of targets) {
        try {
          sCtx.clearRect(0, 0, 36, 36);
          sCtx.drawImage(src, 0, 0, 36, 36);
          const imgData = sCtx.getImageData(0, 0, 36, 36).data;

          for (let i = 0; i < imgData.length; i += 4) {
            const alpha = imgData[i + 3];
            if (alpha < 128) continue; // Lewati piksel transparan

            const r = imgData[i] / 255;
            const g = imgData[i + 1] / 255;
            const b = imgData[i + 2] / 255;

            // Konversi RGB ke HSL
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
              h *= 60; // 0..360 derajat
            }

            totalLightness += l;
            sampledPixelCount++;

            // Saring piksel monokrom ekstrem (hitam pekat, putih murni, abu netral)
            if (s >= 0.12 && l >= 0.08 && l <= 0.92) {
              // Bobot berdasarkan saturasi dan kedalaman warna
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
        } catch (e) {
          // Tangani CORS jika ada gambar eksternal
        }
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
        const domS = binSats[bestBin].reduce((a, b) => a + b, 0) / binSats[bestBin].length;
        const domL = binLights[bestBin].reduce((a, b) => a + b, 0) / binLights[bestBin].length;

        const roundH = Math.round(domH);
        return {
          hasColor: true,
          hue: roundH,
          sat: domS,
          light: domL,
          isDarkUI: isDarkUI,
          bgCanvasCss: isDarkUI ? `hsl(${roundH}, 32%, 7%)` : `hsl(${roundH}, 38%, 88%)`,
          accentColor: `hsl(${roundH}, 75%, 45%)`
        };
      }

      // Jika screenshot dominan monokrom / grayscale
      return {
        hasColor: false,
        hue: 215,
        sat: 0.1,
        light: avgL,
        isDarkUI: isDarkUI,
        bgCanvasCss: isDarkUI ? '#070a0f' : '#dbe2ec',
        accentColor: '#0f766e'
      };
    }

    /**
     * Menggambar latar belakang kanvas studio yang adaptif dan harmonis.
     */
    static drawAdaptiveBackground(ctx, width, height, palette) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      if (palette && palette.hasColor) {
        const h = palette.hue;

        if (palette.isDarkUI) {
          // Latar Gelap Bernuansa Ambient Selaras (Atmospheric Dark Studio)
          const grad = ctx.createRadialGradient(
            width * 0.5, height * 0.45, width * 0.05,
            width * 0.5, height * 0.5, width * 0.75
          );
          grad.addColorStop(0, `hsl(${h}, 42%, 14%)`);
          grad.addColorStop(0.5, `hsl(${h}, 36%, 8%)`);
          grad.addColorStop(1, `hsl(${h}, 30%, 4%)`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Pendaran cahaya ambient studio di lantai
          const glow = ctx.createRadialGradient(
            width * 0.5, height * 0.52, 60,
            width * 0.5, height * 0.52, width * 0.58
          );
          glow.addColorStop(0, `hsla(${h}, 70%, 50%, 0.16)`);
          glow.addColorStop(1, `hsla(${h}, 70%, 50%, 0)`);
          ctx.fillStyle = glow;
          ctx.fillRect(0, 0, width, height);
        } else {
          // Latar Terang Bernuansa Pastel Selaras (Harmonious Pastel Studio)
          const grad = ctx.createLinearGradient(0, 0, width, height);
          grad.addColorStop(0, `hsl(${h}, 42%, 97%)`);
          grad.addColorStop(0.45, `hsl(${h}, 46%, 93%)`);
          grad.addColorStop(1, `hsl(${h}, 38%, 87%)`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Pendaran radial lembut di belakang kartu isometrik
          const ambient = ctx.createRadialGradient(
            width * 0.5, height * 0.48, 80,
            width * 0.5, height * 0.48, width * 0.62
          );
          ambient.addColorStop(0, `hsla(${h}, 60%, 98%, 0.65)`);
          ambient.addColorStop(1, `hsla(${h}, 40%, 88%, 0)`);
          ctx.fillStyle = ambient;
          ctx.fillRect(0, 0, width, height);
        }
      } else {
        // Fallback monokrom bersih
        if (palette && palette.isDarkUI) {
          const grad = ctx.createRadialGradient(
            width * 0.5, height * 0.45, width * 0.05,
            width * 0.5, height * 0.5, width * 0.75
          );
          grad.addColorStop(0, '#0d151c');
          grad.addColorStop(1, '#05080b');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);
        } else {
          const grad = ctx.createLinearGradient(0, 0, width, height);
          grad.addColorStop(0, '#f8fafc');
          grad.addColorStop(0.5, '#edf2f7');
          grad.addColorStop(1, '#e2e8f0');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);
        }
      }
    }

    /**
     * SVG Icon Gerigi (Gear / Settings) untuk Mode Sesuaikan Tema (Default)
     */
    static getGearIconSvg() {
      return '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>';
    }

    /**
     * SVG Icon Matahari (Sun) untuk Light Mode
     */
    static getSunIconSvg() {
      return '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    }

    /**
     * SVG Icon Bulan Sabit (Moon) untuk Dark Mode
     */
    static getMoonIconSvg() {
      return '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
  }

  window.AdaptiveThemeExtractor = AdaptiveThemeExtractor;
})(window);
