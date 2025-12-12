# Sora 2 Video Generation - Complete Implementation Guide

## Summary of Current Workflow (Examined via Browser)

✅ **Working Nodes:**
- Phase 0: Feature Flags (0.1) - Has 5 flags currently
- Phase 1: Data Ingestion (1.1-1.5) - All working
- Phase 2: Content Generation (2.1-2.3) - All working  
- Phase 3: Quality Control (3.1-3.2) - All working
- Phase 4: Output (4.1, 4.3, 4.4, 4.5, 4.6) - Partially working

⚠️ **Current Flow After Quality Gate (TRUE path):**
```
4.1 Choose Final URL → Generate an image (DALL-E 3) → 4.3 Merge Image Result → 4.4 Download Image → 4.5 Dry-Run Summary
```

## What Needs to Be Added

### Step 1: Update Feature Flags Node (0.1)

**Add 3 new fields to the Set node:**

1. **PINTEREST_MEDIA_TYPE**
   - Name: `PINTEREST_MEDIA_TYPE`
   - Type: `String`
   - Value: `"image"`

2. **INSTAGRAM_MEDIA_TYPE**
   - Name: `INSTAGRAM_MEDIA_TYPE`
   - Type: `String`
   - Value: `"video"`

3. **TIKTOK_MEDIA_TYPE**
   - Name: `TIKTOK_MEDIA_TYPE`
   - Type: `String`
   - Value: `"video"`

**How to add:** In the Feature Flags node, click "Add Value" button and add each field.

---

### Step 2: Create Node 4.2: Route Media Generation (Code Node)

**Position:** Between `4.1 Choose Final URL` and `Generate an image`

**Node Type:** Code

**Name:** `4.2 Route Media Generation`

**JavaScript Code:**
```javascript
// Read feature flags
const flags = $node['0.1 Feature Flags'].json;
const pinterestType = flags.PINTEREST_MEDIA_TYPE || 'image';
const instagramType = flags.INSTAGRAM_MEDIA_TYPE || 'video';
const tiktokType = flags.TIKTOK_MEDIA_TYPE || 'video';

// Extract creative prompts from payload
const payload = $json.payload || $json;
const pinterestPrompt = payload.pinterest?.creative_prompt?.prompt_text || '';
const instagramVideoSpec = payload.instagram?.creative_prompt?.video_spec;
const instagramStyle = payload.instagram?.creative_prompt?.prompt_text || '';

// Convert video_spec to Sora prompt
function convertVideoSpecToSoraPrompt(videoSpec, stylePrompt) {
  if (!videoSpec || !videoSpec.shots) {
    return stylePrompt;
  }
  
  let prompt = '';
  let timeOffset = 0;
  
  videoSpec.shots.forEach((shot, idx) => {
    prompt += `Shot ${idx + 1} (${timeOffset}-${timeOffset + (shot.duration_s || 2)}s): ${shot.shot_description || ''}. `;
    if (shot.on_screen_text) {
      prompt += `Text overlay: "${shot.on_screen_text}". `;
    }
    timeOffset += (shot.duration_s || 2);
  });
  
  if (videoSpec.voiceover_script) {
    prompt += `\n\nVoiceover: ${videoSpec.voiceover_script}`;
  }
  
  if (stylePrompt) {
    prompt += `\n\nStyle: ${stylePrompt}`;
  }
  
  return prompt;
}

const instagramSoraPrompt = instagramType === 'video' 
  ? convertVideoSpecToSoraPrompt(instagramVideoSpec, instagramStyle)
  : pinterestPrompt;

const totalDuration = instagramVideoSpec?.shots?.reduce((sum, shot) => sum + (shot.duration_s || 2), 0) || 10;

// Create 3 platform items
return [
  {
    platform: 'pinterest',
    media_type: pinterestType,
    prompt: pinterestPrompt,
    model: pinterestType === 'image' ? 'dall-e-3' : null,
    size: '1024x1792',
    creative_prompt: payload.pinterest?.creative_prompt,
    payload: payload
  },
  {
    platform: 'instagram',
    media_type: instagramType,
    prompt: instagramType === 'video' ? instagramSoraPrompt : pinterestPrompt,
    model: instagramType === 'video' ? 'sora-2' : (instagramType === 'image' ? 'dall-e-3' : null),
    size: '1024x1792',
    duration: instagramType === 'video' ? totalDuration : null,
    video_spec: instagramVideoSpec,
    creative_prompt: payload.instagram?.creative_prompt,
    payload: payload
  },
  {
    platform: 'tiktok',
    media_type: tiktokType,
    prompt: tiktokType === 'video' ? 'reuse_instagram' : (tiktokType === 'image' ? pinterestPrompt : null),
    model: tiktokType === 'video' ? null : (tiktokType === 'image' ? 'dall-e-3' : null),
    size: tiktokType === 'none' ? null : '1024x1792',
    duration: null,
    reuse_instagram: tiktokType === 'video',
    creative_prompt: payload.tiktok?.creative_prompt,
    payload: payload
  }
];
```

