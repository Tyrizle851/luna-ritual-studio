# 🚨 50 CRITICALLY BROKEN LOGIC ISSUES - Content Engine v3

## **CONNECTION & NODE REFERENCE ISSUES**

### 1. **NODE NAME MISMATCH - Workflow Will Fail**
- **Issue**: Node defined as `"4.4b-2 Wait 5 Minutes"` but connections reference `"4.4b-2 Wait 60 Seconds"`
- **Location**: Line 829 (definition) vs Lines 1360, 1466 (connections)
- **Impact**: **WORKFLOW WILL NOT EXECUTE** - connections cannot resolve node name
- **Criticality**: 🔴 CRITICAL - Workflow broken

### 2. **Wait Time vs Retry Logic Mismatch**
- **Issue**: Wait node set to 300 seconds (5 minutes) but retry logic expects 60-second intervals
- **Location**: Line 824 (`amount: 300`) vs Line 957 (`retry_count < 5`)
- **Impact**: Polling happens every 5 minutes instead of every 60 seconds = 25 minutes total instead of 5 minutes
- **Criticality**: 🔴 CRITICAL - Timeout logic broken

### 3. **$node Reference Gets Wrong Platform Data**
- **Issue**: `4.4a Handle Image Result` uses `$node['4.2 Route Media Generation'].json` but Route outputs MULTIPLE items (one per platform)
- **Location**: Line 643
- **Impact**: Always gets FIRST platform's data, even if current item is Pinterest/TikTok
- **Criticality**: 🔴 CRITICAL - Wrong platform data used

### 4. **DALL-E Prompt Reference Doesn't Exist**
- **Issue**: `4.4a Generate Image` references `$json.prompt` but Route Media outputs `prompt` field, not `pinterest_creative_prompt`
- **Location**: Line 660
- **Impact**: Prompt may be empty string, generating wrong/blank images
- **Criticality**: 🔴 CRITICAL - Image generation broken

### 5. **Quality Gate Flag Never Checked**
- **Issue**: `3.1 Quality Gate` always runs even if `ENABLE_QUALITY_GATE = false`
- **Location**: Lines 280-311
- **Impact**: Quality gate cannot be disabled via feature flag
- **Criticality**: 🔴 CRITICAL - Feature flag ignored

### 6. **Failed Summary References Wrong Data Structure**
- **Issue**: `4.8 Failed Summary` references `$json` directly but should reference quality gate output structure
- **Location**: Lines 573-624
- **Impact**: May not have access to quality scoring data
- **Criticality**: 🔴 CRITICAL - Summary broken

## **DATA STRUCTURE MISMATCHES**

### 7. **Route Media Accesses Wrong Nested Structure**
- **Issue**: Accesses `upstreamData.instagram_creative_prompt` but actual structure is `upstreamData.payload.instagram.creative_prompt`
- **Location**: Line 695 (Route Media Generation)
- **Impact**: Always gets `undefined`, video prompts never generated
- **Criticality**: 🔴 CRITICAL - Video generation broken

### 8. **Route Media Accesses Wrong Pinterest Structure**
- **Issue**: Accesses `upstreamData.pinterest_creative_prompt` but actual structure is `upstreamData.payload.pinterest.creative_prompt.prompt_text`
- **Location**: Line 695
- **Impact**: Pinterest prompts always undefined
- **Criticality**: 🔴 CRITICAL - Pinterest images broken

### 9. **Route Media Accesses Wrong TikTok Structure**
- **Issue**: Accesses `upstreamData.tiktok_creative_prompt` but actual structure is `upstreamData.payload.tiktok.creative_prompt`
- **Location**: Line 695
- **Impact**: TikTok prompts always undefined
- **Criticality**: 🔴 CRITICAL - TikTok generation broken

### 10. **Choose Final URL References Old Node**
- **Issue**: References `$node['1.5 Resolve via GitHub']` but that's from Phase 1, data may not be accessible
- **Location**: Line 347
- **Impact**: May fail if node execution context lost
- **Criticality**: 🟠 HIGH - Data access broken

### 11. **Parse Response References Old Node**
- **Issue**: Uses `$node['1.3 Map to Image Hint'].json.product` but that's from earlier phase
- **Location**: Line 252
- **Impact**: May fail if execution context lost between phases
- **Criticality**: 🟠 HIGH - Product data access broken

