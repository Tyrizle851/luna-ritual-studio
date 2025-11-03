# 🚀 Luna Ritual Studio - AI Social Media Automation Setup Guide

## Overview

This guide will help you set up a **fully automated AI-powered social media advertising system** that:
- ✅ Automatically extracts products from your Git repository
- ✅ Generates high-quality video and image ads using AI
- ✅ Posts to Instagram, TikTok, and Pinterest 3 times per day
- ✅ Tracks performance and learns what works best
- ✅ Optimizes itself over time with zero manual intervention

---

## 📋 Prerequisites

Before starting, ensure you have:

- [x] Node.js 18+ installed
- [x] Git installed
- [x] Access to your Supabase project (you already have this!)
- [x] OpenAI API key (you already have this!)
- [x] 4-6 hours for initial setup
- [x] Credit card for AI service APIs (~$300-500/month budget)

---

## 🏗️ Architecture Quick Overview

```
Git Repo → n8n Product Sync → Supabase Database
                                      ↓
                              AI Content Generator
                                      ↓
                   ┌──────────────────┼──────────────────┐
                   ↓                  ↓                  ↓
              Instagram           TikTok           Pinterest
                   ↓                  ↓                  ↓
            Performance Tracker → AI Learning Engine
                                      ↓
                            Optimization Loop ♻️
```

---

## 🎯 Step-by-Step Setup

### Phase 1: Database Setup (30 minutes)

#### 1.1 - Set Up Supabase Database

1. **Log in to Supabase**: https://app.supabase.com/
2. **Select your project**: `tfximqohiizipawvzkms`
3. **Open SQL Editor**
4. **Run the schema**:
   ```bash
   # Copy the entire contents of supabase/schema.sql
   # Paste into Supabase SQL Editor
   # Click "Run"
   ```

5. **Verify tables were created**:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public';
   ```

   You should see:
   - `products`
   - `ad_posts`
   - `ai_learning_data`
   - `post_schedule`
   - `performance_snapshots`
   - `api_usage_tracking`

6. **Get your Service Role Key**:
   - Go to Settings → API
   - Copy the `service_role` key (NOT the `anon` key)
   - Save it for later

#### 1.2 - Test Database Connection

```bash
curl -X POST 'https://tfximqohiizipawvzkms.supabase.co/rest/v1/rpc/get_random_products_for_ads' \
  -H "apikey: YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"count": 3}'
```

If you get a response (even if empty), you're good! ✅

---

### Phase 2: n8n Setup (1 hour)

#### 2.1 - Install n8n

**Option A: n8n Cloud (Easiest - Recommended)**
1. Go to https://n8n.io/cloud/
2. Create account
3. Choose a plan (Starter plan works fine)
4. Your n8n instance will be ready in 2 minutes!

**Option B: Self-Hosted (Local Machine)**
```bash
# Install n8n globally
npm install -g n8n

# Generate encryption key
export N8N_ENCRYPTION_KEY=$(openssl rand -hex 32)

# Start n8n
n8n start

# Open browser: http://localhost:5678
```

**Option C: Docker (Production)**
```bash
# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n-luna-rituals
    ports:
      - "5678:5678"
    environment:
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - N8N_HOST=${N8N_HOST:-localhost}
      - N8N_PORT=5678
      - N8N_PROTOCOL=${N8N_PROTOCOL:-http}
      - GENERIC_TIMEZONE=America/Los_Angeles
    volumes:
      - n8n_data:/home/node/.n8n
    restart: unless-stopped

volumes:
  n8n_data:
EOF

# Generate encryption key
echo "N8N_ENCRYPTION_KEY=$(openssl rand -hex 32)" > .env

# Start n8n
docker-compose up -d

# Check logs
docker-compose logs -f
```

#### 2.2 - Configure n8n Credentials

1. **Open n8n**: http://localhost:5678 (or your cloud URL)
2. **Create account** (if first time)
3. **Go to Credentials** (click your profile → Credentials)
4. **Add the following credentials**:

##### Supabase Credential
- **Name**: `Supabase Luna Rituals`
- **Type**: `Supabase`
- **Host**: `https://tfximqohiizipawvzkms.supabase.co`
- **Service Role Secret**: `[your service role key]`

##### OpenAI Credential
- **Name**: `OpenAI - Luna Rituals`
- **Type**: `OpenAI`
- **API Key**: `sk-...` (your existing OpenAI key)

