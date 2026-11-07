/**
 * DemoGenerator - Precision 3D Isometric Wireframe Placeholder Engine
 * Generates clean, commercial wireframe skeleton cards (kotak putih-abu)
 * preventing user confusion and inviting screenshot uploads.
 */
class DemoGenerator {
    static generateSet(theme = 'light', count = 12, isMobile = false) {
        const cards = [];
        for (let i = 0; i < count; i++) {
            cards.push(this.createPlaceholderCard(i, theme, count, isMobile));
        }
        return cards;
    }

    static createLightCard(index, count = 12, isMobile = false) {
        return this.createPlaceholderCard(index, 'light', count, isMobile);
    }

    static createDarkCard(index, count = 12, isMobile = false) {
        return this.createPlaceholderCard(index, 'dark', count, isMobile);
    }

    static createPlaceholderCard(index, theme = 'light', count = 12, isMobile = false) {
        const c = document.createElement('canvas');
        const w = isMobile ? 540 : 920;
        const h = isMobile ? 1100 : 580;
        c.width = w;
        c.height = h;
        const ctx = c.getContext('2d');

        const isDark = theme === 'dark' || theme === 'ecovision';
        const isFocal = (count === 12 && (index === 5 || index === 6)) ||
                        (count === 9 && index === 4) ||
                        (count === 7 && index === 3);

        // 1. Background Surface
        ctx.fillStyle = isDark ? '#0b0f17' : '#f8fafc';
        ctx.fillRect(0, 0, w, h);

        // 2. Subtle Checkerboard / Grid Pattern
        ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(15, 23, 42, 0.025)';
        const tileSize = isMobile ? 24 : 32;
        for (let y = 0; y < h; y += tileSize) {
            for (let x = 0; x < w; x += tileSize) {
                if (((x / tileSize) + (y / tileSize)) % 2 === 0) {
                    ctx.fillRect(x, y, tileSize, tileSize);
                }
            }
        }

        // Outer Card Border
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, w - 2, h - 2);