**Options:** `{}` (empty object)

---

### Step 3: Create Node 4.3a: IF Media = Image (IF Node)

**Position:** After `4.2 Route Media Generation`

**Node Type:** IF

**Name:** `4.3a IF Media = Image`

**Condition:**
```
{{ $json.media_type === "image" }}
```

**Options:** `{}`

---

### Step 4: Create Node 4.3b: IF Media = Video (IF Node)

**Position:** After `4.3a IF Media = Image` (FALSE path)

**Node Type:** IF

**Name:** `4.3b IF Media = Video`

**Condition:**
```
{{ $json.media_type === "video" }}
```

**Options:** `{}`

---

### Step 5: Create Node 4.3c: IF Media = Reuse (IF Node)

**Position:** After `4.3b IF Media = Video` (FALSE path)

**Node Type:** IF

**Name:** `4.3c IF Media = Reuse`

**Condition:**
```
{{ $json.reuse_instagram === true }}
```

**Options:** `{}`

---

### Step 6: Update Node: Generate an image → Rename to "4.4a Generate Image (DALL-E 3)"

**Current Name:** `Generate an image`

**New Name:** `4.4a Generate Image (DALL-E 3)`

**Keep existing configuration** but ensure it uses:
- Prompt from: `{{ $json.prompt }}`
- Model: `dall-e-3`
- Size: `1024x1792`
- Quality: `standard`

**Connection:** Connect from `4.3a IF Media = Image` (TRUE path)

---

### Step 7: Create Node 4.4a Handle Image Result (Code Node)

**Position:** After `4.4a Generate Image (DALL-E 3)`

**Node Type:** Code

**Name:** `4.4a Handle Image Result`

**JavaScript Code:**
```javascript
const response = $input.item.json;
const originalItem = $node['4.2 Route Media Generation'].json;

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
  const githubImage = $node['1.5 Resolve via GitHub']?.json?.resolved_image_url;
  const assetsList = $node['1.4 List src/assets']?.json;
  imageUrl = githubImage || (Array.isArray(assetsList) && assetsList[0]?.download_url) || 
             'https://raw.githubusercontent.com/Tyrizle851/luna-ritual-studio/main/src/assets/product-candle-1.jpg';
}

return {
  platform: originalItem.platform,
  media_type: 'image',
  media_url: imageUrl,
  source: error ? 'github_fallback' : 'dalle3',
  error: error,
  payload: originalItem.payload
};
```

**Options:** `{}`

---

### Step 8: Create Node 4.4b-1: Start Sora Video (HTTP Request Node)

**Position:** After `4.3b IF Media = Video` (TRUE path)

**Node Type:** HTTP Request

**Name:** `4.4b-1 Start Sora Video`

**Configuration:**
- **Method:** `POST`
- **URL:** `https://api.openai.com/v1/videos/create`
- **Authentication:** Header Auth
  - **Name:** `Authorization`
  - **Value:** `Bearer {{ $env.OPENAI_API_KEY }}`
- **Body Content Type:** JSON
- **Body:**
```json
{
  "model": "{{ $json.model || 'sora-2' }}",
  "prompt": "{{ $json.prompt }}",
  "duration": {{ $json.duration || 10 }},
  "size": "{{ $json.size || '1024x1792' }}",
  "format": "mp4"
}
```

