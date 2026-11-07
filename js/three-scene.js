/**
 * 3D Isometric Mockup Engine for 12-Card Showcase
 * Uses Three.js for hardware-accelerated 3D rendering with:
 * - 1-3-4-3-1 Staggered Honeycomb Layout
 * - Realistic Extruded Rounded Device Cards
 * - Multi-layered Soft Diffuse Shadows
 * - Smart Aspect Ratio & Crop Engine (No stretching / distortion)
 * - 4K Ultra-Crisp PNG Export
 */

class Mockup3DScene {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.cards = []; // 12 cards
    this.textures = []; // 12 THREE.CanvasTexture
    this.canvasContexts = []; // 12 offscreen 2D canvas contexts
    this.images = new Array(12).fill(null);

    // Configuration State
    this.state = {
      // Layout
      layout: '1-3-4-3-1',
      aspectRatio: 16 / 10, // 1.6
      cardWidth: 3.4,
      gapX: 0.35,
      gapY: 0.32,
      staggerOffset: 0.5, // 0.5 = honeycomb / diamond
      elevation: 0.0,
      
      // Card Appearance
      cornerRadius: 0.16,
      cardThickness: 0.08,
      bevel: 0.025,
      frameStyle: 'minimal', // 'minimal', 'browser', 'mobile', 'glass'
      fitMode: 'cover', // 'cover', 'contain', 'fill'
      focalY: 0.0, // 0 = top (keeps navbar visible), 0.5 = center
      zoom: 1.0,
      
      // 3D Angles
      tiltX: 52, // Degrees
      tiltY: 0,
      tiltZ: -30,
      cameraFov: 38,
      cameraZoom: 1.0,
      isOrthographic: false,
      
      // Shadow
      shadowBlur: 35,
      shadowOpacity: 0.38,
      shadowOffsetY: 18,
      shadowColor: '#000000',
      
      // Background & Theme
      theme: 'dark', // 'dark', 'light'
      bgType: 'gradient', // 'solid', 'gradient', 'glow', 'transparent'
      bgColor1: '#080d16',
      bgColor2: '#0d131f',
      glowColor: '#06b6d4',
      glowIntensity: 0.45,
      borderColor: 'rgba(255, 255, 255, 0.12)',
      borderWidth: 1.5,
      
      ...options,
    };

