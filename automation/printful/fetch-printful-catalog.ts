#!/usr/bin/env node

/**
 * Printful Catalog Fetcher
 * 
 * Fetches actual product IDs, variant IDs, and pricing from Printful API.
 * This ensures we use real data instead of guessing.
 */

import dotenv from 'dotenv';
import { PrintfulClient } from './printful-client';

dotenv.config();

interface PrintfulCatalogProduct {
  id: number;
  name: string;
  type: string;
  variants: Array<{
    id: number;
    product_id: number;
    name: string;
    size: string;
    color: string;
    price: string;
    is_enabled: boolean;
  }>;
}

/**
 * Fetch all products from Printful catalog
 */
async function fetchAllProducts(apiKey: string): Promise<PrintfulCatalogProduct[]> {
  console.log('📡 Fetching Printful product catalog...\n');
  
  // Printful API endpoint to get all products
  const response = await fetch('https://api.printful.com/products', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}\n${errorText}`);
  }

  const data = await response.json();
  
  // Printful API returns { result: [...] }
  if (data.result && Array.isArray(data.result)) {
    return data.result;
  }
  
  // If structure is different, try to handle it
  if (Array.isArray(data)) {
    return data;
  }
  
  throw new Error('Unexpected API response format');
}

/**
 * Filter poster and canvas products
 */
function filterPosterProducts(products: PrintfulCatalogProduct[]): PrintfulCatalogProduct[] {
  return products.filter(p => {
    if (!p) return false;
    const type = (p.type || '').toUpperCase();
    const name = (p.name || '').toLowerCase();
    return type === 'POSTER' || 
           type === 'FRAMED-POSTER' ||
           type === 'CANVAS';
  });
}

/**
 * Find specific poster and canvas sizes
 */
function findPosterSizes(products: PrintfulCatalogProduct[]): {
  [size: string]: {
    unframed?: {
      productId: number;
      variantId: number;
      name: string;
      price: string;
      productName: string;
      shippingCost?: number;
    };
    framed?: {
      productId: number;
      variantId: number;
      name: string;
      price: string;
      productName: string;
      shippingCost?: number;
    };
    canvas?: {
      productId: number;
      variantId: number;
      name: string;
      price: string;
      productName: string;
      shippingCost?: number;
    };
  };
} {
  const sizes: { [size: string]: any } = {};
  
  // Target sizes we want (handle both formats: 16x20 and 16″×20″)
  const targetSizes = [
    { search: ['16x20', '16″×20″', '16"×20"'], name: '16x20' },
    { search: ['18x24', '18″×24″', '18"×24"'], name: '18x24' },
    { search: ['24x36', '24″×36″', '24"×36"'], name: '24x36' },
    { search: ['12x18', '12″×18″', '12"×18"'], name: '12x18' },
    { search: ['11x17', '11″×17″', '11"×17"'], name: '11x17' },
  ];

  for (const product of products) {
    if (!product.variants || !Array.isArray(product.variants)) continue;
    
    for (const variant of product.variants) {
      if (variant.is_enabled === false) continue;
      
      const variantName = (variant.name || '').toLowerCase();
      const variantSize = (variant.size || '').toLowerCase();
      const variantDimensions = (variant.dimensions || '').toLowerCase();
      
      for (const target of targetSizes) {
        const searches = Array.isArray(target.search) ? target.search : [target.search];
        let found = false;
        
        for (const search of searches) {
          const searchLower = search.toLowerCase();
          if (variantName.includes(searchLower) || 
              variantSize.includes(searchLower) ||
              variantSize.includes(search.replace('x', '×')) || // Handle × character
              variantDimensions.includes(searchLower)) {
            found = true;
            break;
          }
        }
        
        if (found) {
          const productName = (product as any).type_name || product.name || 'Unknown';
          const isFramed = productName.toLowerCase().includes('framed');
          const isCanvas = productName.toLowerCase().includes('canvas') || (product as any).type === 'CANVAS';
          
          // Initialize size object if needed
          if (!sizes[target.name]) {
            sizes[target.name] = {};
          }
          
          // Store by type (unframed, framed, or canvas)
          if (isCanvas) {
            if (!sizes[target.name].canvas) {
              sizes[target.name].canvas = {
                productId: product.id,
                variantId: variant.id,
                name: variant.name || 'Unknown',
                price: variant.price || '0',
                productName: productName,
              };
              console.log(`✅ Found ${target.name} CANVAS: ${variant.name || 'Unknown'} (Variant ID: ${variant.id}, Price: $${variant.price || '0'})`);
            }
          } else if (isFramed) {
            if (!sizes[target.name].framed) {
              sizes[target.name].framed = {
                productId: product.id,
                variantId: variant.id,
                name: variant.name || 'Unknown',
                price: variant.price || '0',
                productName: productName,
              };
              console.log(`✅ Found ${target.name} FRAMED: ${variant.name || 'Unknown'} (Variant ID: ${variant.id}, Price: $${variant.price || '0'})`);
            }
          } else {
            // Unframed poster - prefer cheapest
            if (!sizes[target.name].unframed) {
              sizes[target.name].unframed = {
                productId: product.id,
                variantId: variant.id,
                name: variant.name || 'Unknown',
                price: variant.price || '0',
                productName: productName,
              };
              console.log(`✅ Found ${target.name} UNFRAMED: ${variant.name || 'Unknown'} (Variant ID: ${variant.id}, Price: $${variant.price || '0'})`);
            } else {
              // Replace if cheaper
              const currentPrice = parseFloat(sizes[target.name].unframed.price || '0');
              const newPrice = parseFloat(variant.price || '0');
              if (newPrice < currentPrice) {
                sizes[target.name].unframed = {
                  productId: product.id,
                  variantId: variant.id,
                  name: variant.name || 'Unknown',
                  price: variant.price || '0',
                  productName: productName,
                };
                console.log(`✅ Updated ${target.name} UNFRAMED to cheaper option: $${variant.price || '0'}`);
              }
            }
          }
        }
      }
    }
  }

  return sizes;
}

/**
 * Fetch shipping cost for a variant
 */
async function fetchShippingCost(
  apiKey: string,
  variantId: number
): Promise<number> {
  try {
    // Use a standard US address for shipping estimate
    // Printful requires recipient address to calculate shipping
    const response = await fetch('https://api.printful.com/shipping/rates', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: {
          address1: '123 Main St',
          city: 'New York',
          state_code: 'NY',
          country_code: 'US',
          zip: '10001',
        },
        items: [
          {
            variant_id: variantId,
            quantity: 1,
          },
        ],
      }),
    });

    if (!response.ok) {
      // If API call fails, return estimated shipping based on product type
      return 0; // Will be handled below
    }

    const data = await response.json();
    
    if (data.result && data.result.length > 0) {
      // Get the standard shipping rate (usually the first or cheapest)
      const rates = data.result;
      // Find standard shipping (not express)
      const standardRate = rates.find((r: any) => 
        r.name?.toLowerCase().includes('standard') || 
        r.name?.toLowerCase().includes('economy')
      ) || rates[0];
      
      return parseFloat(standardRate.rate || '0');
    }
    
    return 0;
  } catch (error) {
    console.log(`⚠️  Could not fetch shipping for variant ${variantId}, using estimate`);
    return 0; // Will use estimate
  }
}

/**
 * Estimate shipping cost based on product type
 */
function estimateShippingCost(productType: 'unframed' | 'framed' | 'canvas', size: string): number {
  // Base estimates (will be replaced by actual API calls when possible)
  if (productType === 'unframed') {
    return 6.49; // Standard US shipping for posters
  } else if (productType === 'framed') {
    return 14.49; // Heavier, requires more protection
  } else if (productType === 'canvas') {
    return 10.49; // Medium weight, requires protection
  }
  return 8.00; // Default
}

/**
 * Calculate recommended pricing
 */
function calculatePricing(printfulCost: number, shippingCost: number = 0): {
  basePrice: number;
  profit: number;
  margin: number;
  totalCost: number;
} {
  const totalCost = printfulCost + shippingCost;
  
  // Target 50-60% margin (industry standard for POD)
  const targetMargin = 0.55; // 55% margin
  const basePrice = totalCost / (1 - targetMargin);
  
  return {
    basePrice: Math.round(basePrice * 100) / 100,
    profit: Math.round((basePrice - totalCost) * 100) / 100,
    margin: targetMargin * 100,
    totalCost: Math.round(totalCost * 100) / 100,
  };
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Fetching Printful Catalog for Poster Products\n');
  console.log('='.repeat(60));

  const apiKey = process.env.PRINTFUL_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: PRINTFUL_API_KEY not found in .env');
    process.exit(1);
  }

  try {
    // Fetch all products
    const allProducts = await fetchAllProducts(apiKey);
    console.log(`📦 Found ${allProducts.length} total products in Printful catalog\n`);

    // Debug: Check poster product structure
    const posterSample = allProducts.find(p => {
      const type = (p.type || '').toUpperCase();
      return type === 'POSTER' || type === 'FRAMED-POSTER';
    });
    
    if (posterSample) {
      console.log('\n🔍 Found poster product! Structure:');
      console.log(`   ID: ${posterSample.id}`);
      console.log(`   Type: ${posterSample.type}`);
      console.log(`   Name: ${posterSample.name}`);
      console.log(`   Has variants: ${!!posterSample.variants}`);
      console.log(`   Variants count: ${posterSample.variants?.length || 0}`);
      if (posterSample.variants && posterSample.variants.length > 0) {
        console.log(`   First variant: ${JSON.stringify(posterSample.variants[0]).substring(0, 200)}...`);
      }
      console.log('');
    }

    // Filter for posters and canvas
    const posterProducts = filterPosterProducts(allProducts);
    console.log(`🖼️  Found ${posterProducts.length} poster/canvas products\n`);

    // Fetch detailed product info with variants for poster and canvas products
    if (posterProducts.length > 0) {
      console.log('📡 Fetching variant details for poster and canvas products...\n');
      const detailedProducts: PrintfulCatalogProduct[] = [];
      
      for (const product of posterProducts.slice(0, 15)) { // Limit to first 15 to get more options
        try {
          const response = await fetch(`https://api.printful.com/products/${product.id}`, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.result) {
              // Printful returns { result: { product: {...}, variants: [...] } }
              const result = data.result;
              if (result.product && result.variants) {
                detailedProducts.push({
                  ...result.product,
                  variants: result.variants,
                });
              } else if (result.id) {
                // Sometimes it's just the product with variants
                detailedProducts.push(result);
              }
            }
          }
          
          // Small delay to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
          console.log(`⚠️  Error fetching product ${product.id}: ${error}`);
        }
      }
      
      // Use detailed products instead
      if (detailedProducts.length > 0) {
        console.log(`✅ Fetched details for ${detailedProducts.length} poster products\n`);
        
        // Debug: Show structure of first detailed product
        console.log('🔍 Sample detailed product structure:');
        const sample = detailedProducts[0];
        console.log(JSON.stringify(sample, null, 2).substring(0, 800) + '...\n');
        
        // Replace posterProducts with detailed ones
        posterProducts.length = 0;
        posterProducts.push(...detailedProducts);
      }
    }

    if (posterProducts.length === 0) {
      console.log('⚠️  No poster products found. Listing all product types:');
      const types = [...new Set(allProducts.map(p => p.type))];
      types.forEach(type => console.log(`   - ${type}`));
      return;
    }

    // Find specific sizes
    console.log('\n📏 Searching for specific poster sizes...\n');
    const sizes = findPosterSizes(posterProducts);

    // Fetch shipping costs for each variant
    console.log('\n🚚 Fetching shipping costs from Printful API...\n');
    const shippingPromises: Array<Promise<void>> = [];
    
    for (const [size, data] of Object.entries(sizes)) {
      if (data.unframed) {
        shippingPromises.push(
          fetchShippingCost(apiKey, data.unframed.variantId).then(cost => {
            if (cost > 0) {
              data.unframed.shippingCost = cost;
            } else {
              data.unframed.shippingCost = estimateShippingCost('unframed', size);
            }
          })
        );
      }
      if (data.framed) {
        shippingPromises.push(
          fetchShippingCost(apiKey, data.framed.variantId).then(cost => {
            if (cost > 0) {
              data.framed.shippingCost = cost;
            } else {
              data.framed.shippingCost = estimateShippingCost('framed', size);
            }
          })
        );
      }
      if (data.canvas) {
        shippingPromises.push(
          fetchShippingCost(apiKey, data.canvas.variantId).then(cost => {
            if (cost > 0) {
              data.canvas.shippingCost = cost;
            } else {
              data.canvas.shippingCost = estimateShippingCost('canvas', size);
            }
          })
        );
      }
    }
    
    await Promise.all(shippingPromises);
    console.log('✅ Shipping costs fetched\n');

    if (Object.keys(sizes).length === 0) {
      console.log('⚠️  No matching sizes found. Available poster variants:');
      posterProducts.forEach(product => {
        const productName = (product as any).type_name || product.name || `Product ${product.id}`;
        console.log(`\n   Product: ${productName} (ID: ${product.id})`);
        if (product.variants && Array.isArray(product.variants)) {
          product.variants.forEach((v: any) => {
            if (v.is_enabled !== false) {
              console.log(`     - ${v.name || 'Unknown'} (Variant ID: ${v.id}, Size: ${v.size || 'N/A'}, Dimensions: ${v.dimensions || 'N/A'}, Price: $${v.price || 'N/A'})`);
            }
          });
        } else {
          console.log(`     (No variants found)`);
        }
      });
      return;
    }

    // Display results - comprehensive breakdown
    console.log('\n' + '='.repeat(70));
    console.log('📊 COMPLETE PRODUCT BREAKDOWN: UNFRAMED vs FRAMED vs CANVAS');
    console.log('='.repeat(70) + '\n');

    const recommendations: Array<{
      size: string;
      type: 'unframed' | 'framed' | 'canvas';
      productId: number;
      variantId: number;
      printfulCost: number;
      shippingCost: number;
      totalCost: number;
      recommendedPrice: number;
      profit: number;
      margin: number;
      productName: string;
    }> = [];

    // Process all sizes and types
    for (const [size, data] of Object.entries(sizes)) {
      // Unframed
      if (data.unframed) {
        const printfulCost = parseFloat(data.unframed.price);
        const shippingCost = data.unframed.shippingCost || estimateShippingCost('unframed', size);
        const pricing = calculatePricing(printfulCost, shippingCost);
        recommendations.push({
          size,
          type: 'unframed',
          productId: data.unframed.productId,
          variantId: data.unframed.variantId,
          printfulCost,
          shippingCost,
          totalCost: pricing.totalCost,
          recommendedPrice: pricing.basePrice,
          profit: pricing.profit,
          margin: pricing.margin,
          productName: data.unframed.productName,
        });
      }
      
      // Framed
      if (data.framed) {
        const printfulCost = parseFloat(data.framed.price);
        const shippingCost = data.framed.shippingCost || estimateShippingCost('framed', size);
        const pricing = calculatePricing(printfulCost, shippingCost);
        recommendations.push({
          size,
          type: 'framed',
          productId: data.framed.productId,
          variantId: data.framed.variantId,
          printfulCost,
          shippingCost,
          totalCost: pricing.totalCost,
          recommendedPrice: pricing.basePrice,
          profit: pricing.profit,
          margin: pricing.margin,
          productName: data.framed.productName,
        });
      }
      
      // Canvas
      if (data.canvas) {
        const printfulCost = parseFloat(data.canvas.price);
        const shippingCost = data.canvas.shippingCost || estimateShippingCost('canvas', size);
        const pricing = calculatePricing(printfulCost, shippingCost);
        recommendations.push({
          size,
          type: 'canvas',
          productId: data.canvas.productId,
          variantId: data.canvas.variantId,
          printfulCost,
          shippingCost,
          totalCost: pricing.totalCost,
          recommendedPrice: pricing.basePrice,
          profit: pricing.profit,
          margin: pricing.margin,
          productName: data.canvas.productName,
        });
      }
    }

    // Group by size and display comparison
    const sizeGroups: { [size: string]: typeof recommendations } = {};
    recommendations.forEach(rec => {
      if (!sizeGroups[rec.size]) {
        sizeGroups[rec.size] = [];
      }
      sizeGroups[rec.size].push(rec);
    });

    // Display comparison table
    for (const [size, options] of Object.entries(sizeGroups)) {
      console.log(`\n📐 ${size} SIZE COMPARISON:`);
      console.log('-'.repeat(70));
      
      options.forEach(opt => {
        const typeLabel = opt.type.toUpperCase().padEnd(10);
        console.log(`   ${typeLabel} | Product Cost: $${opt.printfulCost.toFixed(2).padStart(6)} | Shipping: $${opt.shippingCost.toFixed(2).padStart(5)} | Total Cost: $${opt.totalCost.toFixed(2).padStart(6)}`);
        console.log(`            | Your Price: $${opt.recommendedPrice.toFixed(2).padStart(6)} | Your Profit: $${opt.profit.toFixed(2).padStart(6)} (${opt.margin.toFixed(1)}%)`);
        console.log(`            | Product: ${opt.productName.substring(0, 50)}`);
        console.log(`            | Variant ID: ${opt.variantId}`);
      });
    }

    // Summary table
    console.log('\n' + '='.repeat(90));
    console.log('💰 COMPLETE PRICING SUMMARY (WITH SHIPPING)');
    console.log('='.repeat(90));
    console.log('\nSize    | Type      | Your Price | Product Cost | Shipping | Total Cost | Your Profit | Margin');
    console.log('-'.repeat(90));
    
    recommendations.sort((a, b) => {
      const sizeOrder = ['12x18', '16x20', '18x24', '24x36'];
      const typeOrder = ['unframed', 'framed', 'canvas'];
      const sizeDiff = (sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size));
      if (sizeDiff !== 0) return sizeDiff;
      return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
    });
    
    recommendations.forEach(rec => {
      console.log(
        `${rec.size.padEnd(7)} | ${rec.type.padEnd(9)} | $${rec.recommendedPrice.toFixed(2).padStart(8)} | $${rec.printfulCost.toFixed(2).padStart(10)} | $${rec.shippingCost.toFixed(2).padStart(6)} | $${rec.totalCost.toFixed(2).padStart(9)} | $${rec.profit.toFixed(2).padStart(10)} | ${rec.margin.toFixed(1)}%`
      );
    });

    // Generate config code
    console.log('\n' + '='.repeat(70));
    console.log('📋 CONFIG CODE TO COPY:');
    console.log('='.repeat(70) + '\n');

    console.log('// Update these in automation/printful/config.ts\n');
    console.log('// UNFRAMED POSTERS:');
    console.log('export const PRINTFUL_PRODUCTS_UNFRAMED = {');
    const unframedRecs = recommendations.filter(r => r.type === 'unframed');
    unframedRecs.forEach(rec => {
      console.log(`  POSTER_${rec.size.toUpperCase().replace('X', 'X')}: ${rec.productId},`);
    });
    console.log('} as const;\n');

    console.log('export const PRINTFUL_VARIANTS_UNFRAMED = {');
    unframedRecs.forEach(rec => {
      console.log(`  '${rec.size}': ${rec.variantId},`);
    });
    console.log('} as const;\n');

    console.log('// FRAMED POSTERS:');
    console.log('export const PRINTFUL_PRODUCTS_FRAMED = {');
    const framedRecs = recommendations.filter(r => r.type === 'framed');
    framedRecs.forEach(rec => {
      console.log(`  POSTER_${rec.size.toUpperCase().replace('X', 'X')}: ${rec.productId},`);
    });
    console.log('} as const;\n');

    console.log('export const PRINTFUL_VARIANTS_FRAMED = {');
    framedRecs.forEach(rec => {
      console.log(`  '${rec.size}': ${rec.variantId},`);
    });
    console.log('} as const;\n');

    console.log('// CANVAS:');
    console.log('export const PRINTFUL_PRODUCTS_CANVAS = {');
    const canvasRecs = recommendations.filter(r => r.type === 'canvas');
    canvasRecs.forEach(rec => {
      console.log(`  CANVAS_${rec.size.toUpperCase().replace('X', 'X')}: ${rec.productId},`);
    });
    console.log('} as const;\n');

    console.log('export const PRINTFUL_VARIANTS_CANVAS = {');
    canvasRecs.forEach(rec => {
      console.log(`  '${rec.size}': ${rec.variantId},`);
    });
    console.log('} as const;\n');

    // Recommendations
    console.log('\n' + '='.repeat(70));
    console.log('💡 STRATEGIC RECOMMENDATIONS:');
    console.log('='.repeat(70) + '\n');

    // Best options by type
    const unframedBest = unframedRecs.filter(r => ['18x24', '24x36', '16x20'].includes(r.size));
    const framedBest = framedRecs.filter(r => ['18x24', '24x36', '16x20'].includes(r.size));
    const canvasBest = canvasRecs.filter(r => ['18x24', '24x36', '16x20'].includes(r.size));

    console.log('🎯 RECOMMENDED STRATEGY:\n');
    
    console.log('OPTION 1: Start with Unframed Only (Recommended)');
    console.log('   - Most accessible pricing (includes shipping)');
    console.log('   - Highest volume potential');
    console.log('   - Lower risk');
    console.log('   Best sizes:');
    unframedBest.forEach(rec => {
      console.log(`     • ${rec.size}: $${rec.recommendedPrice.toFixed(2)} total (product $${rec.printfulCost.toFixed(2)} + shipping $${rec.shippingCost.toFixed(2)} = $${rec.totalCost.toFixed(2)} cost, profit $${rec.profit.toFixed(2)})`);
    });

    console.log('\nOPTION 2: Offer Both Unframed + Canvas');
    console.log('   - Unframed: Entry level (lower total cost)');
    console.log('   - Canvas: Premium upgrade (higher profit)');
    console.log('   - Captures both market segments');
    console.log('   Best sizes:');
    unframedBest.forEach(rec => {
      const canvas = canvasBest.find(c => c.size === rec.size);
      console.log(`     • ${rec.size}:`);
      console.log(`       - Unframed: $${rec.recommendedPrice.toFixed(2)} (cost $${rec.totalCost.toFixed(2)}, profit $${rec.profit.toFixed(2)})`);
      if (canvas) {
        console.log(`       - Canvas: $${canvas.recommendedPrice.toFixed(2)} (cost $${canvas.totalCost.toFixed(2)}, profit $${canvas.profit.toFixed(2)})`);
      }
    });

    console.log('\nOPTION 3: Offer All Three Tiers');
    console.log('   - Unframed: Entry level');
    console.log('   - Canvas: Mid-tier premium');
    console.log('   - Framed: Highest-end option');
    console.log('   Best sizes:');
    unframedBest.forEach(rec => {
      const canvas = canvasBest.find(c => c.size === rec.size);
      const framed = framedBest.find(f => f.size === rec.size);
      console.log(`     • ${rec.size}:`);
      console.log(`       - Unframed: $${rec.recommendedPrice.toFixed(2)} (profit $${rec.profit.toFixed(2)})`);
      if (canvas) {
        console.log(`       - Canvas: $${canvas.recommendedPrice.toFixed(2)} (profit $${canvas.profit.toFixed(2)})`);
      }
      if (framed) {
        console.log(`       - Framed: $${framed.recommendedPrice.toFixed(2)} (profit $${framed.profit.toFixed(2)})`);
      }
    });

    console.log('\n✅ Copy the config code above and update automation/printful/config.ts');
    console.log('✅ Choose your strategy and enable the products you want\n');

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();

