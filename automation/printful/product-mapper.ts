/**
 * Product Mapper
 * 
 * Maps your affirmation data structure to Printful's product format.
 * Handles image fetching, product naming, and variant creation.
 */

import type { Affirmation } from '../../../src/data/affirmations';
import { PRODUCT_CONFIG, CREATE_PRODUCTS, PRODUCT_NAMING } from './config';
import { PrintfulClient, CreateProductRequest } from './printful-client';

export interface MappedProduct {
  affirmation: Affirmation;
  productType: string;
  config: typeof PRODUCT_CONFIG[string];
  printfulProductId?: number; // Set after creation
}

/**
 * Fetch image URL from affirmation
 * Handles both local imports and Supabase URLs
 */
async function getImageUrl(affirmation: Affirmation): Promise<string> {
  // If image is a string URL (Supabase), use it directly
  if (typeof affirmation.image === 'string' && affirmation.image.startsWith('http')) {
    return affirmation.image;
  }
  
  // If image is a local import, we need to handle it differently
  // For now, we'll assume images are accessible via public URLs
  // You may need to upload local images to Supabase first, or serve them publicly
  
  // Try to construct a public URL
  // This assumes your images are in a public folder or CDN
  const imagePath = affirmation.image;
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Otherwise, construct URL (adjust based on your setup)
  // For Vite, local assets are typically in /src/assets
  // You might need to upload these to Supabase or a CDN first
  throw new Error(
    `Image URL not accessible: ${imagePath}. ` +
    `Please ensure images are hosted publicly (Supabase, CDN, etc.)`
  );
}

/**
 * Map affirmation to Printful product request
 */
export async function mapAffirmationToPrintful(
  affirmation: Affirmation,
  productType: string,
  printfulClient: PrintfulClient
): Promise<CreateProductRequest> {
  const config = PRODUCT_CONFIG[productType];
  if (!config) {
    throw new Error(`Unknown product type: ${productType}`);
  }

  // Get image URL
  const imageUrl = await getImageUrl(affirmation);
  
  // Upload image to Printful
  const filename = `${affirmation.id}-${productType}-${Date.now()}.png`;
  const printfulFile = await printfulClient.uploadFile(imageUrl, filename);

  // Create product name with proper formatting
  const productTypeLabel = productType
    .replace('poster_', '')
    .replace('_', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const productName = PRODUCT_NAMING.titleTemplate(
    affirmation.title,
    productTypeLabel
  );

  // Create product description with proper formatting
  const productTypeDescription = productType
    .replace('poster_', '')
    .replace('_', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const productDescription = PRODUCT_NAMING.descriptionTemplate(
    affirmation.description,
    productTypeDescription
  );

  // Get variant ID (first variant from config)
  const variantId = Object.values(config.variantIds)[0];

  // Create sync product request
  const request: CreateProductRequest = {
    sync_product: {
      name: productName,
      thumbnail: printfulFile.url,
    },
    sync_variants: [
      {
        variant_id: variantId,
        retail_price: config.basePrice.toFixed(2),
        files: [
          {
            type: 'default',
            url: printfulFile.url,
          },
        ],
      },
    ],
  };

  return request;
}

/**
 * Get all product types to create for an affirmation
 */
export function getProductTypesToCreate(): string[] {
  return Object.entries(CREATE_PRODUCTS)
    .filter(([_, shouldCreate]) => shouldCreate)
    .map(([productType, _]) => productType);
}

/**
 * Validate affirmation data before processing
 */
export function validateAffirmation(affirmation: Affirmation): void {
  if (!affirmation.id) {
    throw new Error('Affirmation missing ID');
  }
  if (!affirmation.title) {
    throw new Error(`Affirmation ${affirmation.id} missing title`);
  }
  if (!affirmation.image) {
    throw new Error(`Affirmation ${affirmation.id} missing image`);
  }
  if (!affirmation.description) {
    throw new Error(`Affirmation ${affirmation.id} missing description`);
  }
}

