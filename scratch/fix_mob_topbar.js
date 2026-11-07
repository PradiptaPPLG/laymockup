const fs = require('fs');

let content = fs.readFileSync('studio-mobile-7.html', 'utf8');

const target = `<div class="topbar-center">
      <button id="btn-theme-indigo" class="btn-pill active" title="Tema Referensi Indigo Mobile">
        <span>📱 Reference Indigo</span>
      </button>
      <button id="btn-theme-light" class="btn-pill" title="Tema Light Mode (Wireframe Bersih)">
        <span>☀️ Wireframe Light</span>
      </button>
      <button id="btn-theme-dark" class="btn-pill" title="Tema Dark Mode (Wireframe Sinematik)">
        <span>🌙 Wireframe Dark</span>
      </button>
    </div>`;

const replacement = `<div class="topbar-center">
      <button id="btn-theme-light" class="btn-pill active" title="Tema Light Mode (Wireframe Bersih)">
        <span>☀️ Reference Light</span>
      </button>
      <button id="btn-theme-dark" class="btn-pill" title="Tema Dark Mode (Wireframe Sinematik)">
        <span>🌙 Wireframe Dark</span>
      </button>
      <button id="btn-theme-indigo" class="btn-pill" title="Tema Referensi Indigo Mobile">
        <span>📱 Studio Slate</span>
      </button>
    </div>`;

if (!content.includes(target)) {
  console.error('Target not found!');
} else {
  content = content.replace(target, replacement);
  fs.writeFileSync('studio-mobile-7.html', content, 'utf8');
  console.log('Successfully updated topbar in studio-mobile-7.html');
}

