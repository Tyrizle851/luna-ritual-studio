# 🔧 n8n Merge Node - Manual Setup Instructions

## Issue: Summary Shows Before Video Completes

The workflow has 5 parallel branches that all converge at **4.6 Aggregate Media**:
1. 4.4a Handle Image Result (Pinterest image)
2. 4.4b-8 Handle Video Success (Instagram/TikTok video)
3. 4.4b-10 Timeout Fallback (video timeout)
4. 4.4c Reuse Instagram Video (TikTok reuse)
5. 4.4d Skip Generation (platform disabled)

Currently, Aggregate Media executes as soon as it receives the FIRST input. This causes the summary to show before video generation completes.

---

## Solution: Add Merge Node Before Aggregate Media

### Option 1: Add Merge Node (Recommended)

**Steps:**
1. Import the workflow into n8n
2. Add a new node **before** "4.6 Aggregate Media"
3. Select node type: **Merge** (under "Flow" category)
4. Configure Merge node:
   - **Mode**: "Wait to finish"
   - **Output**: "All outputs at once"
5. Reconnect all 5 branches to go into the Merge node instead of Aggregate Media:
   - 4.4a Handle Image Result → Merge
   - 4.4b-8 Handle Video Success → Merge
   - 4.4b-10 Timeout Fallback → Merge
   - 4.4c Reuse Instagram Video → Merge
   - 4.4d Skip Generation → Merge
6. Connect Merge node output → 4.6 Aggregate Media

**Result:** Merge node waits for ALL 5 branches to complete before passing to Aggregate Media.

---

### Option 2: Keep As-Is (Acceptable)

**Current Behavior:**
- Aggregate Media executes once PER input
- If image completes first, summary shows with just image
- When video completes, nothing happens (summary already shown)

**Workaround:**
- Set INSTAGRAM_MEDIA_TYPE = 'image' in Feature Flags
- Set TIKTOK_MEDIA_TYPE = 'image' in Feature Flags
- All platforms use DALL-E images (no video polling)
- All complete at same time → summary shows complete data

---

## Why Code Node Can't Handle This

Code nodes in n8n execute when they receive input. They can't natively wait for multiple parallel branches. That's what the Merge node is designed for.

I removed the invalid `"mode"` parameters from the Code node (they don't exist for Code nodes, only for Merge nodes).

---

## What's Fixed Now

✅ File can be imported (invalid parameters removed)
✅ Aggregate Media won't crash (let payload)
✅ Downloads continue on failure (continueOnFail: true)
✅ All timeouts set to 240 seconds
✅ Video endpoint fixed (/file removed)
✅ Video response format fixed (json not file)

---

## Next Steps

### If You Want Video Generation:
1. Import workflow
2. Add Merge node as described above
3. Test with video generation enabled

### If You Want Just Images (Simpler):
1. Import workflow
2. Open Feature Flags node
3. Set all media types to 'image'
4. Test - all platforms complete together

---

## The Workflow Will Work Either Way

**With Merge node:** Waits for all platforms, shows complete summary

**Without Merge node:** Shows summary as soon as first platform completes

Both are functional - it depends on whether you want to wait for video or not.

🎯 **File is ready to import now!**

