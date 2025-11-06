# N8N Workflow - Quick Start Guide
**Content Engine v3 - Pinterest Automation**

---

## 🚀 Test Your Workflow (5 Easy Steps)

### 1. Open N8N
Go to: https://lunastudios.app.n8n.cloud/workflow/C0Rzd37yUjTdCTMT

### 2. Find the Manual Trigger
- Look for the **"Manual Trigger"** node on the left side of the canvas
- It should be connected to the "Feature Flags" node

### 3. Execute the Workflow
- Click on the **"Manual Trigger"** node to select it
- Click the **"Execute Workflow"** button at the bottom of the screen
- Wait 10-30 seconds for execution to complete

### 4. Check Results
- Green checkmarks ✅ = Success
- Red X marks ❌ = Error (check the node for details)
- Look at the **"Dry Run Log"** node for the final output

### 5. Review Output
The workflow should:
- ✅ Fetch 16 products from GitHub
- ✅ Select a random product
- ✅ Find matching image (score 3-5)
- ✅ Generate marketing copy (if OpenAI key is valid)
- ✅ Show product ready for Pinterest posting

---

## ✅ What Should Happen

**Expected Output in "Dry Run Log" node:**
```json
{
  "product": {
    "id": "aff-001",
    "name": "I am worthy of rest",
    "category": "Affirmations",
    "price": 12
  },
  "final_image_url": "https://raw.githubusercontent.com/.../affirmation-rest.jpg",
  "title": "I am worthy of rest | LunaRituals",
  "description": "A gentle reminder that rest is not earned...",
  "hashtags": ["rest", "self-care", "boundaries"]
}
```

---

## ⚠️ If Something Goes Wrong

### OpenAI API Errors
**Error:** "Incorrect API key" or "Rate limit exceeded"
- The OpenAI API key needs to be updated in n8n credentials
- Workflow will still work with fallback copy and original images

### GitHub Errors
**Error:** "404 Not Found" or "API rate limit"
- Check that the repository is public
- GitHub rate limits reset every hour

### Image Not Found
**Error:** "No matching image found"
- Workflow will use default fallback image: product-candle-1.jpg
- This is expected behavior and not a critical error

---

## 📊 Understanding Execution Results

### Node Status Colors
- 🟢 **Green** = Node executed successfully
- 🔴 **Red** = Node failed (check error message)
- ⚪ **Gray** = Node not executed (conditional path)

### Common Nodes to Check
1. **Fetch Products** - Should show 16 products
2. **Select Product** - Shows the chosen product
3. **Resolve via GitHub** - Shows matched image and score
4. **Generate Copy** - Shows AI-generated marketing text
5. **Dry Run Log** - Final output for review

---

## 🔧 Workflow Settings

### Current Configuration
- **Schedule:** Every 8 hours (automated)
- **Mode:** Dry run (no actual posting)
- **Product Selection:** Random with 3-day cooldown
- **Image Enhancement:** DALL-E 3 (optional, fallback to original)

### To Change Settings
1. Click on "Feature Flags" node
2. Edit the code to change:
   - `dry_run: true/false` - Enable/disable actual posting
   - Other flags as needed

---

## 📈 Next Steps

### After Successful Test
1. ✅ Verify all nodes executed correctly
2. ✅ Review the generated copy and image
3. ✅ Test a few more times to see different products
4. ⚠️ Keep dry_run: true until you're ready to post for real

### When Ready to Go Live
1. Update Pinterest API credentials in n8n
2. Test with Pinterest posting enabled
3. Set dry_run: false in Feature Flags
4. Activate the Schedule Trigger
5. Monitor first few automated posts

---

## 📝 Testing Checklist

Before going live, test these scenarios:

- [ ] Manual execution works without errors
- [ ] Different products are selected randomly
- [ ] Images are matched correctly (score 3+)
- [ ] Marketing copy looks good
- [ ] Hashtags are relevant
- [ ] Dry run log shows complete data
- [ ] Workflow completes in under 60 seconds
- [ ] No OpenAI API errors (or fallbacks work)

---

## 🆘 Need Help?

### Check the Full Test Report
See: `automation/WORKFLOW_TEST_REPORT.md`

### Common Questions

**Q: Why is DALL-E not generating images?**
A: Check OpenAI API key and credits. Workflow will use original images as fallback.

**Q: Can I test without OpenAI API key?**
A: Yes! The workflow has fallback logic for copy and images.

**Q: How do I know which product will be selected?**
A: It's random, but products posted within last 3 days are excluded.

**Q: When will automated posting start?**
A: Only when you set dry_run: false and Pinterest credentials are configured.

---

## 🎯 Expected Performance

- **Execution Time:** 15-45 seconds
- **Success Rate:** 95%+ (with API keys configured)
- **Image Match Accuracy:** 100% for mapped products
- **Fallback Reliability:** 100% (always has default image)

---

**Last Updated:** 2025-11-06
**Workflow ID:** C0Rzd37yUjTdCTMT
**Version:** 3.0
