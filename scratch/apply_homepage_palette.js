const fs = require('fs');

function transformHomepage(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // 1. :root variables
  const oldRootRegex = /:root\s*\{[\s\S]*?\/\*\s*Palette\s*5:[^\}]*?\}/;
  const oldRootMatch = content.match(/:root\s*\{[\s\S]*?--shadow-lg:[^\}]*?\}/);
  
  if (!oldRootMatch) {
    console.error('Root block not matched in', filename);
    return false;
  }

  const newRoot = `:root {
      --bg: #FFFDF9;
      --fg: #0f172a;
      --fg-muted: #475569;
      --fg-subtle: #94a3b8;
      --border-color: #e2edea;
      --border-hover: #cbdcd8;
      --card-bg: #ffffff;
      
      /* Palette Pastel Aesthetic: Soft Mint Aqua & Sakura Pink (#9BE3DE, #BEEBE9, #FFFDF9, #FFE3ED) */
      --accent: #9BE3DE;
      --accent-hover: #7fd6d0;
      --accent-dark: #0f766e;
      --accent-light: #eafaf8;
      --mint: #9BE3DE;
      --ice-mint: #BEEBE9;
      --pink: #FFE3ED;
      --pink-hover: #f8cfdf;
      --pink-dark: #83264e;
      --pink-glow: rgba(255, 227, 237, 0.65);
      --mint-glow: rgba(155, 227, 222, 0.45);
      
      --grid-color: rgba(155, 227, 222, 0.16);

      --radius-sm: 8px;
      --radius-btn: 14px;
      --radius-card: 16px;
      --radius-large: 24px;
      --radius-full: 9999px;

      --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
      --shadow-md: 0 8px 24px rgba(155, 227, 222, 0.22);
      --shadow-lg: 0 16px 48px rgba(15, 23, 42, 0.08);
    }`;

  content = content.replace(oldRootMatch[0], newRoot);

  // 2. Top ribbon sparkles and badges
  content = content.replace(
    /border-bottom: 1px solid rgba\(210, 255, 0, 0\.18\);/g,
    'border-bottom: 1px solid rgba(155, 227, 222, 0.25);'
  );
  content = content.replace(
    /background: rgba\(210, 255, 0, 0\.12\);\s*color: #d2ff00;\s*border: 1px solid rgba\(210, 255, 0, 0\.35\);/g,
    'background: rgba(255, 227, 237, 0.25);\n      color: #FFE3ED;\n      border: 1px solid rgba(255, 227, 237, 0.45);'
  );

  // 3. Buttons
  const oldBtnPrimary = `.btn-primary {
      background: #10b981;
      color: #ffffff;
      border: 1px solid #10b981;
      box-shadow: 0 4px 16px rgba(16, 185, 129, 0.25);
    }

    .btn-primary:hover {
      background: #059669;
      border-color: #059669;
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
    }`;

  const newBtnPrimary = `.btn-primary {
      background: #9BE3DE;
      color: #0f172a;
      border: 1px solid #7ed5cf;
      font-weight: 700;
      box-shadow: 0 4px 16px rgba(155, 227, 222, 0.4);
    }

    .btn-primary:hover {
      background: #85dfd9;
      border-color: #6fcbc5;
      color: #0f172a;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(155, 227, 222, 0.55);
    }`;

  content = content.replace(oldBtnPrimary, newBtnPrimary);

  // .btn-emerald
  content = content.replace(
    /\.btn-emerald\s*\{[\s\S]*?\.btn-emerald:hover\s*\{[\s\S]*?\}/,
    `.btn-emerald {
      background: #ffffff;
      color: #0f766e;
      border: 1px solid #9BE3DE;
      box-shadow: 0 2px 8px rgba(155, 227, 222, 0.15);
    }

    .btn-emerald:hover {
      background: #eafaf8;
      border-color: #7fd6d0;
      color: #0d5f59;
    }`
  );

  // 4. Hero pulse dot & gradient text
  content = content.replace(
    /background: #d2ff00;\s*box-shadow: 0 0 8px rgba\(210, 255, 0, 0\.9\), 0 0 16px rgba\(210, 255, 0, 0\.4\);/g,
    'background: #9BE3DE;\n      box-shadow: 0 0 8px rgba(155, 227, 222, 0.9), 0 0 16px rgba(255, 227, 237, 0.6);'
  );

  content = content.replace(
    /background: linear-gradient\(135deg, #059669 0%, #10b981 35%, #82cd47 70%, #d2ff00 100%\);/g,
    'background: linear-gradient(135deg, #0d7973 0%, #14b8a6 30%, #9BE3DE 60%, #ec4899 90%, #FFE3ED 100%);'
  );

  // 5. Etalase badges
  content = content.replace(
    /background: rgba\(6, 78, 59, 0\.92\);\s*color: #d2ff00;\s*border-color: rgba\(210, 255, 0, 0\.45\);/g,
    'background: rgba(13, 121, 115, 0.92);\n      color: #FFE3ED;\n      border-color: rgba(255, 227, 237, 0.45);'
  );
  content = content.replace(
    /\.etalase-tag\.emerald\s*\{\s*color:\s*#059669;\s*\}/g,
    '.etalase-tag.emerald {\n      color: #0f766e;\n      background: #eafaf8;\n      border: 1px solid #bceae6;\n    }'
  );
  content = content.replace(
    /\.etalase-tag\.volt\s*\{\s*color:\s*#d2ff00;\s*\}/g,
    '.etalase-tag.volt {\n      color: #83264e;\n      background: #FFE3ED;\n      border: 1px solid #f8cfdf;\n    }'
  );

  // 6. Footer dot
  content = content.replace(
    /background: #10b981;\s*box-shadow: 0 0 0 2px rgba\(16, 185, 129, 0\.2\);/g,
    'background: #9BE3DE;\n      box-shadow: 0 0 0 2px rgba(155, 227, 222, 0.35);'
  );

  // 7. Intro cursive stroke & progress bar
  content = content.replace(
    /stroke: #d2ff00;\s*stroke-width: 4\.5px;\s*stroke-linecap: round;\s*stroke-linejoin: round;\s*filter: drop-shadow\(0 0 10px rgba\(210, 255, 0, 0\.7\)\) drop-shadow\(0 0 20px rgba\(210, 255, 0, 0\.4\)\);/g,
    'stroke: #9BE3DE;\n      stroke-width: 4.5px;\n      stroke-linecap: round;\n      stroke-linejoin: round;\n      filter: drop-shadow(0 0 12px rgba(155, 227, 222, 0.8)) drop-shadow(0 0 24px rgba(255, 227, 237, 0.5));'
  );

  content = content.replace(
    /background: #d2ff00;\s*border-radius: 999px;\s*box-shadow: 0 0 12px rgba\(210, 255, 0, 0\.8\);/g,
    'background: linear-gradient(90deg, #9BE3DE 0%, #BEEBE9 50%, #FFE3ED 100%);\n      border-radius: 999px;\n      box-shadow: 0 0 16px rgba(155, 227, 222, 0.85);'
  );

  // 8. Canvas mini preview
  const oldPreviewBg = `      // 1. Background Kanvas
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#e8f0eb');
      grad.addColorStop(0.5, '#dfe9e2');
      grad.addColorStop(1, '#d0ded5');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Grid dekoratif halus bernuansa emerald/volt
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';`;

  const newPreviewBg = `      // 1. Background Kanvas Pastel
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#FFFDF9');
      grad.addColorStop(0.5, '#eef8f6');
      grad.addColorStop(1, '#ddf1ee');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Grid dekoratif halus bernuansa pastel mint & pink
      ctx.strokeStyle = 'rgba(155, 227, 222, 0.22)';`;

  content = content.replace(oldPreviewBg, newPreviewBg);

  // Mini preview focal card & slab
  content = content.replace(
    "ctx.fillStyle = '#b8c9be';",
    "ctx.fillStyle = '#c5deda';"
  );

  content = content.replace(
    "// Emerald + Volt Focal Centerpiece\n          ctx.fillStyle = '#10b981';",
    "// Pastel Mint Aqua + Sakura Pink Centerpiece\n          ctx.fillStyle = '#9BE3DE';"
  );

  content = content.replace(
    "ctx.fillStyle = '#d2ff00';",
    "ctx.fillStyle = '#FFE3ED';"
  );

  content = content.replace(
    "// Volt glow border on focal card\n          ctx.strokeStyle = '#d2ff00';",
    "// Mint glow border on focal card\n          ctx.strokeStyle = '#9BE3DE';"
  );

  content = content.replace(
    "ctx.fillStyle = '#f1f5f9';\n          ctx.beginPath();",
    "ctx.fillStyle = '#f3faf8';\n          ctx.beginPath();"
  );

  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Updated ${filename} successfully`);
  return true;
}

transformHomepage('index.html');
transformHomepage('beranda.html');