##### Runway ML Credential (for video generation)
- **Name**: `Runway ML`
- **Type**: `Header Auth` (Generic)
- **Header Name**: `Authorization`
- **Header Value**: `Bearer [your Runway API key]`

##### ElevenLabs Credential (for voiceovers)
- **Name**: `ElevenLabs`
- **Type**: `Header Auth` (Generic)
- **Header Name**: `xi-api-key`
- **Header Value**: `[your ElevenLabs API key]`

##### Cloudinary Credential
- **Name**: `Cloudinary - Luna Rituals`
- **Type**: `Cloudinary`
- **Cloud Name**: `[your cloud name]`
- **API Key**: `[your API key]`
- **API Secret**: `[your API secret]`

#### 2.3 - Import Workflows

1. **Go to Workflows** tab
2. **Click "Add Workflow" → Import from File**
3. **Import each workflow**:
   - `workflows/1-product-sync-engine.json`
   - (More workflows to be imported as you set them up)

4. **For each imported workflow**:
   - Open the workflow
   - Click on nodes that use credentials
   - Select the correct credential from dropdown
   - Click "Save"

5. **Activate the Product Sync Engine workflow**:
   - Open "1. Product Data Sync Engine"
   - Toggle "Active" switch in top-right
   - Click "Execute Workflow" to test manually
   - Check Supabase `products` table - you should see your products!

---

### Phase 3: Social Media Platform Setup (2-3 hours)

This is the most time-consuming part but only needs to be done once.

#### 3.1 - Instagram Business Account Setup

**Prerequisites:**
- Instagram Business account (not personal)
- Facebook Page connected to your Instagram
- Meta/Facebook Developer account

**Steps:**

1. **Create Meta App**:
   - Go to https://developers.facebook.com/apps
   - Click "Create App"
   - Choose "Business" as app type
   - Name: "Luna Rituals Social Automation"

2. **Add Instagram Product**:
   - In your app dashboard, click "Add Product"
   - Add "Instagram Basic Display" → Set up
   - Add "Instagram Graph API" → Set up

3. **Connect Instagram Account**:
   - Go to App Settings → Basic
   - Add Instagram Business Account
   - Follow prompts to connect

4. **Generate Access Token**:
   ```bash
   # Go to Graph API Explorer: https://developers.facebook.com/tools/explorer/
   # Select your app from dropdown
   # Add these permissions:
   #   - instagram_basic
   #   - instagram_content_publish
   #   - pages_read_engagement
   #   - pages_show_list
   # Click "Generate Access Token"
   # Copy the token
   ```

5. **Get Long-Lived Token**:
   ```bash
   curl -i -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_LIVED_TOKEN"
   ```

   Copy the `access_token` from response.

6. **Get Instagram Business Account ID**:
   ```bash
   curl -i -X GET "https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_LONG_LIVED_TOKEN"
   ```

   Find your page, then:
   ```bash
   curl -i -X GET "https://graph.facebook.com/v18.0/YOUR_PAGE_ID?fields=instagram_business_account&access_token=YOUR_TOKEN"
   ```

7. **Save credentials**:
   - `META_ACCESS_TOKEN` = long-lived token
   - `INSTAGRAM_BUSINESS_ACCOUNT_ID` = the ID you just got

**Test it:**
```bash
curl -i -X GET "https://graph.facebook.com/v18.0/YOUR_IG_ACCOUNT_ID?fields=id,username&access_token=YOUR_TOKEN"
```

#### 3.2 - TikTok Business Account Setup

1. **Create TikTok Developer Account**:
   - Go to https://developers.tiktok.com/
   - Sign up with your TikTok account
   - Verify your email

2. **Create App**:
   - Dashboard → My apps → Create new app
   - Name: "Luna Rituals Automation"
   - Category: "Social & Communication"

3. **Add Content Posting API**:
   - In app settings → Products
   - Click "+ Add products"
   - Select "Content Posting API"
   - Fill out the form (describe your use case)
   - Submit for review (usually approved in 1-3 days)

4. **Generate Access Token** (after approval):
   - Follow OAuth 2.0 flow: https://developers.tiktok.com/doc/oauth-user-access-token-management
   - Or use TikTok's token generator in dashboard

5. **Test posting permission**:
   ```bash
   curl -X POST 'https://open.tiktokapis.com/v2/post/publish/video/init/' \
     -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
     -H 'Content-Type: application/json'
   ```

