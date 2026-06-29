// Trace Jaron's silhouette from the hero photo and keep only the largest subpath
// (his body). At threshold 115 the picture frame behind his head stays a SEPARATE
// shape and is dropped, and his neck stays clean. Writes the path to
// tmp-trace/jaron-path.txt and a stroked-outline preview to tmp-trace/outline-final.jpg.
//
// To regenerate the component module after running this:
//   node scripts/trace-extract.cjs        # writes tmp-trace/jaron-path.txt
//   (then wrap that into components/heroSilhouette.ts)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { trace } = require('potrace');

const SRC = path.join(__dirname, '..', 'public', 'hero', 'hero-16x9.jpeg');
const OUT = path.join(__dirname, '..', 'tmp-trace');
const CROP = { left: 0, top: 0, width: 1500, height: 1536 };
const THRESHOLD = Number(process.argv[2] || 90);

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
  const buf = await sharp(SRC).extract(CROP).grayscale().normalize().threshold(THRESHOLD).png().toBuffer();
  trace(buf, { turdSize: 400, optTolerance: 0.6 }, async (err, svg) => {
    if (err) throw err;
    const d = (svg.match(/ d="([^"]+)"/) || [])[1] || '';
    const subs = d.split(/(?=[Mm])/).filter((s) => s.trim()).sort((a, b) => bboxArea(b) - bboxArea(a));
    const body = subs[0].trim();
    fs.writeFileSync(path.join(OUT, 'jaron-path.txt'), body);

    const strokeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CROP.width}" height="${CROP.height}" viewBox="0 0 ${CROP.width} ${CROP.height}"><path d="${body}" fill="none" stroke="#ff3b3b" stroke-width="5"/></svg>`;
    const baseImg = await sharp(SRC).extract(CROP).toBuffer();
    await sharp(baseImg)
      .composite([{ input: Buffer.from(strokeSvg), top: 0, left: 0 }])
      .jpeg({ quality: 82 })
      .toFile(path.join(OUT, 'outline-final.jpg'));

    console.log(`kept largest of ${subs.length} subpaths · chars=${body.length} -> tmp-trace/outline-final.jpg`);
  });
}
main();
