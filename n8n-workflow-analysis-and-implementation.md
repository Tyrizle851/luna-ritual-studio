# n8n Content Engine v3 - Workflow Analysis & Sora 2 Implementation

## Current Workflow Structure (Examined via Browser)

### Phase 0: Configuration
- **0.1 Feature Flags** (Set Node)
  - Current flags:
    - `POST_TO_PINTEREST` (Boolean)
    - `DRY_RUN` (Boolean)
    - `QUALITY_THRESHOLD` (Number, default: 60)
    - `ENABLE_QUALITY_GATE` (Boolean)
    - `GENERATE_IMAGES` (Boolean)

### Phase 1: Data Ingestion ✅ (Working)
- 1.1 Fetch Products
- 1.2 Select Product
- 1.3 Map to Image Hint
- 1.4 List src/assets
- 1.5 Resolve via GitHub

### Phase 2: Content Generation ✅ (Working)
- 2.1 Generate Copy (HTTP - OpenAI GPT-5)
- 2.2 Parse Response (Code)
- 2.3 Validate & Coerce (Code)

### Phase 3: Quality Control ✅ (Working)
- 3.1 Quality Gate (Code)
- 3.2 IF Quality Gate (IF Node - branches TRUE/FALSE)

### Phase 4: Output & Finalization ⚠️ (Needs Sora 2 Integration)
- **4.1 Choose Final URL** (Code) - TRUE path from Quality Gate
- **Generate an image** (HTTP - DALL-E 3) - Connected from 4.1
- **4.3 Merge Image Result** (Code)
- **4.4 Download Image** (HTTP)
- **4.5 Dry-Run Summary** (Set) - TRUE path
- **4.6 Failed Summary** (Set) - FALSE path

## What Needs to Be Implemented

### 1. Update Feature Flags Node (0.1)
**Add 3 new fields:**
- `PINTEREST_MEDIA_TYPE` (String, default: "image")
- `INSTAGRAM_MEDIA_TYPE` (String, default: "video")
- `TIKTOK_MEDIA_TYPE` (String, default: "video")

### 2. Create Node: 4.2 Route Media Generation (Code Node)
**Purpose:** Split workflow into 3 parallel platform items

**Input:** From 4.1 Choose Final URL
- `payload` (complete copy data)
- Feature flags from 0.1

**Logic:**
```javascript
// Read feature flags
const pinterestType = $node['0.1 Feature Flags'].json.PINTEREST_MEDIA_TYPE || 'image';
const instagramType = $node['0.1 Feature Flags'].json.INSTAGRAM_MEDIA_TYPE || 'video';
const tiktokType = $node['0.1 Feature Flags'].json.TIKTOK_MEDIA_TYPE || 'video';

// Extract creative prompts
const pinterestPrompt = $json.payload.pinterest.creative_prompt.prompt_text;
const instagramVideoSpec = $json.payload.instagram.creative_prompt.video_spec;
const instagramStyle = $json.payload.instagram.creative_prompt.prompt_text;

// Convert video_spec to Sora prompt
function convertVideoSpecToSoraPrompt(videoSpec, stylePrompt) {
  let prompt = '';
  let timeOffset = 0;
  
  videoSpec.shots.forEach((shot, idx) => {
    prompt += `Shot ${idx + 1} (${timeOffset}-${timeOffset + shot.duration_s}s): ${shot.shot_description}. `;
    if (shot.on_screen_text) {
      prompt += `Text overlay: "${shot.on_screen_text}". `;
    }
    timeOffset += shot.duration_s;
  });
  
  if (videoSpec.voiceover_script) {
    prompt += `\n\nVoiceover: ${videoSpec.voiceover_script}`;
  }
  
  prompt += `\n\nStyle: ${stylePrompt}`;
  return prompt;
}

const instagramSoraPrompt = convertVideoSpecToSoraPrompt(instagramVideoSpec, instagramStyle);
const totalDuration = instagramVideoSpec.shots.reduce((sum, shot) => sum + shot.duration_s, 0);

// Create 3 platform items
return [
  {
    platform: 'pinterest',
    media_type: pinterestType,
    prompt: pinterestPrompt,
    model: pinterestType === 'image' ? 'dall-e-3' : null,
    size: '1024x1792',
    creative_prompt: $json.payload.pinterest.creative_prompt,
    payload: $json.payload
  },
  {
    platform: 'instagram',
    media_type: instagramType,
    prompt: instagramType === 'video' ? instagramSoraPrompt : pinterestPrompt,
    model: instagramType === 'video' ? 'sora-2' : (instagramType === 'image' ? 'dall-e-3' : null),
    size: '1024x1792',
    duration: instagramType === 'video' ? totalDuration : null,
    video_spec: instagramVideoSpec,
    creative_prompt: $json.payload.instagram.creative_prompt,
    payload: $json.payload
  },
  {
    platform: 'tiktok',
    media_type: tiktokType,
    prompt: tiktokType === 'video' ? 'reuse_instagram' : (tiktokType === 'image' ? pinterestPrompt : null),
    model: tiktokType === 'video' ? null : (tiktokType === 'image' ? 'dall-e-3' : null),
    size: tiktokType === 'none' ? null : '1024x1792',
    duration: null,
    reuse_instagram: tiktokType === 'video',
    creative_prompt: $json.payload.tiktok.creative_prompt,
    payload: $json.payload
  }
];
```

