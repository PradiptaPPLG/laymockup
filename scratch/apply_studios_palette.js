const fs = require('fs');

const studios = [
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html',
  'studio-7-landscape.html',
  'studio-mobile-7.html'
];

function transformStudio(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // 1. :root block
  const oldRootMatch = content.match(/:root\s*\{[\s\S]*?--shadow-panel:[^\}]*?\}/);
  if (!oldRootMatch) {
    console.error('Root block not matched in', filename);
    return false;
  }

  const newRoot = `:root {
      --bg-primary: #FFFDF9;
      --bg-secondary: #ffffff;
      --bg-canvas: #d7eae6;
      --bg-glass: rgba(255, 253, 249, 0.94);
      --border-glass: #e2edea;
      --accent-primary: #9BE3DE;
      --accent-hover: #7fd6d0;
      --accent-dark: #0f766e;
      --accent-mint: #9BE3DE;
      --accent-pink: #FFE3ED;
      --accent-ice: #BEEBE9;
      --text-main: #0f172a;
      --text-muted: #475569;
      --text-dim: #94a3b8;
      --radius-lg: 16px;
      --radius-md: 10px;
      --shadow-panel: 0 10px 35px -10px rgba(155, 227, 222, 0.25), 0 0 1px rgba(0, 0, 0, 0.08);
    }`;

  content = content.replace(oldRootMatch[0], newRoot);

  // 2. Button Primary (Export PNG)
  content = content.replace(
    /\.btn-primary\s*\{[\s\S]*?background:\s*var\(--accent-primary\)[\s\S]*?color:\s*#ffffff;[\s\S]*?\}/,
    `.btn-primary {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      border-radius: var(--radius-md);
      font-size: 13px;
      font-weight: 700;
      background: var(--accent-primary);
      color: #0f172a;
      border: 1px solid #7ed5cf;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(155, 227, 222, 0.45);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }`
  );

  // Button Pill Active
  content = content.replace(
    /\.btn-pill\.active\s*\{[\s\S]*?background:\s*#0f172a;[\s\S]*?color:\s*#ffffff;[\s\S]*?\}/,
    `.btn-pill.active {
      background: var(--accent-primary);
      color: #0f172a;
      border-color: #7ed5cf;
      font-weight: 700;
    }`
  );

  // Mobile Topbar Export button
  content = content.replace(
    /background:\s*var\(--accent-primary\)\s*!important;\s*color:\s*#ffffff\s*!important;/,
    'background: var(--accent-primary) !important; color: #0f172a !important; font-weight: 700;'
  );

  // Inline DemoGenerator replacements
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#10b981' : (isDark ? '#1e293b' : '#ffffff');",
    "ctx.fillStyle = isFocal ? '#9BE3DE' : (isDark ? '#1e293b' : '#ffffff');"
  );
  content = content.replace(
    "ctx.strokeStyle = isFocal ? '#d2ff00' : (isDark ? '#334155' : '#e2e8f0');",
    "ctx.strokeStyle = isFocal ? '#FFE3ED' : (isDark ? '#334155' : '#e2e8f0');"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#ffffff' : (isDark ? '#f8fafc' : '#0f172a');\n          ctx.font = 'bold 18px sans-serif';",
    "ctx.fillStyle = isFocal ? '#0f172a' : (isDark ? '#f8fafc' : '#0f172a');\n          ctx.font = 'bold 18px sans-serif';"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#10b981' : (isDark ? '#64748b' : '#94a3b8');\n          ctx.font = '42px sans-serif';",
    "ctx.fillStyle = isFocal ? '#0f766e' : (isDark ? '#64748b' : '#94a3b8');\n          ctx.font = '42px sans-serif';"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#d2ff00' : (isDark ? '#38bdf8' : '#10b981');\n          ctx.font = 'bold 13px ui-monospace, monospace';",
    "ctx.fillStyle = isFocal ? '#83264e' : (isDark ? '#38bdf8' : '#0f766e');\n          ctx.font = 'bold 13px ui-monospace, monospace';"
  );

  // Landscape inline DemoGenerator replacements
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#10b981' : (isDark ? '#161f30' : '#ffffff');\n          ctx.fillRect(0, 0, w, headerH);",
    "ctx.fillStyle = isFocal ? '#9BE3DE' : (isDark ? '#161f30' : '#ffffff');\n          ctx.fillRect(0, 0, w, headerH);"
  );
  content = content.replace(
    "ctx.strokeStyle = isFocal ? '#d2ff00' : (isDark ? '#1e293b' : '#e2e8f0');\n          ctx.lineWidth = isFocal ? 2.5 : 1;",
    "ctx.strokeStyle = isFocal ? '#FFE3ED' : (isDark ? '#1e293b' : '#e2e8f0');\n          ctx.lineWidth = isFocal ? 2.5 : 1;"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#ffffff' : (isDark ? '#f8fafc' : '#0f172a');\n          ctx.font = 'bold 20px sans-serif';",
    "ctx.fillStyle = isFocal ? '#0f172a' : (isDark ? '#f8fafc' : '#0f172a');\n          ctx.font = 'bold 20px sans-serif';"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#090d16' : (isDark ? '#1e293b' : '#f1f5f9');\n          ctx.beginPath();\n          ctx.roundRect(w - 190, 16, 158, 32, 8);",
    "ctx.fillStyle = isFocal ? '#FFE3ED' : (isDark ? '#1e293b' : '#f1f5f9');\n          ctx.beginPath();\n          ctx.roundRect(w - 190, 16, 158, 32, 8);"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#d2ff00' : (isDark ? '#94a3b8' : '#64748b');\n          ctx.font = 'bold 12px ui-monospace, monospace';",
    "ctx.fillStyle = isFocal ? '#83264e' : (isDark ? '#94a3b8' : '#64748b');\n          ctx.font = 'bold 12px ui-monospace, monospace';"
  );
  content = content.replace(
    "ctx.strokeStyle = isFocal ? '#10b981' : (isDark ? '#334155' : '#cbd5e1');",
    "ctx.strokeStyle = isFocal ? '#9BE3DE' : (isDark ? '#334155' : '#cbd5e1');"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#10b981' : (isDark ? '#64748b' : '#94a3b8');\n          ctx.font = '40px sans-serif';",
    "ctx.fillStyle = isFocal ? '#0f766e' : (isDark ? '#64748b' : '#94a3b8');\n          ctx.font = '40px sans-serif';"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#d2ff00' : (isDark ? '#38bdf8' : '#10b981');\n          ctx.font = 'bold 12.5px ui-monospace, monospace';",
    "ctx.fillStyle = isFocal ? '#83264e' : (isDark ? '#38bdf8' : '#0f766e');\n          ctx.font = 'bold 12.5px ui-monospace, monospace';"
  );

  // Background in light theme
  content = content.replace(
    "const bgMap = { indigo: '#cfd2d6', light: '#e2e8f0', dark: '#070a0f' };",
    "const bgMap = { indigo: '#cfd2d6', light: '#d7eae6', dark: '#070a0f' };"
  );

  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Updated ${filename} successfully`);
  return true;
}

for (const s of studios) {
  transformStudio(s);
}

