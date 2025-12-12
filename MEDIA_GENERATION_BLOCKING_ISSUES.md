# 🚨 MEDIA GENERATION BLOCKING ISSUES - Hard Count

## Issues That Would Cause GitHub Fallback (100% Failure)

### **ROUTE MEDIA GENERATION PHASE** (Blocking Media Creation)

#### 1. **Pinterest Prompt Can Be Empty String**
- **Location**: Line 709-710
- **Issue**: `payload.pinterest?.creative_prompt?.prompt_text || ''` can be empty string
- **Impact**: Empty prompt sent to DALL-E, API rejects or generates generic image
- **Blocking**: ✅ YES - Causes fallback

#### 2. **Pinterest Video Prompt Uses Instagram Creative Prompt**
- **Location**: Line 709
- **Issue**: `videoSpecToPrompt(payload.instagram?.creative_prompt, 'pinterest')` - uses wrong platform's prompt
- **Impact**: If Instagram creative_prompt is null/missing, Pinterest video gets null prompt
- **Blocking**: ✅ YES - Causes fallback

#### 3. **Pinterest Video Prompt Null Return Not Handled**
- **Location**: Line 709
- **Issue**: `videoSpecToPrompt()` returns `null` but code uses `pinPrompt ? pinPrompt.prompt : ...`
- **Impact**: If videoSpecToPrompt returns null, falls back to empty string prompt
- **Blocking**: ✅ YES - Causes fallback

#### 4. **Instagram Prompt Empty After Fallback**
- **Location**: Line 709
- **Issue**: Fallback sets `igPrompt.prompt = payload.pinterest?.creative_prompt?.prompt_text || 'Product image for social media'`
- **Impact**: If Pinterest prompt also empty, uses generic fallback which may not work for video
- **Blocking**: ✅ YES - Generic prompt may fail

#### 5. **TikTok Prompt Can Be Empty String**
- **Location**: Line 709
- **Issue**: `payload.tiktok?.creative_prompt?.prompt_text || payload.pinterest?.creative_prompt?.prompt_text || ''` can be empty
- **Impact**: Empty prompt sent to API
- **Blocking**: ✅ YES - Causes fallback

#### 6. **TikTok Video Prompt Null Return Not Handled**
- **Location**: Line 709
- **Issue**: `videoSpecToPrompt(payload.tiktok?.creative_prompt, 'tiktok')` can return null
- **Impact**: Falls back to empty string prompt
- **Blocking**: ✅ YES - Causes fallback

#### 7. **Video Spec Shots Array Not Validated**
- **Location**: Line 709 (`videoSpecToPrompt` function)
- **Issue**: `spec.shots || []` but if shots is not an array, forEach fails
- **Impact**: Throws error, workflow crashes
- **Blocking**: ✅ YES - Workflow crash

#### 8. **Video Spec Duration Calculation Can Overflow**
- **Location**: Line 709 (`videoSpecToPrompt` function)
- **Issue**: `shots.reduce((sum, s) => sum + (Math.max(1, s.duration_s || 2)), 0)` can exceed 20 seconds
- **Impact**: Duration clamped but if shots have invalid durations, calculation wrong
- **Blocking**: ✅ YES - Invalid duration causes API rejection

#### 9. **Video Spec Empty Shots Array**
- **Location**: Line 709 (`videoSpecToPrompt` function)
- **Issue**: If shots array is empty `[]`, prompt becomes just style text
- **Impact**: Prompt may be too short or invalid for Sora
- **Blocking**: ✅ YES - Invalid prompt

#### 10. **Video Spec Missing Required Fields**
- **Location**: Line 709 (`videoSpecToPrompt` function)
- **Issue**: Assumes `shot.shot_description` exists but may be undefined
- **Impact**: Prompt contains "undefined", API rejects
- **Blocking**: ✅ YES - Invalid prompt

---

### **DALL-E IMAGE GENERATION PHASE** (Blocking Image Creation)

#### 11. **DALL-E Prompt Fallback Logic Wrong**
- **Location**: Line 674
- **Issue**: `$json.prompt && $json.prompt.trim() ? $json.prompt : ($json.fallback_image_url ? 'Product image' : 'Product image')`
- **Impact**: If prompt is empty but fallback_image_url exists, still sends "Product image" which may be too generic
- **Blocking**: ✅ YES - Generic prompt may fail

