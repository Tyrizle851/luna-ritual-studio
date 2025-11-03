#!/usr/bin/env node

/**
 * Instagram Auto-Poster
 * Uses OpenAI to generate ads and post to Instagram
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');
const STATS_FILE = path.join(__dirname, '../data/post-stats.json');
const MEDIA_DIR = path.join(__dirname, '../media');

// Configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '';
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '';

// Ensure media directory exists
if (!fs.existsSync(MEDIA_DIR)) {
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
}

//Select random product
function selectRandomProduct() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));

  // Filter products that haven't been posted recently
  const now = new Date();
  const availableProducts = products.filter(p => {
    if (!p.last_posted) return true;
    const daysSince = (now - new Date(p.last_posted)) / (1000 * 60 * 60 * 24);
    return daysSince > 3; // Haven't posted in 3+ days
  });

  // If all have been posted recently, use all
  const pool = availableProducts.length > 0 ? availableProducts : products;

  return pool[Math.floor(Math.random() * pool.length)];
}

// Generate ad copy with GPT-4
async function generateAdCopy(product) {
  const prompt = `Create an Instagram post for this product:

Product: ${product.name}
Category: ${product.category}
Description: ${product.description}
Price: $${product.price}
${product.benefits ? 'Benefits: ' + product.benefits.join(', ') : ''}

Create a post that:
1. Has an attention-grabbing hook
2. Highlights key benefits naturally
3. Creates emotional connection
4. Includes subtle call-to-action
5. Uses relevant emojis (but not too many)
6. Is authentic, not salesy

Return ONLY JSON (no markdown):
{
  "caption": "your engaging caption here",
  "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "image_prompt": "detailed DALL-E prompt for product image"
}`;

  const payload = JSON.stringify({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: 'You are an expert Instagram content creator for wellness brands. Create engaging, authentic posts.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.8,
    max_tokens: 500
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.error) {
            reject(new Error(result.error.message));
            return;
          }
          let content = result.choices[0].message.content;
          // Remove markdown code blocks if present
          content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          resolve(JSON.parse(content));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// Generate image with DALL-E 3
async function generateImage(imagePrompt, productId) {
  const payload = JSON.stringify({
    model: 'dall-e-3',
    prompt: `${imagePrompt}. Professional product photography, aesthetic, wellness brand, soft natural lighting, Instagram-worthy, minimalist background, high quality, 1:1 square format`,
    size: '1024x1024',
    quality: 'hd',
    style: 'natural',
    n: 1
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/images/generations',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.error) {
            reject(new Error(result.error.message));
            return;
          }

          const imageUrl = result.data[0].url;

          // Download the image
          https.get(imageUrl, (imgRes) => {
            const imagePath = path.join(MEDIA_DIR, `${productId}_${Date.now()}.png`);
            const fileStream = fs.createWriteStream(imagePath);

            imgRes.pipe(fileStream);

            fileStream.on('finish', () => {
              fileStream.close();
              resolve(imagePath);
            });
          }).on('error', reject);

        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// Post to Instagram (placeholder - requires authentication setup)
async function postToInstagram(imagePath, caption, hashtags) {
  // For now, just log what would be posted
  console.log('\n📸 READY TO POST TO INSTAGRAM:');
  console.log('Image:', imagePath);
  console.log('\nCaption:');
  console.log(caption);
  console.log('\nHashtags:');
  console.log(hashtags.map(t => '#' + t).join(' '));
  console.log('\n🔗 Link: luna-ritual-studio.com\n');

  // TODO: Actual Instagram API call will go here once authenticated
  // For now, return mock data
  return {
    id: 'mock_' + Date.now(),
    url: 'https://instagram.com/p/mock'
  };
}

// Update stats
function updateStats(product, post, engagement = 0) {
  // Update product stats
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
  const productIndex = products.findIndex(p => p.id === product.id);

  if (productIndex !== -1) {
    products[productIndex].last_posted = new Date().toISOString();
    products[productIndex].total_posts = (products[productIndex].total_posts || 0) + 1;
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  }

  // Update post stats
  const stats = JSON.parse(fs.readFileSync(STATS_FILE, 'utf-8'));
  stats.posts.push({
    id: post.id,
    product_id: product.id,
    platform: 'instagram',
    posted_at: new Date().toISOString(),
    engagement: engagement
  });
  stats.last_updated = new Date().toISOString();
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
}

// Main execution
async function main() {
  console.log('🚀 Starting Instagram Auto-Poster...\n');

  if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not set in environment');
    process.exit(1);
  }

  try {
    // Step 1: Select product
    console.log('1️⃣  Selecting random product...');
    const product = selectRandomProduct();
    console.log(`   ✅ Selected: ${product.name} (${product.category})`);

    // Step 2: Generate ad copy
    console.log('\n2️⃣  Generating ad copy with GPT-4...');
    const adContent = await generateAdCopy(product);
    console.log('   ✅ Ad copy generated');

    // Step 3: Generate image
    console.log('\n3️⃣  Generating image with DALL-E 3...');
    console.log(`   Prompt: ${adContent.image_prompt.substring(0, 80)}...`);
    const imagePath = await generateImage(adContent.image_prompt, product.id);
    console.log(`   ✅ Image saved: ${imagePath}`);

    // Step 4: Post to Instagram
    console.log('\n4️⃣  Posting to Instagram...');
    const post = await postToInstagram(imagePath, adContent.caption, adContent.hashtags);

    // Step 5: Update stats
    console.log('\n5️⃣  Updating stats...');
    updateStats(product, post);
    console.log('   ✅ Stats updated');

    console.log('\n✅ SUCCESS! Post created and ready!\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
