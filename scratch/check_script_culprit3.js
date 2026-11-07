const fs = require('fs');

if (fs.existsSync('scratch/apply_studios_palette.js')) {
  console.log(fs.readFileSync('scratch/apply_studios_palette.js', 'utf8').slice(0, 1500));
}

