const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Center navbar links
const oldNavInner = `    .nav-inner {
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }`;

const newNavInner = `    .nav-inner {
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      position: relative;
    }`;

content = content.replace(oldNavInner, newNavInner);

const oldNavLinksCss = `    .nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
    }`;

const newNavLinksCss = `    .nav-links {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 32px;
      list-style: none;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }`;

content = content.replace(oldNavLinksCss, newNavLinksCss);

// 2. Change arrow in tutorial CTA button to UP arrow
const oldTutorialBtn = `<a href="#etalase" class="btn btn-primary" style="background:#9BE3DE; color:#044343; font-weight:700; border:1.5px solid #7ed5cf; padding:12px 24px; border-radius:12px; box-shadow:0 6px 18px rgba(155,227,222,0.4); white-space:nowrap;">
            Pilih Template Sekarang
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>`;

const newTutorialBtn = `<a href="#etalase" class="btn btn-primary" style="background:#9BE3DE; color:#044343; font-weight:700; border:1.5px solid #7ed5cf; padding:12px 24px; border-radius:12px; box-shadow:0 6px 18px rgba(155,227,222,0.4); white-space:nowrap;" title="Kembali ke Etalase Template di Atas">
            Pilih Template Sekarang
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>`;

content = content.replace(oldTutorialBtn, newTutorialBtn);

// Save both
fs.writeFileSync('index.html', content, 'utf8');
fs.writeFileSync('beranda.html', content, 'utf8');

console.log('Successfully applied updates to index.html and beranda.html!');

