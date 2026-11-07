const fs = require('fs');

function updateHomepage(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  const oldBlock = `        // Slab
        ctx.fillStyle = isPhone ? '#0f172a' : '#b8c9be';
        ctx.beginPath();
        ctx.roundRect(x, y + (isPhone ? 10 : 6), cardW, cardH, radius);
        ctx.fill();

        // Surface
        ctx.fillStyle = isPhone ? '#090d16' : '#ffffff';
        ctx.beginPath();
        ctx.roundRect(x, y, cardW, cardH, radius);
        ctx.fill();

        if (c.focal) {
          // Emerald + Volt Focal Centerpiece
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          if (isPhone) {
            ctx.roundRect(x + 28, y + 28, cardW - 56, 160, 20);
          } else {
            ctx.roundRect(x + 30, y + 30, cardW - 60, 90, 10);
          }
          ctx.fill();

          ctx.fillStyle = '#d2ff00';
          ctx.beginPath();
          if (isPhone) {
            ctx.roundRect(x + 28, y + 220, 280, 36, 10);
            ctx.fillStyle = '#334155';
            ctx.roundRect(x + 28, y + 280, cardW - 56, 220, 16);
          } else {
            ctx.roundRect(x + 30, y + 150, 240, 24, 6);
            ctx.fillStyle = '#e2e8f0';
            ctx.roundRect(x + 30, y + 190, 340, 16, 6);
          }
          ctx.fill();

          // Volt glow border on focal card
          ctx.strokeStyle = '#d2ff00';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.roundRect(x, y, cardW, cardH, radius);
          ctx.stroke();
        } else {
          ctx.fillStyle = isPhone ? '#1e293b' : '#f1f5f9';
          ctx.beginPath();
          if (isPhone) {
            ctx.roundRect(x + 24, y + 24, cardW - 48, 80, 14);
            ctx.fillStyle = '#334155';
            ctx.roundRect(x + 24, y + 130, 240, 24, 6);
            ctx.roundRect(x + 24, y + 180, cardW - 48, 140, 12);
          } else {
            ctx.roundRect(x + 30, y + 30, cardW - 60, 40, 8);
            ctx.fillStyle = '#e2e8f0';
            ctx.roundRect(x + 30, y + 90, 180, 20, 6);
            ctx.roundRect(x + 30, y + 130, 400, 14, 4);
          }
          ctx.fill();

          ctx.strokeStyle = isPhone ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x, y, cardW, cardH, radius);
          ctx.stroke();
        }`;

  const newBlock = `        // Slab
        ctx.fillStyle = '#b8c9be';
        ctx.beginPath();
        ctx.roundRect(x, y + (isPhone ? 8 : 6), cardW, cardH, radius);
        ctx.fill();

        // Surface (Semua kartu seragam putih bersih wireframe)
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.roundRect(x, y, cardW, cardH, radius);
        ctx.fill();

        if (c.focal) {
          // Emerald + Volt Focal Centerpiece
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          if (isPhone) {
            ctx.roundRect(x + 28, y + 28, cardW - 56, 160, 20);
          } else {
            ctx.roundRect(x + 30, y + 30, cardW - 60, 90, 10);
          }
          ctx.fill();

          ctx.fillStyle = '#d2ff00';
          ctx.beginPath();
          if (isPhone) {
            ctx.roundRect(x + 28, y + 220, 280, 36, 10);
            ctx.fillStyle = '#e2e8f0';
            ctx.roundRect(x + 28, y + 280, cardW - 56, 220, 16);
          } else {
            ctx.roundRect(x + 30, y + 150, 240, 24, 6);
            ctx.fillStyle = '#e2e8f0';
            ctx.roundRect(x + 30, y + 190, 340, 16, 6);
          }
          ctx.fill();

          // Volt glow border on focal card
          ctx.strokeStyle = '#d2ff00';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.roundRect(x, y, cardW, cardH, radius);
          ctx.stroke();
        } else {
          // Kartu Wireframe Light Seragam
          ctx.fillStyle = '#f1f5f9';
          ctx.beginPath();
          if (isPhone) {
            ctx.roundRect(x + 24, y + 24, cardW - 48, 80, 14);
            ctx.fillStyle = '#e2e8f0';
            ctx.roundRect(x + 24, y + 130, 240, 24, 6);
            ctx.roundRect(x + 24, y + 180, cardW - 48, 140, 12);
          } else {
            ctx.roundRect(x + 30, y + 30, cardW - 60, 40, 8);
            ctx.fillStyle = '#e2e8f0';
            ctx.roundRect(x + 30, y + 90, 180, 20, 6);
            ctx.roundRect(x + 30, y + 130, 400, 14, 4);
          }
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x, y, cardW, cardH, radius);
          ctx.stroke();
        }`;

  if (!content.includes(oldBlock)) {
    console.error('oldBlock not found in', filename);
    return false;
  }

  content = content.replace(oldBlock, newBlock);
  fs.writeFileSync(filename, content, 'utf8');
  console.log('Successfully updated', filename);
  return true;
}

updateHomepage('index.html');
updateHomepage('beranda.html');