**Options:** `{}`

---

### Step 9: Create Node 4.4b-2: Poll Sora Status (Code Node with Loop)

**Position:** After `4.4b-1 Start Sora Video`

**Node Type:** Code

**Name:** `4.4b-2 Poll Sora Status`

**Note:** n8n Code nodes don't support async loops natively. We'll use a Workflow Loop node or implement sequential polling.

**Alternative Approach - Use n8n Loop Node (if available):**

If n8n has a Loop node:
1. Create Loop node with max iterations: 30
2. Inside loop: HTTP Request to check status
3. Wait 10 seconds between iterations
4. Break when status = "completed"

**Or use Code node with HTTP requests (requires $http support):**

```javascript
const taskId = $json.task_id || $json.id;
const originalItem = $node['4.2 Route Media Generation'].json;
const maxAttempts = 30;
const pollInterval = 10000; // 10 seconds

// Note: This requires n8n to support $http in Code nodes
// If not available, use Loop node approach above

let attempt = 0;
let status = null;
let videoUrl = null;
let error = null;

// This is pseudocode - actual implementation depends on n8n's $http support
while (attempt < maxAttempts) {
  try {
    const response = await $http.get({
      url: `https://api.openai.com/v1/videos/${taskId}/status`,
      headers: {
        'Authorization': `Bearer ${$env.OPENAI_API_KEY}`
      }
    });
    
    status = response.data;
    
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
  const githubImage = $node['1.5 Resolve via GitHub']?.json?.resolved_image_url;
  return {
    platform: originalItem.platform,
    media_type: 'image', // Fallback
    media_url: githubImage || 'https://raw.githubusercontent.com/Tyrizle851/luna-ritual-studio/main/src/assets/product-candle-1.jpg',
    source: 'image_fallback_due_to_video_failure',
    error: error,
    fallback_triggered: true,
    payload: originalItem.payload
  };
}

return {
  platform: originalItem.platform,
  media_type: 'video',
  media_url: videoUrl,
  source: 'sora2',
  generation_time_seconds: attempt * 10,
  payload: originalItem.payload
};
```

**Recommended:** Use n8n's Loop node with HTTP Request inside if available, otherwise implement as sequential HTTP Request nodes with Wait nodes between them.

---

### Step 10: Create Node 4.4c: Reuse Instagram Video (Set Node)

**Position:** After `4.3c IF Media = Reuse` (TRUE path)

**Node Type:** Set

**Name:** `4.4c Reuse Instagram Video`

**Fields to Set:**
- **platform:** `tiktok`
- **media_type:** `video`
- **media_url:** `={{ $node['4.4b-2 Poll Sora Status'].json.media_url }}`
- **source:** `reused_from_instagram`
- **payload:** `={{ $json.payload }}`

**Options:** `{}`

**Note:** This node needs to wait for Instagram video to complete. Connect it from the Instagram video result path, not directly from the Switch.

---

### Step 11: Create Node 4.4d: Skip Generation (Set Node)

**Position:** After `4.3c IF Media = Reuse` (FALSE path)

**Node Type:** Set

**Name:** `4.4d Skip Generation`

**Fields to Set:**
- **platform:** `={{ $json.platform }}`
- **media_type:** `none`
- **media_url:** `null`
- **source:** `skipped`
- **payload:** `={{ $json.payload }}`

**Options:** `{}`

---

### Step 12: Create Node 4.5: Aggregate Media (Code Node)

**Position:** After all media generation paths converge

**Node Type:** Code

**Name:** `4.5 Aggregate Media`

**JavaScript Code:**
```javascript
// Collect results from all branches
// In n8n, this node receives items from multiple input connections
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
if (results.tiktok?.source === 'reused_from_instagram' && results.instagram?.url) {
  results.tiktok.url = results.instagram.url;
}

// Get payload from any item (they all have it)
const payload = items[0]?.json?.payload || $json.payload;

