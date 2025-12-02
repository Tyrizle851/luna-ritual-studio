-- Create product_images table for storing generated image URLs
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  product_category TEXT NOT NULL,
  variation_type TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for fast lookups
CREATE INDEX idx_product_images_lookup ON public.product_images(product_id, product_category);

-- Enable RLS
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Public read access (images are public)
CREATE POLICY "Product images are publicly viewable"
ON public.product_images
FOR SELECT
USING (true);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Allow public read access to product images bucket
CREATE POLICY "Product images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-images');

-- Allow service role to insert images
CREATE POLICY "Service role can upload product images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'product-images');