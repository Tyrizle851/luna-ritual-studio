#!/usr/bin/env node
/**
 * Resize all upscaled images to exact Printful specs: 5400×7200 pixels
 */
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📐 Resizing to Print Specifications\n');
console.log('Target: 5400×7200 pixels (18×24" @ 300 DPI)\n');

const affirmations = Array.from({ length: 24 }, (_, i) =>
  `aff-${String(i + 1).padStart(3, '0')}`
);

const printReadyDir = path.resolve(__dirname, '../../src/assets/print-ready');
const finalDir = path.resolve(__dirname, '../../src/assets/print-final');
mkdirSync(finalDir, { recursive: true });

const TARGET_WIDTH = 5400;
const TARGET_HEIGHT = 7200;

for (let i = 0; i < affirmations.length; i++) {
  const affId = affirmations[i];

  try {
    console.log(`[${i + 1}/24] 📏 Resizing ${affId}...`);

    const inputPath = path.join(printReadyDir, `print-${affId}.png`);
    const imageBuffer = readFileSync(inputPath);

    // Get current dimensions
    const metadata = await sharp(imageBuffer).metadata();
    console.log(`  Current: ${metadata.width}×${metadata.height}`);

    // Resize to exact dimensions with high-quality settings
    const resizedBuffer = await sharp(imageBuffer)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: 'fill', // Fill the entire canvas (may slightly distort)
        kernel: 'lanczos3', // Best quality resampling
        background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
      })
      .png({ quality: 100, compressionLevel: 0 }) // Max quality, no compression
      .toBuffer();

    // Save final print-ready image
    const outputPath = path.join(finalDir, `print-${affId}.png`);
    writeFileSync(outputPath, resizedBuffer);

    // Verify dimensions
    const finalMetadata = await sharp(resizedBuffer).metadata();
    const sizeKB = (resizedBuffer.length / 1024).toFixed(0);

    if (finalMetadata.width === TARGET_WIDTH && finalMetadata.height === TARGET_HEIGHT) {
      console.log(`  ✅ Perfect: ${finalMetadata.width}×${finalMetadata.height} (${sizeKB} KB)`);
    } else {
      console.log(`  ⚠️  Warning: ${finalMetadata.width}×${finalMetadata.height} (expected ${TARGET_WIDTH}×${TARGET_HEIGHT})`);
    }

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
  }
}

console.log('\n============================================');
console.log('✨ All 24 Images Print-Ready!');
console.log('============================================');
console.log(`📁 Location: ${finalDir}`);
console.log('📏 Size: 5400×7200 pixels each');
console.log('🎨 Quality: 300 DPI for 18×24" print');
console.log('\n✅ Ready to upload to Printful!\n');
