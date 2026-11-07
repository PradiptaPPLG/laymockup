const fs = require('fs');

function transformDemoGen(content) {
  // Mobile Topbar
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#10b981' : (isDark ? '#1e293b' : '#ffffff');",
    "ctx.fillStyle = isFocal ? '#9BE3DE' : (isDark ? '#1e293b' : '#ffffff');"
  );
  content = content.replace(
    "ctx.strokeStyle = isFocal ? '#d2ff00' : (isDark ? '#334155' : '#e2e8f0');",
    "ctx.strokeStyle = isFocal ? '#FFE3ED' : (isDark ? '#334155' : '#e2e8f0');"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#ffffff' : (isDark ? '#f8fafc' : '#0f172a');\n            ctx.font = 'bold 18px sans-serif';",
    "ctx.fillStyle = isFocal ? '#0f172a' : (isDark ? '#f8fafc' : '#0f172a');\n            ctx.font = 'bold 18px sans-serif';"
  );

  // Mobile Dropzone
  content = content.replace(
    "ctx.fillStyle = isDark ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.04)';",
    "ctx.fillStyle = isDark ? 'rgba(155, 227, 222, 0.08)' : 'rgba(155, 227, 222, 0.06)';"
  );
  content = content.replace(
    "ctx.strokeStyle = isFocal ? '#10b981' : (isDark ? '#334155' : '#cbd5e1');",
    "ctx.strokeStyle = isFocal ? '#9BE3DE' : (isDark ? '#334155' : '#cbd5e1');"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#10b981' : (isDark ? '#64748b' : '#94a3b8');\n            ctx.font = '42px sans-serif';",
    "ctx.fillStyle = isFocal ? '#0f766e' : (isDark ? '#64748b' : '#94a3b8');\n            ctx.font = '42px sans-serif';"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#d2ff00' : (isDark ? '#38bdf8' : '#10b981');\n            ctx.font = 'bold 13px ui-monospace, monospace';",
    "ctx.fillStyle = isFocal ? '#83264e' : (isDark ? '#38bdf8' : '#0f766e');\n            ctx.font = 'bold 13px ui-monospace, monospace';"
  );

  // Mobile skeleton lines in hero
  content = content.replace(
    "ctx.fillStyle = isFocal ? 'rgba(16, 185, 129, 0.25)' : (isDark ? '#334155' : '#e2e8f0');",
    "ctx.fillStyle = isFocal ? 'rgba(155, 227, 222, 0.45)' : (isDark ? '#334155' : '#e2e8f0');"
  );

  // Landscape Header
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#10b981' : (isDark ? '#161f30' : '#ffffff');\n            ctx.fillRect(0, 0, w, headerH);",
    "ctx.fillStyle = isFocal ? '#9BE3DE' : (isDark ? '#161f30' : '#ffffff');\n            ctx.fillRect(0, 0, w, headerH);"
  );
  content = content.replace(
    "ctx.strokeStyle = isFocal ? '#d2ff00' : (isDark ? '#1e293b' : '#e2e8f0');\n            ctx.lineWidth = isFocal ? 2.5 : 1;",
    "ctx.strokeStyle = isFocal ? '#FFE3ED' : (isDark ? '#1e293b' : '#e2e8f0');\n            ctx.lineWidth = isFocal ? 2.5 : 1;"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#ffffff' : (isDark ? '#f8fafc' : '#0f172a');\n            ctx.font = 'bold 20px sans-serif';",
    "ctx.fillStyle = isFocal ? '#0f172a' : (isDark ? '#f8fafc' : '#0f172a');\n            ctx.font = 'bold 20px sans-serif';"
  );

  // Landscape Right status badge
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#090d16' : (isDark ? '#1e293b' : '#f1f5f9');\n            ctx.beginPath();\n            ctx.roundRect(w - 190, 16, 158, 32, 8);",
    "ctx.fillStyle = isFocal ? '#FFE3ED' : (isDark ? '#1e293b' : '#f1f5f9');\n            ctx.beginPath();\n            ctx.roundRect(w - 190, 16, 158, 32, 8);"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#d2ff00' : (isDark ? '#94a3b8' : '#64748b');\n            ctx.font = 'bold 12px ui-monospace, monospace';",
    "ctx.fillStyle = isFocal ? '#83264e' : (isDark ? '#94a3b8' : '#64748b');\n            ctx.font = 'bold 12px ui-monospace, monospace';"
  );

  // Landscape Metric skeleton
  content = content.replace(
    "ctx.fillStyle = isFocal && i === 0 ? 'rgba(16, 185, 129, 0.3)' : (isDark ? '#334155' : '#e2e8f0');",
    "ctx.fillStyle = isFocal && i === 0 ? 'rgba(155, 227, 222, 0.5)' : (isDark ? '#334155' : '#e2e8f0');"
  );

  // Landscape Dropzone
  content = content.replace(
    "ctx.fillStyle = isFocal ? 'rgba(16, 185, 129, 0.05)' : (isDark ? '#0d131f' : '#ffffff');\n            ctx.strokeStyle = isFocal ? '#10b981' : (isDark ? '#334155' : '#cbd5e1');",
    "ctx.fillStyle = isFocal ? 'rgba(155, 227, 222, 0.08)' : (isDark ? '#0d131f' : '#ffffff');\n            ctx.strokeStyle = isFocal ? '#9BE3DE' : (isDark ? '#334155' : '#cbd5e1');"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#10b981' : (isDark ? '#64748b' : '#94a3b8');\n            ctx.font = '40px sans-serif';",
    "ctx.fillStyle = isFocal ? '#0f766e' : (isDark ? '#64748b' : '#94a3b8');\n            ctx.font = '40px sans-serif';"
  );
  content = content.replace(
    "ctx.fillStyle = isFocal ? '#d2ff00' : (isDark ? '#38bdf8' : '#10b981');\n            ctx.font = 'bold 12.5px ui-monospace, monospace';",
    "ctx.fillStyle = isFocal ? '#83264e' : (isDark ? '#38bdf8' : '#0f766e');\n            ctx.font = 'bold 12.5px ui-monospace, monospace';"
  );

  return content;
}

let demoGen = fs.readFileSync('js/demo-generator.js', 'utf8');
demoGen = transformDemoGen(demoGen);
fs.writeFileSync('js/demo-generator.js', demoGen, 'utf8');
console.log('js/demo-generator.js updated successfully');