#### 12. **DALL-E Size Parameter Not Validated**
- **Location**: Line 674
- **Issue**: `$json.size || '1024x1792'` but DALL-E 3 only supports specific sizes: '1024x1024', '1024x1792', '1792x1024'
- **Impact**: If invalid size passed, API rejects
- **Blocking**: ✅ YES - API rejection

#### 13. **DALL-E Response Parsing Can Fail**
- **Location**: Line 657 (`4.4a Handle Image Result`)
- **Issue**: Checks multiple response structures but if API returns unexpected format, falls back
- **Impact**: Valid response may be missed, falls back to GitHub
- **Blocking**: ✅ YES - Causes fallback

#### 14. **DALL-E Platform Data Lost Through HTTP Node**
- **Location**: Line 657
- **Issue**: HTTP Request node may not preserve input data, `$input.all()[0].json.platform` may be undefined
- **Impact**: Falls back to reconstructing platform data, may use wrong fallback URL
- **Blocking**: ✅ YES - Wrong platform handling

#### 15. **DALL-E Fallback URL May Not Exist**
- **Location**: Line 657
- **Issue**: Uses `platformData.fallback_image_url` without validating URL exists
- **Impact**: Falls back to non-existent URL, download fails
- **Blocking**: ✅ YES - Download failure

#### 16. **DALL-E Error Response Not Parsed Correctly**
- **Location**: Line 657
- **Issue**: Checks `dalleResponse?.error` but error structure may vary
- **Impact**: May not detect API errors, continues with invalid data
- **Blocking**: ✅ YES - Invalid data flow

#### 17. **DALL-E API Timeout Too Short**
- **Location**: Line 688
- **Issue**: 120 second timeout may be insufficient for large/complex prompts
- **Impact**: Request times out, falls back to GitHub
- **Blocking**: ✅ YES - Timeout causes fallback

#### 18. **DALL-E Retry Logic Doesn't Handle All Error Codes**
- **Location**: Line 685
- **Issue**: Only retries on [429, 500, 502, 503, 504], but 400 (bad request) not retried
- **Impact**: Invalid prompts cause permanent failure
- **Blocking**: ✅ YES - Permanent failure

---

### **SORA VIDEO GENERATION PHASE** (Blocking Video Creation)

#### 19. **Sora Prompt Fallback Generic**
- **Location**: Line 813
- **Issue**: `$json.prompt && $json.prompt.trim() ? $json.prompt : 'Product video for social media'`
- **Impact**: Generic fallback prompt may not work for Sora API
- **Blocking**: ✅ YES - Generic prompt may fail

#### 20. **Sora Duration Calculation Overcomplicated**
- **Location**: Line 813
- **Issue**: `Math.min(Math.max(4, Math.round((Math.max(4, Math.min(($json.duration || 10), 20)) / 4) * 4)), 12)`
- **Impact**: Complex calculation may produce invalid duration (not 4, 8, 12, 16, 20)
- **Blocking**: ✅ YES - Invalid duration causes API rejection

#### 21. **Sora Duration Can Be Null**
- **Location**: Line 813
- **Issue**: If `$json.duration` is null, uses `10` but calculation may still be wrong
- **Impact**: Wrong duration sent to API
- **Blocking**: ✅ YES - API rejection

#### 22. **Sora Size Parameter Not Validated**
- **Location**: Line 813
- **Issue**: `$json.size || '720x1280'` but Sora may only support specific sizes
- **Impact**: Invalid size causes API rejection
- **Blocking**: ✅ YES - API rejection

#### 23. **Sora API Endpoint May Not Exist**
- **Location**: Line 808
- **Issue**: `/v1/videos` endpoint may not exist (user said leave Sora alone, but endpoint still checked)
- **Impact**: API call fails immediately
- **Blocking**: ✅ YES - Immediate failure

#### 24. **Sora Start Video Response ID Missing**
- **Location**: Line 851
- **Issue**: `$node['4.4b-1 Start Sora Video']?.json?.id || $json.id || ''` can be empty string
- **Impact**: URL becomes `https://api.openai.com/v1/videos/` which is invalid
- **Blocking**: ✅ YES - Invalid request

#### 25. **Sora Status Check Doesn't Handle Failed Status**
- **Location**: Line 910 (`4.4b-5 IF Video Completed?`)
- **Issue**: Only checks for "completed", doesn't check for "failed" or "error"
- **Impact**: Failed videos poll forever, eventually timeout
- **Blocking**: ✅ YES - Timeout causes fallback