        if (isMobile) {
            // ==========================================
            // SMARTPHONE PORTRAIT WIREFRAME (540 x 1100)
            // ==========================================
            // Dynamic Island / Speaker Notch
            ctx.fillStyle = isDark ? '#1e293b' : '#e2e8f0';
            ctx.beginPath();
            ctx.roundRect((w - 120) / 2, 16, 120, 24, 12);
            ctx.fill();

            // Status Bar time & battery pills
            ctx.fillStyle = isDark ? '#475569' : '#94a3b8';
            ctx.font = 'bold 14px ui-monospace, monospace';
            ctx.fillText('9:41', 28, 34);
            ctx.beginPath();
            ctx.roundRect(w - 60, 20, 32, 14, 4);
            ctx.fill();

            // App Topbar
            const topBarY = 56;
            ctx.fillStyle = isFocal ? '#FFE3ED' : (isDark ? '#1e293b' : (index % 3 === 0 ? '#FFE3ED' : (index % 3 === 1 ? '#9BE3DE' : '#BEEBE9')));
            ctx.beginPath();
            ctx.roundRect(20, topBarY, w - 40, 58, 14);
            ctx.fill();
            ctx.strokeStyle = isFocal ? '#FFB8D2' : (isDark ? '#334155' : '#e2e8f0');
            ctx.lineWidth = isFocal ? 2 : 1;
            ctx.stroke();

            ctx.fillStyle = isFocal ? '#0f172a' : (isDark ? '#f8fafc' : '#0f172a');
            ctx.font = 'bold 18px sans-serif';
            ctx.fillText(isFocal ? `🌸 SLOT #${index + 1} (FOKUS UTAMA)` : `SLOT #${index + 1}`, 38, topBarY + 36);

            // Hero Card Area
            const heroY = topBarY + 74;
            ctx.fillStyle = isDark ? '#161f30' : '#ffffff';
            ctx.beginPath();
            ctx.roundRect(20, heroY, w - 40, 220, 18);
            ctx.fill();
            ctx.strokeStyle = isDark ? '#334155' : '#e2e8f0';
            ctx.stroke();

            // Skeleton lines inside hero
            ctx.fillStyle = isFocal ? 'rgba(155, 227, 222, 0.45)' : (isDark ? '#334155' : '#e2e8f0');
            ctx.beginPath();
            ctx.roundRect(38, heroY + 24, w - 76, 28, 8);
            ctx.fill();
            ctx.fillStyle = isDark ? '#243247' : '#f1f5f9';
            ctx.beginPath();
            ctx.roundRect(38, heroY + 68, (w - 76) * 0.7, 18, 6);
            ctx.roundRect(38, heroY + 98, (w - 76) * 0.85, 18, 6);
            ctx.fill();

            // Center Call-To-Action Dropzone
            const dropY = heroY + 240;
            ctx.fillStyle = isFocal ? 'rgba(255, 227, 237, 0.55)' : (isDark ? 'rgba(155, 227, 222, 0.08)' : 'rgba(255, 227, 237, 0.18)');
            ctx.strokeStyle = isFocal ? '#FF8EB2' : (isDark ? '#334155' : '#cbd5e1');
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 6]);
            ctx.beginPath();
            ctx.roundRect(20, dropY, w - 40, 280, 20);
            ctx.fill();
            ctx.stroke();
            ctx.setLineDash([]); // Reset dash

            // Upload Camera Icon
            ctx.fillStyle = isFocal ? '#0f766e' : (isDark ? '#64748b' : '#94a3b8');
            ctx.font = '42px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(isFocal ? '🌸' : '📱', w / 2, dropY + 85);

            ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
            ctx.font = 'bold 20px sans-serif';
            ctx.fillText(`Slot #${index + 1}: Siap Diisi Foto HP`, w / 2, dropY + 130);

            ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
            ctx.font = '14px sans-serif';
            ctx.fillText('Ketuk atau tarik screenshot 9:16 ke sini', w / 2, dropY + 165);

            ctx.fillStyle = isFocal ? '#83264e' : (isDark ? '#38bdf8' : '#0f766e');
            ctx.font = 'bold 13px ui-monospace, monospace';
            ctx.fillText('FORMAT: JPG / PNG / WEBP', w / 2, dropY + 205);
            ctx.textAlign = 'left';

            // Bottom List Skeletons
            const listY = dropY + 300;
            for (let i = 0; i < 3; i++) {
                const itemY = listY + i * 62;
                if (itemY + 50 > h - 40) break;
                ctx.fillStyle = isDark ? '#161f30' : '#ffffff';
                ctx.beginPath();
                ctx.roundRect(20, itemY, w - 40, 52, 12);
                ctx.fill();
                ctx.strokeStyle = isDark ? '#1e293b' : '#f1f5f9';
                ctx.stroke();

                ctx.fillStyle = isDark ? '#334155' : '#e2e8f0';
                ctx.beginPath();
                ctx.roundRect(36, itemY + 14, 24, 24, 6);
                ctx.roundRect(72, itemY + 18, 180, 16, 5);
                ctx.fill();
            }

            // Bottom Nav Bar
            ctx.fillStyle = isDark ? '#1e293b' : '#cbd5e1';
            ctx.beginPath();
            ctx.roundRect((w - 140) / 2, h - 18, 140, 5, 3);
            ctx.fill();

        } else {
            // ==========================================
            // LANDSCAPE WIREFRAME CARD (920 x 580)
            // ==========================================
            // Header Bar
            const headerH = 64;
            ctx.fillStyle = isFocal ? '#FFE3ED' : (isDark ? '#161f30' : (index % 3 === 0 ? '#FFE3ED' : (index % 3 === 1 ? '#9BE3DE' : '#BEEBE9')));
            ctx.fillRect(0, 0, w, headerH);

            ctx.strokeStyle = isFocal ? '#FFB8D2' : (isDark ? '#1e293b' : '#e2e8f0');
            ctx.lineWidth = isFocal ? 2.5 : 1;
            ctx.beginPath();
            ctx.moveTo(0, headerH);
            ctx.lineTo(w, headerH);
            ctx.stroke();

            // Header Icon / Title
            ctx.fillStyle = isFocal ? '#0f172a' : (isDark ? '#f8fafc' : '#0f172a');
            ctx.font = 'bold 20px sans-serif';
            ctx.fillText(isFocal ? `🌸 SLOT #${index + 1} (FOKUS UTAMA)` : `SLOT #${index + 1}`, 32, 40);

            // Right header status badge
            ctx.fillStyle = isFocal ? '#9BE3DE' : (isDark ? '#1e293b' : '#f1f5f9');
            ctx.beginPath();
            ctx.roundRect(w - 190, 16, 158, 32, 8);
            ctx.fill();
            ctx.fillStyle = isFocal ? '#044343' : (isDark ? '#94a3b8' : '#64748b');
            ctx.font = 'bold 12px ui-monospace, monospace';
            ctx.fillText(isFocal ? '🌸 FOKUS HERO' : 'SIAP UNGGAH', w - 170, 37);

            // 3 Top Metric Skeleton Cards
            const metricY = 88;
            const metricW = 268;
            const metricH = 92;
            const metricGap = 20;
            for (let i = 0; i < 3; i++) {
                const mx = 32 + i * (metricW + metricGap);
                ctx.fillStyle = isDark ? '#131b2a' : '#ffffff';
                ctx.beginPath();
                ctx.roundRect(mx, metricY, metricW, metricH, 12);
                ctx.fill();
                ctx.strokeStyle = isDark ? '#1e293b' : '#e2e8f0';
                ctx.stroke();

                // Skeleton bars inside metric
                ctx.fillStyle = isFocal && i === 0 ? 'rgba(155, 227, 222, 0.5)' : (isDark ? '#334155' : '#e2e8f0');
                ctx.beginPath();
                ctx.roundRect(mx + 16, metricY + 16, 32, 32, 8);
                ctx.fill();

                ctx.fillStyle = isDark ? '#243247' : '#f1f5f9';
                ctx.beginPath();
                ctx.roundRect(mx + 60, metricY + 20, 110, 14, 4);
                ctx.roundRect(mx + 60, metricY + 44, 70, 18, 5);
                ctx.fill();
            }

            // Center Dropzone Invitation Box
            const boxY = 202;
            const boxW = w - 64;
            const boxH = 220;
            ctx.fillStyle = isFocal ? 'rgba(255, 227, 237, 0.55)' : (isDark ? '#0d131f' : '#ffffff');
            ctx.strokeStyle = isFocal ? '#FF8EB2' : (isDark ? '#334155' : '#cbd5e1');
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 6]);
            ctx.beginPath();
            ctx.roundRect(32, boxY, boxW, boxH, 16);
            ctx.fill();
            ctx.stroke();
            ctx.setLineDash([]);

            // Center text and icon inside dropzone
            ctx.textAlign = 'center';
            ctx.fillStyle = isFocal ? '#0f766e' : (isDark ? '#64748b' : '#94a3b8');
            ctx.font = '40px sans-serif';
            ctx.fillText(isFocal ? '🌸' : '📷', w / 2, boxY + 70);

            ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
            ctx.font = 'bold 22px sans-serif';
            ctx.fillText(`Slot #${index + 1}: Siap Diisi Screenshot Anda`, w / 2, boxY + 115);

            ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
            ctx.font = '15px sans-serif';
            ctx.fillText('Tarik gambar ke layar atau klik slot ini untuk mengganti foto', w / 2, boxY + 148);

            ctx.fillStyle = isFocal ? '#83264e' : (isDark ? '#38bdf8' : '#0f766e');
            ctx.font = 'bold 12.5px ui-monospace, monospace';
            ctx.fillText('PRESET WIREFRAME BERSIH • RASIO 16:9 • 1:1 RESOLUSI ASLI', w / 2, boxY + 182);
            ctx.textAlign = 'left';

            // Bottom Skeleton Table Rows
            const tableY = boxY + boxH + 20;
            ctx.fillStyle = isDark ? '#161f30' : '#ffffff';
            ctx.beginPath();
            ctx.roundRect(32, tableY, boxW, 110, 12);
            ctx.fill();
            ctx.strokeStyle = isDark ? '#1e293b' : '#e2e8f0';
            ctx.stroke();

            for (let r = 0; r < 2; r++) {
                const ry = tableY + 20 + r * 42;
                ctx.fillStyle = isDark ? '#243247' : '#f1f5f9';
                ctx.beginPath();
                ctx.roundRect(50, ry, 160, 14, 4);
                ctx.roundRect(240, ry, 280, 14, 4);
                ctx.roundRect(560, ry, 140, 14, 4);
                ctx.roundRect(740, ry, 110, 14, 4);
                ctx.fill();
            }
        }

        return c;
    }
}
