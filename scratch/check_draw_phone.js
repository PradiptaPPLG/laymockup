const fs = require('fs');

const mob = fs.readFileSync('studio-mobile-7.html', 'utf8');
const drawPhone = mob.indexOf('drawMobilePhone(');
if (drawPhone !== -1) {
  console.log(mob.substring(drawPhone, drawPhone + 1500));
} else {
  const drawCard = mob.indexOf('drawCard(');
  console.log(mob.substring(drawCard, drawCard + 1500));
}

