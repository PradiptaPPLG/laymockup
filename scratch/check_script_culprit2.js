const fs = require('fs');

if (fs.existsSync('scratch/enrich_studios_pastel.js')) {
  console.log(fs.readFileSync('scratch/enrich_studios_pastel.js', 'utf8').slice(0, 1500));
}

