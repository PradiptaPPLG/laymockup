const fs = require('fs');

function enrichDemoGen(content) {
  // Mobile Topbar
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#9BE3DE' : (isDark ? '#1e293b' : '#ffffff');",
    "ctx.fillStyle = isFocal ? '#FFE3ED' : (isDark ? '#1e293b' : (index % 3 === 0 ? '#FFE3ED' : (index % 3 === 1 ? '#9BE3DE' : '#BEEBE9')));"
  );
  content = content.replace(
    "ctx.strokeStyle = isFocal ? '#FFE3ED' : (isDark ? '#334155' : '#e2e8f0');",
    "ctx.strokeStyle = isFocal ? '#FFB8D2' : (isDark ? '#334155' : '#e2e8f0');"
  );
  content = content.replace(
    "ctx.fillText(isFocal ? `★ SLOT #${index + 1} (FOKUS UTAMA)` : `SLOT #${index + 1}`, 38, topBarY + 36);",
    "ctx.fillText(isFocal ? `🌸 SLOT #${index + 1} (FOKUS UTAMA)` : `SLOT #${index + 1}`, 38, topBarY + 36);"
  );

  // Mobile Dropzone
  content = content.replace(
    "ctx.fillStyle = isDark ? 'rgba(155, 227, 222, 0.08)' : 'rgba(155, 227, 222, 0.06)';",
    "ctx.fillStyle = isFocal ? 'rgba(255, 227, 237, 0.55)' : (isDark ? 'rgba(155, 227, 222, 0.08)' : 'rgba(255, 227, 237, 0.18)');"
  );
  content = content.replace(
    "ctx.strokeStyle = isFocal ? '#9BE3DE' : (isDark ? '#334155' : '#cbd5e1');",
    "ctx.strokeStyle = isFocal ? '#FF8EB2' : (isDark ? '#334155' : '#cbd5e1');"
  );
  content = content.replace(
    "ctx.fillText('📱', w / 2, dropY + 85);",
    "ctx.fillText(isFocal ? '🌸' : '📱', w / 2, dropY + 85);"
  );

  // Landscape Header
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#9BE3DE' : (isDark ? '#161f30' : '#ffffff');\n            ctx.fillRect(0, 0, w, headerH);",
    "ctx.fillStyle = isFocal ? '#FFE3ED' : (isDark ? '#161f30' : (index % 3 === 0 ? '#FFE3ED' : (index % 3 === 1 ? '#9BE3DE' : '#BEEBE9')));\n            ctx.fillRect(0, 0, w, headerH);"
  );
  content = content.replace(
    "ctx.strokeStyle = isFocal ? '#FFE3ED' : (isDark ? '#1e293b' : '#e2e8f0');",
    "ctx.strokeStyle = isFocal ? '#FFB8D2' : (isDark ? '#1e293b' : '#e2e8f0');"
  );
  content = content.replace(
    "ctx.fillText(isFocal ? `★ SLOT #${index + 1} (FOKUS UTAMA)` : `SLOT #${index + 1}`, 32, 40);",
    "ctx.fillText(isFocal ? `🌸 SLOT #${index + 1} (FOKUS UTAMA)` : `SLOT #${index + 1}`, 32, 40);"
  );

  // Landscape Right header badge
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#FFE3ED' : (isDark ? '#1e293b' : '#f1f5f9');\n            ctx.beginPath();\n            ctx.roundRect(w - 190, 16, 158, 32, 8);",
    "ctx.fillStyle = isFocal ? '#9BE3DE' : (isDark ? '#1e293b' : '#f1f5f9');\n            ctx.beginPath();\n            ctx.roundRect(w - 190, 16, 158, 32, 8);"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#83264e' : (isDark ? '#94a3b8' : '#64748b');\n            ctx.font = 'bold 12px ui-monospace, monospace';\n            ctx.fillText(isFocal ? '✨ FOKUS HERO' : 'SIAP UNGGAH', w - 170, 37);",
    "ctx.fillStyle = isFocal ? '#044343' : (isDark ? '#94a3b8' : '#64748b');\n            ctx.font = 'bold 12px ui-monospace, monospace';\n            ctx.fillText(isFocal ? '🌸 FOKUS HERO' : 'SIAP UNGGAH', w - 170, 37);"
  );

  // Landscape Dropzone Box
  content = content.replace(
    "ctx.fillStyle = isFocal ? 'rgba(155, 227, 222, 0.08)' : (isDark ? '#0d131f' : '#ffffff');\n            ctx.strokeStyle = isFocal ? '#9BE3DE' : (isDark ? '#334155' : '#cbd5e1');",
    "ctx.fillStyle = isFocal ? 'rgba(255, 227, 237, 0.55)' : (isDark ? '#0d131f' : '#ffffff');\n            ctx.strokeStyle = isFocal ? '#FF8EB2' : (isDark ? '#334155' : '#cbd5e1');"
  );
  content = content.replace(
    "ctx.fillText('📷', w / 2, boxY + 70);",
    "ctx.fillText(isFocal ? '🌸' : '📷', w / 2, boxY + 70);"
  );

  return content;
}

