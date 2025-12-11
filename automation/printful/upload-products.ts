#!/usr/bin/env node

/**
 * Printful Product Upload Script
 * 
 * This script reads affirmations from your data files and uploads them to Printful
 * as physical products (posters, notecards, mugs, etc.).
 * 
 * Usage:
 *   npm run printful:upload -- --all
 *   npm run printful:upload -- --test --products aff-001,aff-002
 *   npm run printful:upload -- --category Self-Love
 */

import dotenv from 'dotenv';
import { affirmations, type Affirmation } from '../../src/data/affirmations.js';
import { PrintfulClient } from './printful-client';
import { mapAffirmationToPrintful, getProductTypesToCreate, validateAffirmation } from './product-mapper';
import { PRODUCT_CONFIG } from './config';

// Load environment variables
dotenv.config();

interface UploadOptions {
  test?: boolean;
  products?: string[];
  category?: string;
  all?: boolean;
}

interface UploadResult {
  affirmationId: string;
  productType: string;
  success: boolean;
  printfulProductId?: number;
  error?: string;
}

/**
 * Parse command line arguments
 */
function parseArgs(): UploadOptions {
  const args = process.argv.slice(2);
  const options: UploadOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--test') {
      options.test = true;
    } else if (arg === '--all') {
      options.all = true;
    } else if (arg === '--products' && args[i + 1]) {
      options.products = args[i + 1].split(',');
      i++;
    } else if (arg === '--category' && args[i + 1]) {
      options.category = args[i + 1];
      i++;
    }
  }

  return options;
}

/**
 * Filter affirmations based on options
 */
function filterAffirmations(options: UploadOptions): Affirmation[] {
  let filtered = [...affirmations];

  if (options.products) {
    filtered = filtered.filter(a => options.products!.includes(a.id));
  }

  if (options.category) {
    filtered = filtered.filter(a => a.category === options.category);
  }

  if (options.test) {
    // Limit to first 2 for testing
    filtered = filtered.slice(0, 2);
  }

  return filtered;
}

/**
 * Upload a single affirmation product to Printful
 */
async function uploadAffirmationProduct(
  affirmation: Affirmation,
  productType: string,
  printfulClient: PrintfulClient
): Promise<UploadResult> {
  const result: UploadResult = {
    affirmationId: affirmation.id,
    productType,
    success: false,
  };

  try {
    console.log(`\n📝 Processing: ${affirmation.title} (${productType})`);

    // Validate affirmation
    validateAffirmation(affirmation);

    // Map to Printful format
    const productRequest = await mapAffirmationToPrintful(
      affirmation,
      productType,
      printfulClient
    );

    // Create product in Printful
    const printfulProduct = await printfulClient.createProduct(productRequest);

    result.success = true;
    result.printfulProductId = printfulProduct.id;

    console.log(`✅ Successfully created: ${printfulProduct.name} (ID: ${printfulProduct.id})`);

  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error: ${result.error}`);
  }

  return result;
}

/**
 * Main upload function
 */
async function main() {
  console.log('🚀 Starting Printful product upload...\n');

  // Check for API key
  const apiKey = process.env.PRINTFUL_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: PRINTFUL_API_KEY not found in environment variables');
    console.error('   Please add PRINTFUL_API_KEY to your .env file');
    process.exit(1);
  }

  // Parse options
  const options = parseArgs();
  
  if (!options.all && !options.products && !options.category && !options.test) {
    console.error('❌ Error: No products specified');
    console.error('   Usage: npm run printful:upload -- --all');
    console.error('   Usage: npm run printful:upload -- --test');
    console.error('   Usage: npm run printful:upload -- --products aff-001,aff-002');
    console.error('   Usage: npm run printful:upload -- --category Self-Love');
    process.exit(1);
  }

  // Initialize Printful client
  const printfulClient = new PrintfulClient(apiKey);

  // Filter affirmations
  const affirmationsToProcess = filterAffirmations(options);
  
  if (affirmationsToProcess.length === 0) {
    console.error('❌ No affirmations found matching criteria');
    process.exit(1);
  }

  console.log(`📋 Found ${affirmationsToProcess.length} affirmation(s) to process`);
  console.log(`📦 Product types to create: ${getProductTypesToCreate().join(', ')}\n`);

  // Get product types to create
  const productTypes = getProductTypesToCreate();
  
  if (productTypes.length === 0) {
    console.error('❌ No product types enabled in config');
    console.error('   Please enable at least one product type in automation/printful/config.ts');
    process.exit(1);
  }

  // Process each affirmation
  const results: UploadResult[] = [];
  let successCount = 0;
  let errorCount = 0;

  for (const affirmation of affirmationsToProcess) {
    for (const productType of productTypes) {
      const result = await uploadAffirmationProduct(
        affirmation,
        productType,
        printfulClient
      );

      results.push(result);

      if (result.success) {
        successCount++;
      } else {
        errorCount++;
      }

      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 UPLOAD SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📦 Total: ${results.length}`);

  if (errorCount > 0) {
    console.log('\n❌ Failed uploads:');
    results
      .filter(r => !r.success)
      .forEach(r => {
        console.log(`   - ${r.affirmationId} (${r.productType}): ${r.error}`);
      });
  }

  console.log('\n✨ Done!');
  
  if (options.test) {
    console.log('\n💡 This was a test run. Review products in Printful dashboard before running --all');
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

