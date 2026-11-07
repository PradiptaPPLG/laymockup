const fs = require('fs');

function checkRenderer(file, className) {
  const content = fs.readFileSync(file, 'utf8');
  const idx = content.indexOf(`class ${className}`);
  if (idx === -1) {
    console.log(`class ${className} not found in ${file}`);
    return;
  }
  console.log(`\n================ ${file} : ${className} ================`);
  console.log(content.substring(idx, idx + 2500));
}

checkRenderer('refrensi-asset/1-mobile.html', 'SinglePhoneStudioRenderer');
checkRenderer('refrensi-asset/2-mobile.html', 'DualPhoneStudioRenderer');
checkRenderer('refrensi-asset/3-3-mobile.html', 'VerticalStaggeredRenderer');

