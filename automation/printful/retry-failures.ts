#!/usr/bin/env node
/**
 * Retry failed images with more aggressive downscaling
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import Replicate from 'replicate';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

console.log('🔄 Retrying Failed Images\n');

// The 3 that failed
const failures = ['aff-005', 'aff-011', 'aff-017'];

const outputDir = path.resolve(__dirname, '../../src/assets/print-ready');
const tempDir = path.resolve(__dirname, '../../src/assets/temp-downscaled');
mkdirSync(outputDir, { recursive: true });
mkdirSync(tempDir, { recursive: true });

// Much more aggressive - 75% of GPU limit instead of 95%
const MAX_GPU_PIXELS = 2096704 * 0.75;

for (let i = 0; i < failures.length; i++) {
  const affId = failures[i];

  try {
    console.log(`[${i + 1}/3] 🔄 Retrying ${affId}...`);

    const inputPath = path.resolve(__dirname, `../../src/assets/affirmation-digital-${affId}.png`);
    const imageBuffer = readFileSync(inputPath);

    // Get image dimensions
    const metadata = await sharp(imageBuffer).metadata();
    const { width, height } = metadata;
    const totalPixels = width! * height!;

    console.log(`  📐 Original: ${width}×${height} (${totalPixels.toLocaleString()} pixels)`);

    // More aggressive downscaling
    const scaleFactor = Math.sqrt(MAX_GPU_PIXELS / totalPixels);
    const newWidth = Math.floor(width! * scaleFactor);
    const newHeight = Math.floor(height! * scaleFactor);

    console.log(`  ⬇️  Downscaling to ${newWidth}×${newHeight} (75% GPU limit)...`);

    const processBuffer = await sharp(imageBuffer)
      .resize(newWidth, newHeight, { fit: 'inside' })
      .png()
      .toBuffer();

    const tempPath = path.join(tempDir, `${affId}-downscaled-aggressive.png`);
    writeFileSync(tempPath, processBuffer);
    console.log(`  ✅ Downscaled saved`);

    // Convert to base64
    const base64Image = processBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64Image}`;

    // Upscale via Replicate
    console.log(`  ⬆️  Upscaling 4x via Replicate AI...`);
    const output = await replicate.run(
      "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
      {
        input: {
          image: dataUrl,
          scale: 4,
          face_enhance: false,
        }
      }
    );

    // Download upscaled image
    console.log(`  📥 Downloading upscaled image...`);
    const response = await fetch(output as string);
    const upscaledBuffer = Buffer.from(await response.arrayBuffer());

    // Save final image
    const outputPath = path.join(outputDir, `print-${affId}.png`);
    writeFileSync(outputPath, upscaledBuffer);

    // Get final dimensions
    const finalMetadata = await sharp(upscaledBuffer).metadata();
    console.log(`  ✅ Final: ${finalMetadata.width}×${finalMetadata.height} pixels`);
    console.log(`  💾 Saved: print-${affId}.png`);

    // Rate limiting
    if (i < failures.length - 1) {
      console.log(`  ⏳ Waiting 10 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
  }
}

console.log('\n✨ Retry Complete!\n');
