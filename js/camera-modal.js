/**
 * LayMockup Studio - Live Camera Viewfinder & Capture Engine
 * Provides live in-browser camera viewfinder with shutter button
 * and seamless fallback to native camera capture.
 */
(function () {
  let modalEl = null;
  let videoEl = null;
  let stream = null;
  let currentFacingMode = 'environment';
  let activeSuccessCallback = null;
  let activeFallbackCallback = null;

  function initCameraModal() {
    if (modalEl) return;

    // Inject CSS
    const style = document.createElement('style');
    style.id = 'studio-camera-styles';
    style.textContent = `
      .studio-camera-modal {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 10000;
        background: rgba(10, 15, 29, 0.88);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        align-items: center;
        justify-content: center;
        padding: 16px;
        box-sizing: border-box;
      }
      .studio-camera-modal.active {
        display: flex;
      }
      .studio-camera-card {
        width: 100%;
        max-width: 420px;
        background: #111827;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 24px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
        animation: cameraModalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes cameraModalIn {
        from { opacity: 0; transform: scale(0.94) translateY(12px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .studio-camera-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 18px;
        background: #111827;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .studio-camera-title {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #ffffff;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: -0.01em;
      }
      .studio-camera-badge {
        font-size: 10px;
        font-weight: 600;
        padding: 2px 7px;
        border-radius: 6px;
        background: rgba(155, 227, 222, 0.2);
        color: #9BE3DE;
        border: 1px solid rgba(155, 227, 222, 0.3);
      }
      .studio-camera-close-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #94a3b8;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .studio-camera-close-btn:hover {
        background: rgba(255, 255, 255, 0.16);
        color: #ffffff;
      }
      .studio-camera-viewport {
        position: relative;
        width: 100%;
        height: 360px;
        max-height: 52vh;
        background: #000000;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .studio-camera-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .studio-camera-bracket {
        position: absolute;
        inset: 24px;
        border: 1.5px dashed rgba(255, 255, 255, 0.3);
        border-radius: 16px;
        pointer-events: none;
        box-sizing: border-box;
      }
      .studio-camera-flash {
        position: absolute;
        inset: 0;
        background: #ffffff;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.08s ease-out;
      }
      .studio-camera-flash.flash-active {
        opacity: 0.85;
      }
      .studio-camera-controls {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 16px 20px 20px 20px;
        background: #0f172a;
      }
      .studio-camera-sub-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        background: none;
        border: none;
        color: #cbd5e1;
        cursor: pointer;
        font-size: 11px;
        font-weight: 600;
        padding: 8px 12px;
        border-radius: 12px;
        transition: background 0.15s ease, color 0.15s ease;
      }
      .studio-camera-sub-btn:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
      }
      .studio-camera-shutter {
        width: 68px;
        height: 68px;
        border-radius: 50%;
        background: transparent;
        border: 4px solid #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        outline: none;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
        transition: transform 0.1s ease, box-shadow 0.1s ease;
      }
      .studio-camera-shutter:hover {
        transform: scale(1.05);
        box-shadow: 0 0 28px rgba(255, 255, 255, 0.4);
      }
      .studio-camera-shutter:active {
        transform: scale(0.92);
      }
      .studio-camera-shutter-inner {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: #ffffff;
        transition: transform 0.1s ease;
      }
      .studio-camera-shutter:active .studio-camera-shutter-inner {
        transform: scale(0.88);
      }
    `;
    document.head.appendChild(style);

    // Create Modal HTML
    modalEl = document.createElement('div');
    modalEl.id = 'studio-camera-modal';
    modalEl.className = 'studio-camera-modal';
    modalEl.innerHTML = `
      <div class="studio-camera-card" role="dialog" aria-modal="true" aria-label="Kamera HP">
        <div class="studio-camera-header">
          <div class="studio-camera-title">
            <span>📷</span>
            <span>Kamera HP</span>
            <span class="studio-camera-badge">Live View</span>
          </div>
          <button type="button" class="studio-camera-close-btn" id="studio-camera-close" title="Tutup Kamera" aria-label="Tutup Kamera">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="studio-camera-viewport">
          <video class="studio-camera-video" id="studio-camera-video" autoplay playsinline muted></video>
          <div class="studio-camera-bracket"></div>
          <div class="studio-camera-flash" id="studio-camera-flash"></div>
        </div>
        <div class="studio-camera-controls">
          <button type="button" class="studio-camera-sub-btn" id="studio-camera-switch" title="Ganti Kamera Belakang / Depan">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>Ganti</span>
          </button>

          <button type="button" class="studio-camera-shutter" id="studio-camera-take" title="Ambil Foto">
            <div class="studio-camera-shutter-inner"></div>
          </button>

          <button type="button" class="studio-camera-sub-btn" id="studio-camera-system" title="Gunakan Aplikasi Kamera Bawaan HP">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="4"></rect>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>Bawaan</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);

    videoEl = document.getElementById('studio-camera-video');

    // Wire events
    document.getElementById('studio-camera-close').addEventListener('click', closeCamera);
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) closeCamera();
    });

    document.getElementById('studio-camera-switch').addEventListener('click', async () => {
      currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
      await startStream(currentFacingMode);
    });

    document.getElementById('studio-camera-take').addEventListener('click', snapPhoto);

    document.getElementById('studio-camera-system').addEventListener('click', () => {
      closeCamera();
      if (typeof activeFallbackCallback === 'function') {
        activeFallbackCallback();
      }
    });
  }

  async function startStream(facingMode) {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
    const constraints = {
      video: {
        facingMode: { ideal: facingMode },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      },
      audio: false
    };
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    if (videoEl) {
      videoEl.srcObject = stream;
      await videoEl.play();
    }
  }

  function closeCamera() {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
    if (modalEl) {
      modalEl.classList.remove('active');
    }
  }

  function snapPhoto() {
    if (!videoEl || !videoEl.videoWidth) return;

    // Trigger flash animation
    const flash = document.getElementById('studio-camera-flash');
    if (flash) {
      flash.classList.add('flash-active');
      setTimeout(() => flash.classList.remove('flash-active'), 120);
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    const ctx = canvas.getContext('2d');

    // If front camera, mirror image for natural selfie feel
    if (currentFacingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(videoEl, 0, 0);

    canvas.toBlob((blob) => {
      closeCamera();
      if (typeof activeSuccessCallback === 'function') {
        activeSuccessCallback(blob);
      }
    }, 'image/jpeg', 0.95);
  }

  window.openStudioCamera = async function (onSuccess, onFallback) {
    activeSuccessCallback = onSuccess;
    activeFallbackCallback = onFallback;

    // Check getUserMedia support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (typeof onFallback === 'function') onFallback();
      return;
    }

    initCameraModal();
    modalEl.classList.add('active');

    try {
      await startStream(currentFacingMode);
    } catch (err) {
      console.warn('getUserMedia stream error, using fallback:', err);
      closeCamera();
      if (typeof onFallback === 'function') {
        onFallback();
      }
    }
  };

  // Auto-load AI Retouch Studio Suite
  (function loadAIRetouchModule() {
    if (typeof window !== 'undefined' && !window.openAIRetouchModal) {
      const s = document.createElement('script');
      s.src = 'js/ai-retouch-modal.js';
      s.async = true;
      document.head.appendChild(s);
    }
  })();
})();