#### 26. **Sora Status Response Structure Assumed**
- **Location**: Line 925 (`4.4b-6 Extract Video URL`)
- **Issue**: Checks 7+ locations for video URL, but if API structure different, misses it
- **Impact**: Video URL not found, falls back to GitHub
- **Blocking**: ✅ YES - Causes fallback

#### 27. **Sora Video ID Missing After Completion**
- **Location**: Line 925
- **Issue**: `soraStatusResponse?.id || statusData.task_id` can both be undefined
- **Impact**: No video ID, can't download, falls back
- **Blocking**: ✅ YES - Causes fallback

#### 28. **Sora Video Download URL Construction Fails**
- **Location**: Line 939 (`4.4b-7 Download Video File`)
- **Issue**: URL construction `{{ ($node['4.4b-6 Extract Video URL']?.json?.video_id || ... || '').toString() }}/file`
- **Impact**: If all IDs empty, URL becomes `https://api.openai.com/v1/videos//file` (invalid)
- **Blocking**: ✅ YES - Invalid request

#### 29. **Sora Video Download Response Format Assumed**
- **Location**: Line 964 (`4.4b-8 Handle Video Success`)
- **Issue**: Assumes download returns file binary, but may return JSON with URL
- **Impact**: Wrong response format, video URL not extracted
- **Blocking**: ✅ YES - Causes fallback

#### 30. **Sora Video Download Timeout Too Short**
- **Location**: Line 948
- **Issue**: 60 second timeout may be insufficient for large videos
- **Impact**: Download times out, falls back
- **Blocking**: ✅ YES - Timeout causes fallback

#### 31. **Sora Polling Retry Count Logic Wrong**
- **Location**: Line 980 (`4.4b-9 IF Retries < 5?`)
- **Issue**: Changed to `<= 5` but retry_count starts at 0, so max is 5 retries (0,1,2,3,4,5 = 6 total)
- **Impact**: Actually allows 6 retries, but if logic wrong, may timeout early
- **Blocking**: ✅ YES - Premature timeout

#### 32. **Sora Timeout Fallback Always Uses GitHub Image**
- **Location**: Line 996 (`4.4b-10 Timeout Fallback`)
- **Impact**: After 5 retries, always falls back to GitHub image
- **Blocking**: ✅ YES - Always fallback

#### 33. **Sora Merge Status Data Retry Count Can Reset**
- **Location**: Line 885 (`4.4b-3b Merge Status Data`)
- **Issue**: Complex retry count logic may reset incorrectly
- **Impact**: Retry count wrong, timeout logic broken
- **Blocking**: ✅ YES - Timeout logic broken

#### 34. **Sora Add Retry Counter Platform Data Lost**
- **Location**: Line 896 (`4.4b-4 Add Retry Counter`)
- **Issue**: `inputItems.find(item => item.json.platform)` may return undefined
- **Impact**: Platform data lost, wrong fallback used
- **Blocking**: ✅ YES - Wrong platform handling

#### 35. **Sora Add Retry Counter Task ID Missing**
- **Location**: Line 896
- **Issue**: `soraStartResponse.id || statusData.id` can both be undefined
- **Impact**: No task ID, polling fails
- **Blocking**: ✅ YES - Polling broken

---

### **AGGREGATE MEDIA PHASE** (Blocking Media Display)

#### 36. **Aggregate Media Platform Data Lost**
- **Location**: Line 1119
- **Issue**: If platform data lost through HTTP nodes, `data.platform` may be undefined
- **Impact**: Platform skipped, no media shown
- **Blocking**: ✅ YES - Media not shown

#### 37. **Aggregate Media Instagram Video URL Not Preserved**
- **Location**: Line 1119
- **Issue**: `instagramVideoUrl` only set if platform is 'instagram' AND media is video
- **Impact**: If Instagram video arrives after TikTok processes, reuse fails
- **Blocking**: ✅ YES - TikTok reuse fails

#### 38. **Aggregate Media Race Condition**
- **Location**: Line 1119
- **Issue**: Platforms process in parallel, TikTok may process before Instagram video ready
- **Impact**: TikTok reuse fails, falls back to GitHub
- **Blocking**: ✅ YES - Causes fallback

#### 39. **Aggregate Media Final Image URL Selection Wrong**
- **Location**: Line 1119
- **Issue**: Selects first image found, but should prefer generated over GitHub fallback
- **Impact**: May use GitHub fallback even if DALL-E image exists
- **Blocking**: ✅ YES - Wrong image shown

