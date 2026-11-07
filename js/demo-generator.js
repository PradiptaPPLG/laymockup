class DemoGenerator {
    static generateSet(theme = 'light') {
        const cards = [];
        for (let i = 0; i < 12; i++) {
            cards.push(theme === 'light' ? this.createLightCard(i) : this.createDarkCard(i));
        }
        return cards;
    }

    static createLightCard(index) {
        const c = document.createElement('canvas');
        c.width = 920;
        c.height = 580;
        const ctx = c.getContext('2d');

        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, 920, 580);

        // Slot #3 (Dashboard Admin) & Slot #6 (Portal Publik SOPAN)
        if (index === 2 || index === 5) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 920, 54);
            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 19px sans-serif';
            ctx.fillText(index === 5 ? 'Portal Publik SOPAN' : 'Dashboard Admin', 30, 34);

            const stats = [
                { label: 'Total Guru', val: '97', bg: '#eff6ff', dot: '#3b82f6' },
                { label: 'Total Siswa', val: '1994', bg: '#ecfdf5', dot: '#10b981' },
                { label: 'Total Kelas', val: '54', bg: '#f5f3ff', dot: '#8b5cf6' },
                { label: 'Pertemuan Hari Ini', val: '0', bg: '#fffbeb', dot: '#f59e0b' }
            ];
            stats.forEach((st, i) => {
                const sx = 30 + i * 218;
                const sy = 76;
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#e2e8f0';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.roundRect(sx, sy, 202, 112, 12);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = st.bg;
                ctx.beginPath();
                ctx.roundRect(sx + 16, sy + 16, 32, 32, 8);
                ctx.fill();

                ctx.fillStyle = st.dot;
                ctx.beginPath();
                ctx.arc(sx + 32, sy + 32, 7, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#0f172a';
                ctx.font = 'bold 26px sans-serif';
                ctx.fillText(st.val, sx + 16, sy + 78);

                ctx.fillStyle = '#64748b';
                ctx.font = '12px sans-serif';
                ctx.fillText(st.label, sx + 16, sy + 98);
            });

            // Left Box
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.roundRect(30, 210, 418, 340, 14);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#2563eb';
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText('● SISTEM OPERASI PRESENSI SMKN 1 CIAMIS', 54, 250);

            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 24px sans-serif';
            ctx.fillText('Aplikasi Sistem Operasi Presensi', 54, 288);
            ctx.fillText('Kehadiran Mengajar Guru', 54, 318);

            ctx.fillStyle = '#64748b';
            ctx.font = '13px sans-serif';
            ctx.fillText('Monitoring kehadiran real-time, rekapitulasi KBM,', 54, 352);
            ctx.fillText('dan laporan presensi guru terintegrasi.', 54, 372);

            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.roundRect(54, 466, 230, 50, 12);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px sans-serif';
            ctx.fillText('Install Aplikasi SOPAN', 84, 496);

            // Right Box (Donut Chart)
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.roundRect(470, 210, 420, 340, 14);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 17px sans-serif';
            ctx.fillText('Distribusi Kehadiran (7 Hari)', 496, 248);

            const cx = 680, cy = 380, rad = 82;
            ctx.lineWidth = 28;
            ctx.strokeStyle = '#10b981';
            ctx.beginPath();
            ctx.arc(cx, cy, rad, 0, Math.PI * 1.45);
            ctx.stroke();

            ctx.strokeStyle = '#3b82f6';
            ctx.beginPath();
            ctx.arc(cx, cy, rad, Math.PI * 1.45, Math.PI * 1.82);
            ctx.stroke();

            ctx.strokeStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(cx, cy, rad, Math.PI * 1.82, Math.PI * 2);
            ctx.stroke();
        } else if (index === 1 || index === 6 || index === 11) {
            // Blue Gradient Header Card: Kenaikan Kelas & Tutup Tahun Ajaran
            this.drawLightSidebar(ctx);
            const grad = ctx.createLinearGradient(204, 60, 888, 210);
            grad.addColorStop(0, '#3b82f6');
            grad.addColorStop(1, '#2563eb');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(208, 60, 682, 140, 14);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 25px sans-serif';
            ctx.fillText('Kenaikan Kelas & Tutup Tahun Ajaran', 236, 118);
            ctx.fillStyle = 'rgba(255,255,255,0.86)';
            ctx.font = '13px sans-serif';
            ctx.fillText('Promosi tingkat kelas otomatis & pengarsipan data akademik tahunan.', 236, 148);

            const boxes = ['2025/2026', '642 Siswa X', '724 Siswa XI', '628 Siswa XII'];
            boxes.forEach((b, idx) => {
                const bx = 208 + idx * 173;
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#e2e8f0';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.roundRect(bx, 220, 160, 94, 10);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#0f172a';
                ctx.font = 'bold 20px sans-serif';
                ctx.fillText(b, bx + 16, 276);
            });

            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.roundRect(208, 334, 682, 214, 12);
            ctx.fill();
            ctx.stroke();

            for (let r = 0; r < 3; r++) {
                ctx.fillStyle = '#eff6ff';
                ctx.beginPath();
                ctx.roundRect(228, 356 + r * 56, 642, 42, 8);
                ctx.fill();
                ctx.fillStyle = '#1e293b';
                ctx.font = 'bold 13px sans-serif';
                ctx.fillText(`${r + 1}. Validasi Rapor & Konfigurasi Periode Tahun Akademik`, 246, 382 + r * 56);
            }
        } else {
            // Table Card: Manajemen Guru / Manajemen Siswa
            this.drawLightSidebar(ctx);
            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 20px sans-serif';
            ctx.fillText(index % 2 === 0 ? 'Manajemen Guru' : 'Manajemen Siswa', 208, 44);

            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.roundRect(764, 18, 126, 34, 8);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText('+ Import Excel', 782, 39);

            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(208, 68, 682, 482, 12);
            ctx.fill();
            ctx.stroke();

            const names = [
                'ACEP MUHAMMAD SOLEH, S.Pd.',
                'AGUNG SOFIYANI, S.E.',
                'AI SITI MUNAWAROH, S.Pd.',
                'ALISAH, S.Pd. H.J.',
                'AMIRUDIN, S.Pd.',
                'ABDUL ROHIMAT'
            ];
            names.forEach((name, rowIdx) => {
                const ry = 128 + rowIdx * 66;
                ctx.strokeStyle = '#f1f5f9';
                ctx.beginPath();
                ctx.moveTo(224, ry);
                ctx.lineTo(872, ry);
                ctx.stroke();

                ctx.fillStyle = rowIdx % 2 === 0 ? '#3b82f6' : '#0ea5e9';
                ctx.beginPath();
                ctx.arc(252, ry + 32, 15, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#0f172a';
                ctx.font = 'bold 13px sans-serif';
                ctx.fillText(name, 280, ry + 37);

                ctx.fillStyle = '#dcfce7';
                ctx.beginPath();
                ctx.roundRect(634, ry + 18, 70, 26, 13);
                ctx.fill();
                ctx.fillStyle = '#15803d';
                ctx.font = 'bold 11px sans-serif';
                ctx.fillText('✓ Aktif', 648, ry + 35);

                ctx.fillStyle = '#2563eb';
                ctx.beginPath();
                ctx.roundRect(730, ry + 18, 102, 26, 6);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.fillText('Detail Profil', 748, ry + 35);
            });
        }
        return c;
    }

    static drawLightSidebar(ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 186, 580);
        ctx.strokeStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(186, 0);
        ctx.lineTo(186, 580);
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('SMK Negeri 1 Ciamis', 24, 36);

        const menus = ['Dashboard', 'Guru', 'Siswa', 'Kelas', 'Jadwal KBM', 'Presensi', 'Kenaikan Kelas', 'Pengaturan'];
        menus.forEach((m, i) => {
            const my = 78 + i * 44;
            if (i === 0 || i === 2) {
                ctx.fillStyle = '#eff6ff';
                ctx.beginPath();
                ctx.roundRect(14, my - 18, 158, 32, 8);
                ctx.fill();
                ctx.fillStyle = '#2563eb';
            } else {
                ctx.fillStyle = '#64748b';
            }
            ctx.font = '600 12px sans-serif';
            ctx.fillText(m, 32, my + 2);
        });
    }

    static createDarkCard(index) {
        const c = document.createElement('canvas');
        c.width = 920;
        c.height = 580;
        const ctx = c.getContext('2d');

        ctx.fillStyle = '#0b0f14';
        ctx.fillRect(0, 0, 920, 580);

        // Navbar
        ctx.fillStyle = '#0f161d';
        ctx.fillRect(0, 0, 920, 56);
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(38, 28, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('EcoVision AI', 58, 33);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px sans-serif';
        ctx.fillText('Home     Features     About     Model Testing', 290, 33);

        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(770, 14, 120, 28, 14);
        ctx.stroke();
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('Start Scanning', 790, 32);

        if (index === 2 || index === 8) {
            // Hero Card: Scan. Sort. Save the Planet.
            ctx.fillStyle = 'rgba(16, 185, 129, 0.14)';
            ctx.beginPath();
            ctx.roundRect(48, 104, 240, 26, 13);
            ctx.fill();
            ctx.fillStyle = '#10b981';
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText('● AI WASTE CLASSIFICATION', 64, 121);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 46px sans-serif';
            ctx.fillText('Scan. Sort.', 48, 188);
            ctx.fillStyle = '#06b6d4';
            ctx.fillText('Save the Planet.', 48, 242);

            ctx.fillStyle = '#94a3b8';
            ctx.font = '14px sans-serif';
            ctx.fillText('AI-powered waste classification and environmental education', 48, 286);
            ctx.fillText('platform that helps everyone recycle accurately.', 48, 308);

            const btnGrad = ctx.createLinearGradient(48, 344, 200, 388);
            btnGrad.addColorStop(0, '#10b981');
            btnGrad.addColorStop(1, '#06b6d4');
            ctx.fillStyle = btnGrad;
            ctx.beginPath();
            ctx.roundRect(48, 344, 152, 44, 22);
            ctx.fill();
            ctx.fillStyle = '#041318';
            ctx.font = 'bold 14px sans-serif';
            ctx.fillText('Get Started →', 76, 371);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 25px sans-serif';
            ctx.fillText('98.4%', 48, 468);
            ctx.fillText('< 1s', 182, 468);
            ctx.fillText('100%', 294, 468);
            ctx.fillStyle = '#64748b';
            ctx.font = '12px sans-serif';
            ctx.fillText('AI Accuracy', 48, 490);
            ctx.fillText('Scan Speed', 182, 490);
            ctx.fillText('Open Source', 294, 490);

            ctx.fillStyle = '#111921';
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.32)';
            ctx.beginPath();
            ctx.roundRect(520, 94, 352, 434, 18);
            ctx.fill();
            ctx.stroke();

            ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
            ctx.beginPath();
            ctx.arc(696, 260, 90, 0, Math.PI * 2);
            ctx.stroke();
        } else if (index === 5) {
            // Center Card #6: Everything Features
            ctx.textAlign = 'center';
            ctx.fillStyle = '#10b981';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText('INTELLIGENT FEATURES', 460, 118);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 40px sans-serif';
            ctx.fillText('Everything Features', 460, 164);

            ctx.fillStyle = '#94a3b8';
            ctx.font = '14px sans-serif';
            ctx.fillText('Empowering citizens, students, and communities with AI sorting.', 460, 198);
            ctx.textAlign = 'left';

            const feats = ['AI Waste Detection', 'Smart Recycling', 'Environmental Impact', 'Responsible AI'];
            feats.forEach((f, idx) => {
                const fx = 44 + idx * 212;
                ctx.fillStyle = '#111820';
                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                ctx.beginPath();
                ctx.roundRect(fx, 242, 196, 270, 16);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = 'rgba(16, 185, 129, 0.16)';
                ctx.beginPath();
                ctx.roundRect(fx + 20, 264, 42, 42, 10);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 16px sans-serif';
                ctx.fillText(f, fx + 20, 342);
                ctx.fillStyle = '#64748b';
                ctx.font = '12px sans-serif';
                ctx.fillText('Real-time computer vision', fx + 20, 372);
                ctx.fillText('classification & guidance.', fx + 20, 392);
            });
        } else if (index === 6) {
            // Card #7: Waste Scanner
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 36px sans-serif';
            ctx.fillText('Waste Scanner', 460, 134);
            ctx.fillStyle = '#94a3b8';
            ctx.font = '14px sans-serif';
            ctx.fillText('Upload an image of waste and let AI analyze it.', 460, 164);

            ctx.fillStyle = '#111820';
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
            ctx.setLineDash([8, 6]);
            ctx.beginPath();
            ctx.roundRect(110, 204, 700, 300, 18);
            ctx.fill();
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = '#06b6d4';
            ctx.beginPath();
            ctx.arc(460, 322, 28, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 17px sans-serif';
            ctx.fillText('Click or drag image to upload', 460, 386);
            ctx.textAlign = 'left';
        } else {
            // Sign In Card
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 34px sans-serif';
            ctx.fillText('Sign in to EcoVision AI', 460, 148);

            ctx.fillStyle = '#111820';
            ctx.strokeStyle = 'rgba(255,255,255,0.09)';
            ctx.beginPath();
            ctx.roundRect(236, 186, 448, 310, 16);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#0b0f14';
            ctx.beginPath();
            ctx.roundRect(272, 234, 376, 46, 10);
            ctx.roundRect(272, 304, 376, 46, 10);
            ctx.fill();

            const grad = ctx.createLinearGradient(272, 380, 648, 428);
            grad.addColorStop(0, '#10b981');
            grad.addColorStop(1, '#06b6d4');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(272, 380, 376, 48, 24);
            ctx.fill();

            ctx.fillStyle = '#041318';
            ctx.font = 'bold 15px sans-serif';
            ctx.fillText('Sign In', 460, 410);
            ctx.textAlign = 'left';
        }
        return c;
    }
}

window.DemoGenerator = DemoGenerator;
window.ReferenceDemoGenerator = DemoGenerator;
