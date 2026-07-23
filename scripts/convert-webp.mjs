import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');
const SRC_DIR = path.resolve('src');

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (fullPath.match(/\.(png|jpe?g)$/i)) {
      const ext = path.extname(fullPath);
      const newPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
      console.log(`Converting: ${entry.name} -> .webp`);
      
      try {
        await sharp(fullPath).webp({ quality: 80 }).toFile(newPath);
        await fs.unlink(fullPath);
      } catch (err) {
        console.error(`Failed to process ${entry.name}:`, err.message);
      }
    }
  }
}

async function updateJSXFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await updateJSXFiles(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = await fs.readFile(fullPath, 'utf8');
      if (content.match(/\.png|\.jpe?g/gi)) {
        content = content.replace(/\.png/gi, '.webp').replace(/\.jpe?g/gi, '.webp');
        await fs.writeFile(fullPath, content, 'utf8');
        console.log(`Updated JSX: ${entry.name}`);
      }
    }
  }
}

async function run() {
  console.log('Starting image conversion to WebP...');
  await processDirectory(PUBLIC_DIR);
  console.log('Image conversion complete. Updating JSX files...');
  await updateJSXFiles(SRC_DIR);
  console.log('Optimization complete!');
}

run().catch(console.error);
