# 🎯 n8n Content Engine v3 - Implementation Plan

## Current Status

Based on our previous work, we've created an updated workflow JSON file with:
- ✅ Multi-platform media type flags (Pinterest, Instagram, TikTok)
- ✅ Route Media Generation node (4.2)
- ✅ Cascading IF nodes for media routing (4.3a, 4.3b, 4.3c)
- ✅ DALL-E 3 image generation node (4.4a)
- ✅ Sora 2 video generation nodes (4.4b-1, 4.4b-2)
- ✅ Aggregate Media node (4.5)
- ✅ Updated Dry-Run Summary (4.6)

**File Ready:** `Content Engine v3 (Multi-Platform Viral Copy Generator).json`

---

## 📋 Next Steps - Implementation Plan

### Phase 1: Immediate Tasks (Testing Phase)

#### Step 1: Import Updated Workflow ⏰ 5 minutes
**Action:** Import the updated JSON file into n8n
- Navigate to workflow: https://lunastudios.app.n8n.cloud/workflow/C0Rzd37yUjTdCTMT
- Click three dots menu → "Import from File"
- Select: `Content Engine v3 (Multi-Platform Viral Copy Generator).json`
- Confirm import

**Expected Result:**
- New nodes appear: Route Media Generation, IF nodes, DALL-E 3, Sora 2, Aggregate Media
- Workflow structure updated with proper connections

#### Step 2: Configure OpenAI Credentials ⏰ 5 minutes
**Action:** Set up OpenAI credentials for DALL-E 3 and Sora 2
- Go to Credentials tab
- Verify OpenAI API key has access to:
  - ✅ DALL-E 3
  - ✅ Sora 2 (sora-2 model)
  - ✅ GPT-5 (gpt-5-chat-latest)

**Notes:**
- If DALL-E 3 access fails, fallback to GitHub images works
- Sora 2 may have limited access (beta)

#### Step 3: Test with Dry Run ⏰ 10 minutes
**Action:** Execute workflow in test mode
- Click "Execute Workflow" button
- Watch execution flow through nodes
- Check Dry-Run Summary output

**What to Verify:**
- ✅ Feature flags are set correctly
- ✅ Copy generation works (GPT-5)
- ✅ Quality gate passes/fails appropriately
- ✅ Media routing works (image/video/none)
- ✅ DALL-E 3 generates images
- ✅ Sora 2 initiates video generation
- ✅ Aggregate Media combines results
- ✅ Dry-Run Summary displays correctly

#### Step 4: Review Test Results ⏰ 15 minutes
**Action:** Analyze test execution
- Check each node's output
- Verify error handling
- Test fallback mechanisms
- Review quality scores

**Key Checkpoints:**
- ❓ Did copy generation work?
- ❓ Was quality score calculated?
- ❓ Did media routing work correctly?
- ❓ Did image generation succeed or fallback?
- ❓ Did video generation initiate?
- ❓ Did aggregate merge all platforms?

---

### Phase 2: Refinement Tasks (Optimization Phase)

#### Step 5: Handle Sora 2 Polling ⏰ 30 minutes
**Issue:** Current polling is simplified (returns task ID for manual check)
**Action:** Implement proper async video generation handling

**Options:**

**Option A: Manual Polling (Current)**
- Keep simplified polling
- Check Sora 2 status manually via API
- Use static image fallback if timeout

**Option B: Separate Polling Workflow**
- Create dedicated "Sora Video Poller" workflow
- Trigger it after Sora initiation
- Wait 5 minutes, check status, download video
- Update main workflow when complete

**Option C: Webhook-Based**
- Set up webhook endpoint
- Sora 2 API calls webhook when complete
- Main workflow continues with video URL

**Recommendation:** Start with Option A, move to Option B if needed

#### Step 6: Optimize Quality Gate Threshold ⏰ 15 minutes
**Action:** Fine-tune quality scoring
- Run multiple tests with different products
- Track quality scores (currently in Feature Flags: 60)
- Adjust threshold based on results

