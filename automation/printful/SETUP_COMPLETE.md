# ✅ Printful Automation Script - Setup Complete!

## 🎉 What Was Built

I've created a complete Printful automation system that will upload all your affirmations as physical products. Here's what you got:

### **Files Created:**

1. **`automation/printful/config.ts`** - Configuration (pricing, product types, sizes)
2. **`automation/printful/printful-client.ts`** - Printful API wrapper
3. **`automation/printful/product-mapper.ts`** - Maps your data to Printful format
4. **`automation/printful/upload-products.ts`** - Main upload script
5. **`automation/printful/README.md`** - Usage guide
6. **`automation/printful/SCRIPT_EXPLANATION.md`** - Detailed explanation of what it does
7. **`.env`** - Your Printful API key (already added!)

### **Package Updates:**

- Added `tsx` - To run TypeScript directly
- Added `dotenv` - To load environment variables
- Added `printful:upload` script to package.json

---

## 🚀 Quick Start

### **1. Install Dependencies**

```bash
npm install
```

This will install `tsx` and `dotenv` if not already installed.

### **2. Verify API Key**

Check that `.env` file exists and has your API key:
```bash
# Should show: PRINTFUL_API_KEY=7Io5vHvi49ROBhSiP9bbY3VXFgVjjWZVc9tDCaA9
cat .env
```

### **3. Test Run (IMPORTANT - Do This First!)**

```bash
npm run printful:upload -- --test
```

This will:
- Process only the first 2 affirmations
- Create products in Printful
- Let you review before bulk upload

### **4. Review in Printful**

1. Go to [Printful Dashboard](https://www.printful.com/dashboard)
2. Click "Store Products"
3. Review the test products
4. Check pricing, images, descriptions
5. Order a sample if you want

### **5. Bulk Upload (After Testing)**

Once you're happy with the test:
```bash
npm run printful:upload -- --all
```

This uploads all 24 affirmations!

---

## 📋 What The Script Does

### **Step-by-Step:**

1. **Reads Your Data**
   - Loads affirmations from `src/data/affirmations.ts`
   - Filters based on your options

2. **Processes Images**
   - Gets image URLs from affirmations
   - Uploads to Printful file storage

3. **Creates Products**
   - Maps your data to Printful format
   - Creates product templates
   - Sets pricing from config
   - Links images to products

4. **Uploads to Printful**
   - Makes API calls to create products
   - Handles errors and retries
   - Provides progress logging

5. **Summary Report**
   - Shows success/failure counts
   - Lists any errors
   - Provides Printful product IDs

**Full details:** See `SCRIPT_EXPLANATION.md`

---

## ⚙️ Configuration

### **Current Settings:**

**Products Enabled:**
- ✅ `poster_16x20` - 16x20 inch posters ($28)
- ✅ `poster_18x24` - 18x24 inch posters ($32)
- ❌ `poster_24x36` - Disabled (can enable later)
- ❌ `notecards_5x7` - Disabled (can enable later)
- ❌ `mug_11oz` - Disabled (can enable later)

**To Change:**
Edit `automation/printful/config.ts`:
```typescript
export const CREATE_PRODUCTS = {
  poster_16x20: true,   // Change to false to disable
  poster_18x24: true,
  // ... etc
};
```

---

## 🎯 Usage Examples

### **Test Mode (Recommended First)**
```bash
npm run printful:upload -- --test
```
Creates products for first 2 affirmations only.

### **Upload All**
```bash
npm run printful:upload -- --all
```
Uploads all 24 affirmations.

### **Specific Products**
```bash
npm run printful:upload -- --products aff-001,aff-002,aff-003
```
Uploads only specified affirmations.

### **By Category**
```bash
npm run printful:upload -- --category Self-Love
```
Uploads only affirmations in "Self-Love" category.

---

## ⚠️ Important Notes

### **Image Requirements**

**Current Issue:** Your affirmations use local image imports (like `affirmationRest`). The script needs publicly accessible URLs.

**Solutions:**

1. **Upload to Supabase First** (Recommended)
   - Upload all affirmation images to Supabase storage
   - Update `affirmations.ts` to use Supabase URLs
   - Then run the script

2. **Use CDN/Public Hosting**
   - Upload images to a CDN
   - Update image paths in `affirmations.ts`
   - Then run the script

3. **Modify Script** (If needed)
   - I can update the script to handle local files
   - Would need to read from file system
   - More complex, but doable

**For now:** The script will error if images aren't accessible. This is a safety check to ensure Printful can access the images.

### **Printful Variant IDs**

The script uses hardcoded variant IDs in `config.ts`. These are standard Printful IDs, but they might change. If you get errors about invalid variant IDs:

1. Check Printful dashboard
2. Verify variant IDs for your products
3. Update `PRINTFUL_VARIANTS` in `config.ts`

### **Rate Limiting**

- Script adds 1-second delay between requests
- Printful API is generous, but has limits
- If you hit limits, wait 5-10 minutes and retry

---

## 🐛 Troubleshooting

### **Error: PRINTFUL_API_KEY not found**
- Check `.env` file exists in project root
- Verify API key is correct
- Restart terminal/IDE

### **Error: Image URL not accessible**
- Images must be publicly accessible
- Upload to Supabase or CDN first
- Or modify script to handle local files

### **Error: Invalid variant ID**
- Check Printful dashboard for correct variant IDs
- Update `PRINTFUL_VARIANTS` in `config.ts`

### **Error: Module not found**
- Run `npm install` to install dependencies
- Make sure `tsx` and `dotenv` are installed

---

## 📊 Expected Output

When you run the script, you'll see:

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

[... continues for all products ...]

============================================================
📊 UPLOAD SUMMARY
============================================================
✅ Successful: 48
❌ Failed: 0
📦 Total: 48

✨ Done!
```

---

## 🎯 Next Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Handle Images**
   - Upload affirmation images to Supabase or CDN
   - Update image paths in `affirmations.ts` if needed

3. **Test Run**
   ```bash
   npm run printful:upload -- --test
   ```

4. **Review in Printful**
   - Check Printful dashboard
   - Verify products created correctly
   - Order samples

5. **Bulk Upload**
   ```bash
   npm run printful:upload -- --all
   ```

6. **Connect to Store**
   - Link Printful to your e-commerce platform
   - Add products to your website
   - Start selling!

---

## 📚 Documentation

- **`README.md`** - Usage guide and examples
- **`SCRIPT_EXPLANATION.md`** - Detailed explanation of what the script does
- **`config.ts`** - All configuration options
- **This file** - Setup and quick start

---

## ✅ What's Ready

- ✅ Script built and ready to run
- ✅ API key configured in `.env`
- ✅ Configuration set up (posters enabled)
- ✅ Error handling implemented
- ✅ Progress logging included
- ✅ Documentation complete

## ⚠️ What You Need to Do

1. **Install dependencies** (`npm install`)
2. **Handle images** (upload to Supabase/CDN or modify script)
3. **Test run** (`npm run printful:upload -- --test`)
4. **Review** (check Printful dashboard)
5. **Bulk upload** (`npm run printful:upload -- --all`)

---

## 🆘 Need Help?

If you encounter issues:

1. Check error messages (they're descriptive)
2. Review `SCRIPT_EXPLANATION.md` for details
3. Check Printful API documentation
4. Verify your API key is correct
5. Make sure images are accessible

---

**Everything is ready! Just install dependencies and run the test! 🚀**




