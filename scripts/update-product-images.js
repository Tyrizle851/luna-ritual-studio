import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the randomized images JSON
const imageMapPath = path.join(__dirname, 'randomized-images.json');
const imageMap = JSON.parse(fs.readFileSync(imageMapPath, 'utf-8'));

const dataDir = path.join(__dirname, '..', 'src', 'data');

// Helper function to update a data file
function updateDataFile(filename, category) {
  const filePath = path.join(dataDir, filename);
  let content = fs.readFileSync(filePath, 'utf-8');

  const categoryData = imageMap[category];
  if (!categoryData) {
    console.log(`No data found for category: ${category}`);
    return;
  }

  let updateCount = 0;

  // For each product in the category
  Object.entries(categoryData).forEach(([productId, data]) => {
    const newUrl = data.url;

    // Find the product entry by ID and update its image field
    // Pattern: id: "product-id", (any lines), image: (current value),
    const idPattern = new RegExp(`(id:\\s*"${productId}"[\\s\\S]*?image:\\s*)([^,\\n]+)`, 'g');

    const beforeLength = content.length;
    content = content.replace(idPattern, (match, before, currentImage) => {
      updateCount++;
      return `${before}"${newUrl}"`;
    });

    if (content.length === beforeLength) {
      console.log(`  ⚠️  Could not find product ${productId} in ${filename}`);
    }
  });

  // Write the updated content back
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Updated ${filename}: ${updateCount} products`);

  return updateCount;
}

// Update all data files
console.log('Updating product data files with randomized images...\n');

const updates = [
  { file: 'affirmations.ts', category: 'affirmations' },
  { file: 'fashion.ts', category: 'fashion' },
  { file: 'candles.ts', category: 'candles' },
  { file: 'supplements.ts', category: 'supplements' },
  { file: 'books.ts', category: 'books' }
];

let totalUpdates = 0;
updates.forEach(({ file, category }) => {
  const count = updateDataFile(file, category);
  totalUpdates += count;
});

console.log(`\n🎉 Total products updated: ${totalUpdates}`);