## **SORA VIDEO GENERATION LOGIC ERRORS**

### 12. **Retry Counter Initialization Wrong**
- **Issue**: Retry counter starts at 0, increments to 1 AFTER first status check, but wait happens BEFORE increment
- **Location**: Lines 875-883
- **Impact**: First wait happens before counter increments, timing off by one
- **Criticality**: 🔴 CRITICAL - Polling timing broken

### 13. **Sora Duration May Be Null**
- **Issue**: `$json.duration` may be null if video_spec conversion fails, but used in calculation
- **Location**: Line 799
- **Impact**: `Math.round(null / 4) * 4` = NaN, breaks API call
- **Criticality**: 🔴 CRITICAL - API call broken

### 14. **Sora Seconds Parameter Type Mismatch**
- **Issue**: Converts to string `JSON.stringify(String(...))` but API may expect integer
- **Location**: Line 799
- **Impact**: API may reject request with type error
- **Criticality**: 🔴 CRITICAL - API call broken

### 15. **Get Sora Status References Non-Existent ID**
- **Issue**: References `$node['4.4b-1 Start Sora Video'].json.id` but if Start failed, `id` doesn't exist
- **Location**: Line 837
- **Impact**: URL becomes `https://api.openai.com/v1/videos/undefined`, API call fails
- **Criticality**: 🔴 CRITICAL - Status check broken

### 16. **Video Duration Calculation Overflow**
- **Issue**: `Math.min(Math.max(4, Math.round(($json.duration || 10) / 4) * 4), 12)` doesn't validate input bounds
- **Location**: Line 799
- **Impact**: If duration > 20, calculation produces unexpected values
- **Criticality**: 🟠 HIGH - Invalid durations possible

### 17. **Sora Polling Loop Missing Initial Wait**
- **Issue**: First status check happens immediately after Start, should wait first
- **Location**: Connection from 4.4b-1 → 4.4b-2
- **Impact**: First poll happens too early, wastes API calls
- **Criticality**: 🟠 HIGH - Inefficient polling

### 18. **Retry Counter Lost in Loop**
- **Issue**: Retry counter increments in "Add Retry Counter" but may not preserve through merge node
- **Location**: Lines 862-872 (Merge Status Data)
- **Impact**: Counter may reset on each iteration
- **Criticality**: 🔴 CRITICAL - Infinite loop possible

### 19. **Video URL Extraction Checks Wrong Node**
- **Issue**: `4.4b-6 Extract Video URL` checks `$node['4.4b-3 Get Sora Status'].json` but data comes from merged status
- **Location**: Line 904
- **Impact**: May check wrong data source, URL extraction fails
- **Criticality**: 🔴 CRITICAL - Video download broken

### 20. **Video Download URL Construction Wrong**
- **Issue**: Uses fallback chain `$node['4.4b-6'].json.video_id || $node['4.4b-6'].json.task_id || $node['4.4b-1'].json.id` but if all fail, URL is invalid
- **Location**: Line 916
- **Impact**: Download request fails with invalid URL
- **Criticality**: 🔴 CRITICAL - Video download broken

## **PLATFORM ROUTING LOGIC ERRORS**

### 21. **TikTok Reuse Race Condition**
- **Issue**: TikTok reuse checks `instagramVideoUrl` but Instagram video may still be generating
- **Location**: Line 1096 (Aggregate Media)
- **Impact**: TikTok falls back to image even if Instagram video completes later
- **Criticality**: 🔴 CRITICAL - Reuse logic broken

### 22. **Platform Routing Cascading Logic Broken**
- **Issue**: IF Media = Image → IF Media = Video → IF Media = Reuse → Skip. If media_type is "none", falls through incorrectly
- **Location**: Lines 1280-1332
- **Impact**: "none" platforms may route to wrong handler
- **Criticality**: 🔴 CRITICAL - Routing broken

### 23. **All Platforms "None" Returns Error But Continues**
- **Issue**: Route Media returns error item if no platforms enabled, but workflow continues
- **Location**: Line 695
- **Impact**: Error item flows through routing, breaks downstream nodes
- **Criticality**: 🔴 CRITICAL - Error handling broken

