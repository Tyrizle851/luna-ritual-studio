#!/usr/bin/env node
/**
 * Smart upscaler with rate limiting and pre-downscaling
 * Handles Replicate's limitations intelligently
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

console.log('🚀 Luna Rituals - Smart Cloud Upscaler\n');

const affirmations = Array.from({ length: 24 }, (_, i) =>
  `aff-${String(i + 1).padStart(3, '0')}`
);

const outputDir = path.resolve(__dirname, '../../src/assets/print-ready');
const tempDir = path.resolve(__dirname, '../../src/assets/temp-downscaled');
mkdirSync(outputDir, { recursive: true });
mkdirSync(tempDir, { recursive: true });

// Replicate GPU limit: 2,096,704 pixels max
const MAX_GPU_PIXELS = 2096704;

console.log(`📋 Processing ${affirmations.length} affirmations`);
console.log('⏱️  Rate limit: 6 per minute (10 sec delay between each)\n');

let successCount = 0;
let errorCount = 0;

for (let i = 0; i < affirmations.length; i++) {
  const affId = affirmations[i];

  try {
    console.log(`\n[${i + 1}/24] 🔄 Processing ${affId}...`);

    const inputPath = path.resolve(__dirname, `../../src/assets/affirmation-digital-${affId}.png`);
    const imageBuffer = readFileSync(inputPath);

    // Get image dimensions
    const metadata = await sharp(imageBuffer).metadata();
    const { width, height } = metadata;
    const totalPixels = width! * height!;

    console.log(`  📐 Original: ${width}×${height} (${totalPixels.toLocaleString()} pixels)`);

    let processBuffer = imageBuffer;
    let needsDownscale = totalPixels > MAX_GPU_PIXELS;

    // Pre-downscale if needed
    if (needsDownscale) {
      const scaleFactor = Math.sqrt(MAX_GPU_PIXELS / totalPixels) * 0.95; // 95% to be safe
      const newWidth = Math.floor(width! * scaleFactor);
      const newHeight = Math.floor(height! * scaleFactor);

      console.log(`  ⬇️  Downscaling to ${newWidth}×${newHeight} to fit GPU...`);

      processBuffer = await sharp(imageBuffer)
        .resize(newWidth, newHeight, { fit: 'inside' })
        .png()
        .toBuffer();

      const tempPath = path.join(tempDir, `${affId}-downscaled.png`);
      writeFileSync(tempPath, processBuffer);
      console.log(`  ✅ Downscaled saved`);
    }

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

    successCount++;

    // Rate limiting: Wait 10 seconds between requests (6 per minute)
    if (i < affirmations.length - 1) {
      console.log(`  ⏳ Waiting 10 seconds for rate limit...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    errorCount++;

    // Still wait on error to avoid hitting rate limit
    if (i < affirmations.length - 1) {
      console.log(`  ⏳ Waiting 10 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
}

console.log('\n\n============================================');
console.log('✨ Processing Complete!');
console.log('============================================');
console.log(`✅ Success: ${successCount}/24`);
console.log(`❌ Errors: ${errorCount}/24`);
console.log(`\n📁 Output: ${outputDir}`);
console.log('\nNext: Upload these to Printful\n');
