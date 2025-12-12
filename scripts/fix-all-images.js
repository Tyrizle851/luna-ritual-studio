import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = 'https://tfximqohiizipawvzkms.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmeGltcW9oaWl6aXBhd3Z6a21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MzU3MzcsImV4cCI6MjA3NzMxMTczN30.CP2OH0khPqSc7OimS5n0tiwEwe3VOaRDtGf-pGzMePA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Products with local paths that need fixing
const PRODUCTS_TO_FIX = {
  fashion: ['fsh-005', 'fsh-008', 'fsh-009', 'fsh-011', 'fsh-012', 'fsh-015', 'fsh-016', 'fsh-017', 'fsh-018', 'fsh-020', 'fsh-022', 'fsh-024'],
  candles: ['cnd-003', 'cnd-006', 'cnd-007', 'cnd-008'],
  supplements: ['sup-005', 'sup-008', 'sup-009', 'sup-011', 'sup-013'],
  books: ['book-006', 'book-010']
};

async function fetchAndSelectBestImages() {
  console.log('🔧 Fetching images from Supabase and selecting best variations...\n');

  const { data, error } = await supabase
    .from('product_images')
    .select('*');

  if (error) {
    console.error('Error:', error);
    return null;
  }

  const productMap = {};
  data.forEach(img => {
    if (!productMap[img.product_id]) {
      productMap[img.product_id] = {
        productId: img.product_id,
        category: img.product_category,
        images: []
      };
    }
    productMap[img.product_id].images.push({
      variation: img.variation_type,
      url: img.image_url
    });
  });

  const fixes = {};

  // For each category
  Object.keys(PRODUCTS_TO_FIX).forEach(category => {
    fixes[category] = {};

    PRODUCTS_TO_FIX[category].forEach(productId => {
      const product = productMap[productId];

      if (!product || product.images.length === 0) {
        console.log(`⚠️  No images found for ${productId}`);
        return;
      }

      let selectedImage;

      if (category === 'fashion') {
        // For fashion: Prefer lifestyle > styled > original, AVOID detail
        const preferences = ['lifestyle', 'styled', 'original'];
        for (const pref of preferences) {
          selectedImage = product.images.find(img => img.variation === pref);
          if (selectedImage) break;
        }
        // Fallback to any non-detail image
        if (!selectedImage) {
          selectedImage = product.images.find(img => img.variation !== 'detail');
        }
        // Last resort: any image
        if (!selectedImage) {
          selectedImage = product.images[0];
        }
      } else {
        // For other categories: Prefer lifestyle > styled > original
        const preferences = ['lifestyle', 'styled', 'original'];
        for (const pref of preferences) {
          selectedImage = product.images.find(img => img.variation === pref);
          if (selectedImage) break;
        }
        if (!selectedImage) {
          selectedImage = product.images[0];
        }
      }

      fixes[category][productId] = {
        url: selectedImage.url,
        variation: selectedImage.variation,
        totalImages: product.images.length
      };

      console.log(`✓ ${productId}: ${selectedImage.variation} (from ${product.images.length} options)`);
    });
  });

  return fixes;
}

async function applyFixes() {
  const fixes = await fetchAndSelectBestImages();

  if (!fixes) {
    console.error('Failed to fetch images');
    return;
  }

  console.log('\n📝 Applying fixes to data files...\n');

  const dataDir = path.join(__dirname, '..', 'src', 'data');

  // Update each data file
  const fileMap = {
    fashion: 'fashion.ts',
    candles: 'candles.ts',
    supplements: 'supplements.ts',
    books: 'books.ts'
  };

  Object.entries(fileMap).forEach(([category, filename]) => {
    const filePath = path.join(dataDir, filename);
    let content = fs.readFileSync(filePath, 'utf-8');

    Object.entries(fixes[category] || {}).forEach(([productId, data]) => {
      const idPattern = new RegExp(`(id:\\s*"${productId}"[\\s\\S]*?image:\\s*)([^,\\n]+)`, 'g');
      content = content.replace(idPattern, (match, before, currentImage) => {
        return `${before}"${data.url}"`;
      });
    });

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${filename}: ${Object.keys(fixes[category] || {}).length} products fixed`);
  });

  // Save the fixes to JSON for reference
  const outputPath = path.join(__dirname, 'image-fixes.json');
  fs.writeFileSync(outputPath, JSON.stringify(fixes, null, 2));
  console.log(`\n💾 Fixes saved to: ${outputPath}`);
}

applyFixes();
