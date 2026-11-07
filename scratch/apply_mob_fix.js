const fs = require('fs');

let content = fs.readFileSync('studio-mobile-7.html', 'utf8');

// 1. Update --bg-canvas default
content = content.replace('--bg-canvas: #cfd2d6;', '--bg-canvas: #e2e8f0;');

// 2. Update topbar buttons
const oldTopbar = `<div class="topbar-center">
      <button id="btn-theme-indigo" class="btn-pill active" title="Tema Referensi Indigo Mobile">
        <span>📱 Reference Indigo</span>
      </button>
      <button id="btn-theme-light" class="btn-pill" title="Tema Light Mode (Wireframe Bersih)">
        <span>☀️ Wireframe Light</span>
      </button>
      <button id="btn-theme-dark" class="btn-pill" title="Tema Dark Mode (Wireframe Sinematik)">
        <span>🌙 Dark Obsidian</span>
      </button>
    </div>`;

const newTopbar = `<div class="topbar-center">
      <button id="btn-theme-light" class="btn-pill active" title="Tema Light Mode (Wireframe Bersih)">
        <span>☀️ Reference Light</span>
      </button>
      <button id="btn-theme-dark" class="btn-pill" title="Tema Dark Mode (Wireframe Sinematik)">
        <span>🌙 Dark Obsidian</span>
      </button>
      <button id="btn-theme-indigo" class="btn-pill" title="Tema Referensi Indigo Mobile">
        <span>📱 Studio Slate</span>
      </button>
    </div>`;

if (!content.includes(oldTopbar)) {
  console.error('oldTopbar not found!');
} else {
  content = content.replace(oldTopbar, newTopbar);
  console.log('Topbar updated');
}

// 3. Update this.theme default in constructor
content = content.replace(
  "this.theme = 'indigo'; // 'indigo' (Referensi), 'light', 'dark'",
  "this.theme = 'light'; // 'light' (Default), 'dark', 'indigo'"
);

// 4. Update initial DemoGenerator.generateSet
content = content.replace(
  "let demoCanvases = DemoGenerator.generateSet('indigo', true);",
  "let demoCanvases = DemoGenerator.generateSet('light', true);"
);

// 5. Update sidebar preset buttons
const oldPresets = `<div class="preset-grid">
            <button id="btn-load-indigo-demo" class="btn-preset">
              <span>📱 Demo Referensi</span>
            </button>
            <button id="btn-load-light-demo" class="btn-preset">
              <span>☀️ Wireframe Light</span>
            </button>
            <button id="btn-duplicate-remaining" class="btn-preset">
              <span>📋 Isi Slot Kosong</span>
            </button>
            <button id="btn-clear-all" class="btn-preset" style="color: #ef4444;">
              <span>🗑️ Reset ke Default</span>
            </button>
          </div>`;

const newPresets = `<div class="preset-grid">
            <button id="btn-load-light-demo" class="btn-preset">
              <span>☀️ Wireframe Light</span>
            </button>
            <button id="btn-load-dark-demo" class="btn-preset">
              <span>🌙 Wireframe Dark</span>
            </button>
            <button id="btn-duplicate-remaining" class="btn-preset">
              <span>📋 Isi Slot Kosong</span>
            </button>
            <button id="btn-clear-all" class="btn-preset" style="color: #ef4444;">
              <span>🗑️ Reset ke Default</span>
            </button>
          </div>`;

if (!content.includes(oldPresets)) {
  console.error('oldPresets not found!');
} else {
  content = content.replace(oldPresets, newPresets);
  console.log('Presets updated');
}

// 6. Update event listener for preset
const oldPresetListener = `      // Tombol Preset
      document.getElementById('btn-load-indigo-demo').addEventListener('click', () => {
        userImages.fill(null);
        setTheme('indigo');
        showToast('Demo Referensi Indigo Mobile dimuat');
      });
      document.getElementById('btn-load-light-demo').addEventListener('click', () => {
        userImages.fill(null);
        setTheme('light');
        showToast('Preset Wireframe Light dimuat');
      });`;

const newPresetListener = `      // Tombol Preset
      document.getElementById('btn-load-light-demo').addEventListener('click', () => {
        userImages.fill(null);
        setTheme('light');
        showToast('Preset Wireframe Light dimuat');
      });
      document.getElementById('btn-load-dark-demo').addEventListener('click', () => {
        userImages.fill(null);
        setTheme('dark');
        showToast('Preset Wireframe Dark dimuat');
      });`;

if (!content.includes(oldPresetListener)) {
  console.error('oldPresetListener not found!');
} else {
  content = content.replace(oldPresetListener, newPresetListener);
  console.log('Preset listener updated');
}

fs.writeFileSync('studio-mobile-7.html', content, 'utf8');
console.log('studio-mobile-7.html written successfully');

