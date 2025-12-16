# What This Script Does - Detailed Explanation

## 🎯 Overview

This script automatically uploads your 24 affirmations to Printful as physical products (posters, notecards, mugs, etc.). It reads your data, uploads images, creates products, and sets pricing - all automatically.

---

## 📋 Step-by-Step Process

### **1. Initialization**
```
🚀 Starting Printful product upload...
```

**What happens:**
- Loads environment variables from `.env` file
- Validates Printful API key is present
- Parses command-line arguments (--all, --test, --products, etc.)
- Initializes Printful API client

**Files involved:**
- `upload-products.ts` - Main script entry point
- `.env` - Contains your Printful API key

---

### **2. Data Loading**
```
📋 Found 24 affirmation(s) to process
```

**What happens:**
- Reads all affirmations from `src/data/affirmations.ts`
- Filters based on your options:
  - `--all` → All 24 affirmations
  - `--test` → First 2 only (for testing)
  - `--products aff-001,aff-002` → Specific IDs
  - `--category Self-Love` → Filter by category

**Files involved:**
- `src/data/affirmations.ts` - Your affirmation data
- `upload-products.ts` - Filtering logic

**Data structure read:**
```typescript
{
  id: "aff-001",
  title: "I am worthy of rest",
  description: "...",
  price: 11.99,
  image: affirmationRest,  // Image import
  category: "Self-Love",
  tags: ["rest", "self-care"],
  // ... more fields
}
```

---

### **3. Configuration Loading**
```
📦 Product types to create: poster_16x20, poster_18x24
```

**What happens:**
- Reads `config.ts` to determine:
  - Which product types to create (posters, notecards, mugs)
  - Pricing for each product type
  - Printful product/variant IDs
  - Product naming templates

**Files involved:**
- `config.ts` - All configuration

**Configuration example:**
```typescript
CREATE_PRODUCTS = {
  poster_16x20: true,   // ✅ Create this
  poster_18x24: true,   // ✅ Create this
  poster_24x36: false,  // ❌ Skip this
}
```

---

### **4. Image Processing (For Each Affirmation)**
```
📝 Processing: I am worthy of rest (poster_16x20)
📤 Uploading file: aff-001-poster_16x20-1234567890.png
```

**What happens:**
- Gets image URL from affirmation data
- Handles two cases:
  1. **Supabase URL** (starts with `http`) → Use directly
  2. **Local import** (like `affirmationRest`) → Needs to be converted to URL
  
- **Current limitation**: Local image imports need to be publicly accessible
  - Solution: Upload local images to Supabase first, or use CDN
  - The script will throw an error if image isn't accessible

**Files involved:**
- `product-mapper.ts` - `getImageUrl()` function
- `printful-client.ts` - `uploadFile()` function

**Process:**
1. Extract image path/URL from affirmation
2. Validate image is accessible
3. Upload to Printful file storage
4. Get Printful file ID back

---

### **5. Product Mapping**
```
📦 Creating product: I am worthy of rest - Premium Poster 16x20
```

**What happens:**
- Maps your affirmation data to Printful's product format
- Creates product name: `"{Title} - Premium {Product Type}"`
- Creates description: `"{Your Description} + Product details"`
- Sets pricing from config
- Links uploaded image to product

**Files involved:**
- `product-mapper.ts` - `mapAffirmationToPrintful()` function

**Mapping example:**
```typescript
Your Data:
  title: "I am worthy of rest"
  description: "A gentle reminder..."
  price: 11.99

Becomes Printful Product:
  name: "I am worthy of rest - Premium Poster 16x20"
  description: "A gentle reminder...\n\nThis premium poster..."
  retail_price: "28.00"  // From config, not affirmation price
```

---

### **6. Product Creation in Printful**
```
✅ Product created: 67890
✅ Successfully created: I am worthy of rest - Premium Poster 16x20 (ID: 67890)
```

**What happens:**
- Makes API call to Printful: `POST /store/products`
- Sends product data:
  ```json
  {
    "sync_product": {
      "name": "I am worthy of rest - Premium Poster 16x20",
      "thumbnail": "https://..."
    },
    "sync_variants": [{
      "variant_id": 4011,  // 16x20 poster variant
      "retail_price": "28.00",
      "files": [{
        "type": "default",
        "url": "https://..."  // Uploaded image
      }]
    }]
  }
  ```
- Printful creates the product
- Returns Printful product ID

**Files involved:**
- `printful-client.ts` - `createProduct()` function
- Printful API: `https://api.printful.com/store/products`

**API Flow:**
1. Script → Printful API (with auth header)
2. Printful validates request
3. Printful creates product in your store
4. Printful returns product ID
5. Script logs success

---

### **7. Rate Limiting & Delays**
```
// 1 second delay between requests
```

**What happens:**
- After each product creation, waits 1 second
- Prevents hitting Printful's rate limits
- Ensures reliable uploads

**Why needed:**
- Printful API has rate limits
- Too many requests too fast = errors
- 1 second delay = safe, reliable uploads