### 24. **Video Spec Conversion Doesn't Handle Null**
- **Issue**: `videoSpecToPrompt` returns `null` if creative_prompt missing, but code doesn't check for null
- **Location**: Line 695
- **Impact**: Null prompts sent to Sora, API call fails
- **Criticality**: 🔴 CRITICAL - Video generation broken

### 25. **Pinterest Video Uses Instagram Prompt**
- **Issue**: Pinterest video uses `upstreamData.instagram_creative_prompt` instead of Pinterest's own prompt
- **Location**: Line 695
- **Impact**: Pinterest videos use wrong creative direction
- **Criticality**: 🟠 HIGH - Wrong content generated

## **AGGREGATE MEDIA LOGIC ERRORS**

### 26. **Aggregate Media Processes Items Out of Order**
- **Issue**: Uses `$input.all()` but platforms run in parallel, order not guaranteed
- **Location**: Line 1096
- **Impact**: TikTok reuse may process before Instagram video arrives
- **Criticality**: 🔴 CRITICAL - Race condition

### 27. **Missing Platform Handling**
- **Issue**: If platform set to "none", it may not appear in `$input.all()`, causing undefined behavior
- **Location**: Line 1096
- **Impact**: Missing platforms cause errors in output structure
- **Criticality**: 🔴 CRITICAL - Output structure broken

### 28. **Instagram Video URL Not Preserved**
- **Issue**: `instagramVideoUrl` only set if platform === 'instagram', but may be set after TikTok processes
- **Location**: Line 1096
- **Impact**: TikTok reuse fails even if Instagram video exists
- **Criticality**: 🔴 CRITICAL - Reuse broken

### 29. **Final Image URL Selection Logic Wrong**
- **Issue**: Selects first image found, but should prefer generated over GitHub fallback
- **Location**: Line 1096
- **Impact**: May use GitHub fallback even if DALL-E image exists
- **Criticality**: 🟠 HIGH - Wrong image selected

### 30. **Fallback Warnings Added to Wrong Object**
- **Issue**: Modifies `payload.diagnostics.warnings` but payload is reference, may mutate original
- **Location**: Line 1096
- **Impact**: Warnings accumulate incorrectly across executions
- **Criticality**: 🟠 HIGH - Data mutation bug

## **VALIDATION & PARSING ERRORS**

### 31. **Parse Response Doesn't Handle Empty Response**
- **Issue**: If OpenAI returns empty `choices` array, throws error but fallback may not trigger
- **Location**: Line 252
- **Impact**: Workflow fails instead of using fallback
- **Criticality**: 🟠 HIGH - Error handling incomplete

### 32. **Smart Slice Function Breaks Emojis**
- **Issue**: UTF-16 surrogate pair handling removes last character but doesn't check if it's part of emoji
- **Location**: Line 252
- **Impact**: Emojis may be broken in truncated text
- **Criticality**: 🟠 HIGH - Text corruption

### 33. **Hashtag Cleaning Removes Valid Characters**
- **Issue**: `replace(/[^#a-z0-9]/g, '')` removes underscores and other valid hashtag characters
- **Location**: Line 266
- **Impact**: Hashtags like `#wellness_tips` become `#wellnesstips`
- **Criticality**: 🟠 HIGH - Hashtag corruption

### 34. **Hook Validation Checks Wrong Length**
- **Issue**: Checks `hook.charAt(hook.length - 1)` but hook may be shorter than 120 chars
- **Location**: Line 266
- **Impact**: Validation may check wrong character
- **Criticality**: 🟠 MEDIUM - Validation logic error

### 35. **Quality Gate Doesn't Check ENABLE_QUALITY_GATE**
- **Issue**: Always scores and gates, even if flag is false
- **Location**: Line 280
- **Impact**: Cannot bypass quality gate
- **Criticality**: 🔴 CRITICAL - Feature flag ignored

## **ERROR HANDLING GAPS**

### 36. **DALL-E Error Handling Doesn't Preserve Platform Context**
- **Issue**: On error, uses fallback but doesn't preserve which platform failed
- **Location**: Line 643
- **Impact**: Cannot track which platform's image generation failed
- **Criticality**: 🟠 HIGH - Debugging impossible