### 3. Create Node: 4.3a IF Media = Image (IF Node)
**Condition:** `{{ $json.media_type === "image" }}`
- TRUE → Route to 4.4a Generate Image (DALL-E 3)
- FALSE → Continue to next IF

### 4. Create Node: 4.3b IF Media = Video (IF Node)
**Condition:** `{{ $json.media_type === "video" }}`
- TRUE → Route to 4.4b Generate Video (Sora 2)
- FALSE → Continue to next IF

### 5. Create Node: 4.3c IF Media = Reuse (IF Node)
**Condition:** `{{ $json.reuse_instagram === true }}`
- TRUE → Route to 4.4c Reuse Instagram Video
- FALSE → Route to 4.4d Skip Generation

### 6. Rename/Update: 4.4a Generate Image (DALL-E 3) (HTTP Node)
**Current:** "Generate an image"
**Update to:** Use prompt from Route Media Generation node

**Request:**
- URL: `https://api.openai.com/v1/images/generations`
- Method: POST
- Body:
```json
{
  "model": "dall-e-3",
  "prompt": "{{ $json.prompt }}",
  "size": "1024x1792",
  "quality": "standard",
  "n": 1
}
```

**Output:** Image URL in response

### 7. Create Node: 4.4a Handle Image Result (Code Node)
**Purpose:** Parse DALL-E response and handle errors

```javascript
const response = $input.item.json;

// Try to extract image URL from various possible response structures
let imageUrl = null;
let error = null;

try {
  if (response.data && Array.isArray(response.data) && response.data[0]) {
    imageUrl = response.data[0].url || response.data[0].b64_json;
  } else if (response.url) {
    imageUrl = response.url;
  } else if (response.image_url) {
    imageUrl = response.image_url;
  } else if (response.data?.url) {
    imageUrl = response.data.url;
  } else {
    throw new Error('Unexpected DALL-E response format');
  }
} catch (e) {
  error = e.message;
  // Fallback to GitHub image
  imageUrl = $node['1.5 Resolve via GitHub'].json.resolved_image_url || 
             $node['1.4 List src/assets'].json[0]?.download_url ||
             'https://raw.githubusercontent.com/Tyrizle851/luna-ritual-studio/main/src/assets/product-candle-1.jpg';
}

return {
  platform: $json.platform,
  media_type: 'image',
  media_url: imageUrl,
  source: error ? 'github_fallback' : 'dalle3',
  error: error,
  payload: $json.payload
};
```

### 8. Create Node: 4.4b-1 Start Sora Video (HTTP Node)
**Purpose:** Initiate Sora 2 video generation

**Request:**
- URL: `https://api.openai.com/v1/videos/create`
- Method: POST
- Headers: Authorization with OpenAI API key
- Body:
```json
{
  "model": "{{ $json.model || 'sora-2' }}",
  "prompt": "{{ $json.prompt }}",
  "duration": {{ $json.duration || 10 }},
  "size": "{{ $json.size || '1024x1792' }}",
  "format": "mp4"
}
```

**Output:** `{task_id: "vid_xxxx"}`

### 9. Create Node: 4.4b-2 Poll Sora Status (Code Node with Loop)
**Purpose:** Poll Sora API until video is ready (5 min timeout)

**Note:** n8n doesn't have native loops, so we'll use a Workflow Loop node or implement polling in Code node

