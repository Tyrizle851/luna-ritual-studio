# 🎯 AGENT FELIX - Feature Flags Inspector

## Mission ID: FELIX-001
**Status:** ACTIVE  
**Browser:** Shared Session (n8n workflow tab)

---

## PRIMARY OBJECTIVE
Inspect and confirm current feature flag configuration for media generation.

## SPECIFIC TASKS

1. **Navigate to Node**
   - In the open n8n browser tab
   - Click on node `0.1 Feature Flags (Set)`
   - Wait for node details to appear

2. **Capture Configuration**
   - Take screenshot of the node output panel
   - Record ALL flag values:
     - PINTEREST_MEDIA_TYPE
     - INSTAGRAM_MEDIA_TYPE  
     - TIKTOK_MEDIA_TYPE
     - QUALITY_THRESHOLD

3. **Report Format**
```json
{
  "agent": "FELIX",
  "mission": "Feature Flags Inspection",
  "status": "completed",
  "findings": {
    "pinterest_media": "image/video/none",
    "instagram_media": "image/video/none",
    "tiktok_media": "image/video/none",
    "quality_threshold": 60,
    "verified": true
  },
  "screenshot": "felix-flags.png"
}
```

## SUCCESS CRITERIA
- ✅ All 4 flags captured
- ✅ Screenshot saved
- ✅ Report submitted to Mission Control

## COORDINATION
- Works independently (no dependencies)
- Reports to: Mission Control (main chat)
- Time estimate: 30 seconds

