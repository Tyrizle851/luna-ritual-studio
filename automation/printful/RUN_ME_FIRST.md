# Printful Setup - Quick Start

## Step 1: Get Printful Product IDs

The config file has placeholder product IDs. We need the real ones from Printful.

### Option A: Fetch from Printful API (Recommended)

Run this command to get the correct product IDs:

```bash
cd automation/printful
npx tsx fetch-printful-catalog.ts
```

This will show you the real product IDs for:
- Canvas (in) 18x24
- Enhanced Matte Paper Poster (in) 18x24
- Enhanced Matte Paper Framed Poster (in) 18x24

### Option B: Manual Lookup

1. Go to https://www.printful.com/docs/products
2. Search for each product type
3. Note the product IDs and variant IDs
4. Update `config.ts` with the real IDs

## Step 2: Test Upload (Important!)

Test with 2 affirmations first:

```bash
cd automation/printful
npx tsx upload-products.ts --test
```

This creates products for just aff-001 and aff-002 in Printful.

## Step 3: Check Printful Dashboard

1. Go to https://www.printful.com/dashboard
2. Click "Store Products"
3. Verify the 6 products (2 affirmations × 3 product types)
4. Check pricing, images, descriptions

## Step 4: Order Samples (Highly Recommended)

Order 1 sample of each product type to verify quality.

## Step 5: Bulk Upload

Once happy with test results:

```bash
npx tsx upload-products.ts --all
```

This uploads all 24 affirmations × 3 product types = 72 products total!

## Troubleshooting

**If you get product ID errors:**
- Run `fetch-printful-catalog.ts` to get correct IDs
- Update `config.ts` with the real IDs
- Try again

**If images fail to upload:**
- Make sure images are publicly accessible
- Check Supabase storage permissions
- Verify image URLs work in browser
