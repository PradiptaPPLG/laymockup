// Test coordinates for mobile-1, mobile-2, and mobile-6
const testTypes = ['mobile-1', 'mobile-2', 'mobile-6'];

testTypes.forEach(type => {
  const w = 560, h = 315;
  const rad = (-32 * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const sy = 0.86;

  let zoomFactor = 1.0;
  let gapX = 40, gapY = 40;
  let layout = [];
  let isPhone = true;
  let cardW = 540;
  let cardH = 1100;

  if (type === 'mobile-1') {
    zoomFactor = 1.35;
    gapX = 0; gapY = 0;
    cardW = 540; cardH = 1140;
    layout = [ { col: 0, row: 0, focal: true } ];
  } else if (type === 'mobile-2') {
    zoomFactor = 1.05;
    gapX = 42; gapY = 42;
    cardW = 540; cardH = 1140;
    layout = [ { col: -0.65, row: -0.05 }, { col: 0.65, row: 0.05, focal: true } ];
  } else if (type === 'mobile-6') {
    zoomFactor = 0.85;
    gapX = 36; gapY = 36;
    cardW = 500; cardH = 1040;
    layout = [
      { col: -1, row: -0.65 }, { col: -1, row: 0.50 },
      { col: 0, row: -0.85 }, { col: 0, row: 0.15, focal: true },
      { col: 1, row: -0.55 }, { col: 1, row: 0.65 }
    ];
  }

  const S = (w / 2752) * zoomFactor;
  const ux = cos * S;
  const uy = sin * sy * S;
  const vx = -sin * S;
  const vy = cos * sy * S;

  const originX = w * 0.5;
  const originY = h * 0.5;

  const stepX = cardW + gapX;
  const stepY = cardH + gapY;

  console.log(`=== TYPE: ${type} ===`);
  layout.forEach((item, idx) => {
    const px = item.col * stepX;
    const py = item.row * stepY;
    const sx = originX + px * ux + py * vx;
    const sy_ = originY + px * uy + py * vy;
    console.log(`  Card ${idx + 1} (${item.focal ? 'FOCAL' : 'norm'}): screenX = ${sx.toFixed(1)}, screenY = ${sy_.toFixed(1)}`);
  });
});

