import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const src = path.join(root, "public", "sign.jpg");

async function make(size, outName) {
  const out = path.join(root, "public", outName);
  await sharp(src)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`wrote ${outName} (${size}x${size})`);
}

await make(32, "favicon-32.png");
await make(64, "favicon-64.png");
await make(180, "apple-touch-icon.png");
