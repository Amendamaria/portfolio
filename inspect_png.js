const fs = require('fs');
const { PNG } = require('pngjs');

const fileData = fs.readFileSync('public/profile.png');
const png = PNG.sync.read(fileData);

console.log(`Width: ${png.width}, Height: ${png.height}`);

// Check corners to find the background color
const corners = [
  { x: 0, y: 0 },
  { x: png.width - 1, y: 0 },
  { x: 0, y: png.height - 1 },
  { x: png.width - 1, y: png.height - 1 }
];

corners.forEach((c, idx) => {
  const i = (png.width * c.y + c.x) * 4;
  console.log(`Corner ${idx} (${c.x}, ${c.y}): R:${png.data[i]}, G:${png.data[i+1]}, B:${png.data[i+2]}, A:${png.data[i+3]}`);
});

// Let's find unique colors in the top border
const topBorderColors = {};
for (let x = 0; x < png.width; x++) {
  const i = (png.width * 0 + x) * 4;
  const color = `${png.data[i]},${png.data[i+1]},${png.data[i+2]}`;
  topBorderColors[color] = (topBorderColors[color] || 0) + 1;
}
console.log('Top border colors (top 5):', Object.entries(topBorderColors).sort((a, b) => b[1] - a[1]).slice(0, 5));

// Let's find character bounding box (pixels that are NOT background)
// Background is around R:110, G:110, B:109 (hex #6e6e6d)
const isBg = (r, g, b) => {
  // Let's check color distance to (110, 110, 109)
  const dist = Math.sqrt((r - 110) ** 2 + (g - 110) ** 2 + (b - 109) ** 2);
  return dist < 15; // tolerance
};

let minX = png.width, maxX = 0, minY = png.height, maxY = 0;
let bgCount = 0;
let fgCount = 0;

for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const i = (png.width * y + x) * 4;
    const r = png.data[i];
    const g = png.data[i+1];
    const b = png.data[i+2];
    if (!isBg(r, g, b)) {
      fgCount++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    } else {
      bgCount++;
    }
  }
}

console.log(`Foreground bounding box: X: ${minX} to ${maxX}, Y: ${minY} to ${maxY}`);
console.log(`Width of foreground: ${maxX - minX}, Height: ${maxY - minY}`);
console.log(`Foreground pixels: ${fgCount}, Background pixels: ${bgCount}`);
