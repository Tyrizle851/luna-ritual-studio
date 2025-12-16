/**
 * Printful Automation Configuration
 * 
 * This file contains all configuration for the Printful product upload automation.
 * Modify these settings to customize product types, pricing, and sizes.
 */

export interface PrintfulProductConfig {
  // Product type ID from Printful (poster, notecard, mug, etc.)
  productId: number;
  // Product variant IDs for different sizes
  variantIds: {
    [size: string]: number;
  };
  // Your selling price (what customer pays)
  basePrice: number;
  // Printful's cost (what they charge you)
  printfulCost: number;
  // Your profit margin
  profit: number;
}

/**
 * Printful Product IDs (from Printful API)
 * These are the actual product IDs from Printful's catalog
 * Updated with real IDs from Printful API fetch
 */
export const PRINTFUL_PRODUCTS = {
  // Unframed Posters (18x24 - most popular size)
  POSTER_UNFRAMED_18X24: 1,      // Enhanced Matte Paper Poster
  
  // Canvas (18x24)
  CANVAS_18X24: 3,                // Canvas print
  
  // Framed Posters (18x24)
  POSTER_FRAMED_18X24: 2,        // Enhanced Matte Paper Framed Poster
} as const;

/**
 * Printful Variant IDs (size options)
 * These map to specific size variants within each product
 * Updated with real variant IDs from Printful API fetch
 */
export const PRINTFUL_VARIANTS = {
  // Unframed Poster 18x24
  'unframed_18x24': 1,           // Enhanced Matte Paper Poster 18″×24″
  
  // Canvas 18x24
  'canvas_18x24': 7,              // Canvas 18″×24″
  
  // Framed Poster 18x24
  'framed_18x24': 3,             // Enhanced Matte Paper Framed Poster (Black/18″×24″)
} as const;

/**
 * Product Configuration
 * Define which products to create and their pricing
 * Pricing includes 55% margin on total cost (product + shipping)
 */
export const PRODUCT_CONFIG: {
  [key: string]: PrintfulProductConfig;
} = {
  // Unframed Poster 18x24 - Entry level, most accessible
  poster_unframed_18x24: {
    productId: PRINTFUL_PRODUCTS.POSTER_UNFRAMED_18X24,
    variantIds: {
      '18x24': PRINTFUL_VARIANTS['unframed_18x24'],
    },
    basePrice: 43.07,      // Your selling price (includes shipping in margin calc)
    printfulCost: 12.89,    // Printful's product cost
    profit: 23.69,          // Your profit (after product + shipping costs)
  },
  
  // Canvas 18x24 - Premium mid-tier option
  poster_canvas_18x24: {
    productId: PRINTFUL_PRODUCTS.CANVAS_18X24,
    variantIds: {
      '18x24': PRINTFUL_VARIANTS['canvas_18x24'],
    },
    basePrice: 98.11,      // Your selling price
    printfulCost: 33.66,     // Printful's product cost
    profit: 53.96,          // Your profit
  },
  
  // Framed Poster 18x24 - Premium high-end option
  poster_framed_18x24: {
    productId: PRINTFUL_PRODUCTS.POSTER_FRAMED_18X24,
    variantIds: {
      '18x24': PRINTFUL_VARIANTS['framed_18x24'],
    },
    basePrice: 133.07,     // Your selling price
    printfulCost: 45.39,    // Printful's product cost
    profit: 73.19,         // Your profit
  },
};

/**
 * Which products to create for each affirmation
 * Set to true to create that product type
 * 
 * Premium strategy: All three tiers (unframed, canvas, framed) for maximum coverage
 */
export const CREATE_PRODUCTS = {
  poster_unframed_18x24: true,   // Entry level - $43.07
  poster_canvas_18x24: true,      // Premium mid-tier - $98.11
  poster_framed_18x24: true,      // Premium high-end - $133.07
};

/**
 * Printful API Settings
 */
export const PRINTFUL_API = {
  baseUrl: 'https://api.printful.com',
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second between retries
};

/**
 * Image Settings
 */
export const IMAGE_SETTINGS = {
  // Minimum DPI for print quality
  minDpi: 300,
  // Maximum file size (MB)
  maxFileSizeMB: 10,
  // Supported formats
  supportedFormats: ['jpg', 'jpeg', 'png'],
};

/**
 * Product Naming Template
 */
export const PRODUCT_NAMING = {
  // Template for product title
  titleTemplate: (affirmationTitle: string, productType: string) => {
    // Format product type for display
    let formattedType = productType;
    if (productType.includes('unframed')) {
      formattedType = 'Unframed Poster';
    } else if (productType.includes('canvas')) {
      formattedType = 'Canvas Print';
    } else if (productType.includes('framed')) {
      formattedType = 'Framed Poster';
    }
    return `${affirmationTitle} - Premium ${formattedType}`;
  },
  
  // Template for product description
  descriptionTemplate: (affirmationDescription: string, productType: string) => {
    let productDetails = '';
    if (productType.includes('unframed')) {
      productDetails = 'This premium unframed poster (18"×24") is printed on high-quality enhanced matte paper with vibrant, long-lasting colors. Perfect for framing yourself or displaying as-is.';
    } else if (productType.includes('canvas')) {
      productDetails = 'This premium canvas print (18"×24") features a vivid, fade-resistant print on 1.25" thick poly-cotton blend canvas, hand-stretched over solid wood stretcher bars. Mounting brackets included. Ready to hang.';
    } else if (productType.includes('framed')) {
      productDetails = 'This premium framed poster (18"×24") features enhanced matte paper in a sleek black frame. Ready to hang immediately—perfect for your home, office, or as a thoughtful gift.';
    }
    
    return `${affirmationDescription}\n\n${productDetails}\n\nPrinted on high-quality materials with vibrant, long-lasting colors.`;
  },
};