**Testing:**
- Test with 5-10 different products
- Note quality scores
- Identify what passes/fails
- Adjust threshold if needed (50-70 range)

#### Step 7: Test Media Fallbacks ⏰ 20 minutes
**Action:** Verify fallback mechanisms work
- Test with DALL-E 3 disabled
- Test with Sora 2 unavailable
- Test with network errors
- Verify GitHub image fallback works

**Expected Behavior:**
- ❓ DALL-E 3 fails → GitHub image used
- ❓ Sora 2 fails → Static image used
- ❓ No images available → Uses placeholder
- ❓ Errors logged in diagnostics

#### Step 8: Validate Brand Voice ⏰ 30 minutes
**Action:** Review generated copy for brand consistency
- Execute workflow multiple times
- Review copy for all platforms
- Check for "Luna Ritual Studio" voice
- Verify natural product references

**Quality Checks:**
- ❓ Does copy sound like Luna Ritual Studio?
- ❓ Are product references natural?
- ❓ Is it affiliate-friendly (curated, not owned)?
- ❓ Are hooks compelling?
- ❓ Are hashtags strategic?

---

### Phase 3: Production Readiness (Deployment Phase)

#### Step 9: Enable Actual Posting ⏰ 30 minutes
**Action:** Add nodes to post content to platforms
**New Nodes to Add:**
- Post to Pinterest (HTTP Request)
- Post to Instagram (HTTP Request)
- Post to TikTok (HTTP Request)

**Configuration Needed:**
- Pinterest API credentials
- Instagram API credentials
- TikTok API credentials
- Board/Account IDs

#### Step 10: Set Up Scheduling ⏰ 15 minutes
**Action:** Configure workflow triggers
- Replace Manual Trigger with Schedule Trigger
- Set posting frequency (e.g., once daily)
- Configure time of day

**Options:**
- Daily at specific time (9 AM)
- Multiple times per day (9 AM, 3 PM)
- Weekly schedule

#### Step 11: Add Performance Tracking ⏰ 45 minutes
**Action:** Implement analytics
**New Nodes to Add:**
- Log to Database (Supabase/Airtable)
- Track metrics:
  - Product posted
  - Platform
  - Copy version
  - Quality score
  - Media type
  - Timestamp

**Purpose:** A/B testing and performance analysis

#### Step 12: Error Monitoring & Alerts ⏰ 30 minutes
**Action:** Add error handling and notifications
**New Nodes to Add:**
- Error Trigger (catches workflow errors)
- Send Alert (Email/Slack/Discord)
- Log Error to Database

**Notifications:**
- Workflow failures
- API errors
- Quality gate failures
- Media generation failures

---

### Phase 4: Advanced Features (Enhancement Phase)

#### Step 13: Implement Sora 2 Complete Integration ⏰ 2 hours
**Action:** Full async video generation with polling
- Implement proper polling loop
- Wait up to 5 minutes for completion
- Download and store video
- Update workflow with video URL
- Fallback to static image on timeout

**Technical Implementation:**
- Use n8n Wait node or Loop node
- Poll Sora API every 30 seconds
- Max 10 attempts (5 minutes)
- Store video in cloud storage
- Update post with video URL

#### Step 14: Add Multi-Product Batching ⏰ 1 hour
**Action:** Process multiple products at once
- Modify workflow to handle product arrays
- Loop through products
- Generate content for each
- Batch post to platforms

**Benefits:**
- Process entire product catalog
- Schedule content in advance
- Efficient bulk generation

#### Step 15: Implement Content Calendar ⏰ 2 hours
**Action:** Smart scheduling system
- Store generated content in queue
- Schedule posts across days/weeks
- Avoid duplicate products
- Optimize posting times per platform

**Components:**
- Content queue database
- Scheduler logic
- Duplicate detection
- Platform-specific timing

#### Step 16: A/B Testing System ⏰ 2 hours
**Action:** Test multiple copy variations
- Generate 2-3 variations per product
- Post different versions
- Track performance
- Learn which style performs best

