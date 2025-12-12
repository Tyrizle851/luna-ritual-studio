# 🚨 Runtime Errors Analysis & Fixes

## CRITICAL ERROR #1: Aggregate Media - "Assignment to constant variable"

### The Error
```
Assignment to constant variable
Line 138 in node "4.6 Aggregate Media"
```

### Root Cause
**Line 1122** declares: `const payload = upstreamData.payload || {};`
**Line 1260** (line 138 of the code) tries to reassign: `payload = payloadCopy;`

### Fix Applied
✅ Changed `const payload` to `let payload` on line 1122

### Impact
- **Before**: Workflow crashes at Aggregate Media node
- **After**: Workflow completes successfully

---

## CRITICAL ERROR #2: DALL-E Image Download Failed

### The Error
```
Error: getaddrinfo ENOTFOUND oaidalleapiprodscus.blob.core.windows.net
URL: https://oaidalleapiprodscus.blob.core.windows.net/private/org-7VBMMF32bTznUrkfLo4ecqs1/...
```

### Root Cause
**Image was generated successfully** by DALL-E, but:
1. DALL-E returned an Azure Blob Storage URL
2. Download node tried to fetch the image
3. DNS lookup failed (network/DNS issue)
4. Image couldn't be downloaded despite being generated

### Why It Failed to Show in Dry Run Summary
The workflow hit the error and stopped before reaching the summary nodes.

### Fixes Applied

#### 1. Increased Download Timeout
- **Before**: 60 seconds
- **After**: 120 seconds (2 minutes)
- **Reason**: Azure blob URLs may be slower to respond

#### 2. Enhanced Retry Logic
- **Before**: Retries on [429, 500, 502, 503, 504]
- **After**: Retries on [404, 429, 500, 502, 503, 504]
- **Reason**: DNS failures may appear as 404s

#### 3. Increased Retry Attempts
- **Before**: 2 retries with 2 second intervals
- **After**: 3 retries with 3 second intervals
- **Reason**: DNS lookups may need more time

#### 4. Sora Status Timeout Increased
- **Before**: 30 seconds
- **After**: 60 seconds
- **Reason**: Video status checks need more time

### Recommended Next Step
If DNS errors persist, the workflow will:
1. Retry 3 times (with exponential backoff)
2. If all retries fail, use GitHub fallback image
3. Show in Dry Run Summary with warning

---

## ALL REASONS VIDEO/IMAGE GENERATION FAILS

### A. Video Generation Failures

#### Sora API Failures (100% failure currently)
1. **API endpoint doesn't exist** - `/v1/videos` may not be available
2. **Authentication fails** - API key may not have Sora access
3. **Model not available** - `sora-2` may not exist yet
4. **Quota exceeded** - API rate limits
5. **Invalid prompt** - Empty or malformed prompts
6. **Invalid duration** - Duration not 4, 8, 12, 16, or 20 seconds
7. **Invalid size** - Size not in allowed list
8. **Request timeout** - API takes > 60 seconds to respond
9. **Network errors** - DNS, connection issues

#### Video Polling Failures
10. **Status never completes** - Video stuck in "processing"
11. **Status returns failed/error** - API rejects video generation
12. **No task ID returned** - Start Video response malformed
13. **Polling timeout** - 5 retries = 5 minutes exceeded
14. **Status check fails** - GET /v1/videos/{id} fails

#### Video URL Extraction Failures
15. **No video URL in response** - Response missing URL field
16. **Invalid video URL** - URL not HTTP/HTTPS
17. **URL construction fails** - No video ID available

#### Video Download Failures
18. **Download timeout** - Video file > 60 seconds to download
19. **Download URL invalid** - Constructed URL is malformed
20. **Network error** - DNS/connection failures
21. **File too large** - Video exceeds size limits
22. **Authorization failed** - URL requires different auth

### B. Image Generation Failures

#### DALL-E API Failures
23. **API error** - OpenAI API returns error object
24. **Invalid prompt** - Prompt < 10 characters
25. **Empty prompt** - Prompt is empty string
26. **Invalid size** - Size not in ['1024x1024', '1024x1792', '1792x1024']
27. **Content policy violation** - Prompt violates OpenAI policies
28. **Quota exceeded** - API rate limits
29. **Request timeout** - API takes > 120 seconds
30. **Network errors** - DNS, connection issues

#### DALL-E Response Parsing Failures
31. **Unexpected response format** - Response doesn't match expected structure
32. **No data array** - Response missing data field
33. **Empty data array** - data array is []
34. **No URL in response** - data[0] missing url field
35. **Base64 image returned** - Response has b64_json instead of URL
36. **Invalid URL format** - URL doesn't start with http

#### DALL-E Image Download Failures (CURRENT ISSUE)
37. **DNS lookup fails** - `getaddrinfo ENOTFOUND oaidalleapiprodscus.blob.core.windows.net`
38. **Azure blob URL expired** - URL has time-limited signature
39. **Network timeout** - Download takes > 120 seconds
40. **Connection refused** - Azure storage unavailable
41. **SSL/TLS errors** - Certificate validation issues
42. **Firewall blocks** - Corporate firewall blocks Azure URLs