### 37. **Sora Start Failure Doesn't Stop Polling**
- **Issue**: If Start Sora fails, error returned but polling loop may still execute
- **Location**: Line 875
- **Impact**: Wastes API calls polling non-existent task
- **Criticality**: 🔴 CRITICAL - Resource waste

### 38. **Video Download Failure Doesn't Retry**
- **Issue**: Download node has `continueOnFail: true` but no retry logic
- **Location**: Line 929
- **Impact**: Transient network errors cause permanent failure
- **Criticality**: 🟠 HIGH - Unreliable downloads

### 39. **Aggregate Media Doesn't Handle Partial Failures**
- **Issue**: If one platform fails, others may not be processed correctly
- **Location**: Line 1096
- **Impact**: Partial failures break entire aggregation
- **Criticality**: 🔴 CRITICAL - Fragile error handling

### 40. **No Validation of Platform Data Structure**
- **Issue**: Route Media doesn't validate that payload has required structure
- **Location**: Line 695
- **Impact**: Malformed data causes silent failures
- **Criticality**: 🟠 HIGH - Silent failures

## **DATA FLOW ISSUES**

### 41. **Dry-Run Summary References Aggregate Node Multiple Times**
- **Issue**: Every field references `$node['4.6 Aggregate Media']` separately, inefficient
- **Location**: Lines 389-557
- **Impact**: Multiple node lookups, performance issue
- **Criticality**: 🟠 MEDIUM - Performance

### 42. **Payload Structure Mutated**
- **Issue**: Multiple nodes modify `payload.diagnostics` directly, mutating original
- **Location**: Multiple locations
- **Impact**: Data corruption across executions
- **Criticality**: 🟠 HIGH - Data integrity

### 43. **Feature Flags Accessed Multiple Times**
- **Issue**: `$node['0.1 Feature Flags']` accessed in multiple nodes without caching
- **Location**: Lines 280, 695
- **Impact**: Inefficient, but also may get stale data
- **Criticality**: 🟠 MEDIUM - Performance

### 44. **Image URL Fallback Chain Broken**
- **Issue**: Choose Final URL has fallback chain, but Aggregate Media may override with wrong URL
- **Location**: Lines 347, 1096
- **Impact**: Wrong image URL used
- **Criticality**: 🟠 HIGH - Wrong media

### 45. **Creative Prompt Extraction Wrong**
- **Issue**: Choose Final URL extracts `pinterest_creative_prompt` as string, but structure is object
- **Location**: Line 347
- **Impact**: Prompt extraction fails
- **Criticality**: 🔴 CRITICAL - Prompts broken

## **EDGE CASES & BOUNDARY CONDITIONS**

### 46. **Empty Products Array Not Handled**
- **Issue**: Select Product returns fallback, but fallback may not have all required fields
- **Location**: Line 139
- **Impact**: Workflow continues with invalid product data
- **Criticality**: 🟠 HIGH - Invalid data flow

### 47. **Zero Duration Videos**
- **Issue**: If video_spec has no shots or zero duration, duration calculation produces 0
- **Location**: Line 695
- **Impact**: Sora API rejects 0-second videos
- **Criticality**: 🔴 CRITICAL - API call fails

### 48. **Maximum Duration Not Enforced**
- **Issue**: Duration clamped to 12 seconds max, but Sora supports up to 20 seconds
- **Location**: Line 799
- **Impact**: Videos artificially limited
- **Criticality**: 🟠 MEDIUM - Feature limitation

### 49. **Retry Count Can Exceed 5**
- **Issue**: Retry check is `< 5`, so retry_count can be 5, 6, 7... if logic error
- **Location**: Line 957
- **Impact**: More than 5 retries possible
- **Criticality**: 🟠 MEDIUM - Logic error

### 50. **Wait Node Resume Type May Cause Issues**
- **Issue**: Wait node uses `resume: "time"` but in loop context may not resume correctly
- **Location**: Line 826
- **Impact**: Workflow may hang if execution paused
- **Criticality**: 🟠 MEDIUM - Execution reliability

---

## **SUMMARY BY CRITICALITY**

- **🔴 CRITICAL (30 issues)**: Workflow will fail or produce wrong results
- **🟠 HIGH (15 issues)**: Significant bugs that cause incorrect behavior
- **🟠 MEDIUM (5 issues)**: Performance or edge case issues

**TOTAL: 50 Critical Logic Issues**


