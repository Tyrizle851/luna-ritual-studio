# Image Upscaling Guide - Print Ready

Your current images are too small for 18x24" print. You need **5400 × 7200 pixels** at 300 DPI.

---

## Two Options:

### Option A: Local Upscaler (FREE, Best Quality) ⭐

**Pros:**
- ✅ Free forever
- ✅ Best quality (no compression)
- ✅ Fast after setup
- ✅ No color drift
- ✅ Industry standard

**Cons:**
- ⚠️ Requires one-time install (~5 minutes)

**Setup:**

1. **Download Real-ESRGAN:**
   - Go to: https://github.com/xinntao/Real-ESRGAN/releases
   - Download: `realesrgan-ncnn-vulkan-20220424-windows.zip`
   - Extract to: `C:\realesrgan\`

2. **(Optional) Install ImageMagick for auto-resize:**
   - Go to: https://imagemagick.org/script/download.php#windows
   - Download and install

3. **Run the script:**
   ```powershell
   cd automation/printful
   .\upscale-images.ps1
   ```

**Output:** All 24 images upscaled to `src/assets/print-ready/`

---

### Option B: Cloud API (Replicate) ☁️

**Pros:**
- ✅ Zero installation
- ✅ Works immediately
- ✅ High quality

**Cons:**
- 💰 Costs ~$0.50 total (~$0.02 per image × 24)
- ⏱️ Slower (API calls)

**Setup:**

1. **Get Replicate API key:**
   - Go to: https://replicate.com
   - Sign up (free trial available)
   - Get API token

2. **Add to `.env`:**
   ```
   REPLICATE_API_TOKEN=your_token_here
   ```

3. **Install dependencies:**
   ```bash
   npm install replicate
   ```

4. **Run the script:**
   ```bash
   npx tsx automation/printful/upscale-replicate.ts
   ```

**Output:** All 24 images upscaled to `src/assets/print-ready/`

---

## What Happens:

1. ✅ Reads all 24 `affirmation-digital-aff-*.png` images
2. ✅ Upscales 4× using AI (Real-ESRGAN)
3. ✅ Resizes to exactly 5400 × 7200 pixels
4. ✅ Saves as `print-aff-001.png`, `print-aff-002.png`, etc.
5. ✅ Ready to upload to Printful!

---

## After Upscaling:

Run the upload script to push to Printful:

```bash
# Create JSON with all 24 affirmations
# Then run upload
npx tsx automation/printful/test-upload.ts
```

---

## My Recommendation:

**Use Option A (Local)** if:
- You'll do this more than once
- You want best quality
- You're okay with a 5-minute setup

**Use Option B (Cloud)** if:
- You want it done NOW
- You don't mind $0.50
- You don't want to install anything

---

## Image Requirements Recap:

| Product | Size | Required Resolution |
|---------|------|---------------------|
| 18×24" Poster | 5400 × 7200 px | 300 DPI |
| 18×24" Canvas | 5400 × 7200 px | 300 DPI |
| 18×24" Framed | 5400 × 7200 px | 300 DPI |

**Your current images:** 443 × 523 px (aff-001), 1324 × 1645 px (aff-002)
**After upscaling:** 5400 × 7200 px ✅

---

**Questions? Just ask!**
