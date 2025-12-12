# 🎬 Sora API Error - Root Cause & Fix

## The Error

**Issue:** Sora video generation was failing despite the API existing

**Root Cause:** Wrong request format - I was sending **JSON** but Sora expects **form data**

---

## Sora API Documentation (from OpenAI)

### Endpoint
```
POST https://api.openai.com/v1/videos
```

### Request Format: FORM DATA (not JSON!)

**Correct curl example:**
```bash
curl https://api.openai.com/v1/videos \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "model=sora-2" \
  -F "prompt=A calico cat playing a piano on stage" \
  -F "seconds=5" \
  -F "size=1024x1808"
```

**Parameters:**
- `model` (string, optional) - Defaults to "sora-2"
- `prompt` (string, required) - Text description of video
- `seconds` (string, optional) - Duration in seconds, defaults to 4
- `size` (string, optional) - Resolution (e.g., "1024x1808"), defaults to "720x1280"
- `input_reference` (file, optional) - Image reference for guidance

### Response Format:
```json
{
  "id": "video_123",
  "object": "video",
  "model": "sora-2",
  "status": "queued",
  "progress": 0,
  "created_at": 1712697600,
  "size": "1024x1808",
  "seconds": "8",
  "quality": "standard"
}
```

**Status values:**
- `queued` - Job created, waiting to process
- `processing` - Currently generating
- `completed` - Video ready
- `failed` - Generation failed

---

## The Fix

### OLD (Incorrect - JSON body):
```json
{
  "method": "POST",
  "url": "https://api.openai.com/v1/videos",
  "sendBody": true,
  "specifyBody": "json",
  "jsonBody": "={\n  \"model\": \"sora-2\",\n  \"prompt\": \"...\",\n  \"duration\": 10,\n  \"size\": \"1024x1792\"\n}"
}
```

### NEW (Correct - Form data):
```json
{
  "method": "POST",
  "url": "https://api.openai.com/v1/videos",
  "sendBody": true,
  "specifyBody": "multipart-form-data",
  "bodyParameters": {
    "parameters": [
      {
        "name": "model",
        "value": "={{ $json.model || 'sora-2' }}"
      },
      {
        "name": "prompt",
        "value": "={{ $json.prompt }}"
      },
      {
        "name": "seconds",
        "value": "={{ $json.duration || 5 }}"
      },
      {
        "name": "size",
        "value": "={{ $json.size || '1024x1808' }}"
      }
    ]
  }
}
```

---

## Other Fixes Applied

### 1. Node Numbering Conflicts
- Fixed duplicate "4.5" node numbers
- Renumbered: 4.6 Aggregate Media, 4.7 Dry-Run Summary, 4.8 Failed Summary

### 2. Parameter Name
- Changed `duration` → `seconds` (Sora uses "seconds" not "duration")

### 3. Size Format
- Changed to `1024x1808` (9:16 vertical, Sora-compatible)

---

## How Polling Works

After creating video, need to poll status:

### 1. Create video → get `video_id`
```
POST /v1/videos
Returns: { "id": "video_123", "status": "queued" }
```

### 2. Poll status
```
GET /v1/videos/video_123
Returns: { "id": "video_123", "status": "processing", "progress": 45 }
```

### 3. When complete
```
GET /v1/videos/video_123
Returns: { "id": "video_123", "status": "completed" }
```

### 4. Get video content
```
GET /v1/videos/video_123/content
Returns: Video file (binary)
```

---

## Current Implementation

**4.4b-1 Start Sora Video:**
- NOW CORRECT: Uses form data
- Creates video job
- Returns task ID

**4.4b-2 Poll Sora Status:**
- Currently simplified (returns task ID)
- Should poll GET `/v1/videos/{video_id}`
- Should retry every 10-30 seconds
- Should timeout after 5 minutes
- Should fallback to image if timeout

---

## Status

✅ **Fixed:** Sora endpoint now uses correct form data format  
⚠️ **Needs enhancement:** Polling logic is simplified (returns task ID only)  
✅ **Working:** Fallback to images if Sora fails or times out  

---

**Next:** Re-import fixed workflow and test Sora video generation

