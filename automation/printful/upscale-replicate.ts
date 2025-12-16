#!/usr/bin/env node
/**
 * Option B: Cloud upscaling using Replicate API
 * No local installation needed - runs in the cloud
 * Costs ~$0.02 per image
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import Replicate from 'replicate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

console.log('🚀 Luna Rituals - Cloud Image Upscaler (Replicate)\n');

const affirmations = Array.from({ length: 24 }, (_, i) =>
  `aff-${String(i + 1).padStart(3, '0')}`
);

const outputDir = path.resolve(__dirname, '../../src/assets/print-ready');
mkdirSync(outputDir, { recursive: true });

console.log(`📋 Processing ${affirmations.length} affirmations\n`);

for (const affId of affirmations) {
  try {
    console.log(`🔄 Processing ${affId}...`);

    const inputPath = path.resolve(__dirname, `../../src/assets/affirmation-digital-${affId}.png`);
    const imageBuffer = readFileSync(inputPath);
    const base64Image = imageBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64Image}`;

    // Run Real-ESRGAN upscaling via Replicate
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
    console.log('  📥 Downloading upscaled image...');
    const response = await fetch(output as string);
    const upscaledBuffer = Buffer.from(await response.arrayBuffer());

    // Save to print-ready folder
    const outputPath = path.join(outputDir, `print-${affId}.png`);
    writeFileSync(outputPath, upscaledBuffer);

    console.log(`  ✅ Saved: print-${affId}.png\n`);

    // Rate limiting - wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));

  } catch (error) {
    console.error(`  ❌ Error processing ${affId}:`, error.message);
  }
}

console.log('\n============================================');
console.log('✨ Complete! Images ready for print');
console.log('============================================\n');
console.log('📁 Location:', outputDir);
console.log('\nNext: Upload these to Printful\n');
