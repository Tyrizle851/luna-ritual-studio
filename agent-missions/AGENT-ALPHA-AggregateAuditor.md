# 🎯 AGENT ALPHA - Aggregate Media Auditor

## Mission ID: ALPHA-005
**Status:** ACTIVE  
**Browser:** Shared Session (n8n workflow tab)

---

## PRIMARY OBJECTIVE
Audit final aggregated media output to confirm all platforms have correct media URLs and sources.

## SPECIFIC TASKS

1. **Navigate to Aggregate Node**
   - In the open n8n browser tab
   - Click on node `4.6 Aggregate Media`
   - Expand output panel

2. **Inspect Final Media Object**
   - Check for all 3 platform media objects:
     - pinterest_media: {type, source, url, status, error}
     - instagram_media: {type, source, url, status, error}
     - tiktok_media: {type, source, url, status, error}

3. **Verify Each Platform**
   - Pinterest: Should have image URL (dalle3 or github_fallback)
   - Instagram: Should have video URL (sora) or fallback to image
   - TikTok: Should reuse Instagram video URL or have its own

4. **Check Payload**
   - Verify payload.pinterest/instagram/tiktok objects present
   - Check diagnostics are included

5. **Report Format**
```json
{
  "agent": "ALPHA",
  "mission": "Aggregate Media Audit",
  "status": "completed",
  "findings": {
    "pinterest_media": {
      "type": "image",
      "source": "dalle3/github_fallback",
      "url": "https://...",
      "status": "success/failed/pending"
    },
    "instagram_media": {
      "type": "video/image",
      "source": "sora/fallback_github",
      "url": "https://... or null",
      "status": "success/failed/pending",
      "fallback_used": true/false
    },
    "tiktok_media": {
      "type": "video/image",
      "source": "reuse_instagram/sora/fallback",
      "url": "https://... or null",
      "status": "success/failed/pending",
      "reused_instagram": true/false
    },
    "payload_complete": true/false
  },
  "screenshot": "alpha-aggregate.png"
}
```

## SUCCESS CRITERIA
- ✅ All 3 platform media objects inspected
- ✅ URLs and sources verified
- ✅ Fallback logic confirmed
- ✅ Screenshot captured
- ✅ Report submitted

## COORDINATION
- Works independently
- This is the FINAL output before summary
- Reports to: Mission Control (main chat)
- Time estimate: 45 seconds

