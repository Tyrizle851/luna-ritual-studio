#!/usr/bin/env node
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Load affirmations from JSON
const affirmationsData = JSON.parse(
  readFileSync(path.join(__dirname, 'affirmations-data.json'), 'utf-8')
);

console.log('🚀 Starting Printful Test Upload\n');
console.log(`📋 Found ${affirmationsData.length} affirmations to upload\n`);

// Test Printful API connection
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;

if (!PRINTFUL_API_KEY) {
  console.error('❌ PRINTFUL_API_KEY not found in .env');
  process.exit(1);
}

if (!PRINTFUL_STORE_ID) {
  console.error('❌ PRINTFUL_STORE_ID not found in .env');
  process.exit(1);
}

console.log('✅ API Key found');
console.log(`✅ Store ID: ${PRINTFUL_STORE_ID}`);
console.log('✅ Affirmations loaded\n');

// Upload each affirmation with the 3 product types
const products = [
  { name: 'Unframed Poster 18x24', productId: 1, variantId: 1 },
  { name: 'Canvas 18x24', productId: 3, variantId: 7 },
  { name: 'Framed Poster 18x24', productId: 2, variantId: 3 }
];

for (const aff of affirmationsData) {
  console.log(`\n📝 Processing: ${aff.title} (${aff.id})`);

  for (const product of products) {
    try {
      console.log(`  📦 Creating ${product.name}...`);

      // Step 1: Upload image to Printful
      console.log(`  📤 Uploading image: ${aff.image}`);
      const fileUploadResponse = await fetch(`https://api.printful.com/files?store_id=${PRINTFUL_STORE_ID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: aff.image,
          filename: `${aff.id}-${product.name.toLowerCase().replace(/\s/g, '-')}.png`
        }),
      });

      if (!fileUploadResponse.ok) {
        const error = await fileUploadResponse.text();
        throw new Error(`File upload failed: ${error}`);
      }

      const fileData = await fileUploadResponse.json();
      const printfulFileId = fileData.result.id;
      console.log(`  ✅ File uploaded: ${printfulFileId}`);

      // Step 2: Create sync product
      const productTitle = `${aff.title} - Premium ${product.name}`;
      const productDescription = `${aff.description}\n\nHigh-quality ${product.name} with vibrant, fade-resistant colors.`;

      console.log(`  📦 Creating product: ${productTitle}`);

      const createProductResponse = await fetch(`https://api.printful.com/store/products?store_id=${PRINTFUL_STORE_ID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sync_product: {
            name: productTitle,
            thumbnail: aff.image,
          },
          sync_variants: [{
            retail_price: product.productId === 1 ? '43.07' : product.productId === 3 ? '98.11' : '133.07',
            variant_id: product.variantId,
            files: [{
              id: printfulFileId,
            }],
          }],
        }),
      });

      if (!createProductResponse.ok) {
        const error = await createProductResponse.text();
        throw new Error(`Product creation failed: ${error}`);
      }

      const productData = await createProductResponse.json();
      const printfulProductId = productData.result.id;

      console.log(`  ✅ Product created: ${productTitle} (ID: ${printfulProductId})`);

      // Small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
    }
  }
}

console.log('\n\n============================================================');
console.log('✨ Test upload complete!');
console.log('============================================================\n');
console.log('Next steps:');
console.log('1. Go to https://www.printful.com/dashboard');
console.log('2. Check "Store Products" to see your uploaded products');
console.log('3. If they look good, run the full upload for all 24 affirmations\n');