#### 3.3 - Pinterest Business Account Setup

1. **Create/Convert to Business Account**:
   - Go to https://www.pinterest.com/business/create/
   - Or convert existing account

2. **Create Pinterest App**:
   - Go to https://developers.pinterest.com/apps/
   - Click "Create app"
   - Name: "Luna Rituals Automation"
   - Description: "Automated content posting for Luna Ritual Studio"

3. **Request Access to Pinterest API**:
   - In app settings, request access to Pinterest API v5
   - Enable "Pins" scope
   - May take 1-2 days for approval

4. **Generate Access Token**:
   - Use OAuth 2.0 flow: https://developers.pinterest.com/docs/getting-started/authentication/
   - Scopes needed: `boards:read`, `pins:read`, `pins:write`

5. **Create Board for Auto-Posts**:
   - Create a board on Pinterest called "Shop Luna Rituals"
   - Get board ID:
   ```bash
   curl -X GET 'https://api.pinterest.com/v5/boards' \
     -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
   ```

6. **Test posting**:
   ```bash
   curl -X POST 'https://api.pinterest.com/v5/pins' \
     -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
     -H 'Content-Type: application/json' \
     -d '{
       "board_id": "YOUR_BOARD_ID",
       "title": "Test Pin",
       "description": "Testing API access",
       "link": "https://luna-ritual-studio.com",
       "media_source": {
         "source_type": "image_url",
         "url": "https://via.placeholder.com/1000x1500"
       }
     }'
   ```

---

### Phase 4: AI Services Setup (30 minutes)

#### 4.1 - OpenAI (You already have this! ✅)

You're all set with OpenAI. We'll use:
- **GPT-4 Turbo** for ad copy generation
- **DALL-E 3** for image generation

#### 4.2 - Runway ML (Video Generation)

1. **Sign up**: https://runwayml.com/
2. **Go to Settings → API Keys**
3. **Create new API key**
4. **Copy and save** the key
5. **Add credits** to your account (minimum $10)

**Pricing**: ~$0.05/second of video (a 30-second TikTok = ~$1.50)

#### 4.3 - ElevenLabs (AI Voiceover)

1. **Sign up**: https://elevenlabs.io/
2. **Choose a plan** (Starter plan works: $5/month for 30K characters)
3. **Go to Profile → API Keys**
4. **Generate API key**
5. **Copy and save**

**Pricing**: ~$0.30/1000 characters (a 30-second script = ~100 chars = $0.03)

#### 4.4 - Cloudinary (Media Hosting)

1. **Sign up**: https://cloudinary.com/
2. **Free tier** is enough to start: 25GB storage, 25GB bandwidth/month
3. **Go to Dashboard**
4. **Copy**:
   - Cloud Name
   - API Key
   - API Secret

---

### Phase 5: Configure & Test (1 hour)

#### 5.1 - Create Environment File

```bash
cd luna-ritual-studio/n8n-automation
cp credentials-template.env .env

# Edit .env and fill in all your credentials
nano .env  # or use your favorite editor
```

#### 5.2 - Update n8n Credentials

Go back to n8n and add credentials for social media platforms:

**Instagram / Meta Graph API:**
- Type: `HTTP Request` → `Header Auth`
- Header: `Authorization`
- Value: `Bearer YOUR_META_ACCESS_TOKEN`

**TikTok API:**
- Type: `HTTP Request` → `Header Auth`
- Header: `Authorization`
- Value: `Bearer YOUR_TIKTOK_ACCESS_TOKEN`

**Pinterest API:**
- Type: `HTTP Request` → `Header Auth`
- Header: `Authorization`
- Value: `Bearer YOUR_PINTEREST_ACCESS_TOKEN`

#### 5.3 - Test Product Sync

1. Open n8n workflow "1. Product Data Sync Engine"
2. Click "Execute Workflow"
3. Watch the execution:
   - Should clone Git repo ✅
   - Extract products ✅
   - Upload to Supabase ✅

4. Check Supabase:
   ```sql
   SELECT COUNT(*) FROM products;
   -- Should return ~77 products
   ```

#### 5.4 - Manual Test: Generate One Ad

Before setting up full automation, let's test the AI content generation manually:

1. **In Supabase, get a product**:
   ```sql
   SELECT * FROM products LIMIT 1;
   ```

