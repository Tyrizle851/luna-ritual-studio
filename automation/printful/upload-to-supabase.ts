#!/usr/bin/env node
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const affirmations = ['aff-001', 'aff-002'];

console.log('📤 Uploading digital images to Supabase...\n');

for (const affId of affirmations) {
  const imagePath = path.resolve(__dirname, `../../src/assets/affirmation-digital-${affId}.png`);
  const imageBuffer = readFileSync(imagePath);

  console.log(`Uploading ${affId}...`);

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(`affirmations/${affId}/digital.png`, imageBuffer, {
      contentType: 'image/png',
      upsert: true,
    });

  if (error) {
    console.error(`❌ Error uploading ${affId}:`, error);
  } else {
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/product-images/affirmations/${affId}/digital.png`;
    console.log(`✅ Uploaded: ${publicUrl}\n`);
  }
}

console.log('\n✨ Done! Digital images uploaded to Supabase.');
