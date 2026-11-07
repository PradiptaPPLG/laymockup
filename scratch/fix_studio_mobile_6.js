const fs = require('fs');

let m6 = fs.readFileSync('studio-mobile-6.html', 'utf8');

const targetPresetGrid = `<div class="preset-grid">
            <button id="btn-swap-posters" class="btn-preset">`;

const replacementPresetGrid = `<div class="preset-grid">
            <button id="btn-reset-wireframe" class="btn-preset" style="background:#FFE3ED; border:1px solid #FFB8D2; font-weight:700;">
              <span>🌸 Wireframe Bersih</span>
            </button>
            <button id="btn-swap-posters" class="btn-preset">`;

if (m6.includes(targetPresetGrid)) {
  m6 = m6.replace(targetPresetGrid, replacementPresetGrid);
  fs.writeFileSync('studio-mobile-6.html', m6, 'utf8');
  console.log('Successfully inserted btn-reset-wireframe into studio-mobile-6.html HTML!');
} else {
  console.error('[ERROR] targetPresetGrid not found in studio-mobile-6.html');
}
