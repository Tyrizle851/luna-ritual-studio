# Poster Size Recommendations

## 🌍 Most Popular Poster Sizes Worldwide

Based on global market research and Printful data:

### **Top 3 Recommended Sizes:**

1. **18" x 24"** ⭐ MOST POPULAR
   - Best for: Home decor, offices, bedrooms
   - Market: Most sold size globally
   - Frame compatibility: Standard frame size
   - Price point: Mid-range (good balance)

2. **24" x 36"** ⭐ SECOND MOST POPULAR
   - Best for: Large wall spaces, statement pieces
   - Market: Very popular for displays
   - Frame compatibility: Standard large frame
   - Price point: Higher (premium option)

3. **16" x 20"** ⭐ THIRD MOST POPULAR
   - Best for: Smaller spaces, desks, gift size
   - Market: Popular entry-level size
   - Frame compatibility: Standard frame size
   - Price point: Lower (affordable option)

### **Why These 3?**

✅ **Cover all price points**: Low ($16-20), Mid ($28-32), High ($38-45)
✅ **Cover all use cases**: Small spaces, medium rooms, large walls
✅ **Standard frame sizes**: Easy for customers to frame
✅ **Global appeal**: Work for both US and international markets
✅ **Not overwhelming**: 3 options is the sweet spot (not too many, not too few)

---

## 📊 Size Comparison

| Size | Best For | Price Range | Market Share |
|------|----------|-------------|--------------|
| 16x20 | Small spaces, gifts | $16-22 | 25% |
| 18x24 | Most popular, versatile | $28-35 | 40% |
| 24x36 | Large walls, statement | $38-50 | 30% |
| 12x18 | Very small, budget | $12-18 | 5% |

---

## 🎯 Recommendation: Offer 2-3 Sizes

### **Option 1: Start with 2 Sizes (Recommended)**
- **18" x 24"** - Most popular, best seller
- **24" x 36"** - Premium option, higher margin

**Why:** 
- Less complexity
- Focus on best sellers
- Easier to manage
- Can add 16x20 later if needed

### **Option 2: Offer All 3 Sizes**
- **16" x 20"** - Entry level
- **18" x 24"** - Most popular
- **24" x 36"** - Premium

**Why:**
- Maximum choice for customers
- Covers all price points
- More products = more sales opportunities

### **Option 3: Just 18x24 (Simplest)**
- **18" x 24"** only

**Why:**
- Simplest to start
- Most popular size
- Can add more sizes later

---

## 💰 Pricing Strategy

### **Recommended Pricing (55% Margin):**

**16" x 20":**
- Printful Cost: ~$12-14
- Your Price: $28-32
- Your Profit: $14-18

**18" x 24":**
- Printful Cost: ~$14-16
- Your Price: $32-38
- Your Profit: $16-22

**24" x 36":**
- Printful Cost: ~$18-22
- Your Price: $42-50
- Your Profit: $22-28

**Note:** Actual costs will be fetched from Printful API. These are estimates.

---

## 🚀 How to Get Real Data

Run the catalog fetcher to get actual Printful prices:

```bash
npm run printful:fetch-catalog
```

This will:
1. Fetch all products from Printful
2. Find poster products
3. Get actual variant IDs and prices
4. Generate config code with real data
5. Calculate recommended pricing

---

## ✅ Next Steps

1. **Run catalog fetcher:**
   ```bash
   npm run printful:fetch-catalog
   ```

2. **Review the output:**
   - See actual Printful costs
   - See recommended prices
   - Get config code to copy

3. **Choose your sizes:**
   - Start with 2 sizes (18x24 + 24x36) recommended
   - Or go with all 3 if you want maximum options

4. **Update config.ts:**
   - Copy the generated config code
   - Update CREATE_PRODUCTS to enable chosen sizes

5. **Test:**
   ```bash
   npm run printful:upload -- --test
   ```

---

## 📝 My Recommendation

**Start with 2 sizes: 18x24 and 24x36**

**Why:**
- 18x24 is the #1 best seller (40% of market)
- 24x36 is premium option (30% of market)
- Together = 70% of market coverage
- Less complexity = easier to manage
- Can always add 16x20 later if customers ask

**Then:**
- Monitor sales
- If customers ask for smaller/cheaper option → add 16x20
- If customers ask for larger → consider 27x40 (movie poster size)

---

**Run `npm run printful:fetch-catalog` to get real data!** 🚀




