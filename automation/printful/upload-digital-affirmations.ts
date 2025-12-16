#!/usr/bin/env node
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID!;

// Affirmations to upload (for testing, just first 2)
const affirmations = [
  { id: 'aff-001', title: 'I am worthy of rest', category: 'Self-Love' },
  { id: 'aff-002', title: 'Joy is my natural state', category: 'Joy' },
];

// Product specifications with proper design placement
const products = [
  {
    name: 'Unframed Poster 18x24',
    productId: 1,
    variantId: 1,
    price: '43.07',
    // For unframed posters, use full area placement
    placement: {
      area_width: 4320,  // 18" at 240 DPI
      area_height: 5760, // 24" at 240 DPI
      width: 4320,
      height: 5760,
      top: 0,
      left: 0,
    }
  },
  {
    name: 'Canvas 18x24',
    productId: 3,
    variantId: 7,
    price: '98.11',
    // For canvas, slightly smaller to account for wrapping
    placement: {
      area_width: 4320,
      area_height: 5760,
      width: 4200,  // Slightly smaller
      height: 5640,
      top: 60,
      left: 60,
    }
  },
  {
    name: 'Framed Poster 18x24',
    productId: 2,
    variantId: 3,
    price: '133.07',
    // For framed, use full area (frame adds border)
    placement: {
      area_width: 4320,
      area_height: 5760,
      width: 4320,
      height: 5760,
      top: 0,
      left: 0,
    }
  },
];

console.log('🚀 Starting Printful Upload (Digital Affirmations)\n');
console.log(`📋 Uploading ${affirmations.length} affirmations\n`);

for (const aff of affirmations) {
  console.log(`\n📝 Processing: ${aff.title} (${aff.id})`);

  // Read the digital image file
  const imagePath = path.resolve(__dirname, `../../src/assets/affirmation-digital-${aff.id}.png`);
  console.log(`  📂 Reading image: ${imagePath}`);

  const imageBuffer = readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');

  for (const product of products) {
    try {
      console.log(`  📦 Creating ${product.name}...`);

      // Step 1: Upload image to Printful using base64
      console.log(`  📤 Uploading digital image...`);
      const fileUploadResponse = await fetch(`https://api.printful.com/files?store_id=${PRINTFUL_STORE_ID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'default',
          filename: `${aff.id}-digital.png`,
          file: `data:image/png;base64,${base64Image}`
        }),
      });

      if (!fileUploadResponse.ok) {
        const error = await fileUploadResponse.text();
        throw new Error(`File upload failed: ${error}`);
      }

      const fileData = await fileUploadResponse.json();
      const printfulFileId = fileData.result.id;
      console.log(`  ✅ File uploaded: ${printfulFileId}`);

      // Step 2: Create sync product with proper placement
      const productTitle = `${aff.title} - Premium ${product.name}`;

      console.log(`  📦 Creating product with optimized placement...`);

      const createProductResponse = await fetch(`https://api.printful.com/store/products?store_id=${PRINTFUL_STORE_ID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sync_product: {
            name: productTitle,
          },
          sync_variants: [{
            retail_price: product.price,
            variant_id: product.variantId,
            files: [{
              id: printfulFileId,
              type: 'default',
              ...product.placement
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
console.log('✨ Upload complete!');
console.log('============================================================\n');
console.log('✅ Uploaded with proper digital images');
console.log('✅ Applied optimized design placement for each product');
console.log('\nGo check your Printful dashboard!');
console.log('https://www.printful.com/dashboard/product-templates/published/' + PRINTFUL_STORE_ID + '\n');
