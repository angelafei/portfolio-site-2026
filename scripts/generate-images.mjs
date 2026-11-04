import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import nextConfig from '../next.config.mjs';

const source = fileURLToPath(new URL('../public/images/', import.meta.url));
const output = path.join(source, 'responsive');
await mkdir(output, { recursive: true });

for (const file of await readdir(source)) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
  const name = path.parse(file).name;
  for (const width of nextConfig.images.deviceSizes) {
    await sharp(path.join(source, file))
      // Match Next's width descriptors exactly, including high-density sources.
      .resize({ width })
      .webp({ quality: 80 })
      .toFile(path.join(output, `${name}-${width}.webp`));
  }
}
console.log('Responsive project images generated.');
