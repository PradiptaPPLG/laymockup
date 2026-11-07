const fs = require('fs');

function extractRendererCode(file, className) {
  const content = fs.readFileSync(file, 'utf8');
  const classIdx = content.indexOf(`class ${className}`);
  const nextClassOrFunc = content.indexOf('// --- UI Controller', classIdx);
  console.log(`=== ${file} : ${className} ===`);
  console.log(`Class length: ${nextClassOrFunc - classIdx}`);
}

extractRendererCode('refrensi-asset/1-mobile.html', 'SinglePhoneStudioRenderer');
extractRendererCode('refrensi-asset/2-mobile.html', 'DualPhoneStudioRenderer');
extractRendererCode('refrensi-asset/3-3-mobile.html', 'VerticalStaggeredRenderer');