**Code Node Approach (with async polling):**
```javascript
const taskId = $json.task_id;
const maxAttempts = 30; // 30 attempts × 10 seconds = 5 minutes
const pollInterval = 10000; // 10 seconds

let attempt = 0;
let status = null;
let videoUrl = null;
let error = null;

while (attempt < maxAttempts) {
  try {
    // Make HTTP request to check status
    // Note: In n8n Code node, we'd need to use $http or make this a separate HTTP node in a loop
    // For now, this is the logic structure
    
    const response = await fetch(`https://api.openai.com/v1/videos/${taskId}/status`, {
      headers: {
        'Authorization': `Bearer ${$env.OPENAI_API_KEY}`
      }
    });
    
    status = await response.json();
    
    if (status.status === 'completed' && status.url) {
      videoUrl = status.url;
      break;
    } else if (status.status === 'failed') {
      error = status.error || 'Video generation failed';
      break;
    }
    
    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, pollInterval));
    attempt++;
  } catch (e) {
    error = e.message;
    break;
  }
}

if (!videoUrl && !error) {
  error = 'Video generation timeout after 5 minutes';
}

// If failed, fallback to image
if (error) {
  return {
    platform: $json.platform,
    media_type: 'image', // Fallback
    media_url: $node['1.5 Resolve via GitHub'].json.resolved_image_url,
    source: 'image_fallback_due_to_video_failure',
    error: error,
    fallback_triggered: true,
    payload: $json.payload
  };
}

return {
  platform: $json.platform,
  media_type: 'video',
  media_url: videoUrl,
  source: 'sora2',
  generation_time_seconds: attempt * 10,
  payload: $json.payload
};
```

**Alternative: Use n8n Loop Node** (if available):
- Loop node with max iterations: 30
- Wait 10 seconds between iterations
- HTTP Request node inside loop to check status
- Break when status = "completed" or "failed"

### 10. Create Node: 4.4c Reuse Instagram Video (Set Node)
**Purpose:** For TikTok to reuse Instagram video URL

**Input:** From Instagram video generation result
**Output:**
```json
{
  "platform": "tiktok",
  "media_type": "video",
  "media_url": "{{ $node['4.4b-2 Poll Sora Status'].json.media_url }}",
  "source": "reused_from_instagram",
  "payload": "{{ $json.payload }}"
}
```

### 11. Create Node: 4.4d Skip Generation (Set Node)
**Purpose:** For platforms set to "none"

**Output:**
```json
{
  "platform": "{{ $json.platform }}",
  "media_type": "none",
  "media_url": null,
  "source": "skipped",
  "payload": "{{ $json.payload }}"
}
```

### 12. Create Node: 4.5 Aggregate Media (Code Node)
**Purpose:** Merge all 3 platform results back into single item

**Input:** Items from all parallel branches (Pinterest, Instagram, TikTok)

**Logic:**
```javascript
// Collect results from all branches
// In n8n, this node receives items from multiple input connections
// We need to identify which item is which platform

const items = $input.all();

const results = {
  pinterest: null,
  instagram: null,
  tiktok: null
};

items.forEach(item => {
  const platform = item.json.platform;
  if (platform === 'pinterest') {
    results.pinterest = {
      type: item.json.media_type,
      url: item.json.media_url,
      source: item.json.source
    };
  } else if (platform === 'instagram') {
    results.instagram = {
      type: item.json.media_type,
      url: item.json.media_url,
      source: item.json.source
    };
  } else if (platform === 'tiktok') {
    results.tiktok = {
      type: item.json.media_type,
      url: item.json.media_url,
      source: item.json.source
    };
  }
});

// Handle TikTok reusing Instagram video
if (results.tiktok.source === 'reused_from_instagram' && results.instagram.url) {
  results.tiktok.url = results.instagram.url;
}

// Get payload from any item (they all have it)
const payload = items[0].json.payload || $json.payload;

