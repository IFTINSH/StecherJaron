// Trace Jaron's silhouette from the MOBILE hero (public/hero/hero-mobile.jpg),
// a high-key shot (white bg, dark Jaron). To capture the faint FLYAWAY HAIRS at the
// crown (which read as background at a normal threshold and used to poke OUT past the
// line), the source is upscaled 3x, thresholded high (245) and the silhouette is
// dilated 1px so those wisps fall INSIDE the contour. Coords are scaled back to the
// 578x432 viewBox. Keeps only the largest subpath (his body) and writes:
//   tmp-trace/jaron-mobile-path.txt   — the path (paste into heroSilhouette.ts, add Z)
//   tmp-trace/mobile-outline.jpg      — red-outline preview to check the fit by eye
//
//   node scripts/trace-mobile.cjs [threshold] [dilatePx] [upscale]
//   (defaults: 245 1 3)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { trace } = require('potrace');

const SRC = path.join(__dirname, '..', 'public', 'hero', 'hero-mobile.jpg');
const OUT = path.join(__dirname, '..', 'tmp-trace');
const THRESHOLD = Number(process.argv[2] || 245);
const DILATE = Number(process.argv[3] || 1);   // px in ORIGINAL (578px) space
const UP = Number(process.argv[4] || 3);        // upscale factor for finer hair points

function bboxArea(sub) {
  const nums = sub.match(/-?\d+(?:\.\d+)?/g);
  if (!nums) return 0;
  let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = +nums[i], y = +nums[i + 1];
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  return (maxX - minX) * (maxY - minY);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const meta = await sharp(SRC).metadata();
  const W = meta.width * UP, H = meta.height * UP;

  // high-key mask, upscaled; then dilate the black (Jaron) region outward ~DILATE px
  // via blur + re-threshold so faint crown wisps are enclosed by the line.
  let mask = await sharp(SRC).resize(W, H, { kernel: 'lanczos3' })
    .grayscale().normalize().threshold(THRESHOLD).png().toBuffer();
  if (DILATE > 0) {
    mask = await sharp(mask).blur(DILATE * UP).threshold(252).png().toBuffer();
  }

  trace(mask, { turdSize: 150, optTolerance: 0.4 }, async (err, svg) => {
    if (err) throw err;
    const d = (svg.match(/ d="([^"]+)"/) || [])[1] || '';
    const subs = d.split(/(?=[Mm])/).filter((s) => s.trim()).sort((a, b) => bboxArea(b) - bboxArea(a));
    // scale coords back to the original 578x432 viewBox and close the loop
    let body = subs[0].trim().replace(/-?\d+(?:\.\d+)?/g, (n) => (parseFloat(n) / UP).toFixed(3));
    body = body.replace(/\s+/g, ' ').trim();
    if (!/[Zz]\s*$/.test(body)) body += ' Z';
    fs.writeFileSync(path.join(OUT, 'jaron-mobile-path.txt'), body);

    const strokeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}" viewBox="0 0 ${meta.width} ${meta.height}"><path d="${body}" fill="none" stroke="#ff3b3b" stroke-width="2"/></svg>`;
    const base = await sharp(SRC).toBuffer();
    await sharp(base)
      .composite([{ input: Buffer.from(strokeSvg), top: 0, left: 0 }])
      .jpeg({ quality: 82 })
      .toFile(path.join(OUT, 'mobile-outline.jpg'));

    console.log(`viewBox: 0 0 ${meta.width} ${meta.height} | threshold ${THRESHOLD}, dilate ${DILATE}px, upscale ${UP}x | chars=${body.length}`);
  });
}
main();