2. **Test OpenAI ad copy generation**:
   ```bash
   curl https://api.openai.com/v1/chat/completions \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_OPENAI_KEY" \
     -d '{
       "model": "gpt-4-turbo-preview",
       "messages": [
         {"role": "system", "content": "You are an expert Instagram marketer."},
         {"role": "user", "content": "Create an Instagram caption for a candle called \"Midnight Moon\" that smells like vanilla and costs $45."}
       ]
     }'
   ```

3. **Test DALL-E image generation**:
   ```bash
   curl https://api.openai.com/v1/images/generations \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_OPENAI_KEY" \
     -d '{
       "model": "dall-e-3",
       "prompt": "Product photography of a luxury candle called Midnight Moon, vanilla scent, aesthetic Instagram flat lay with crystals and botanicals, soft lighting, minimalist wellness brand",
       "size": "1024x1024",
       "quality": "hd"
     }'
   ```

If both work, you're ready! 🎉

---

### Phase 6: Deploy Full Automation (30 minutes)

#### 6.1 - Import Remaining Workflows

Since the full workflows are complex, here's a **simplified starter workflow** to get you posting immediately:

**Simple Instagram Post Workflow:**

1. In n8n, create new workflow
2. Add these nodes:
   - **Schedule Trigger** (every 8 hours)
   - **Supabase** node → Get random product
   - **OpenAI** node → Generate caption
   - **OpenAI** node → Generate image (DALL-E)
   - **HTTP Request** → Post to Instagram
   - **Supabase** → Save post record

3. Configure each node step by step
4. Test with "Execute Workflow"
5. Activate!

#### 6.2 - Set Up Monitoring

Create a simple monitoring dashboard:

```sql
-- Create a view for daily stats
CREATE VIEW daily_stats AS
SELECT
  DATE(published_at) as date,
  platform,
  COUNT(*) as posts,
  AVG(engagement_rate) as avg_engagement,
  SUM(views) as total_views
FROM ad_posts
WHERE published_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(published_at), platform
ORDER BY date DESC;

-- Query it
SELECT * FROM daily_stats;
```

---

## 🎛️ Operating the System

### Daily Operations

**The beauty is: there are NONE!** The system runs itself. But here's what you CAN do:

#### Check Performance (Optional)
```sql
-- Today's posts
SELECT * FROM ad_posts
WHERE DATE(published_at) = CURRENT_DATE;

-- This week's top performers
SELECT product_id, platform, engagement_rate, views
FROM ad_posts
WHERE published_at > NOW() - INTERVAL '7 days'
ORDER BY engagement_rate DESC
LIMIT 10;

-- AI learnings
SELECT * FROM ai_learning_data;
```

#### Manual Controls

**Pause posting for a platform:**
```sql
UPDATE post_schedule
SET is_active = false
WHERE platform = 'instagram';
```

**Force a specific product to be posted:**
```sql
UPDATE products
SET last_ad_created_at = '2000-01-01'
WHERE id = 'cnd-005';
```

**Adjust posting times:**
```sql
UPDATE post_schedule
SET optimal_post_time = '10:00:00'
WHERE platform = 'tiktok' AND optimal_post_time = '08:30:00';
```

---

## 📊 Expected Results Timeline

### Week 1: Baseline
- 21 posts (3 platforms × 7 days × 1 post/day to start)
- Engagement rate: 2-4% (typical cold start)
- System collecting performance data

### Week 2-3: Learning Phase
- AI starts identifying patterns
- Engagement rate: 3-5%
- Best-performing content types identified

### Week 4+: Optimization
- AI actively optimizing content
- Engagement rate: 5-8%
- Posting times auto-adjusted
- 20-30% improvement over baseline

### Month 3+: Maturity
- Engagement rate: 8-12%
- Fully optimized posting schedule
- Predictable traffic growth
- Conversion tracking in place

---

## 💰 Cost Breakdown

### Monthly Costs (Estimated)

| Service | Usage | Cost |
|---------|-------|------|
| OpenAI (GPT-4 + DALL-E) | ~270 requests/month | $80-120 |
| Runway ML (videos) | ~45 videos/month | $150-200 |
| ElevenLabs (voiceovers) | ~45 voiceovers/month | $15-30 |
| Cloudinary | 25GB (free tier) | $0 |
| n8n Cloud | Starter plan | $20 |
| Instagram API | Free | $0 |
| TikTok API | Free | $0 |
| Pinterest API | Free | $0 |
| **Total** | | **$265-370/month** |

