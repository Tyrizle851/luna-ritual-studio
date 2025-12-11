/**
 * Printful API Client
 * 
 * Handles all communication with Printful's REST API.
 * Provides methods for uploading files, creating products, and managing variants.
 */

import { PRINTFUL_API } from './config';

export interface PrintfulFile {
  id: number;
  type: string;
  url: string;
  filename: string;
}

export interface PrintfulProduct {
  id: number;
  name: string;
  type: string;
  description: string;
}

export interface PrintfulVariant {
  id: number;
  product_id: number;
  name: string;
  size: string;
  color: string;
}

export interface CreateProductRequest {
  sync_product: {
    name: string;
    thumbnail?: string;
  };
  sync_variants: Array<{
    variant_id: number;
    retail_price: string;
    files: Array<{
      type: string;
      url: string;
    }>;
  }>;
}

export class PrintfulClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = PRINTFUL_API.baseUrl;
  }

  /**
   * Make an authenticated request to Printful API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Printful API error (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    return data.result as T;
  }

  /**
   * Upload a file to Printful
   * @param imageUrl - URL of the image to upload
   * @param filename - Name for the file in Printful
   */
  async uploadFile(imageUrl: string, filename: string): Promise<PrintfulFile> {
    console.log(`📤 Uploading file: ${filename} from ${imageUrl}`);
    
    // Printful requires us to provide a URL, not upload directly
    // So we'll use the "add file by URL" endpoint
    const response = await this.request<PrintfulFile>('/files', {
      method: 'POST',
      body: JSON.stringify({
        type: 'default',
        url: imageUrl,
        filename: filename,
      }),
    });

    console.log(`✅ File uploaded: ${response.id}`);
    return response;
  }

  /**
   * Create a sync product in Printful
   * @param productData - Product information
   */
  async createProduct(productData: CreateProductRequest): Promise<PrintfulProduct> {
    console.log(`📦 Creating product: ${productData.sync_product.name}`);
    
    const response = await this.request<PrintfulProduct>('/store/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });

    console.log(`✅ Product created: ${response.id}`);
    return response;
  }

  /**
   * Get product information
   * @param productId - Printful product ID
   */
  async getProduct(productId: number): Promise<PrintfulProduct> {
    return this.request<PrintfulProduct>(`/products/${productId}`);
  }

  /**
   * Get variant information
   * @param variantId - Printful variant ID
   */
  async getVariant(variantId: number): Promise<PrintfulVariant> {
    return this.request<PrintfulVariant>(`/products/variant/${variantId}`);
  }

  /**
   * List all store products
   */
  async listProducts(): Promise<PrintfulProduct[]> {
    const response = await this.request<{ items: PrintfulProduct[] }>('/store/products');
    return response.items || [];
  }

  /**
   * Delete a product
   * @param productId - Printful store product ID
   */
  async deleteProduct(productId: number): Promise<void> {
    console.log(`🗑️  Deleting product: ${productId}`);
    await this.request(`/store/products/${productId}`, {
      method: 'DELETE',
    });
    console.log(`✅ Product deleted: ${productId}`);
  }

  /**
   * Update product retail price
   * @param storeProductId - Store product ID
   * @param variantId - Variant ID
   * @param retailPrice - New retail price
   */
  async updateVariantPrice(
    storeProductId: number,
    variantId: number,
    retailPrice: string
  ): Promise<void> {
    await this.request(`/store/products/${storeProductId}/variants/${variantId}`, {
      method: 'PUT',
      body: JSON.stringify({
        retail_price: retailPrice,
      }),
    });
  }
}




