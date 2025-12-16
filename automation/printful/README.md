# Printful Product Upload Automation

This directory contains scripts to automatically upload your affirmations to Printful as physical products (posters, notecards, mugs, etc.).

## 📋 What This Script Does

### **Step-by-Step Process:**

1. **Reads Your Affirmations**
   - Loads all affirmations from `src/data/affirmations.ts`
   - Filters based on your options (all, specific IDs, category, or test mode)

2. **Fetches Images**
   - Gets image URLs from your affirmations
   - Handles both Supabase URLs and local asset imports
   - Validates images are accessible

3. **Uploads to Printful**
   - Uploads each image to Printful's file storage
   - Creates product templates in Printful
   - Sets pricing based on your configuration
   - Creates product variants (different sizes)

4. **Creates Products**
   - Creates sync products in your Printful store
   - Links images to products
   - Sets retail prices
   - Makes products ready for sale

5. **Provides Summary**
   - Shows success/failure counts
   - Lists any errors
   - Provides Printful product IDs for reference

## 🚀 Quick Start

### **1. Setup Environment**

Add your Printful API key to `.env`:
```bash
PRINTFUL_API_KEY=your_api_key_here
```

### **2. Configure Products**

Edit `automation/printful/config.ts` to:
- Choose which product types to create (posters, notecards, mugs)
- Set your pricing
- Configure product sizes

### **3. Test Run (Recommended First)**

Test with 1-2 products:
```bash
npm run printful:upload -- --test
```

This will:
- Process only the first 2 affirmations
- Create products in Printful
- Let you review before bulk upload

### **4. Review in Printful**

1. Go to [Printful Dashboard](https://www.printful.com/dashboard)
2. Check "Store Products" section
3. Review the test products
4. Order samples if needed

### **5. Bulk Upload**

Once you're happy with the test:
```bash
npm run printful:upload -- --all
```

This uploads all 24 affirmations.

## 📖 Usage Examples

### **Upload All Affirmations**
```bash
npm run printful:upload -- --all
```

### **Test Mode (First 2 Only)**
```bash
npm run printful:upload -- --test
```

### **Specific Products**
```bash
npm run printful:upload -- --products aff-001,aff-002,aff-003
```

### **By Category**
```bash
npm run printful:upload -- --category Self-Love
```

## ⚙️ Configuration

### **Product Types**

Edit `config.ts` to enable/disable product types:

```typescript
export const CREATE_PRODUCTS = {
  poster_16x20: true,    // ✅ Create 16x20 posters
  poster_18x24: true,    // ✅ Create 18x24 posters
  poster_24x36: false,   // ❌ Skip 24x36
  notecards_5x7: false,  // ❌ Skip notecards
  mug_11oz: false,       // ❌ Skip mugs
};
```

### **Pricing**

Edit `config.ts` to set your prices:

```typescript
poster_16x20: {
  basePrice: 28.00,      // What customer pays
  printfulCost: 12.00,   // What Printful charges you
  profit: 16.00,         // Your profit
},
```

## 🔍 What Gets Created

For each affirmation, the script creates:

1. **File Upload**
   - Image uploaded to Printful's file storage
   - Gets a Printful file ID

2. **Product Template**
   - Product name: "{Affirmation Title} - Premium {Product Type}"
   - Description: Your affirmation description + product details
   - Thumbnail: The uploaded image

3. **Product Variant**
   - Size variant (16x20, 18x24, etc.)
   - Retail price (your configured price)
   - Image placement (centered, full coverage)

4. **Store Product**
   - Sync product in your Printful store
   - Ready to connect to your e-commerce platform
   - Can be ordered immediately

## 📊 Output

The script provides detailed logging:

```
🚀 Starting Printful product upload...

📋 Found 24 affirmation(s) to process
📦 Product types to create: poster_16x20, poster_18x24

📝 Processing: I am worthy of rest (poster_16x20)
📤 Uploading file: aff-001-poster_16x20-1234567890.png
✅ File uploaded: 12345
📦 Creating product: I am worthy of rest - Premium Poster 16x20
✅ Product created: 67890
✅ Successfully created: I am worthy of rest - Premium Poster 16x20 (ID: 67890)

============================================================
📊 UPLOAD SUMMARY
============================================================
✅ Successful: 48
❌ Failed: 0
📦 Total: 48

✨ Done!
```

## ⚠️ Important Notes

### **Image Requirements**

- Images must be publicly accessible (Supabase URLs work great)
- Minimum 300 DPI for print quality
- Recommended formats: PNG, JPG
- Maximum file size: 10MB

### **Rate Limiting**

- Script adds 1-second delay between requests
- Printful API has rate limits (generous, but be aware)
- If you hit limits, wait a few minutes and retry

### **Costs**

- **No upfront costs** - Printful only charges when orders are placed
- **Samples** - Order 1-2 samples to test quality (~$12-15 each)
- **API usage** - Free (no API fees)

### **Testing First**

**Always test with `--test` first!**
- Creates only 2 products
- Lets you review in Printful dashboard
- Verify pricing, images, descriptions
- Order samples before bulk upload

## 🐛 Troubleshooting

### **Error: PRINTFUL_API_KEY not found**
- Make sure `.env` file exists in project root
- Add `PRINTFUL_API_KEY=your_key_here`
- Restart the script

### **Error: Image URL not accessible**
- Images must be publicly accessible
- If using local assets, upload to Supabase first
- Or use a CDN/public hosting

### **Error: Printful API error (429)**
- Rate limit exceeded
- Wait 5-10 minutes and retry
- Script already has delays built in

### **Error: Invalid variant ID**
- Check `config.ts` for correct variant IDs
- Printful variant IDs may change - verify in Printful dashboard
- Update `PRINTFUL_VARIANTS` in config if needed

## 🔄 Updating Products

To update existing products:
1. Delete old products in Printful dashboard
2. Re-run the upload script
3. Or manually update in Printful dashboard

## 📝 Next Steps

After uploading:

1. **Review Products**
   - Check Printful dashboard
   - Verify all products created correctly
   - Check pricing and descriptions

2. **Order Samples**
   - Order 1-2 samples of each product type
   - Verify print quality
   - Check colors and sizing

3. **Connect to Store**
   - Connect Printful to your e-commerce platform
   - Add products to your store
   - Set up order fulfillment

4. **Test Checkout**
   - Place a test order
   - Verify order flows to Printful
   - Confirm fulfillment works

## 🆘 Support

If you encounter issues:
1. Check the error message
2. Review Printful API documentation
3. Verify your API key is correct
4. Check image URLs are accessible
5. Review configuration in `config.ts`

---

**Ready to start? Run: `npm run printful:upload -- --test`** 🚀