return {
  pinterest_media: results.pinterest,
  instagram_media: results.instagram,
  tiktok_media: results.tiktok,
  payload: payload,
  fallbacks_used: items
    .filter(item => item.json.fallback_triggered || item.json.source?.includes('fallback'))
    .map(item => `${item.json.platform.toUpperCase()}_${item.json.source}`)
};
```

### 13. Update Node: 4.7 Dry-Run Summary (Set Node)
**Add new fields to display media info:**

```javascript
{
  "summary": "=**🎯 DRY RUN COMPLETE - MULTI-PLATFORM VIRAL COPY GENERATED**\n\n...\n\n**🎬 MEDIA GENERATED**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📍 PINTEREST:\nMedia Type: {{ $node['4.5 Aggregate Media'].json.pinterest_media.type }}\nSource: {{ $node['4.5 Aggregate Media'].json.pinterest_media.source }}\nURL: {{ $node['4.5 Aggregate Media'].json.pinterest_media.url || 'None' }}\n\n📸 INSTAGRAM:\nMedia Type: {{ $node['4.5 Aggregate Media'].json.instagram_media.type }}\nSource: {{ $node['4.5 Aggregate Media'].json.instagram_media.source }}\nURL: {{ $node['4.5 Aggregate Media'].json.instagram_media.url || 'None' }}\n\n🎵 TIKTOK:\nMedia Type: {{ $node['4.5 Aggregate Media'].json.tiktok_media.type }}\nSource: {{ $node['4.5 Aggregate Media'].json.tiktok_media.source }}\nURL: {{ $node['4.5 Aggregate Media'].json.tiktok_media.url || 'None' }}\n\n...",
  "pinterest_media_type": "={{ $node['4.5 Aggregate Media'].json.pinterest_media.type }}",
  "pinterest_media_source": "={{ $node['4.5 Aggregate Media'].json.pinterest_media.source }}",
  "pinterest_media_url": "={{ $node['4.5 Aggregate Media'].json.pinterest_media.url }}",
  "instagram_media_type": "={{ $node['4.5 Aggregate Media'].json.instagram_media.type }}",
  "instagram_media_source": "={{ $node['4.5 Aggregate Media'].json.instagram_media.source }}",
  "instagram_media_url": "={{ $node['4.5 Aggregate Media'].json.instagram_media.url }}",
  "tiktok_media_type": "={{ $node['4.5 Aggregate Media'].json.tiktok_media.type }}",
  "tiktok_media_source": "={{ $node['4.5 Aggregate Media'].json.tiktok_media.source }}",
  "tiktok_media_url": "={{ $node['4.5 Aggregate Media'].json.tiktok_media.url }}"
}
```

## New Connection Flow

```
3.2 IF Quality Gate (TRUE)
  ↓
4.1 Choose Final URL
  ↓
4.2 Route Media Generation (creates 3 items)
  ↓
4.3a IF Media = Image
  ├─ TRUE → 4.4a Generate Image (DALL-E 3)
  │          ↓
  │         4.4a Handle Image Result
  │          ↓
  └─ FALSE → 4.3b IF Media = Video
              ├─ TRUE → 4.4b-1 Start Sora Video
              │          ↓
              │         4.4b-2 Poll Sora Status (loop)
              │          ↓
              │         4.4b-3 Handle Video Result
              │          ↓
              └─ FALSE → 4.3c IF Media = Reuse
                          ├─ TRUE → 4.4c Reuse Instagram Video
                          └─ FALSE → 4.4d Skip Generation
                                      ↓
4.5 Aggregate Media (merges all 3 platforms)
  ↓
4.6 Download Media (optional - downloads final media)
  ↓
4.7 Dry-Run Summary
```

## Implementation Notes

1. **Sora 2 Polling:** n8n doesn't have native async loops in Code nodes. Options:
   - Use n8n's Loop node (if available) with HTTP Request inside
   - Use multiple sequential HTTP Request nodes with Wait nodes
   - Implement polling logic in Code node using $http (if available)

2. **Parallel Processing:** The 3 platform items from 4.2 will flow through the Switch nodes in parallel automatically in n8n.

3. **TikTok Reuse:** The 4.4c node needs to wait for Instagram video to complete, so it should connect from the Instagram video result, not from the Switch.

4. **Error Handling:** All nodes should have fallback logic to prevent workflow crashes.

## Testing Checklist

- [ ] Feature flags can be set to image/video/none for each platform
- [ ] Route Media Generation creates 3 items correctly
- [ ] Switch nodes route to correct branches
- [ ] DALL-E 3 image generation works for Pinterest
- [ ] Sora 2 video generation initiates correctly
- [ ] Sora 2 polling completes within 5 minutes
- [ ] Video fallback to image works if Sora fails
- [ ] TikTok reuses Instagram video correctly
- [ ] Aggregate Media merges all 3 platforms
- [ ] Dry-Run Summary shows all media types and sources