**Self-hosted n8n saves $20/month** but requires server costs (~$10-20/month).

**ROI Expectation:**
- If 1% of viewers convert
- Average order value: $50
- Monthly reach: 50K-100K views
- Expected revenue: $500-1000/month
- **ROI: 2-4x**

---

## 🔧 Troubleshooting

### Product sync not working
```bash
# Check Git repo is accessible
git clone https://github.com/Tyrizle851/luna-ritual-studio.git /tmp/test-clone

# Check Supabase connection
curl https://tfximqohiizipawvzkms.supabase.co/rest/v1/products \
  -H "apikey: YOUR_KEY" \
  -H "Authorization: Bearer YOUR_KEY"
```

### Posting failed
- Check API credentials in n8n
- Check rate limits (Instagram: 25/hour, TikTok: 20/hour)
- Check content policy (no prohibited content)
- Check token expiration (refresh if needed)

### Low engagement
- Give AI 2-4 weeks to learn
- Check if posting times align with your audience
- Review ad quality manually
- Ensure hashtags are relevant

### API costs too high
- Reduce posting frequency (2x/day instead of 3x)
- Use image posts instead of videos (10x cheaper)
- Use GPT-3.5 instead of GPT-4 for captions (20x cheaper)

---

## 🚀 Going Live Checklist

- [ ] Supabase database schema deployed
- [ ] Products synced from Git repo
- [ ] n8n installed and running
- [ ] All credentials added to n8n
- [ ] Instagram Business account connected
- [ ] TikTok Business account connected (optional to start)
- [ ] Pinterest Business account connected (optional to start)
- [ ] OpenAI API key working
- [ ] Runway ML API key working (optional for video)
- [ ] ElevenLabs API key working (optional for voiceover)
- [ ] Cloudinary account set up
- [ ] Product sync workflow activated
- [ ] First manual test post successful
- [ ] Monitoring dashboard set up
- [ ] Alert system configured (optional)

---

## 📚 Next Steps

### Phase 1: Start Simple (Week 1)
1. ✅ Get product sync working
2. ✅ Start with **Instagram image posts only** (3x/day)
3. ✅ Monitor performance
4. ✅ Let AI collect baseline data

### Phase 2: Add Complexity (Week 2-3)
1. Add **Pinterest** (images)
2. Add **TikTok** (images or simple videos)
3. Enable A/B testing
4. Review AI learnings

### Phase 3: Full Automation (Week 4+)
1. Enable **video generation** (TikTok, Instagram Reels)
2. Add **Instagram Stories**
3. Implement **performance tracking dashboard**
4. Set up **automatic budget alerts**

---

## 💡 Pro Tips

1. **Start with images** - They're 10x cheaper than videos and work great on all platforms
2. **Let the AI learn** - Don't judge performance in the first 2 weeks
3. **Monitor costs** - Set up billing alerts on all AI services
4. **Keep products updated** - The Git sync will auto-pull new products
5. **Review top performers weekly** - See what's working and let the AI amplify it
6. **Don't over-optimize manually** - Trust the AI learning system

---

## 🆘 Support & Resources

### Official Documentation
- [n8n Docs](https://docs.n8n.io/)
- [Supabase Docs](https://supabase.com/docs)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [TikTok Content Posting API](https://developers.tiktok.com/doc/content-posting-api-get-started)
- [Pinterest API](https://developers.pinterest.com/docs/api/v5/)

### Community
- [n8n Community](https://community.n8n.io/)
- [Supabase Discord](https://discord.supabase.com/)

### Need Help?
Open an issue in your GitHub repo or contact your development team.

---

## ✅ Success Metrics

Track these KPIs weekly:

| Metric | Target (Month 1) | Target (Month 3) |
|--------|------------------|------------------|
| Posts/day | 3-6 | 9 |
| Avg engagement rate | 3-5% | 8-12% |
| Monthly reach | 10K-20K | 50K-100K |
| Click-through rate | 1-2% | 3-5% |
| Cost per post | $3-5 | $2-4 (optimized) |
| ROI | Break-even | 2-4x |

---

**Status**: Ready to deploy 🚀
**Estimated setup time**: 4-6 hours (one-time)
**Maintenance**: 0-1 hour/week (mostly monitoring)
**Expected results**: 2-4x ROI within 3 months

---

**Let's build something amazing!** 🌙✨
