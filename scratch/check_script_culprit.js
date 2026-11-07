const fs = require('fs');

if (fs.existsSync('scratch/apply_mob_fix.js')) {
  console.log(fs.readFileSync('scratch/apply_mob_fix.js', 'utf8').slice(0, 1000));
}

