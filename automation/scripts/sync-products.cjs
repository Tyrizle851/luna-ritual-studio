#!/usr/bin/env node

/**
 * Product Sync Script
 * Reads products from TypeScript data files and creates JSON database
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../src/data');
const OUTPUT_FILE = path.join(__dirname, '../data/products.json');
const STATS_FILE = path.join(__dirname, '../data/post-stats.json');

// Extract products from TypeScript files
function extractProducts() {
  const products = [];

  const files = [
    { file: 'affirmations.ts', category: 'affirmations' },
    { file: 'candles.ts', category: 'candles' },
    { file: 'fashion.ts', category: 'fashion' },
    { file: 'supplements.ts', category: 'supplements' }
  ];

  for (const { file, category } of files) {
    const filePath = path.join(DATA_DIR, file);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${file}`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract the array from the export statement
    const exportMatch = content.match(/export\s+const\s+\w+:\s*\w+\[\]\s*=\s*(\[[\s\S]*?\]);/m);

    if (!exportMatch) {
      console.warn(`⚠️  No export found in ${file}`);
      continue;
    }

    try {
      // Clean up TypeScript syntax to make it JSON-parseable
      let arrayContent = exportMatch[1]
        .replace(/image:\s*[a-zA-Z_][a-zA-Z0-9_]*/g, 'image: "product-image"')  // Handle image imports first
        .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*):/g, '$1"$2":')  // Quote keys
        .replace(/'/g, '"')  // Single to double quotes
        .replace(/,\s*}/g, '}')  // Remove trailing commas in objects
        .replace(/,\s*]/g, ']');  // Remove trailing commas in arrays

      const parsed = JSON.parse(arrayContent);

      parsed.forEach(product => {
        products.push({
          ...product,
          category,
          synced_at: new Date().toISOString(),
          last_posted: null,
          total_posts: 0,
          avg_engagement: 0
        });
      });

      console.log(`✅ Parsed ${parsed.length} products from ${file}`);
    } catch (e) {
      console.error(`❌ Failed to parse ${file}:`, e.message);
    }
  }

  return products;
}

// Initialize stats file if it doesn't exist
function initStats() {
  if (!fs.existsSync(STATS_FILE)) {
    const initialStats = {
      posts: [],
      learnings: {
        instagram: { best_hashtags: [], best_times: [], avg_engagement: 0 },
        tiktok: { best_hashtags: [], best_times: [], avg_engagement: 0 },
        pinterest: { best_hashtags: [], best_times: [], avg_engagement: 0 }
      },
      last_updated: new Date().toISOString()
    };
    fs.writeFileSync(STATS_FILE, JSON.stringify(initialStats, null, 2));
    console.log('✅ Initialized stats file');
  }
}

// Main execution
function main() {
  console.log('🔄 Syncing products...\n');

  const products = extractProducts();

  console.log(`\n📦 Total products extracted: ${products.length}`);

  // Write to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));
  console.log(`✅ Products saved to: ${OUTPUT_FILE}`);

  // Initialize stats
  initStats();

  // Print summary
  const summary = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  console.log('\n📊 Summary by category:');
  Object.entries(summary).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} products`);
  });

  console.log('\n✅ Sync complete!\n');
}

main();