let dg = fs.readFileSync('js/demo-generator.js', 'utf8');
dg = enrichDemoGen(dg);
fs.writeFileSync('js/demo-generator.js', dg, 'utf8');
console.log('js/demo-generator.js enriched with vibrant pastel pink & mint');

// Now enrich inline DemoGenerator in all 6 studios
const studios = [
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html',
  'studio-7-landscape.html',
  'studio-mobile-7.html'
];

for (const s of studios) {
  let sc = fs.readFileSync(s, 'utf8');

  // Sidebar focal card styling
  sc = sc.replace(
    /\.slot-card\.focal\s*\{[\s\S]*?\}/,
    `.slot-card.focal {
      border: 2px solid #FFB8D2 !important;
      background: #FFE3ED !important;
      color: #9d174d !important;
      box-shadow: 0 4px 14px rgba(255, 184, 210, 0.45);
    }`
  );

  // Sidebar dropzone styling
  sc = sc.replace(
    /\.dropzone\s*\{[\s\S]*?border:\s*2px dashed var\(--border-glass\);[\s\S]*?\}/,
    `.dropzone {
      border: 2px dashed #FFB8D2;
      border-radius: var(--radius-lg);
      padding: 24px 16px;
      text-align: center;
      background: rgba(255, 227, 237, 0.35);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }`
  );

  // Theme button text
  sc = sc.replace(/<span>☀️\s*Reference Light<\/span>/g, '<span>🌸 Pastel Light</span>');
  sc = sc.replace(/<span>☀️\s*Wireframe Light<\/span>/g, '<span>🌸 Pastel Light</span>');

  // Active theme button styling
  sc = sc.replace(
    /\.btn-pill\.active\s*\{[\s\S]*?background:\s*var\(--accent-primary\);[\s\S]*?\}/,
    `.btn-pill.active {
      background: #FFE3ED;
      color: #9d174d;
      border: 1.5px solid #FFB8D2;
      font-weight: 700;
      box-shadow: 0 2px 10px rgba(255, 184, 210, 0.4);
    }`
  );

  // Export PNG button gradient
  sc = sc.replace(
    /\.btn-primary\s*\{[\s\S]*?background:\s*var\(--accent-primary\);[\s\S]*?\}/,
    `.btn-primary {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      border-radius: var(--radius-md);
      font-size: 13px;
      font-weight: 700;
      background: linear-gradient(135deg, #9BE3DE 0%, #FFE3ED 100%);
      color: #0f172a;
      border: 1.5px solid #FFB8D2;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(255, 184, 210, 0.45);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }`
  );

  // Enrich inline DemoGenerator inside studio
  // Mobile topbar
  sc = sc.replace(
    "ctx.fillStyle = isFocal ? '#9BE3DE' : (isDark ? '#1e293b' : '#ffffff');",
    "ctx.fillStyle = isFocal ? '#FFE3ED' : (isDark ? '#1e293b' : (index % 3 === 0 ? '#FFE3ED' : (index % 3 === 1 ? '#9BE3DE' : '#BEEBE9')));"
  );
  sc = sc.replace(
    "ctx.strokeStyle = isFocal ? '#FFE3ED' : (isDark ? '#334155' : '#e2e8f0');",
    "ctx.strokeStyle = isFocal ? '#FFB8D2' : (isDark ? '#334155' : '#e2e8f0');"
  );
  sc = sc.replace(
    "ctx.fillText(isFocal ? `★ SLOT #${index + 1} (FOKUS UTAMA)` : `SLOT #${index + 1}`, 38, topBarY + 36);",
    "ctx.fillText(isFocal ? `🌸 SLOT #${index + 1} (FOKUS UTAMA)` : `SLOT #${index + 1}`, 38, topBarY + 36);"
  );

  // Landscape header
  sc = sc.replace(
    "ctx.fillStyle = isFocal ? '#9BE3DE' : (isDark ? '#161f30' : '#ffffff');\n          ctx.fillRect(0, 0, w, headerH);",
    "ctx.fillStyle = isFocal ? '#FFE3ED' : (isDark ? '#161f30' : (index % 3 === 0 ? '#FFE3ED' : (index % 3 === 1 ? '#9BE3DE' : '#BEEBE9')));\n          ctx.fillRect(0, 0, w, headerH);"
  );
  sc = sc.replace(
    "ctx.strokeStyle = isFocal ? '#FFE3ED' : (isDark ? '#1e293b' : '#e2e8f0');",
    "ctx.strokeStyle = isFocal ? '#FFB8D2' : (isDark ? '#1e293b' : '#e2e8f0');"
  );
  sc = sc.replace(
    "ctx.fillText(isFocal ? `★ SLOT #${index + 1} (FOKUS UTAMA)` : `SLOT #${index + 1}`, 32, 40);",
    "ctx.fillText(isFocal ? `🌸 SLOT #${index + 1} (FOKUS UTAMA)` : `SLOT #${index + 1}`, 32, 40);"
  );
  sc = sc.replace(
    "ctx.fillStyle = isFocal ? '#FFE3ED' : (isDark ? '#1e293b' : '#f1f5f9');\n          ctx.beginPath();\n          ctx.roundRect(w - 190, 16, 158, 32, 8);",
    "ctx.fillStyle = isFocal ? '#9BE3DE' : (isDark ? '#1e293b' : '#f1f5f9');\n          ctx.beginPath();\n          ctx.roundRect(w - 190, 16, 158, 32, 8);"
  );
  sc = sc.replace(
    "ctx.fillStyle = isFocal ? '#83264e' : (isDark ? '#94a3b8' : '#64748b');\n          ctx.font = 'bold 12px ui-monospace, monospace';\n          ctx.fillText(isFocal ? '✨ FOKUS HERO' : 'SIAP UNGGAH', w - 170, 37);",
    "ctx.fillStyle = isFocal ? '#044343' : (isDark ? '#94a3b8' : '#64748b');\n          ctx.font = 'bold 12px ui-monospace, monospace';\n          ctx.fillText(isFocal ? '🌸 FOKUS HERO' : 'SIAP UNGGAH', w - 170, 37);"
  );
  sc = sc.replace(
    "ctx.fillStyle = isFocal ? 'rgba(155, 227, 222, 0.08)' : (isDark ? '#0d131f' : '#ffffff');\n          ctx.strokeStyle = isFocal ? '#9BE3DE' : (isDark ? '#334155' : '#cbd5e1');",
    "ctx.fillStyle = isFocal ? 'rgba(255, 227, 237, 0.55)' : (isDark ? '#0d131f' : '#ffffff');\n          ctx.strokeStyle = isFocal ? '#FF8EB2' : (isDark ? '#334155' : '#cbd5e1');"
  );
  sc = sc.replace(
    "ctx.fillText('📷', w / 2, boxY + 70);",
    "ctx.fillText(isFocal ? '🌸' : '📷', w / 2, boxY + 70);"
  );

  fs.writeFileSync(s, sc, 'utf8');
  console.log(`Enriched ${s} with vibrant pastel pink & mint`);
}