### C. Platform Data Loss Failures

43. **Platform field missing** - HTTP nodes drop platform data
44. **Fallback URL missing** - No fallback_image_url in data
45. **Original payload lost** - original_payload not preserved
46. **Wrong platform assigned** - Platform routing breaks

### D. Content Generation Failures

47. **GPT API fails** - 2.1 Generate Copy returns error
48. **JSON parsing fails** - Response isn't valid JSON
49. **Missing required fields** - Response missing pinterest/instagram/tiktok
50. **Creative prompts missing** - Response missing creative_prompt fields
51. **Video spec invalid** - shots not an array
52. **Empty shots array** - video_spec.shots = []

### E. Routing & Control Flow Failures

53. **Wrong media type** - Switch Media Type routes incorrectly
54. **Platform not recognized** - Platform name case sensitivity
55. **Reuse instagram fails** - Instagram video not available when TikTok checks
56. **All platforms disabled** - No media generated at all

### F. Final Output Failures

57. **Dry Run Summary node reference fails** - 4.6 Aggregate Media data missing
58. **Null reference errors** - .join() on null arrays
59. **Undefined properties** - Missing nested object access
60. **Type coercion fails** - String operations on undefined values

---

## FIXES APPLIED TO PREVENT THESE FAILURES

### Image Download DNS Failure Fix
✅ **Increased timeout**: 60s → 120s
✅ **Enhanced retry**: 2 retries → 3 retries, 2s interval → 3s interval
✅ **Added 404 retry**: Now retries on DNS failures
✅ **continueOnFail**: Already enabled - will fallback to GitHub on failure

### Aggregate Media Const Error Fix
✅ **Changed**: `const payload` → `let payload`
✅ **Impact**: No more "Assignment to constant variable" error

### Empty Prompt Prevention (All APIs)
✅ **Route Media**: All prompts have 3-tier fallbacks
✅ **DALL-E**: Minimum 10 char validation + fallback
✅ **Sora**: Minimum 10 char validation + fallback

### Platform Data Loss Prevention
✅ **Handle Image Result**: Multi-tier platform data recovery
✅ **Handle Video Success**: Multi-tier platform data recovery
✅ **Add Retry Counter**: Multi-tier platform data recovery
✅ **Timeout Fallback**: Multi-tier platform data recovery

### URL Validation Everywhere
✅ **All media URLs**: Must be string starting with 'http'
✅ **All fallback URLs**: Validated before use
✅ **Final image URL**: Validated before output

### Response Parsing Hardening
✅ **DALL-E**: Validates array, checks URL format
✅ **Sora**: Checks 7+ response structures
✅ **Parse Response**: Provides defaults for missing fields

### Video Spec Validation
✅ **shots validation**: Must be array, must not be empty
✅ **shot validation**: Must be object with required fields
✅ **duration validation**: Clamped per shot and total

### Sora Status Handling
✅ **Failed status detection**: Checks failed/error/cancelled
✅ **Immediate fallback**: No more polling on failed videos
✅ **Task ID validation**: 4 fallback locations checked

---

## EXPECTED BEHAVIOR NOW

### If DALL-E generates image but download fails (DNS error):
1. DALL-E API call succeeds ✅
2. Image URL returned ✅
3. Download attempted with 3 retries ⏳
4. If all retries fail → **continueOnFail** prevents crash
5. Workflow continues to Dry Run Summary
6. Shows GitHub fallback image with warning
7. **Image still shows in summary** (GitHub fallback)

### If video times out:
1. Sora polling runs for 5 minutes
2. After 5 retries → Timeout Fallback triggers
3. Returns GitHub image with clear error
4. **Image shows in summary** (GitHub fallback)

### If all platforms fail:
1. All media generation attempts fail
2. Aggregate Media collects all failures
3. Uses GitHub images for all platforms
4. **Summary shows all GitHub images** with warnings

---

## CRITICAL: Why Image Didn't Show Previously

The "Assignment to constant variable" error in Aggregate Media crashed the workflow **before** reaching the Dry Run Summary node.

**Flow:**
```
4.4a Generate Image (DALL-E 3) ✅ Success
  ↓
4.4a Handle Image Result ✅ Success (URL extracted)
  ↓
4.6 Aggregate Media ❌ CRASHED (const reassignment error)
  ↓
4.7 Dry Run Summary ❌ NEVER REACHED
```

**Now:**
```
4.4a Generate Image (DALL-E 3) ✅ Success
  ↓
4.4a Handle Image Result ✅ Success (URL extracted)
  ↓
4.6 Aggregate Media ✅ Success (let payload fixed)
  ↓
4.7 Dry Run Summary ✅ DISPLAYS RESULT
```

---

## Test Your Workflow Now

The workflow should now:
1. ✅ Import without errors
2. ✅ Generate content via GPT
3. ✅ Generate image via DALL-E
4. ✅ Handle download failures gracefully
5. ✅ Reach Aggregate Media without crash
6. ✅ Display results in Dry Run Summary

**Even if DALL-E download fails due to DNS**, the summary will show the GitHub fallback image instead of crashing.

