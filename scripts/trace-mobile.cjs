// Trace Jaron's silhouette from the MOBILE hero (public/hero/hero-mobile.jpg),
// a high-key shot (white bg, dark Jaron). Keeps only the largest subpath (his body)
// and writes the path to tmp-trace/jaron-mobile-path.txt + a red-outline preview to
// tmp-trace/mobile-outline.jpg so the fit can be checked by eye.
//
//   node scripts/trace-mobile.cjs [threshold]   # default 128
//   (then wrap the path + viewBox into components/heroSilhouette.ts as the MOBILE pair)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { trace } = require('potrace');

const SRC = path.join(__dirname, '..', 'public', 'hero', 'hero-mobile.jpg');
const OUT = path.join(__dirname, '..', 'tmp-trace');
const THRESHOLD = Number(process.argv[2] || 128);

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
  const buf = await sharp(SRC).grayscale().normalize().threshold(THRESHOLD).png().toBuffer();
  trace(buf, { turdSize: 200, optTolerance: 0.6 }, async (err, svg) => {
    if (err) throw err;
    const d = (svg.match(/ d="([^"]+)"/) || [])[1] || '';
    const subs = d.split(/(?=[Mm])/).filter((s) => s.trim()).sort((a, b) => bboxArea(b) - bboxArea(a));
    const body = subs[0].trim();
    fs.writeFileSync(path.join(OUT, 'jaron-mobile-path.txt'), body);

    const strokeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}" viewBox="0 0 ${meta.width} ${meta.height}"><path d="${body}" fill="none" stroke="#ff3b3b" stroke-width="3"/></svg>`;
    const base = await sharp(SRC).toBuffer();
    await sharp(base)
      .composite([{ input: Buffer.from(strokeSvg), top: 0, left: 0 }])
      .jpeg({ quality: 82 })
      .toFile(path.join(OUT, 'mobile-outline.jpg'));

    console.log(`viewBox: 0 0 ${meta.width} ${meta.height} | kept largest of ${subs.length} subpaths | chars=${body.length}`);
  });
}
main();
