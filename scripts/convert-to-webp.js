import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirs = [
  path.resolve('src/assets/images'),
  path.resolve('src/assets/Certificates'),
];

async function optimizeDirectory(dir) {
  const files = fs.readdirSync(dir);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(dir, file);
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const outputPath = path.join(dir, `${baseName}.webp`);

      const stats = fs.statSync(inputPath);
      totalBefore += stats.size;

      await sharp(inputPath)
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toFile(outputPath);

      const outStats = fs.statSync(outputPath);
      totalAfter += outStats.size;

      console.log(`Converted: ${file} (${(stats.size / 1024).toFixed(1)} KB) -> ${baseName}.webp (${(outStats.size / 1024).toFixed(1)} KB) [${((1 - outStats.size / stats.size) * 100).toFixed(0)}% saved]`);
    }
  }

  console.log(`\nDirectory: ${path.basename(dir)}`);
  console.log(`Total Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total After: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%\n`);
}

async function run() {
  for (const d of dirs) {
    await optimizeDirectory(d);
  }
}

run();
