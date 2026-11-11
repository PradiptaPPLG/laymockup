/**
 * LayMockup × PixelCam — 4K AI Retouch & UHD Simulation Modal
 * Light Mode Studio Aesthetic (Apple / Minimalist Pastel)
 *
 * Features:
 * - Simple White Preloader ("Menyiapkan AI Retouch...") before opening popup
 * - Clean White Glassmorphism Card with LayMockup signature mint/pink pastel accents
 * - Crisp Ink Dot Matrix Canvas (Deep Teal to Vibrant Rose) on warm light viewport
 * - ChatGPT-style Image Generation Experience with LatticeLoader "Thinking"
 * - Randomized 10-20s duration with organic progress easing and rotating phase labels
 * - Auto-close and auto-trigger high-res download
 * - Minimalist & uncluttered (no AI slop buttons, pure focused experience)
 */
(function () {
  'use strict';

  // Inject CSS
  const style = document.createElement('style');
  style.id = 'ai-retouch-styles';
  style.textContent = `
    /* ===== AI BADGE IN RESOLUTION PICKER ===== */
    .badge-ai-uhd {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: linear-gradient(135deg, #eafaf8 0%, #FFE3ED 100%);
      border: 1px solid #9BE3DE;
      color: #044343;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 999px;
      margin-left: 6px;
      letter-spacing: 0.3px;
      vertical-align: middle;
      box-shadow: 0 2px 8px rgba(155, 227, 222, 0.35);
      animation: aiBadgePulse 2.4s ease-in-out infinite alternate;
    }
    @keyframes aiBadgePulse {
      0% {
        box-shadow: 0 0 0 rgba(155, 227, 222, 0);
        border-color: #9BE3DE;
      }
      100% {
        box-shadow: 0 0 10px rgba(255, 184, 210, 0.7);
        border-color: #FFB8D2;
      }
    }

    .res-card.res-card-ai.active {
      border-color: #9BE3DE !important;
      box-shadow: 0 0 16px rgba(155, 227, 222, 0.4) !important;
    }

    /* ===== SIMPLE WHITE PRELOADER ===== */
    .ai-white-preloader {
      position: fixed;
      inset: 0;
      z-index: 10002;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.32);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      opacity: 0;
      transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: auto;
    }
    .ai-white-preloader.active {
      display: flex;
      opacity: 1;
    }
    .ai-white-preloader.closing {
      opacity: 0;
    }
    .ai-preloader-card {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #FFFFFF;
      border: 1.5px solid #e2edea;
      padding: 14px 26px;
      border-radius: 999px;
      box-shadow:
        0 20px 45px -10px rgba(15, 23, 42, 0.16),
        0 0 0 1px rgba(155, 227, 222, 0.35);
      animation: preloaderBounceIn 0.32s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes preloaderBounceIn {
      0% {
        opacity: 0;
        transform: scale(0.9) translateY(12px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    .ai-preloader-spinner {
      width: 18px;
      height: 18px;
      border: 2.5px solid #e2edea;
      border-top-color: #0d9488;
      border-radius: 50%;
      animation: preloaderSpin 0.75s linear infinite;
      flex-shrink: 0;
    }
    @keyframes preloaderSpin {
      to { transform: rotate(360deg); }
    }
    .ai-preloader-text {
      font-size: 13.5px;
      font-weight: 600;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      letter-spacing: -0.01em;
      white-space: nowrap;
    }

    /* ===== AI RETOUCH MODAL OVERLAY (LIGHT MODE) ===== */
    .ai-retouch-overlay {
      position: fixed;
      inset: 0;
      z-index: 10001;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      padding: 16px;
      box-sizing: border-box;
      opacity: 0;
      transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .ai-retouch-overlay.active {
      display: flex;
      opacity: 1;
    }
    .ai-retouch-overlay.closing {
      opacity: 0;
    }

    /* Modal Card — Clean Crisp White */
    .ai-retouch-card {
      width: 100%;
      max-width: 440px;
      background: #FFFFFF;
      border: 1.5px solid #e2edea;
      border-radius: 24px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow:
        0 24px 60px -12px rgba(15, 23, 42, 0.18),
        0 0 0 1px rgba(155, 227, 222, 0.25),
        0 0 40px rgba(155, 227, 222, 0.15);
      transform: scale(0.94) translateY(18px);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .ai-retouch-overlay.active .ai-retouch-card {
      transform: scale(1) translateY(0);
    }
    .ai-retouch-overlay.closing .ai-retouch-card {
      transform: scale(0.94) translateY(12px);
    }

    /* Header */
    .ai-retouch-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: #FFFFFF;
      border-bottom: 1px solid #f1f5f9;
    }
    .ai-retouch-header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .ai-retouch-sparkle {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: linear-gradient(135deg, #eafaf8 0%, #FFE3ED 100%);
      border: 1.5px solid #9BE3DE;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      color: #044343;
      box-shadow: 0 2px 8px rgba(155, 227, 222, 0.35);
      flex-shrink: 0;
    }
    .ai-retouch-title {
      font-size: 14.5px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.015em;
      line-height: 1.25;
    }
    .ai-retouch-sub {
      font-size: 11px;
      color: #64748b;
      font-family: 'JetBrains Mono', -apple-system, monospace;
      margin-top: 2px;
    }
    .ai-retouch-close-btn {
      width: 30px;
      height: 30px;
      border-radius: 9px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      color: #64748b;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      line-height: 1;
      transition: all 0.18s;
    }
    .ai-retouch-close-btn:hover {
      background: #f1f5f9;
      color: #0f172a;
      border-color: #cbd5e1;
    }

    /* Dot Matrix Viewport (Light Canvas with Crisp Ink Dots) */
    .ai-dot-viewport {
      position: relative;
      width: 100%;
      height: 220px;
      background: #f8fafc;
      border-top: 1px solid #f1f5f9;
      border-bottom: 1px solid #f1f5f9;
      overflow: hidden;
    }
    .ai-dot-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    .ai-dot-gradient-veil {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg,
        rgba(155, 227, 222, 0.14) 0%,
        rgba(255, 184, 210, 0.12) 100%);
      pointer-events: none;
    }
    .ai-dot-scanline {
      position: absolute;
      left: 0;
      right: 0;
      height: 48px;
      background: linear-gradient(to bottom,
        transparent 0%,
        rgba(155, 227, 222, 0.28) 50%,
        transparent 100%);
      animation: aiScanlineSweep 2.8s linear infinite;
      pointer-events: none;
      z-index: 1;
    }
    @keyframes aiScanlineSweep {
      0%   { transform: translateY(-100%); opacity: 0.1; }
      50%  { opacity: 0.35; }
      100% { transform: translateY(230px); opacity: 0.1; }
    }

    /* Top-Left Scene Label (Clean Glass Pill) */
    .ai-dot-label {
      position: absolute;
      top: 14px;
      left: 16px;
      font-size: 12.5px;
      font-weight: 700;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      letter-spacing: -0.01em;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      padding: 4px 11px;
      border-radius: 8px;
      border: 1px solid rgba(226, 237, 234, 0.9);
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
      pointer-events: none;
      z-index: 2;
      transition: opacity 0.25s, transform 0.25s;
    }

    /* Bottom-Right Percentage Badge (Capsule) */
    .ai-dot-badge {
      position: absolute;
      bottom: 12px;
      right: 14px;
      background: #FFFFFF;
      border: 1.5px solid #cbd5e1;
      border-radius: 999px;
      padding: 4px 13px;
      font-size: 13px;
      font-weight: 800;
      color: #0d9488;
      font-family: 'JetBrains Mono', monospace;
      pointer-events: none;
      z-index: 2;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
      transition: color 0.3s, border-color 0.3s, background 0.3s;
    }
    .ai-dot-badge.done {
      color: #059669;
      border-color: #34d399;
      background: #ecfdf5;
    }

    /* Bottom Info & Lattice Loader (Clean & Focused, No Clutter) */
    .ai-retouch-bottom {
      padding: 16px 20px 20px;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* Resolution pills row */
    .ai-res-pills {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .ai-pill {
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      padding: 3px 9px;
      border-radius: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      color: #64748b;
      font-weight: 600;
    }
    .ai-pill.active {
      background: #eafaf8;
      border-color: #9BE3DE;
      color: #044343;
      font-weight: 800;
      box-shadow: 0 2px 8px rgba(155, 227, 222, 0.3);
    }

    /* Status row with LatticeLoader */
    .ai-status-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    /* LatticeLoader — 3x3 Mini Grid Animation (Teal to Rose) */
    .lattice-loader {
      display: grid;
      grid-template-columns: repeat(3, 4.5px);
      grid-template-rows: repeat(3, 4.5px);
      gap: 3px;
      flex-shrink: 0;
    }
    .lattice-loader span {
      width: 4.5px;
      height: 4.5px;
      border-radius: 50%;
      background: #0d9488;
      opacity: 0.25;
      animation: latticePulse 1.2s ease-in-out infinite alternate;
    }
    .lattice-loader span:nth-child(1) { animation-delay: 0.0s; background: #0d9488; }
    .lattice-loader span:nth-child(2) { animation-delay: 0.15s; background: #14b8a6; }
    .lattice-loader span:nth-child(3) { animation-delay: 0.3s; background: #a855f7; }
    .lattice-loader span:nth-child(4) { animation-delay: 0.15s; background: #0d9488; }
    .lattice-loader span:nth-child(5) { animation-delay: 0.3s; background: #db2777; }
    .lattice-loader span:nth-child(6) { animation-delay: 0.45s; background: #e11d48; }
    .lattice-loader span:nth-child(7) { animation-delay: 0.3s; background: #0d9488; }
    .lattice-loader span:nth-child(8) { animation-delay: 0.45s; background: #db2777; }
    .lattice-loader span:nth-child(9) { animation-delay: 0.6s; background: #e11d48; }

    @keyframes latticePulse {
      0%   { opacity: 0.25; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1.25); }
    }

    .ai-status-text {
      font-size: 12px;
      color: #475569;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-weight: 500;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ai-status-text.done {
      color: #059669;
      font-weight: 700;
    }
  `;
  document.head.appendChild(style);

  // Preloader & Modal DOM references
  let preloaderEl = null;
  let preloaderTimeout = null;

  let overlayEl = null;
  let canvasEl = null;
  let ctx = null;
  let labelEl = null;
  let badgeEl = null;
  let statusTextEl = null;
  let loaderEl = null;
  let currentOnComplete = null;
  let progressTimer = null;
  let rafId = null;

  // Dot Matrix Simulation State
  let dots = [];
  let cols = 0;
  let rows = 0;
  let time = 0;
  let introStart = null;
  let isRunning = false;
  const DOT_SPACING = 17;
  const DOT_RADIUS_MAX = 3.3;
  const INTRO_DURATION = 1800;

  // Rotating Phase Labels (Like reference image: "Setting the scene")
  const PHASES = [
    'Setting the scene',
    'Sampling 3D voxels',
    'Upscaling isometric grid',
    'Refining neural textures',
    'Balancing lighting & shadows',
    'Rendering 4K Ultra HD',
    'Selesai ✓ (100%)'
  ];

  // Light Mode Crisp Ink Color Gradient:
  // Deep Teal (13, 148, 136) to Vivid Rose/Pink (225, 29, 72)
  function calcDotColor(c, r, totalC, totalR, opacity) {
    const t = (c / Math.max(1, totalC - 1) * 0.5) + (r / Math.max(1, totalR - 1) * 0.5);
    const red = Math.round(13 + (225 - 13) * t);
    const green = Math.round(148 + (29 - 148) * t);
    const blue = Math.round(136 + (72 - 136) * t);
    return `rgba(${red},${green},${blue},${opacity})`;
  }

  function buildGrid(width, height) {
    cols = Math.ceil(width / DOT_SPACING) + 1;
    rows = Math.ceil(height / DOT_SPACING) + 1;
    dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          c, r,
          x: c * DOT_SPACING + (DOT_SPACING / 2),
          y: r * DOT_SPACING + (DOT_SPACING / 2),
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 0.8,
          introDelay: (c / cols) * 0.55 + (r / rows) * 0.45
        });
      }
    }
  }

  function resizeCanvas() {
    if (!canvasEl) return;
    const wrap = canvasEl.parentElement;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvasEl.width = w * dpr;
    canvasEl.height = h * dpr;
    canvasEl.style.width = w + 'px';
    canvasEl.style.height = h + 'px';
    ctx = canvasEl.getContext('2d');
    ctx.scale(dpr, dpr);
    buildGrid(w, h);
  }

  function renderMatrixFrame(ts) {
    if (!isRunning || !ctx) return;
    rafId = requestAnimationFrame(renderMatrixFrame);

    if (introStart === null) introStart = ts;
    const introElapsed = ts - introStart;
    const introFraction = Math.min(1, introElapsed / INTRO_DURATION);

    const w = canvasEl.clientWidth;
    const h = canvasEl.clientHeight;
    time = ts * 0.001;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const introReveal = Math.min(1, Math.max(0, (introFraction - d.introDelay * 0.85) / 0.18));

      // Organic phosphor pulsing sine waves
      const pulse = 0.38 + 0.38 * Math.sin(time * d.speed + d.phase);
      const wave = 0.18 * Math.sin(time * 0.7 - (d.c + d.r) * 0.22);
      // In lightmode: dots stand out crisply with base opacity 0.2 to 0.9
      const opacity = Math.min(0.92, (pulse * 0.6 + wave + 0.25) * introReveal);
      const radius = DOT_RADIUS_MAX * (0.6 + 0.4 * introReveal) * (0.8 + 0.2 * pulse);

      ctx.beginPath();
      ctx.arc(d.x, d.y, Math.max(0.1, radius), 0, Math.PI * 2);
      ctx.fillStyle = calcDotColor(d.c, d.r, cols, rows, Math.max(0, opacity));
      ctx.fill();
    }
  }

  function startMatrix() {
    if (!canvasEl) return;
    isRunning = true;
    introStart = null;
    resizeCanvas();
    rafId = requestAnimationFrame(renderMatrixFrame);
  }

  function stopMatrix() {
    isRunning = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (ctx && canvasEl) {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }
  }

  // ===== SIMPLE WHITE PRELOADER =====
  function showWhitePreloader(onDone) {
    if (!preloaderEl) {
      preloaderEl = document.createElement('div');
      preloaderEl.id = 'ai-white-preloader';
      preloaderEl.className = 'ai-white-preloader';
      preloaderEl.innerHTML = `
        <div class="ai-preloader-card">
          <div class="ai-preloader-spinner"></div>
          <span class="ai-preloader-text">Menyiapkan AI Retouch...</span>
        </div>
      `;
      document.body.appendChild(preloaderEl);
    }

    if (preloaderTimeout) clearTimeout(preloaderTimeout);

    preloaderEl.classList.remove('closing');
    preloaderEl.classList.add('active');

    // Display simple white preloader for 850ms then smoothly transition
    preloaderTimeout = setTimeout(() => {
      preloaderEl.classList.add('closing');
      setTimeout(() => {
        preloaderEl.classList.remove('active', 'closing');
        if (typeof onDone === 'function') onDone();
      }, 200);
    }, 850);
  }

  function hideWhitePreloader() {
    if (preloaderTimeout) {
      clearTimeout(preloaderTimeout);
      preloaderTimeout = null;
    }
    if (preloaderEl) {
      preloaderEl.classList.remove('active', 'closing');
    }
  }

  function createModalDOM() {
    if (overlayEl) return;

    overlayEl = document.createElement('div');
    overlayEl.id = 'ai-retouch-overlay';
    overlayEl.className = 'ai-retouch-overlay';
    overlayEl.setAttribute('aria-modal', 'true');
    overlayEl.setAttribute('role', 'dialog');

    overlayEl.innerHTML = `
      <div class="ai-retouch-card">
        <!-- Header -->
        <div class="ai-retouch-header">
          <div class="ai-retouch-header-left">
            <div class="ai-retouch-sparkle">✦</div>
            <div>
              <div class="ai-retouch-title">AI UHD Retouch Studio</div>
              <div class="ai-retouch-sub">Neural 4K Upscale & Shadow Refinement</div>
            </div>
          </div>
          <button class="ai-retouch-close-btn" id="btn-close-ai-modal" title="Tutup">&times;</button>
        </div>

        <!-- Dot Matrix Canvas (Light Viewport with Crisp Ink Dots) -->
        <div class="ai-dot-viewport">
          <canvas id="ai-dot-canvas" class="ai-dot-canvas" aria-hidden="true"></canvas>
          <div class="ai-dot-gradient-veil"></div>
          <div class="ai-dot-scanline"></div>
          <div class="ai-dot-label" id="ai-dot-label">Setting the scene</div>
          <div class="ai-dot-badge" id="ai-dot-badge">0%</div>
        </div>

        <!-- Bottom Status (Clean & Minimalist, No Slop Buttons) -->
        <div class="ai-retouch-bottom">
          <!-- Resolution Pills -->
          <div class="ai-res-pills">
            <div class="ai-pill">1080p</div>
            <div class="ai-pill">Studio 2.7K</div>
            <div class="ai-pill active">4K UHD ★</div>
            <div class="ai-pill">Lossless PNG</div>
          </div>

          <!-- Status Row with Lattice Loader -->
          <div class="ai-status-row">
            <div class="lattice-loader" id="ai-lattice-loader">
              <span></span><span></span><span></span>
              <span></span><span></span><span></span>
              <span></span><span></span><span></span>
            </div>
            <div class="ai-status-text" id="ai-status-text">AI sedang merender mockup 4K...</div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlayEl);

    canvasEl = document.getElementById('ai-dot-canvas');
    labelEl = document.getElementById('ai-dot-label');
    badgeEl = document.getElementById('ai-dot-badge');
    statusTextEl = document.getElementById('ai-status-text');
    loaderEl = document.getElementById('ai-lattice-loader');

    // Event listeners
    document.getElementById('btn-close-ai-modal').addEventListener('click', closeAIRetouchModal);

    overlayEl.addEventListener('click', (e) => {
      if (e.target === overlayEl) closeAIRetouchModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideWhitePreloader();
        if (overlayEl && overlayEl.classList.contains('active')) {
          closeAIRetouchModal();
        }
      }
    });
  }

  function finishAndDownload() {
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }

    badgeEl.textContent = '100%';
    badgeEl.classList.add('done');
    labelEl.textContent = 'Selesai ✓';
    statusTextEl.textContent = '✨ Render 4K selesai! Mengunduh...';
    statusTextEl.classList.add('done');

    setTimeout(() => {
      closeAIRetouchModal();
      if (typeof currentOnComplete === 'function') {
        currentOnComplete();
      }
    }, 700);
  }

  // Generate a realistic, stuttering progress timeline (ChatGPT DALL-E style)
  // Features: Fully randomized stuck positions across the spectrum (tidak monoton di situ-situ aja)
  // + genuine frozen hold durations + organic deceleration (melambat) and acceleration
  function createStutteringTimeline() {
    // 1. Randomly decide whether to have 2, 3, or 4 stall checkpoints
    const roll = Math.random();
    const numStalls = roll < 0.25 ? 2 : (roll < 0.8 ? 3 : 4);

    let stallPoints = [];
    if (numStalls === 2) {
      stallPoints.push(Math.floor(Math.random() * 26) + 18); // 18% - 43%
      stallPoints.push(Math.floor(Math.random() * 28) + 58); // 58% - 85%
    } else if (numStalls === 3) {
      stallPoints.push(Math.floor(Math.random() * 18) + 14); // 14% - 31%
      stallPoints.push(Math.floor(Math.random() * 23) + 42); // 42% - 64%
      stallPoints.push(Math.floor(Math.random() * 18) + 72); // 72% - 89%
    } else {
      stallPoints.push(Math.floor(Math.random() * 14) + 12); // 12% - 25%
      stallPoints.push(Math.floor(Math.random() * 15) + 33); // 33% - 47%
      stallPoints.push(Math.floor(Math.random() * 15) + 56); // 56% - 70%
      stallPoints.push(Math.floor(Math.random() * 14) + 78); // 78% - 91%
    }

    // Pick one stall at random to be the "Heavy Thinking" freeze (2.8s - 3.8s)
    const deepIndex = Math.floor(Math.random() * stallPoints.length);
    const pauses = stallPoints.map((_, idx) => {
      if (idx === deepIndex) {
        return (2.8 + Math.random() * 1.0) * 1000; // 2.8s - 3.8s deep stuck
      } else {
        return (1.6 + Math.random() * 0.9) * 1000; // 1.6s - 2.5s medium stuck
      }
    });

    const THOUGHTS = [
      'Menganalisis geometri 3D...',
      'Sampling 3D voxels...',
      'Neural synthesis step...',
      'Upscaling isometric grid...',
      'Menerapkan 4K neural texture upscaler...',
      'Balancing lighting & shadows...',
      'Finalizing neural denoising...'
    ];

    const schedule = [];
    let t = 0;
    function addStep(pct, durationMs, thought) {
      schedule.push({ t, pct, text: thought });
      t += durationMs;
    }

    let currentP = 0;

    for (let sIdx = 0; sIdx < stallPoints.length; sIdx++) {
      const targetStall = stallPoints[sIdx];
      const pauseDuration = pauses[sIdx];
      const thought = THOUGHTS[sIdx % THOUGHTS.length];

      // 1. Sprint towards (targetStall - 3)
      const sprintEnd = Math.max(currentP, targetStall - 3);
      for (let p = currentP; p <= sprintEnd; p++) {
        addStep(p, 30 + Math.random() * 25, 'Memproses render 4K...');
      }

      // 2. Decelerate into stall (MELAMBAT)
      for (let p = sprintEnd + 1; p <= targetStall; p++) {
        const stepIdx = (p - sprintEnd);
        addStep(p, 140 + stepIdx * 110, thought);
      }

      // 3. BENER-BENER STUCK AT THIS RANDOM POINT!
      addStep(targetStall, pauseDuration, thought);

      // 4. Creep out of stall (MELAMBAT)
      const maxNext = sIdx === stallPoints.length - 1 ? 96 : stallPoints[sIdx + 1] - 4;
      const creepEnd = Math.min(maxNext, targetStall + 3);
      for (let p = targetStall + 1; p <= creepEnd; p++) {
        const stepIdx = (creepEnd + 1 - p);
        addStep(p, 140 + stepIdx * 80, thought);
      }

      currentP = creepEnd + 1;
    }

    // Final sprint from currentP to 99%
    for (let p = currentP; p <= 99; p++) {
      addStep(p, 25 + Math.random() * 20, 'Menyiapkan file download 4K...');
    }

    // 100%
    addStep(100, 450, 'Selesai ✓ (100%)');

    return {
      totalDuration: t,
      evaluate(elapsed) {
        if (elapsed >= t) {
          return { pct: 100, labelIdx: PHASES.length - 1, statusText: 'Selesai ✓' };
        }
        let matched = schedule[0];
        for (let i = 0; i < schedule.length; i++) {
          if (elapsed >= schedule[i].t) {
            matched = schedule[i];
          } else {
            break;
          }
        }
        const phaseIdx = Math.min(
          PHASES.length - 2,
          Math.floor((matched.pct / 100) * (PHASES.length - 1))
        );
        return { pct: matched.pct, labelIdx: phaseIdx, statusText: matched.text };
      }
    };
  }

  function openAIRetouchModal(onComplete, skipPreloader = false) {
    if (!skipPreloader) {
      showWhitePreloader(() => {
        openAIRetouchModal(onComplete, true);
      });
      return;
    }

    createModalDOM();
    currentOnComplete = onComplete;

    // Reset elements
    badgeEl.textContent = '0%';
    badgeEl.classList.remove('done');
    labelEl.textContent = PHASES[0];
    statusTextEl.textContent = 'AI sedang merender mockup 4K...';
    statusTextEl.classList.remove('done');
    if (loaderEl) loaderEl.style.display = 'grid';

    overlayEl.classList.remove('closing');
    overlayEl.classList.add('active');

    startMatrix();

    // Create realistic stuttering timeline with random pauses/stalls
    const timeline = createStutteringTimeline();
    const startTime = performance.now();
    let lastPhaseIdx = 0;
    let lastPct = -1;

    if (progressTimer) clearInterval(progressTimer);

    progressTimer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const state = timeline.evaluate(elapsed);

      // Only update badge when value changes (during stall, stays completely static)
      if (state.pct !== lastPct) {
        lastPct = state.pct;
        badgeEl.textContent = `${state.pct}%`;
      }

      // Update rotating phase label
      if (state.labelIdx !== lastPhaseIdx) {
        lastPhaseIdx = state.labelIdx;
        labelEl.textContent = PHASES[state.labelIdx];
      }

      // If in a stall, show dynamic thought text
      if (state.statusText) {
        statusTextEl.textContent = state.statusText;
      } else {
        statusTextEl.textContent = 'AI sedang merender mockup 4K...';
      }

      if (elapsed >= timeline.totalDuration || state.pct >= 100) {
        clearInterval(progressTimer);
        progressTimer = null;
        finishAndDownload();
      }
    }, 60);
  }

  function closeAIRetouchModal() {
    hideWhitePreloader();
    if (!overlayEl) return;
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }

    overlayEl.classList.add('closing');
    setTimeout(() => {
      overlayEl.classList.remove('active');
      overlayEl.classList.remove('closing');
      stopMatrix();
      currentOnComplete = null;
    }, 320);
  }

  // Hook into Studio 4K Resolution Card & Download Button
  function setupStudioHooks() {
    // 1. Decorate 4K Resolution Card with AI Badge
    const uhdCard = document.querySelector('.res-card[data-res="3840x2160"]');
    if (uhdCard) {
      uhdCard.classList.add('res-card-ai');
      const titleEl = uhdCard.querySelector('.res-title');
      if (titleEl && !titleEl.querySelector('.badge-ai-uhd')) {
        const badge = document.createElement('span');
        badge.className = 'badge-ai-uhd';
        badge.innerHTML = '✦ AI';
        titleEl.appendChild(badge);
      }
    }

    // 2. Intercept #btn-export-download via capture phase
    const btnDownload = document.getElementById('btn-export-download');
    if (btnDownload && !btnDownload.dataset.aiHooked) {
      btnDownload.dataset.aiHooked = 'true';
      let isBypassing = false;

      btnDownload.addEventListener('click', (e) => {
        if (isBypassing) return; // Allow normal execution

        const activeCard = document.querySelector('.res-card.active');
        const selectedRes = activeCard ? activeCard.dataset.res : '';

        // If 4K Ultra HD is selected, trigger AI Retouch Preloader & Modal!
        if (selectedRes === '3840x2160') {
          e.stopImmediatePropagation();
          e.preventDefault();

          // Close the export dropdown first so it doesn't stay open behind modal
          const exportModal = document.getElementById('export-modal');
          if (exportModal) exportModal.classList.remove('open');

          openAIRetouchModal(() => {
            isBypassing = true;
            btnDownload.click(); // Re-trigger original download handler
            isBypassing = false;
          });
        }
      }, true); // true = capture phase to intercept before studio handler!
    }
  }

  window.openAIRetouchModal = openAIRetouchModal;
  window.closeAIRetouchModal = closeAIRetouchModal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupStudioHooks);
  } else {
    setupStudioHooks();
  }

  // Re-check after window loads (some studios init dynamic dropdowns)
  window.addEventListener('load', () => {
    setTimeout(setupStudioHooks, 200);
  });
})();
