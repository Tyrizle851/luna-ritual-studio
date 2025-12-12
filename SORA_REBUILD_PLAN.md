# Sora 2 Synchronous Polling - Complete Rebuild Plan

## Current Architecture (BROKEN)
```
4.4b-1 Start Sora Video → 4.4b-2 Poll Sora Status → 4.6 Aggregate Media
```

**Problems:**
- No wait time (polls immediately)
- No looping (only checks once)
- No video file download
- Seconds parameter wrong (integer instead of STRING)

---

## New Architecture (WORKING)

```
4.4b-1 Start Sora Video 
  ↓
4.4b-2 Wait 60 Seconds
  ↓
4.4b-3 Get Sora Status (GET /v1/videos/{task_id})
  ↓
4.4b-4 IF Video Completed?
  ├─ TRUE → 4.4b-5 Get Video File → 4.4b-6 Handle Video Result → 4.6 Aggregate Media
  └─ FALSE → [Loop back to 4.4b-2 Wait, max 5 iterations = 5 minutes total]
```

---

## Node Specifications

### **4.4b-1 Start Sora Video** (FIX EXISTING)
**Type:** HTTP Request  
**Changes:**
- Fix `seconds` parameter: Convert to STRING with valid values
- Map duration (10) → "12", (5) → "4", (7) → "8"
- Output: `{ id: "task_abc123", status: "processing" }`

### **4.4b-2 Wait 60 Seconds** (NEW)
**Type:** Wait  
**Config:**
- Amount: 60 seconds
- Resume: After time expires

### **4.4b-3 Get Sora Status** (REPLACE EXISTING POLL NODE)
**Type:** HTTP Request  
**Method:** GET  
**URL:** `https://api.openai.com/v1/videos/{{ $node['4.4b-1 Start Sora Video'].json.id }}`  
**Auth:** OpenAI API  
**Output:** `{ id, status: "processing|completed|failed", video: { url } }`

### **4.4b-4 IF Video Completed?** (NEW)
**Type:** IF  
**Condition:** `{{ $json.status === 'completed' }}`  
**TRUE:** Go to Get Video File  
**FALSE:** Loop back to Wait 60s (with counter to prevent infinite loops)

### **4.4b-5 Get Video File** (NEW)
**Type:** HTTP Request  
**Method:** GET  
**URL:** `{{ $json.video.url }}`  
**Response Format:** file (binary)  
**Output:** Video binary data

### **4.4b-6 Handle Video Result** (NEW)
**Type:** Code  
**Purpose:** Package video data for Aggregate Media  
**Output:**
```json
{
  "platform": "instagram",
  "media_url": "{{ video.url }}",
  "media_type": "video",
  "source": "sora",
  "task_id": "{{ task_id }}",
  "error": null
}
```

---

## Loop Logic Implementation

**Problem:** n8n doesn't have native FOR loops

**Solution:** Use Loop node or manual counter

### Option A: Loop Node (Simpler)
```
4.4b-4 IF Completed? 
  FALSE → Loop Over Items (max 5 iterations)
    ↓
  4.4b-2 Wait 60s → 4.4b-3 Get Status → back to IF
```

### Option B: Manual Counter (Template approach)
```
Add retry_count variable
IF not completed AND retry_count < 5:
  increment counter
  go back to Wait
ELSE:
  mark as failed, use fallback image
```

**Recommended:** Option B (more reliable, template-proven)

---

## Connection Updates

### Current Connections:
```
4.4b-1 Start Sora Video → 4.4b-2 Poll Sora Status → 4.6 Aggregate Media
```

### New Connections:
```
4.4b-1 Start Sora Video 
  → 4.4b-2 Wait 60s

4.4b-2 Wait 60s
  → 4.4b-3 Get Sora Status

4.4b-3 Get Sora Status
  → 4.4b-4 IF Video Completed?

4.4b-4 IF Video Completed? (TRUE branch)
  → 4.4b-5 Get Video File
  
4.4b-5 Get Video File
  → 4.4b-6 Handle Video Result
  
4.4b-6 Handle Video Result
  → 4.6 Aggregate Media

4.4b-4 IF Video Completed? (FALSE branch)
  → Check retry counter
  → IF retries < 5: back to 4.4b-2 Wait
  → IF retries >= 5: Fallback handler → 4.6 Aggregate Media
```

---

## Aggregate Media Updates

**Current:** Expects simple media_url

**New:** Handle multiple scenarios:
1. DALL-E image: `{ url, source: "dalle3" }`
2. Sora video: `{ url, source: "sora", type: "video" }`
3. Timeout fallback: `{ url: github_image, source: "sora_timeout_fallback" }`
4. Reused video: `{ url: instagram_video, source: "reused" }`

**Code updates needed:**
- Check for video URLs vs image URLs
- Track generation source
- Handle fallback scenarios
- Pass video URLs to Dry-Run Summary

---

## Dry-Run Summary Updates

**Add to MEDIA GENERATED section:**

```
📍 PINTEREST:
Media Type: {{ pinterest_media.type }}
Source: {{ pinterest_media.source }}
URL: {{ pinterest_media.url || 'None' }}

📸 INSTAGRAM:
Media Type: {{ instagram_media.type }}
Source: {{ instagram_media.source }}
URL: {{ instagram_media.url || 'None' }}
{{ instagram_media.type === 'video' ? '🎬 Video ready for download' : '' }}

🎵 TIKTOK:
Media Type: {{ tiktok_media.type }}
Source: {{ tiktok_media.source }}
URL: {{ tiktok_media.url || 'None' }}
{{ tiktok_media.source === 'reused_from_instagram' ? '♻️ Reused Instagram video' : '' }}
```

---

## Testing Strategy

**Test 1: Instagram Video (10s)**
- Feature flags: IG=video, TT=video (reuse), P=image
- Expected: 
  - Pinterest: DALL-E image ✅
  - Instagram: Sora video (waits up to 5 min) ✅
  - TikTok: Reuses IG video ✅

**Test 2: Timeout Scenario**
- Set Sora timeout to 2 minutes
- Trigger with complex prompt
- Expected: Falls back to GitHub image ✅

**Test 3: Sora Failure**
- Invalid prompt or API error
- Expected: Immediate fallback to GitHub image ✅

---

## Implementation Steps

1. ✅ Fix `seconds` parameter in Start Sora node
2. Add Wait 60s node
3. Replace Poll Sora Status with Get Sora Status
4. Add IF Video Completed? node
5. Add retry counter logic
6. Add Get Video File node
7. Add Handle Video Result node
8. Update all connections
9. Update Aggregate Media code
10. Update Dry-Run Summary display
11. Test thoroughly

**Estimated time:** 30-45 minutes to implement and test
**Workflow execution time with videos:** 5-7 minutes per run