return {
  pinterest_media: results.pinterest,
  instagram_media: results.instagram,
  tiktok_media: results.tiktok,
  payload: payload,
  fallbacks_used: items
    .filter(item => item.json.fallback_triggered || item.json.source?.includes('fallback'))
    .map(item => `${item.json.platform?.toUpperCase()}_${item.json.source}`)
};
```

**Options:** `{}`

**Input Connections:** Connect from:
- `4.4a Handle Image Result` (Pinterest image)
- `4.4b-2 Poll Sora Status` (Instagram video)
- `4.4c Reuse Instagram Video` (TikTok video)
- `4.4d Skip Generation` (any skipped platforms)

---

### Step 13: Update Node 4.5 Dry-Run Summary

**Current Name:** `4.5 Dry-Run Summary`

**Keep existing fields** and add:

**New Fields:**
- **pinterest_media_type:** `={{ $node['4.5 Aggregate Media'].json.pinterest_media.type }}`
- **pinterest_media_source:** `={{ $node['4.5 Aggregate Media'].json.pinterest_media.source }}`
- **pinterest_media_url:** `={{ $node['4.5 Aggregate Media'].json.pinterest_media.url }}`
- **instagram_media_type:** `={{ $node['4.5 Aggregate Media'].json.instagram_media.type }}`
- **instagram_media_source:** `={{ $node['4.5 Aggregate Media'].json.instagram_media.source }}`
- **instagram_media_url:** `={{ $node['4.5 Aggregate Media'].json.instagram_media.url }}`
- **tiktok_media_type:** `={{ $node['4.5 Aggregate Media'].json.tiktok_media.type }}`
- **tiktok_media_source:** `={{ $node['4.5 Aggregate Media'].json.tiktok_media.source }}`
- **tiktok_media_url:** `={{ $node['4.5 Aggregate Media'].json.tiktok_media.url }}`

**Update summary field** to include:
```
**🎬 MEDIA GENERATED**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 PINTEREST:
Media Type: {{ $node['4.5 Aggregate Media'].json.pinterest_media.type }}
Source: {{ $node['4.5 Aggregate Media'].json.pinterest_media.source }}
URL: {{ $node['4.5 Aggregate Media'].json.pinterest_media.url || 'None' }}

📸 INSTAGRAM:
Media Type: {{ $node['4.5 Aggregate Media'].json.instagram_media.type }}
Source: {{ $node['4.5 Aggregate Media'].json.instagram_media.source }}
URL: {{ $node['4.5 Aggregate Media'].json.instagram_media.url || 'None' }}

🎵 TIKTOK:
Media Type: {{ $node['4.5 Aggregate Media'].json.tiktok_media.type }}
Source: {{ $node['4.5 Aggregate Media'].json.tiktok_media.source }}
URL: {{ $node['4.5 Aggregate Media'].json.tiktok_media.url || 'None' }}
```

---

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
              │         4.4b-2 Poll Sora Status
              │          ↓
              └─ FALSE → 4.3c IF Media = Reuse
                          ├─ TRUE → 4.4c Reuse Instagram Video
                          └─ FALSE → 4.4d Skip Generation
                                      ↓
4.5 Aggregate Media (merges all 3 platforms)
  ↓
4.4 Download Image (optional - keep existing)
  ↓
4.5 Dry-Run Summary (updated with media info)
```

## Important Notes

1. **Sora 2 Polling:** n8n doesn't have native async loops in Code nodes. Use either:
   - n8n Loop node (if available) with HTTP Request inside
   - Sequential HTTP Request nodes with Wait nodes (10s wait × 30 = 5 min)

2. **TikTok Reuse:** The `4.4c Reuse Instagram Video` node must wait for Instagram video completion. Connect it from the Instagram video result, not from the Switch node directly.

3. **Parallel Processing:** The 3 items from `4.2 Route Media Generation` will automatically flow through the Switch nodes in parallel in n8n.

4. **Error Handling:** All nodes should have fallback logic. The image fallback is already implemented in `4.4a Handle Image Result`.

5. **Feature Flags:** Default values are:
   - Pinterest: `"image"` (DALL-E 3)
   - Instagram: `"video"` (Sora 2)
   - TikTok: `"video"` (reuses Instagram)

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

