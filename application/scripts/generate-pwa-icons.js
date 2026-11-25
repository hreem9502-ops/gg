/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * PlantCare AI — PWA icon generator.
 * Renders the app icon (green botanical tile + white leaf) at all required
 * sizes for Android/iOS install experiences using sharp.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "public");

// Lucide "leaf" icon path (24x24 grid), white stroke on green tile.
const leafGroup = (scale, tx, ty) =>
  `<g transform="translate(${tx},${ty}) scale(${scale})" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
     <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
     <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
   </g>`;

// Standard (any) icon — rounded tile, icon fills ~70%.
const standardSvg = () => {
  const iconPx = 24 * 14.92; // ≈ 358 at 512
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" rx="115" fill="#2E6B4F"/>
    ${leafGroup(14.92, (512 - iconPx) / 2, (512 - iconPx) / 2 - 6)}
  </svg>`;
};

// Maskable icon — full-bleed square (OS masks corners), icon inside 80% safe zone.
const maskableSvg = () => {
  const iconPx = 24 * 11; // ≈ 264 at 512
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#2E6B4F"/>
    ${leafGroup(11, (512 - iconPx) / 2, (512 - iconPx) / 2 - 6)}
  </svg>`;
};

// Apple touch icon — full-bleed square (iOS rounds it automatically).
const appleSvg = () => {
  const iconPx = 24 * 13;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#2E6B4F"/>
    ${leafGroup(13, (512 - iconPx) / 2, (512 - iconPx) / 2 - 6)}
  </svg>`;
};

async function render(svg, size, file) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, file));
  console.log("wrote", file, `${size}x${size}`);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const s = standardSvg();
  const m = maskableSvg();
  const a = appleSvg();
  await render(s, 192, "icon-192.png");
  await render(s, 512, "icon-512.png");
  await render(m, 192, "icon-maskable-192.png");
  await render(m, 512, "icon-maskable-512.png");
  await render(a, 180, "apple-touch-icon.png");
  console.log("done");
})();
