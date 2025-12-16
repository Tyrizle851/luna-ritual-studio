#!/usr/bin/env node
/**
 * Upload ALL 24 affirmations as 72 Printful products
 * (24 affirmations × 3 product types)
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID!;

console.log('🚀 Luna Rituals - Complete Printful Upload\n');
console.log(`Store ID: ${PRINTFUL_STORE_ID}`);
console.log('Creating 72 products (24 affirmations × 3 types)\n');

// Product configurations
const products = [
  {
    name: 'Enhanced Matte Paper Poster (in) 18×24',
    printfulId: 1,
    variantId: 1,
  },
  {
    name: 'Enhanced Matte Paper Framed Poster (in) 18×24',
    printfulId: 2,
    variantId: 3,
  },
  {
    name: 'Canvas (in) 18×24',
    printfulId: 3,
    variantId: 7,
  },
];

// Load all 24 affirmations
const affirmationsData = JSON.parse(
  readFileSync(path.resolve(__dirname, './all-affirmations.json'), 'utf-8')
);

let totalSuccess = 0;
let totalErrors = 0;

for (const aff of affirmationsData) {
  console.log(`\n📦 Processing "${aff.title}" (${aff.id})...`);

  for (const product of products) {
    try {
      console.log(`  🔄 Creating ${product.name}...`);

      // Step 1: Upload file to Printful
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
        const error = await fileUploadResponse.json();
        throw new Error(`File upload failed: ${JSON.stringify(error)}`);
      }

      const fileData = await fileUploadResponse.json();
      const fileId = fileData.result.id;

      // Step 2: Create sync product
      const createProductResponse = await fetch(`https://api.printful.com/store/products?store_id=${PRINTFUL_STORE_ID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sync_product: {
            name: `${aff.title} - ${product.name}`,
            thumbnail: aff.image,
          },
          sync_variants: [
            {
              retail_price: "39.99",
              variant_id: product.variantId,
              files: [
                {
                  id: fileId,
                  type: "default",
                }
              ],
            }
          ],
        }),
      });

      if (!createProductResponse.ok) {
        const error = await createProductResponse.json();
        throw new Error(`Product creation failed: ${JSON.stringify(error)}`);
      }

      const productData = await createProductResponse.json();
      console.log(`    ✅ Created (ID: ${productData.result.id})`);
      totalSuccess++;

      // Rate limiting: Wait 10 seconds between each product creation
      console.log(`    ⏳ Waiting 10 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 10000));

    } catch (error) {
      console.error(`    ❌ Error: ${error.message}`);
      totalErrors++;

      // Wait even on error to avoid hitting rate limit again
      console.log(`    ⏳ Waiting 10 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
}

console.log('\n\n============================================');
console.log('✨ Upload Complete!');
console.log('============================================');
console.log(`✅ Success: ${totalSuccess}/72`);
console.log(`❌ Errors: ${totalErrors}/72`);
console.log('\n📁 Check your Printful dashboard to see products!\n');
