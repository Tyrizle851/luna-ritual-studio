#!/usr/bin/env node
/**
 * Upload all 24 print-final images to Supabase
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY!
);

console.log('📤 Uploading Print Images to Supabase\n');

const affirmations = Array.from({ length: 24 }, (_, i) =>
  `aff-${String(i + 1).padStart(3, '0')}`
);

for (let i = 0; i < affirmations.length; i++) {
  const affId = affirmations[i];

  try {
    console.log(`[${i + 1}/24] 📤 Uploading ${affId}...`);

    const imagePath = path.resolve(__dirname, `../../src/assets/print-final/print-${affId}.png`);
    const imageBuffer = readFileSync(imagePath);
    const sizeKB = (imageBuffer.length / 1024).toFixed(0);

    console.log(`  Size: ${sizeKB} KB`);

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(`affirmations/${affId}/print.png`, imageBuffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (error) {
      console.error(`  ❌ Error: ${error.message}`);
    } else {
      const publicUrl = supabase.storage
        .from('product-images')
        .getPublicUrl(`affirmations/${affId}/print.png`).data.publicUrl;

      console.log(`  ✅ Uploaded: ${publicUrl}`);
    }

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
  }
}

console.log('\n✨ All images uploaded to Supabase!\n');
