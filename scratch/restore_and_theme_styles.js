const { execSync } = require('child_process');
const fs = require('fs');

const studios = [
  'studio-centered.html',
  'studio-stretch.html',
  'studio-9-zoomout.html',
  'studio-9-stretch.html',
  'studio-7-landscape.html',
  'studio-mobile-7.html'
];

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

const newBtnPillActive = `.btn-pill.active {
      background: #FFE3ED;
      color: #9d174d;
      border: 1.5px solid #FFB8D2;
      font-weight: 700;
      box-shadow: 0 2px 10px rgba(255, 184, 210, 0.4);
    }`;

const newBtnPrimary = `.btn-primary {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 8px 18px;
      border-radius: 9px;
      background: #9BE3DE;
      color: #0f766e;
      font-size: 13px;
      font-weight: 700;
      border: 1.5px solid #7fd6d0;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(155, 227, 222, 0.35);
    }

    .btn-primary:hover {
      background: #7fd6d0;
      transform: translateY(-1px);
      box-shadow: 0 5px 16px rgba(155, 227, 222, 0.5);
    }`;

studios.forEach(filename => {
  console.log(`Processing ${filename}...`);
  // Get original file from git before commit 13379b6
  const origContent = execSync(`git show 13379b6~1:${filename}`, { encoding: 'utf8' });
  let origStyle = origContent.match(/<style>([\s\S]*?)<\/style>/)[1];

  // Replace :root
  origStyle = origStyle.replace(/:root\s*\{[\s\S]*?--shadow-panel:[^\}]*?\}/, newRoot);

  // Replace .btn-pill.active
  origStyle = origStyle.replace(/\.btn-pill\.active\s*\{[\s\S]*?\}/, newBtnPillActive);

  // Replace .btn-primary and its hover
  origStyle = origStyle.replace(/\.btn-primary\s*\{[\s\S]*?\.btn-primary:hover\s*\{[\s\S]*?\}/, newBtnPrimary);

  // Read current file content
  let currentContent = fs.readFileSync(filename, 'utf8');

  // Replace style block
  currentContent = currentContent.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${origStyle}\n  </style>`);

  fs.writeFileSync(filename, currentContent, 'utf8');
  console.log(`  -> Successfully restored full CSS for ${filename}. New length: ${currentContent.length}`);
});

