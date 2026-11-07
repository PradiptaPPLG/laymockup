class IsometricRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.baseWidth = 2752;
        this.baseHeight = 1536;
        this.canvas.width = this.baseWidth;
        this.canvas.height = this.baseHeight;

        this.theme = 'light';
        this.zoomMode = 'reference'; // 'reference' (1:1 foto) atau 'fit' (12 kartu utuh)

        // Ukuran kartu & jarak lorong pemisah (dijamin 0% tumpang-tindih)
        this.cardW = 920;
        this.cardH = 580;
        this.cardRadius = 22;
        this.gapX = 36;
        this.gapY = 36;

        // Sudut bidang miring persis foto referensi
        this.rotationDeg = -32.5;
        this.foreshortenY = 0.88;
    }

    /**
     * Posisi 12 Kartu Utama dalam formasi 1-3-4-3-1 pada kisi-kisi (col, row) bulat
     * sehingga semua celah kartu membentuk garis lurus tanpa ada yang menumpuk.
     */
    getPrimary12Slots() {
        return [
            // Baris 1 (1 Kartu Puncak Atas)
            { slot: 0, col: 0, row: -2 },

            // Baris 2 (3 Kartu Atas)
            { slot: 1, col: -1, row: -2 },
            { slot: 2, col: 0, row: -1 },
            { slot: 3, col: 1, row: -1 },

            // Baris 3 (4 Kartu Tengah Utama)
            { slot: 4, col: -1, row: -1 },
            { slot: 5, col: 0, row: 0, focal: true }, // #6 ★ Centerpiece (Portal Publik SOPAN / Everything Features)
            { slot: 6, col: 1, row: 0, focal: true }, // #7 ★ Center-Right (Kenaikan Kelas / Waste Scanner)
            { slot: 7, col: 2, row: 0 },

            // Baris 4 (3 Kartu Bawah)
            { slot: 8, col: -1, row: 0 },              // #9 Bawah Kiri (Manajemen Guru / Scan. Sort.)
            { slot: 9, col: 0, row: 1 },              // #10 Bawah Tengah (Manajemen Siswa)
            { slot: 10, col: 1, row: 1 },              // #11 Bawah Kanan (Sign in / Konfigurasi)

            // Baris 5 (1 Kartu Dasar Bawah)
            { slot: 11, col: 1, row: 2 }
        ];
    }

    /**
     * Sudut pinggir tambahan khusus mode 1:1 Reference agar sudut kanvas penuh
     * seperti foto referensi tanpa celah kosong di pojok.
     */
    getEdgeBleedSlots() {
        return [
            { slot: 3, col: 1, row: -2 },
            { slot: 7, col: 2, row: -1 },
            { slot: 8, col: -2, row: -1 },
            { slot: 9, col: -1, row: 1 },
            { slot: 11, col: 0, row: 2 },
            { slot: 1, col: 2, row: 1 }
        ];
    }

    render(slotsData, targetCanvas = this.canvas, customW = null, customH = null) {
        const width = customW || targetCanvas.width;
        const height = customH || targetCanvas.height;
        if (targetCanvas.width !== width) targetCanvas.width = width;
        if (targetCanvas.height !== height) targetCanvas.height = height;

        const ctx = targetCanvas.getContext('2d');
        ctx.save();

        // 1. Background Studio
        this.drawBackground(ctx, width, height);

        // 2. Matriks Proyeksi Isometrik
        const rad = (this.rotationDeg * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const sy = this.foreshortenY;

        const resScale = Math.min(width / this.baseWidth, height / this.baseHeight);
        const zoomFactor = this.zoomMode === 'reference' ? 0.96 : 0.56;
        const S = resScale * zoomFactor;

        const ux = cos * S;
        const uy = sin * sy * S;
        const vx = -sin * S;
        const vy = cos * sy * S;

        // Titik pusat kamera: menempatkan Slot #6 (0,0) tepat seperti foto referensi
        const originX = this.zoomMode === 'reference' ? width * 0.465 : width * 0.46;
        const originY = this.zoomMode === 'reference' ? height * 0.525 : height * 0.50;

        const stepX = this.cardW + this.gapX;
        const stepY = this.cardH + this.gapY;

        const activeGrid = this.zoomMode === 'reference'
            ? [...this.getPrimary12Slots(), ...this.getEdgeBleedSlots()]
            : this.getPrimary12Slots();

        const layout = activeGrid.map((item) => {
            const planeX = item.col * stepX;
            const planeY = item.row * stepY;
            const screenX = originX + planeX * ux + planeY * vx;
            const screenY = originY + planeX * uy + planeY * vy;
            return { ...item, planeX, planeY, screenX, screenY };
        });

        // Urutkan dari belakang ke depan (berdasarkan screenY)
        layout.sort((a, b) => a.screenY - b.screenY);

        const det = ux * vy - uy * vx;
        const screenDownToPlane = (dyScreen) => ({
            dx: (-vx * dyScreen) / det,
            dy: (ux * dyScreen) / det
        });

        ctx.setTransform(ux, uy, vx, vy, originX, originY);

        for (const card of layout) {
            const x = card.planeX - this.cardW / 2;
            const y = card.planeY - this.cardH / 2;
            const source = slotsData[card.slot];
            this.drawCard(ctx, x, y, this.cardW, this.cardH, source, screenDownToPlane, S);
        }

        ctx.restore();
    }

    drawBackground(ctx, width, height) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (this.theme === 'light') {
            const grad = ctx.createLinearGradient(0, 0, width, height);
            grad.addColorStop(0, '#e5eaf1');
            grad.addColorStop(0.5, '#dbe2ec');
            grad.addColorStop(1, '#ced7e4');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
        } else {
            const grad = ctx.createRadialGradient(
                width * 0.5, height * 0.45, width * 0.05,
                width * 0.5, height * 0.5, width * 0.75
            );
            grad.addColorStop(0, '#0a1014');
            grad.addColorStop(1, '#040608');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
        }
    }

    drawCard(ctx, x, y, w, h, source, screenDownToPlane, scale) {
        const r = this.cardRadius;
        const isLight = this.theme === 'light';

        // 1. Soft Drop Shadow
        const shadowOffset = screenDownToPlane(18 * scale);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x + shadowOffset.dx, y + shadowOffset.dy, w, h, r);
        ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(0, 0, 0, 0.72)';
        ctx.shadowColor = isLight ? 'rgba(15, 23, 42, 0.16)' : 'rgba(0, 0, 0, 0.88)';
        ctx.shadowBlur = 32 * scale;
        ctx.shadowOffsetY = 10 * scale;
        ctx.fill();
        ctx.restore();

        // 2. 3D Slab Thickness (Ketebalan kartu 3D)
        for (let i = 4; i >= 1; i--) {
            const tOff = screenDownToPlane((i / 4) * 7 * scale);
            ctx.beginPath();
            ctx.roundRect(x + tOff.dx, y + tOff.dy, w, h, r);
            ctx.fillStyle = isLight
                ? (i === 4 ? '#b8c4d4' : '#d8e1ed')
                : (i === 4 ? '#091016' : '#16202a');
            ctx.fill();
        }

        // 3. Permukaan Kartu & Gambar (0% Crop)
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        ctx.fillStyle = isLight ? '#ffffff' : '#0b0f14';
        ctx.fill();
        ctx.clip();

        if (source) {
            const imgW = source.width || w;
            const imgH = source.height || h;
            const cardRatio = w / h;
            const imgRatio = imgW / imgH;

            let drawW = w, drawH = h, drawX = x, drawY = y;
            if (Math.abs(imgRatio - cardRatio) > 0.18) {
                if (imgRatio > cardRatio) {
                    drawW = w;
                    drawH = w / imgRatio;
                    drawY = y + (h - drawH) / 2;
                } else {
                    drawH = h;
                    drawW = h * imgRatio;
                    drawX = x + (w - drawW) / 2;
                }
            }
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(source, drawX, drawY, drawW, drawH);
        }
        ctx.restore();

        // 4. Garis Tepi Halus (Crisp Border)
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        ctx.lineWidth = 2;
        ctx.strokeStyle = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.12)';
        ctx.stroke();
    }
}

window.IsometricRenderer = IsometricRenderer;
window.IsometricMockupRenderer = IsometricRenderer;