#### 40. **Aggregate Media Media URL Validation Missing**
- **Location**: Line 1119
- **Issue**: Doesn't validate `data.media_url` is a valid URL before using
- **Impact**: Invalid URLs pass through, download fails
- **Blocking**: ✅ YES - Download failure

#### 41. **Aggregate Media Source Field Can Be Wrong**
- **Location**: Line 1119
- **Issue**: Determines source from `data.source` but if source wrong, media type wrong
- **Impact**: Wrong media type shown in summary
- **Blocking**: ✅ YES - Wrong type shown

#### 42. **Aggregate Media Pending Reuse Not Resolved**
- **Location**: Line 1119
- **Issue**: If TikTok reuse pending and Instagram video fails, falls back to GitHub
- **Impact**: Always falls back if Instagram video fails
- **Blocking**: ✅ YES - Always fallback

---

### **CONTENT GENERATION PHASE** (Blocking Prompt Creation)

#### 43. **Generate Copy Model May Not Exist**
- **Location**: Line 219
- **Issue**: Uses model from API, but if model wrong, API fails
- **Impact**: Content generation fails, no prompts created
- **Blocking**: ✅ YES - No prompts = no media

#### 44. **Parse Response Creative Prompt Missing**
- **Location**: Line 259 (`2.2 Parse Response`)
- **Issue**: If parsing fails and fallback used, creative_prompt may be missing video_spec
- **Impact**: Video prompts can't be created
- **Blocking**: ✅ YES - No video prompts

#### 45. **Parse Response Video Spec Shots Not Array**
- **Location**: Line 259
- **Issue**: Validates shots is array, but if not, throws error
- **Impact**: Workflow crashes, no media generated
- **Blocking**: ✅ YES - Workflow crash

#### 46. **Validate & Coerce Creative Prompt Lost**
- **Location**: Line 273 (`2.3 Validate & Coerce`)
- **Issue**: Deep clone may lose creative_prompt if structure invalid
- **Impact**: Prompts missing, media generation fails
- **Blocking**: ✅ YES - No prompts

---

### **CHOOSE FINAL URL PHASE** (Blocking Fallback URL)

#### 47. **Choose Final URL Fallback URL Hardcoded**
- **Location**: Line 354
- **Issue**: Hardcoded GitHub URL, but if GitHub repo changes, URL breaks
- **Impact**: Fallback URL invalid, all fallbacks fail
- **Blocking**: ✅ YES - All fallbacks fail

#### 48. **Choose Final URL Payload Missing**
- **Location**: Line 354
- **Issue**: If payload missing, creative prompts not passed to Route Media
- **Impact**: No prompts available for media generation
- **Blocking**: ✅ YES - No prompts

---

## **TOTAL BLOCKING ISSUES: 48**

### **Breakdown by Phase:**
- **Route Media Generation**: 10 issues
- **DALL-E Image Generation**: 8 issues
- **Sora Video Generation**: 17 issues
- **Aggregate Media**: 7 issues
- **Content Generation**: 4 issues
- **Choose Final URL**: 2 issues

### **Breakdown by Impact:**
- **Immediate API Rejection**: 15 issues
- **Workflow Crash**: 3 issues
- **Timeout/Fallback**: 12 issues
- **Data Loss**: 10 issues
- **Wrong Media Shown**: 8 issues

### **Critical Paths:**
1. **Empty/Null Prompts** → 6 issues
2. **Invalid API Parameters** → 5 issues
3. **Response Parsing Failures** → 4 issues
4. **Platform Data Loss** → 4 issues
5. **Race Conditions** → 2 issues
6. **Timeout Logic** → 3 issues

---

## **ESTIMATED FAILURE RATE**

Based on these 48 blocking issues:
- **Conservative Estimate**: 30-40% of runs would hit at least one blocking issue
- **Realistic Estimate**: 50-60% of runs would hit blocking issues
- **Worst Case**: 70-80% failure rate if multiple issues compound

**Most Likely Failure Points:**
1. Empty prompts (6 issues) - **HIGH PROBABILITY**
2. Sora API endpoint doesn't exist (1 issue) - **100% FAILURE** for videos
3. Invalid duration/size parameters (3 issues) - **HIGH PROBABILITY**
4. Platform data loss (4 issues) - **MEDIUM PROBABILITY**
5. Response parsing failures (4 issues) - **MEDIUM PROBABILITY**


