const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const regex = /<article class="([^"]+)" id="([^"]+)"[\s\S]*?<div class="etalase-meta">([\s\S]*?)<\/div>[\s\S]*?<h3 class="etalase-title">([\s\S]*?)<\/h3>/g;
let m;
while ((m = regex.exec(idx)) !== null) {
  console.log(`Class: "${m[1]}" | ID: "${m[2]}" | Title: "${m[4].trim()}"`);
}

