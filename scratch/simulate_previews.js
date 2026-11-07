const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

// Extract the full drawMiniIsometricPreview function
const funcMatch = content.match(/function drawMiniIsometricPreview\(canvasId, type\) \{[\s\S]*?\n    \}/);
const funcCode = funcMatch[0];

// Create a mock canvas & 2D context
function createMockCanvas() {
  const calls = [];
  const ctx = {
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    fillRect: (x, y, w, h) => calls.push({ op: 'fillRect', x, y, w, h }),
    strokeRect: (x, y, w, h) => calls.push({ op: 'strokeRect', x, y, w, h }),
    beginPath: () => calls.push({ op: 'beginPath' }),
    moveTo: (x, y) => calls.push({ op: 'moveTo', x, y }),
    lineTo: (x, y) => calls.push({ op: 'lineTo', x, y }),
    stroke: () => calls.push({ op: 'stroke' }),
    fill: () => calls.push({ op: 'fill' }),
    save: () => calls.push({ op: 'save' }),
    restore: () => calls.push({ op: 'restore' }),
    setTransform: (a, b, c, d, e, f) => calls.push({ op: 'setTransform', a, b, c, d, e, f }),
    createLinearGradient: () => ({ addColorStop: () => {} }),
    roundRect: (x, y, w, h, r) => calls.push({ op: 'roundRect', x, y, w, h, r })
  };
  return {
    width: 560,
    height: 315,
    getContext: () => ctx,
    calls
  };
}

const mockDoc = {
  elements: {},
  getElementById(id) {
    if (!this.elements[id]) {
      this.elements[id] = createMockCanvas();
    }
    return this.elements[id];
  }
};

const vm = require('vm');
const context = vm.createContext({
  document: mockDoc,
  Math: Math,
  console: console
});

vm.runInContext(funcCode, context);

const types = [
  { id: 'canvas-centered-preview', type: 'centered' },
  { id: 'canvas-stretch-preview', type: 'stretch' },
  { id: 'canvas-9-zoomout-preview', type: '9-zoomout' },
  { id: 'canvas-9-stretch-preview', type: '9-stretch' },
  { id: 'canvas-7-landscape-preview', type: '7-landscape' },
  { id: 'canvas-mobile-7-preview', type: 'mobile-7' },
  { id: 'canvas-mobile-1-preview', type: 'mobile-1' },
  { id: 'canvas-mobile-2-preview', type: 'mobile-2' },
  { id: 'canvas-mobile-6-preview', type: 'mobile-6' }
];

types.forEach(t => {
  try {
    vm.runInContext(`drawMiniIsometricPreview('${t.id}', '${t.type}')`, context);
    const canvas = mockDoc.elements[t.id];
    console.log(`[PASS] ${t.id} (${t.type}): drew ${canvas.calls.length} operations.`);
  } catch (err) {
    console.error(`[ERROR] ${t.id} (${t.type}):`, err.message);
  }
});