---

### **8. Error Handling**
```
❌ Error: Image URL not accessible: ...
```

**What happens:**
- Each step wrapped in try/catch
- Errors logged with details
- Failed products don't stop the script
- Continues processing remaining products

**Error types handled:**
- Missing API key
- Invalid image URLs
- Printful API errors
- Network issues
- Invalid data

---

### **9. Summary Report**
```
============================================================
📊 UPLOAD SUMMARY
============================================================
✅ Successful: 48
❌ Failed: 0
📦 Total: 48
```

**What happens:**
- Counts successful vs failed uploads
- Lists any errors
- Provides Printful product IDs
- Shows what was created

**Output includes:**
- Total products processed
- Success count
- Failure count
- List of any errors
- Next steps reminder

---

## 🔄 Complete Flow Diagram

```
START
  ↓
Load .env (API key)
  ↓
Parse command args
  ↓
Load affirmations from src/data/affirmations.ts
  ↓
Filter affirmations (--all, --test, etc.)
  ↓
Load config (which products to create)
  ↓
FOR EACH affirmation:
  │
  ├─ FOR EACH product type (poster_16x20, etc.):
  │   │
  │   ├─ Get image URL
  │   ├─ Upload image to Printful → Get file ID
  │   ├─ Map affirmation to Printful format
  │   ├─ Create product in Printful → Get product ID
  │   ├─ Log success
  │   └─ Wait 1 second (rate limiting)
  │
  └─ Continue to next affirmation
  ↓
Generate summary report
  ↓
END
```

---

## 📦 What Gets Created in Printful

For each affirmation × product type combination:

### **1. File Upload**
- Image uploaded to Printful's file storage
- Gets a unique file ID
- Stored permanently in Printful

### **2. Sync Product**
- Product created in your Printful store
- Name: "{Affirmation Title} - Premium {Product Type}"
- Description: Your description + product details
- Thumbnail: The uploaded image

### **3. Product Variant**
- Size variant (16x20, 18x24, etc.)
- Retail price: Your configured price
- Image placement: Centered, full coverage
- Ready to print

### **4. Store Integration Ready**
- Product appears in Printful dashboard
- Can be connected to your e-commerce store
- Ready for customers to order
- Orders automatically fulfilled by Printful

---

## 💰 Pricing Flow

```
Your Config:
  basePrice: 28.00      (what customer pays)
  printfulCost: 12.00  (what Printful charges you)
  profit: 16.00        (your profit)

Printful Product:
  retail_price: "28.00"  (set in product)

When Customer Orders:
  Customer pays: $28.00
  Printful charges you: $12.00
  Your profit: $16.00
```

---

## 🔍 Example: Single Product Creation

**Input:**
```typescript
Affirmation: {
  id: "aff-001",
  title: "I am worthy of rest",
  description: "A gentle reminder...",
  image: affirmationRest  // Local import
}
Product Type: "poster_16x20"
```

**Process:**
1. Get image URL (from Supabase or convert local)
2. Upload to Printful → File ID: 12345
3. Create product request:
   ```json
   {
     "sync_product": {
       "name": "I am worthy of rest - Premium Poster 16x20",
       "thumbnail": "https://files.printful.com/12345"
     },
     "sync_variants": [{
       "variant_id": 4011,
       "retail_price": "28.00",
       "files": [{"type": "default", "url": "https://..."}]
     }]
   }
   ```
4. POST to Printful API
5. Get product ID: 67890
6. ✅ Success!

**Result:**
- Product in Printful dashboard
- Ready to sell
- Customer can order
- Printful fulfills automatically

---

## ⚙️ Configuration Impact

**What you can control:**

1. **Which products to create:**
   ```typescript
   CREATE_PRODUCTS = {
     poster_16x20: true,  // Creates this
     poster_18x24: false, // Skips this
   }
   ```

2. **Pricing:**
   ```typescript
   poster_16x20: {
     basePrice: 28.00,    // Change this
     printfulCost: 12.00, // Update if Printful changes
   }
   ```

3. **Product naming:**
   ```typescript
   titleTemplate: (title, type) => `${title} - Premium ${type}`
   ```

---

## 🎯 End Result

After running the script:

1. **In Printful Dashboard:**
   - All products visible in "Store Products"
   - Can review, edit, or delete
   - Can order samples
   - Ready to connect to store

2. **In Your Code:**
   - Products created in Printful
   - Can reference Printful product IDs
   - Can integrate with your store
   - Can start selling immediately

3. **For Customers:**
   - Products available to purchase
   - Orders automatically fulfilled
   - High-quality prints delivered
   - Zero inventory risk for you

---

## 🚀 Next Steps After Running

1. **Review in Printful** - Check all products created correctly
2. **Order Samples** - Test quality (1-2 of each type)
3. **Connect to Store** - Link Printful to your e-commerce platform
4. **Add to Website** - Display physical products on your site
5. **Start Selling** - Customers can now order physical products!

---

**That's exactly what the script does!** 🎉