    this.initThree();
    this.initInteraction();
    this.createShadowTexture();
    this.buildCards();
    this.loadInitialDemo();
    this.animate();
  }

  initThree() {
    // Scene
    this.scene = new THREE.Scene();

    // Master Group for 12 cards
    this.mockupGroup = new THREE.Group();
    this.scene.add(this.mockupGroup);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);

    // Max Anisotropy for sharp tilted textures
    this.maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();

    // Cameras
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.perspectiveCamera = new THREE.PerspectiveCamera(this.state.cameraFov, aspect, 0.1, 100);
    this.perspectiveCamera.position.set(0, -1.2, 14.5);
    this.perspectiveCamera.lookAt(0, 0, 0);

    const frustumSize = 14;
    this.orthoCamera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      100
    );
    this.orthoCamera.position.set(0, -1.2, 14.5);
    this.orthoCamera.lookAt(0, 0, 0);

    this.activeCamera = this.perspectiveCamera;

    // Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.88);
    this.scene.add(this.ambientLight);

    this.dirLight1 = new THREE.DirectionalLight(0xffffff, 0.65);
    this.dirLight1.position.set(-6, 12, 14);
    this.scene.add(this.dirLight1);

    this.dirLight2 = new THREE.DirectionalLight(0x06b6d4, 0.25);
    this.dirLight2.position.set(8, -8, 8);
    this.scene.add(this.dirLight2);

    // Handle Window Resize
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    const aspect = width / height;

    this.perspectiveCamera.aspect = aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    const frustumSize = 14;
    this.orthoCamera.left = (-frustumSize * aspect) / 2;
    this.orthoCamera.right = (frustumSize * aspect) / 2;
    this.orthoCamera.top = frustumSize / 2;
    this.orthoCamera.bottom = -frustumSize / 2;
    this.orthoCamera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  // Create reusable soft radial shadow texture
  createShadowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 250);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    grad.addColorStop(0.2, 'rgba(0, 0, 0, 0.6)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
    grad.addColorStop(0.8, 'rgba(0, 0, 0, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    this.shadowTexture = new THREE.CanvasTexture(canvas);
    this.shadowTexture.needsUpdate = true;
  }

  // Rounded rectangle 2D shape for extrusion
  createRoundedShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    const r = Math.min(radius, width / 2 - 0.01, height / 2 - 0.01);

    shape.moveTo(x + r, y);
    shape.lineTo(x + width - r, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + r);
    shape.lineTo(x + width, y + height - r);
    shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    shape.lineTo(x + r, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }

  // Build the 12 card meshes and shadow meshes
  buildCards() {
    // Clear existing
    while (this.mockupGroup.children.length > 0) {
      const obj = this.mockupGroup.children[0];
      this.mockupGroup.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    }

    this.cards = [];
    this.shadowPlanes = [];

    const cardW = this.state.cardWidth;
    const cardH = cardW / this.state.aspectRatio;
    const shape = this.createRoundedShape(cardW, cardH, this.state.cornerRadius);

    const extrudeSettings = {
      steps: 1,
      depth: this.state.cardThickness,
      bevelEnabled: true,
      bevelThickness: this.state.bevel,
      bevelSize: this.state.bevel,
      bevelSegments: 4,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center geometry origin at face
    geometry.center();

    // Normalize UV coordinates on front face so texture maps 1:1 perfectly
    const posAttr = geometry.attributes.position;
    const uvAttr = geometry.attributes.uv;
    for (let j = 0; j < uvAttr.count; j++) {
      const px = posAttr.getX(j);
      const py = posAttr.getY(j);
      // Map [-cardW/2, cardW/2] to [0, 1] and [-cardH/2, cardH/2] to [0, 1]
      const u = (px + cardW / 2) / cardW;
      const v = (py + cardH / 2) / cardH;
      uvAttr.setXY(j, Math.max(0, Math.min(1, u)), Math.max(0, Math.min(1, v)));
    }
    uvAttr.needsUpdate = true;

    // Side & back edge material
    const sideColor = this.state.theme === 'dark' ? 0x1a2332 : 0xe2e8f0;
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: sideColor,
      roughness: 0.35,
      metalness: 0.2,
    });

    // Shadow plane geometry
    const shadowGeo = new THREE.PlaneGeometry(cardW * 1.45, cardH * 1.45);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: this.shadowTexture,
      transparent: true,
      opacity: this.state.shadowOpacity,
      depthWrite: false,
    });

    // Create 12 cards
    for (let i = 0; i < 12; i++) {
      // Offscreen canvas for crisp texture
      let canvas = this.canvasContexts[i]?.canvas;
      let ctx = this.canvasContexts[i]?.ctx;
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.width = 1600;
        canvas.height = Math.round(1600 / this.state.aspectRatio);
        ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        this.canvasContexts[i] = { canvas, ctx };
      } else {
        canvas.height = Math.round(1600 / this.state.aspectRatio);
      }

      // Texture
      let texture = this.textures[i];
      if (!texture) {
        texture = new THREE.CanvasTexture(canvas);
        texture.anisotropy = this.maxAnisotropy;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        this.textures[i] = texture;
      }

      // Materials: [Front face, Side/Back face]
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.2,
        metalness: 0.05,
      });

      // ExtrudeGeometry materials: material 0 = front/back faces, material 1 = side bevels
      const cardMesh = new THREE.Mesh(geometry, [frontMaterial, sideMaterial]);
      cardMesh.castShadow = true;

      // Shadow Mesh
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat.clone());
      shadowMesh.position.z = -0.05;

      const cardWrapper = new THREE.Group();
      cardWrapper.add(shadowMesh);
      cardWrapper.add(cardMesh);
      cardWrapper.userData = { slotIndex: i, cardMesh, shadowMesh };

      this.cards.push(cardWrapper);
      this.mockupGroup.add(cardWrapper);
    }

    this.updateCardPositions();
    this.updateRotation();
    
    // Ensure all card textures are drawn and up to date
    for (let i = 0; i < 12; i++) {
      this.renderCardTexture(i);
    }
  }

  // Calculate coordinates for 1-3-4-3-1 arrangement
  updateCardPositions() {
    const cardW = this.state.cardWidth;
    const cardH = cardW / this.state.aspectRatio;
    const stepX = cardW + this.state.gapX;
    const stepY = cardH + this.state.gapY;
    const stagger = this.state.staggerOffset; // 0.5 for honeycomb

    // Row definitions:
    // Row 0 (Top): 1 card -> offset [0]
    // Row 1: 3 cards -> offset [-1, 0, 1]
    // Row 2 (Middle Focus): 4 cards -> offset [-1.5, -0.5, 0.5, 1.5] with stagger shift
    // Row 3: 3 cards -> offset [-1, 0, 1]
    // Row 4 (Bottom): 1 card -> offset [0]

    const shift = (stagger - 0.5) * stepX;

    const layoutMap = [
      // Row 0 (Top): Slot 0
      { slot: 0, x: 0, y: 2 * stepY },

      // Row 1: Slots 1, 2, 3
      { slot: 1, x: -1 * stepX, y: 1 * stepY },
      { slot: 2, x: 0, y: 1 * stepY },
      { slot: 3, x: 1 * stepX, y: 1 * stepY },

      // Row 2 (Center Focus - 4 cards): Slots 4, 5, 6, 7
      { slot: 4, x: -1.5 * stepX + shift, y: 0 },
      { slot: 5, x: -0.5 * stepX + shift, y: 0 },
      { slot: 6, x: 0.5 * stepX + shift, y: 0 },
      { slot: 7, x: 1.5 * stepX + shift, y: 0 },

      // Row 3: Slots 8, 9, 10
      { slot: 8, x: -1 * stepX, y: -1 * stepY },
      { slot: 9, x: 0, y: -1 * stepY },
      { slot: 10, x: 1 * stepX, y: -1 * stepY },

      // Row 4 (Bottom): Slot 11
      { slot: 11, x: 0, y: -2 * stepY },
    ];

    layoutMap.forEach(pos => {
      const wrapper = this.cards[pos.slot];
      if (wrapper) {
        wrapper.position.set(pos.x, pos.y, this.state.elevation);

        // Adjust shadow offset
        const shadowMesh = wrapper.userData.shadowMesh;
        if (shadowMesh) {
          shadowMesh.position.y = -0.15 - (this.state.shadowOffsetY / 100);
          shadowMesh.material.opacity = this.state.shadowOpacity;
        }
      }
    });
  }

  // Update rotation angles of the master group
  updateRotation() {
    const toRad = Math.PI / 180;
    this.mockupGroup.rotation.x = this.state.tiltX * toRad;
    this.mockupGroup.rotation.y = this.state.tiltY * toRad;
    this.mockupGroup.rotation.z = this.state.tiltZ * toRad;
  }

  // Render screenshot onto offscreen 2D canvas with smart fit (no stretching!)
  renderCardTexture(slotIndex) {
    const { canvas, ctx } = this.canvasContexts[slotIndex];
    const targetW = canvas.width;
    const targetH = canvas.height;
    const img = this.images[slotIndex];

    ctx.clearRect(0, 0, targetW, targetH);

    // Default Card Background
    const isDark = this.state.theme === 'dark';
    ctx.fillStyle = isDark ? '#0b1320' : '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);

    if (img && img.complete && img.naturalWidth > 0) {
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgRatio = imgW / imgH;
      const targetRatio = targetW / targetH;
      const zoom = this.state.zoom || 1.0;

      let drawW, drawH, drawX, drawY;

      if (this.state.fitMode === 'cover') {
        // Smart Cover: never stretch, fill completely
        if (imgRatio > targetRatio) {
          drawH = targetH * zoom;
          drawW = drawH * imgRatio;
          drawX = (targetW - drawW) / 2;
          drawY = (targetH - drawH) * this.state.focalY;
        } else {
          drawW = targetW * zoom;
          drawH = drawW / imgRatio;
          drawX = (targetW - drawW) / 2;
          // focalY: 0.0 keeps the top navbar perfectly visible!
          drawY = (targetH - drawH) * this.state.focalY;
        }
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      } else if (this.state.fitMode === 'contain') {
        // Letterbox Contain: shows entire image without any cropping
        if (imgRatio > targetRatio) {
          drawW = targetW * zoom;
          drawH = drawW / imgRatio;
          drawX = (targetW - drawW) / 2;
          drawY = (targetH - drawH) / 2;
        } else {
          drawH = targetH * zoom;
          drawW = drawH * imgRatio;
          drawX = (targetW - drawW) / 2;
          drawY = (targetH - drawH) / 2;
        }
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      } else {
        // Stretch
        ctx.drawImage(img, 0, 0, targetW, targetH);
      }
    } else {
      // Empty placeholder state
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(20, 20, targetW - 40, targetH - 40);

      ctx.fillStyle = isDark ? '#38bdf8' : '#2563eb';
      ctx.font = 'bold 48px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Slot #${slotIndex + 1}`, targetW / 2, targetH / 2 - 20);

      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.font = '500 24px system-ui, sans-serif';
      ctx.fillText('Drag & Drop Image Here', targetW / 2, targetH / 2 + 30);
      ctx.textAlign = 'left';
    }

    // Optional Device Chrome / Frame Styling
    this.drawDeviceChrome(ctx, targetW, targetH, isDark);

    // Notify Three.js to re-upload texture to GPU
    if (this.textures[slotIndex]) {
      this.textures[slotIndex].needsUpdate = true;
    }
  }

  // Draw optional browser window or phone frame overlay
  drawDeviceChrome(ctx, w, h, isDark) {
    if (this.state.frameStyle === 'browser') {
      // Browser Top Bar
      const barH = 50;
      ctx.fillStyle = isDark ? '#0f172a' : '#f1f5f9';
      ctx.fillRect(0, 0, w, barH);

      // Traffic light dots
      const dots = ['#ef4444', '#f59e0b', '#10b981'];
      dots.forEach((c, idx) => {
        ctx.beginPath();
        ctx.arc(30 + idx * 24, 25, 7, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();
      });

      // Address bar pill
      const pillW = 420;
      const pillX = (w - pillW) / 2;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(pillX, 10, pillW, 30, 15) : ctx.rect(pillX, 10, pillW, 30);
      ctx.fillStyle = isDark ? '#1e293b' : '#ffffff';
      ctx.fill();

      ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
      ctx.font = '500 13px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('https://app.demo.internal', w / 2, 30);
      ctx.textAlign = 'left';

      // Border line below bar
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, barH); ctx.lineTo(w, barH); ctx.stroke();
    } else if (this.state.frameStyle === 'mobile') {
      // Dynamic Island Pill
      const pillW = 160;
      const pillH = 34;
      const pillX = (w - pillW) / 2;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(pillX, 12, pillW, pillH, 17) : ctx.rect(pillX, 12, pillW, pillH);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // Camera lens dot
      ctx.beginPath();
      ctx.arc(pillX + 35, 12 + pillH / 2, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#1e1e24';
      ctx.fill();
    }

    // Outer subtle border stroke
    if (this.state.borderWidth > 0) {
      ctx.strokeStyle = this.state.borderColor;
      ctx.lineWidth = this.state.borderWidth * 2;
      ctx.strokeRect(0, 0, w, h);
    }
  }

  // Load single image into slot
  setImage(slotIndex, imageSource) {
    if (slotIndex < 0 || slotIndex >= 12) return;

    if (typeof imageSource === 'string') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.images[slotIndex] = img;
        this.renderCardTexture(slotIndex);
      };
      img.src = imageSource;
    } else if (imageSource instanceof HTMLImageElement) {
      this.images[slotIndex] = imageSource;
      this.renderCardTexture(slotIndex);
    }
  }

  // Load 12 demo mockups matching theme
  loadInitialDemo(theme = this.state.theme) {
    this.state.theme = theme;
    if (window.DemoGenerator) {
      for (let i = 0; i < 12; i++) {
        const dataUrl = window.DemoGenerator.getSampleImage(theme, i);
        this.setImage(i, dataUrl);
      }
    }
  }

  // Mouse & Touch Orbit / Pan / Zoom Interaction
  initInteraction() {
    let isDragging = false;
    let isPanning = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const dom = this.renderer.domElement;

    dom.addEventListener('mousedown', (e) => {
      isDragging = true;
      isPanning = (e.button === 2 || e.shiftKey || e.button === 1);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      if (isPanning) {
        // Pan
        this.mockupGroup.position.x += deltaX * 0.012;
        this.mockupGroup.position.y -= deltaY * 0.012;
      } else {
        // Rotate (Tilt X and Tilt Z)
        this.state.tiltX = Math.max(10, Math.min(85, this.state.tiltX + deltaY * 0.35));
        this.state.tiltZ = (this.state.tiltZ + deltaX * 0.35);
        this.updateRotation();
        if (this.onAngleChange) this.onAngleChange(this.state.tiltX, this.state.tiltY, this.state.tiltZ);
      }
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    dom.addEventListener('contextmenu', (e) => e.preventDefault());

    // Wheel Zoom
    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.005;
      if (this.state.isOrthographic) {
        this.orthoCamera.zoom = Math.max(0.4, Math.min(3.0, this.orthoCamera.zoom - zoomDelta * 0.2));
        this.orthoCamera.updateProjectionMatrix();
      } else {
        this.perspectiveCamera.position.z = Math.max(6, Math.min(26, this.perspectiveCamera.position.z + zoomDelta));
      }
    }, { passive: false });
  }

  // Set Camera View Mode
  setOrthographic(isOrtho) {
    this.state.isOrthographic = isOrtho;
    this.activeCamera = isOrtho ? this.orthoCamera : this.perspectiveCamera;
    this.onResize();
  }

  // Reset to Iconic Reference View
  resetView() {
    this.state.tiltX = 52;
    this.state.tiltY = 0;
    this.state.tiltZ = -30;
    this.mockupGroup.position.set(0, 0, 0);
    this.perspectiveCamera.position.set(0, -1.2, 14.5);
    this.orthoCamera.zoom = 1.0;
    this.orthoCamera.updateProjectionMatrix();
    this.updateRotation();
    if (this.onAngleChange) this.onAngleChange(this.state.tiltX, this.state.tiltY, this.state.tiltZ);
  }

  // High-Resolution PNG Export (Ultra Crisp, 1x, 2x, 4K)
  async exportPNG(width = 3840, height = 2160) {
    const originalWidth = this.container.clientWidth;
    const originalHeight = this.container.clientHeight;
    const originalAspect = this.perspectiveCamera.aspect;
    const originalPixelRatio = this.renderer.getPixelRatio();

    // Resize renderer to target export dimensions
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(width, height, false);

    const exportAspect = width / height;
    this.perspectiveCamera.aspect = exportAspect;
    this.perspectiveCamera.updateProjectionMatrix();

    if (this.state.isOrthographic) {
      const frustumSize = 14;
      this.orthoCamera.left = (-frustumSize * exportAspect) / 2;
      this.orthoCamera.right = (frustumSize * exportAspect) / 2;
      this.orthoCamera.top = frustumSize / 2;
      this.orthoCamera.bottom = -frustumSize / 2;
      this.orthoCamera.updateProjectionMatrix();
    }

    // Render offscreen pass
    this.renderer.render(this.scene, this.activeCamera);

    // Composite with background (if gradient / solid / glow)
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = width;
    exportCanvas.height = height;
    const ctx = exportCanvas.getContext('2d');

    // Draw Background
    this.drawBackground(ctx, width, height);

    // Draw WebGL scene
    ctx.drawImage(this.renderer.domElement, 0, 0, width, height);

    // Restore original viewport
    this.renderer.setPixelRatio(originalPixelRatio);
    this.renderer.setSize(originalWidth, originalHeight);
    this.perspectiveCamera.aspect = originalAspect;
    this.perspectiveCamera.updateProjectionMatrix();
    if (this.state.isOrthographic) {
      this.onResize();
    }

    // Convert to Blob
    return new Promise((resolve) => {
      exportCanvas.toBlob((blob) => {
        resolve({ blob, dataUrl: exportCanvas.toDataURL('image/png', 1.0) });
      }, 'image/png', 1.0);
    });
  }

  // Draw Background layer
  drawBackground(ctx, w, h) {
    if (this.state.bgType === 'transparent') {
      ctx.clearRect(0, 0, w, h);
      return;
    }

    if (this.state.bgType === 'solid') {
      ctx.fillStyle = this.state.bgColor1;
      ctx.fillRect(0, 0, w, h);
      return;
    }

    // Gradient / Glow
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, this.state.bgColor1);
    grad.addColorStop(1, this.state.bgColor2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    if (this.state.glowIntensity > 0) {
      const rad = ctx.createRadialGradient(w * 0.35, h * 0.45, 50, w * 0.35, h * 0.45, Math.max(w, h) * 0.75);
      const glowRgba = this.hexToRgba(this.state.glowColor, this.state.glowIntensity);
      rad.addColorStop(0, glowRgba);
      rad.addColorStop(1, 'transparent');
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, w, h);
    }
  }

  hexToRgba(hex, alpha) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
  }

  // Main Render Loop
  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.activeCamera);
  }
}

window.Mockup3DScene = Mockup3DScene;
