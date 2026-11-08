document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mockup-canvas');
    const renderer = new IsometricRenderer(canvas);

    let userImages = new Array(12).fill(null);
    let demoCanvases = DemoGenerator.generateSet('light');
    let activeSlotIndex = 0;
    let selectedExportRes = '2752x1536';

    function getActiveSlots() {
        return userImages.map((img, i) => img || demoCanvases[i]);
    }

    function refreshCanvas() {
        renderer.render(getActiveSlots());
        updateNavigatorUI();
    }

    function updateNavigatorUI() {
        let count = 0;
        for (let i = 0; i < 12; i++) {
            const cardEl = document.querySelector(`.slot-card[data-slot="${i}"]`);
            const thumbEl = document.getElementById(`thumb-${i}`);
            if (!cardEl || !thumbEl) continue;

            if (userImages[i]) {
                count++;
                cardEl.classList.add('has-image');
                thumbEl.src = userImages[i].src;
            } else {
                cardEl.classList.remove('has-image');
                thumbEl.removeAttribute('src');
            }
        }
        const badge = document.getElementById('slot-count-badge');
        if (badge) badge.textContent = count > 0 ? `${count}/12 Foto Custom` : '12 Slot Demo';
    }

    function showToast(msg) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-msg');
        toastMsg.textContent = msg;
        toast.classList.add('show');
        clearTimeout(window._toastTimer);
        window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function loadImageFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // Tema Light / Dark
    const btnLight = document.getElementById('btn-theme-light');
    const btnDark = document.getElementById('btn-theme-dark');
    const themeBadge = document.getElementById('theme-badge');

    function setTheme(theme) {
        renderer.theme = theme;
        demoCanvases = DemoGenerator.generateSet(theme);
        btnLight.classList.toggle('active', theme === 'light');
        btnDark.classList.toggle('active', theme === 'dark');
        themeBadge.textContent = theme === 'light' ? 'Light Mode' : 'Dark Mode';
        document.documentElement.style.setProperty('--bg-canvas', theme === 'light' ? '#dce3ec' : '#06090d');
        refreshCanvas();
    }

    btnLight.addEventListener('click', () => {
        setTheme('light');
        showToast('Tema Reference Light (SMK SOPAN) aktif');
    });

    btnDark.addEventListener('click', () => {
        setTheme('dark');
        showToast('Tema Reference Dark (EcoVision AI) aktif');
    });

    // Toggle Zoom Mode
    const btnZoom = document.getElementById('btn-toggle-zoom');
    btnZoom.addEventListener('click', () => {
        renderer.zoomMode = renderer.zoomMode === 'reference' ? 'fit' : 'reference';
        btnZoom.textContent = renderer.zoomMode === 'reference'
            ? '🔍 Zoom: 1:1'
            : '🔍 Zoom: Lihat Utuh 12 Kartu';
        refreshCanvas();
    });

    // Upload Batch & Drag-Drop
    const batchInput = document.getElementById('batch-file-input');
    const cameraBatchInput = document.getElementById('camera-batch-input');
    const dropzone = document.getElementById('batch-dropzone');

    document.getElementById('btn-trigger-gallery').addEventListener('click', () => batchInput.click());
    document.getElementById('btn-trigger-camera').addEventListener('click', () => cameraBatchInput.click());
    dropzone.addEventListener('click', () => batchInput.click());

    async function handleBatchFiles(fileList) {
        const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
        if (!files.length) return;
        let startIdx = userImages.findIndex((img) => img === null);
        if (startIdx === -1) startIdx = 0;

        for (let i = 0; i < files.length && i < 12; i++) {
            userImages[(startIdx + i) % 12] = await loadImageFile(files[i]);
        }
        refreshCanvas();
        showToast(`${Math.min(files.length, 12)} foto berhasil dimasukkan!`);
    }

    batchInput.addEventListener('change', (e) => {
        handleBatchFiles(e.target.files);
        e.target.value = '';
    });
    cameraBatchInput.addEventListener('change', (e) => {
        handleBatchFiles(e.target.files);
        e.target.value = '';
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files?.length) handleBatchFiles(e.dataTransfer.files);
    });

    // Modal Per Slot
    const slotModal = document.getElementById('slot-modal');
    const slotModalTitle = document.getElementById('slot-modal-title');
    const singleFileInput = document.getElementById('single-file-input');
    const singleCameraInput = document.getElementById('single-camera-input');

    document.querySelectorAll('.slot-card').forEach((card) => {
        card.addEventListener('click', () => {
            activeSlotIndex = parseInt(card.dataset.slot, 10);
            slotModalTitle.textContent = `Atur Slot #${activeSlotIndex + 1}`;
            slotModal.classList.add('open');
        });
    });

    document.getElementById('btn-close-slot-modal').addEventListener('click', () => slotModal.classList.remove('open'));
    document.getElementById('btn-slot-file').addEventListener('click', () => singleFileInput.click());
    document.getElementById('btn-slot-camera').addEventListener('click', () => singleCameraInput.click());

    async function handleSingleFile(file) {
        if (!file) return;
        userImages[activeSlotIndex] = await loadImageFile(file);
        slotModal.classList.remove('open');
        refreshCanvas();
        showToast(`Slot #${activeSlotIndex + 1} berhasil diperbarui!`);
    }

    singleFileInput.addEventListener('change', (e) => {
        handleSingleFile(e.target.files[0]);
        e.target.value = '';
    });
    singleCameraInput.addEventListener('change', (e) => {
        handleSingleFile(e.target.files[0]);
        e.target.value = '';
    });

    document.getElementById('btn-slot-remove').addEventListener('click', () => {
        userImages[activeSlotIndex] = null;
        slotModal.classList.remove('open');
        refreshCanvas();
        showToast(`Slot #${activeSlotIndex + 1} direset ke demo`);
    });

    // Tombol Preset
    document.getElementById('btn-load-light-demo').addEventListener('click', () => {
        userImages.fill(null);
        setTheme('light');
        showToast('Demo Light SOPAN dimuat');
    });
    document.getElementById('btn-load-dark-demo').addEventListener('click', () => {
        userImages.fill(null);
        setTheme('dark');
        showToast('Demo Dark EcoVision dimuat');
    });
    document.getElementById('btn-duplicate-remaining').addEventListener('click', () => {
        const uploaded = userImages.filter(Boolean);
        if (!uploaded.length) return showToast('Upload minimal 1 foto dulu!');
        userImages = userImages.map((img, i) => img || uploaded[i % uploaded.length]);
        refreshCanvas();
        showToast('Slot kosong berhasil diisi otomatis!');
    });
    document.getElementById('btn-clear-all').addEventListener('click', () => {
        userImages.fill(null);
        refreshCanvas();
        showToast('Semua slot direset ke tampilan default');
    });

    // Sidebar & Mobile Drawer
    const sidebar = document.getElementById('sidebar-panel');
    const backdrop = document.getElementById('mobile-backdrop');
    document.getElementById('sidebar-toggle').addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    document.getElementById('mobile-fab').addEventListener('click', () => {
        sidebar.classList.add('open');
        backdrop.classList.add('open');
    });
    const closeDrawer = () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('open');
    };
    document.getElementById('sidebar-close-mobile').addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    // Export PNG
    const exportModal = document.getElementById('export-modal');
    document.getElementById('btn-open-export').addEventListener('click', () => exportModal.classList.add('open'));
    document.getElementById('btn-close-modal').addEventListener('click', () => exportModal.classList.remove('open'));

    document.querySelectorAll('.res-card').forEach((card) => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.res-card').forEach((c) => c.classList.remove('active'));
            card.classList.add('active');
            selectedExportRes = card.dataset.res;
        });
    });

    function createExportCanvas() {
        const [w, h] = selectedExportRes.split('x').map(Number);
        const off = document.createElement('canvas');
        renderer.render(getActiveSlots(), off, w, h);
        return off;
    }

    document.getElementById('btn-export-download').addEventListener('click', () => {
        const off = createExportCanvas();
        const a = document.createElement('a');
        a.download = `mockup-3d-${renderer.theme}-${selectedExportRes}.png`;
        a.href = off.toDataURL('image/png', 1.0);
        a.click();
        exportModal.classList.remove('open');
        if (window.confetti) window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        showToast(`PNG (${selectedExportRes}) berhasil didownload!`);
    });

    document.getElementById('btn-copy-clipboard').addEventListener('click', () => {
        const off = createExportCanvas();
        off.toBlob(async (blob) => {
            try {
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                exportModal.classList.remove('open');
                showToast('Gambar berhasil disalin ke Clipboard!');
            } catch {
                showToast('Browser tidak mengizinkan copy otomatis');
            }
        });
    });

    // Render Pertama Kali
    refreshCanvas();
});