**Metrics to Track:**
- Click-through rate
- Engagement rate
- Conversion rate
- Revenue attribution

---

## 🎯 Priority Matrix

### High Priority (Do First)
1. ✅ Import updated workflow
2. ✅ Configure credentials
3. ✅ Test with dry run
4. ✅ Review test results
5. ✅ Handle Sora 2 polling
6. ✅ Optimize quality gate

### Medium Priority (Do Next)
7. Test media fallbacks
8. Validate brand voice
9. Enable actual posting
10. Set up scheduling
11. Add performance tracking

### Low Priority (Do Later)
12. Error monitoring & alerts
13. Implement Sora 2 complete integration
14. Add multi-product batching
15. Implement content calendar
16. A/B testing system

---

## 📊 Implementation Timeline

### Week 1: Testing & Refinement
- Days 1-2: Import, test, review
- Days 3-4: Optimize and refine
- Day 5: Final testing

### Week 2: Production Setup
- Days 1-2: Configure posting APIs
- Days 3-4: Set up scheduling & tracking
- Day 5: Go live with monitoring

### Week 3: Enhancement
- Days 1-3: Implement advanced features
- Days 4-5: A/B testing setup

---

## 🔧 Technical Checklist

### Before Import
- [ ] Backup current workflow
- [ ] Review updated JSON file
- [ ] Prepare OpenAI credentials

### After Import
- [ ] Verify node connections
- [ ] Check node configurations
- [ ] Test each node individually
- [ ] Test full workflow execution

### Before Production
- [ ] Test with real product data
- [ ] Verify all fallbacks work
- [ ] Configure platform APIs
- [ ] Set up error monitoring
- [ ] Create rollback plan

---

## ⚠️ Known Issues & Solutions

### Issue 1: Sora 2 Polling
**Status:** Simplified implementation
**Solution:** Manual polling or separate workflow
**Timeline:** Phase 2, Step 5

### Issue 2: Quality Gate Threshold
**Status:** Set to 60, needs tuning
**Solution:** Test with multiple products, adjust
**Timeline:** Phase 2, Step 6

### Issue 3: Video Fallback
**Status:** Uses static image
**Solution:** Working as designed, no action needed
**Timeline:** N/A

---

## 📝 Notes

### Testing Mode
- Currently in dry-run mode (no actual posting)
- Safe to test multiple times
- Review Dry-Run Summary for each test

### Feature Flags
Location: Node 0.1 (Set - Feature Flags)
- `QUALITY_THRESHOLD`: 60 (adjust as needed)
- `PINTEREST_MEDIA_TYPE`: "image" (image/video/none)
- `INSTAGRAM_MEDIA_TYPE`: "video" (image/video/none)
- `TIKTOK_MEDIA_TYPE`: "reuse_instagram" (image/video/reuse_instagram/none)

### Brand Voice
- "Luna Ritual Studio" curation model
- Natural product references ("this linen robe")
- Avoid "Our [Product]" or "We use/love"
- Affiliate-friendly language

---

## 🚀 Quick Start (If Starting Now)

1. **Sign in to n8n:** https://lunastudios.app.n8n.cloud/signin
2. **Navigate to workflow:** C0Rzd37yUjTdCTMT
3. **Import file:** `Content Engine v3 (Multi-Platform Viral Copy Generator).json`
4. **Test execution:** Click "Execute Workflow"
5. **Review results:** Check Dry-Run Summary node
6. **Iterate:** Adjust based on results

---

## 📞 Next Actions

**Immediate (Today):**
1. Sign in to n8n
2. Import updated workflow
3. Run test execution
4. Share results for review

**Short-term (This Week):**
5. Optimize based on test results
6. Fine-tune quality threshold
7. Test media generation

**Long-term (Next 2-3 Weeks):**
8. Enable production posting
9. Set up monitoring
10. Implement advanced features

---

**Last Updated:** 2024-11-14  
**Status:** Ready for Testing Phase  
**Next Step:** Import workflow and test execution

