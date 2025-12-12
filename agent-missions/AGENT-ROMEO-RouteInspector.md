# 🎯 AGENT ROMEO - Media Route Inspector

## Mission ID: ROMEO-004
**Status:** ACTIVE  
**Browser:** Shared Session (n8n workflow tab)

---

## PRIMARY OBJECTIVE
Verify media routing logic correctly processed all 3 platforms and generated Sora prompts for video platforms.

## SPECIFIC TASKS

1. **Navigate to Route Node**
   - In the open n8n browser tab
   - Click on node `4.2 Route Media Generation`
   - Expand output panel

2. **Inspect Output Items**
   - Should see 3 output items (one per platform)
   - For EACH item, record:
     - platform: "pinterest/instagram/tiktok"
     - media_type: "image/video/none"
     - sora_prompt: (present for video types?)
     - sora_seconds: (duration for videos?)

3. **Verify Routing Logic**
   - Pinterest (image flag) → should have image type, no sora_prompt
   - Instagram (video flag) → should have video type, WITH sora_prompt
   - TikTok (video flag) → should have video type, WITH sora_prompt

4. **Report Format**
```json
{
  "agent": "ROMEO",
  "mission": "Media Route Inspection",
  "status": "completed",
  "findings": {
    "total_items": 3,
    "pinterest": {
      "media_type": "image",
      "has_sora_prompt": false,
      "creative_prompt_present": true
    },
    "instagram": {
      "media_type": "video",
      "has_sora_prompt": true,
      "sora_prompt_preview": "first 100 chars...",
      "sora_seconds": 10
    },
    "tiktok": {
      "media_type": "video",
      "has_sora_prompt": true,
      "sora_prompt_preview": "first 100 chars...",
      "sora_seconds": 15
    }
  },
  "screenshot": "romeo-routes.png"
}
```

## SUCCESS CRITERIA
- ✅ All 3 platform items inspected
- ✅ Sora prompts present for video platforms
- ✅ Routing logic verified correct
- ✅ Screenshot captured
- ✅ Report submitted

## COORDINATION
- Works independently
- Critical: Verify video_spec was converted to sora_prompt
- Reports to: Mission Control (main chat)
- Time estimate: 45 seconds

