const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const regex = /<article class="([^"]+)" id="([^"]+)"[\s\S]*?<div class="etalase-badge-recommended">([^<]+)<\/div>[\s\S]*?<span class="tag-recommended">([^<]+)<\/span>/g;
let m;
console.log('Cards with REKOMENDASI badge:');
while ((m = regex.exec(idx)) !== null) {
  console.log(`- ID: ${m[2]} | Class: ${m[1]} | Corner Badge: ${m[3]} | Meta Tag: ${m[4]}`);
}

