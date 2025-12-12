import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const SUPABASE_URL = 'https://tfximqohiizipawvzkms.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmeGltcW9oaWl6aXBhd3Z6a21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MzU3MzcsImV4cCI6MjA3NzMxMTczN30.CP2OH0khPqSc7OimS5n0tiwEwe3VOaRDtGf-pGzMePA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchAndRandomizeImages() {
  console.log('Fetching all product images from Supabase...\n');

  try {
    // Fetch all product images
    const { data, error } = await supabase
      .from('product_images')
      .select('*');

    if (error) {
      console.error('Error fetching images:', error);
      return;
    }

    if (!data || data.length === 0) {
      console.log('No images found in database.');
      return;
    }

    console.log(`Found ${data.length} total images\n`);

    // Group images by product_id and category
    const productMap = {};

    data.forEach(img => {
      const key = img.product_id;
      if (!productMap[key]) {
        productMap[key] = {
          productId: img.product_id,
          category: img.product_category,
          images: []
        };
      }
      productMap[key].images.push({
        variation: img.variation_type,
        url: img.image_url
      });
    });

    // Randomly select one image per product
    const results = {
      affirmations: {},
      fashion: {},
      candles: {},
      supplements: {},
      books: {}
    };

    Object.values(productMap).forEach(product => {
      if (product.images.length > 0) {
        const randomIndex = Math.floor(Math.random() * product.images.length);
        const selected = product.images[randomIndex];

        const category = product.category;
        if (results[category]) {
          results[category][product.productId] = {
            url: selected.url,
            variation: selected.variation,
            totalImages: product.images.length
          };
        }
      }
    });

    // Display results
    console.log('=== RANDOMIZED IMAGE SELECTIONS ===\n');

    Object.keys(results).forEach(category => {
      const categoryData = results[category];
      const count = Object.keys(categoryData).length;

      if (count > 0) {
        console.log(`\n=== ${category.toUpperCase()} (${count} products) ===`);
        Object.entries(categoryData).forEach(([productId, data]) => {
          console.log(`${productId}: ${data.variation} (${data.totalImages} available)`);
          console.log(`  URL: ${data.url}`);
        });
      }
    });

    // Save to JSON file
    const outputPath = path.join(__dirname, 'randomized-images.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\n\n✅ Results saved to: ${outputPath}`);

    return results;

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Run the script
fetchAndRandomizeImages();
