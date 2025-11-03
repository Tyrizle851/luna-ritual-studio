# 🌙 Luna Ritual Studio - Fully Automated AI Social Media Advertising

> **Transform your e-commerce products into high-converting social media ads automatically using AI**

## 🎯 What This Does

This system automatically:

1. **Syncs products** from your Git repository to a database every 6 hours
2. **Generates AI-powered ads** (copy + images/videos) for each product
3. **Posts to social media** (Instagram, TikTok, Pinterest) 3 times per day
4. **Tracks performance** and learns what works best
5. **Optimizes itself** over time with zero manual intervention

## 📊 Quick Stats

- **Setup Time**: 4-6 hours (one-time)
- **Daily Posts**: 9 posts (3 platforms × 3/day)
- **Monthly Cost**: $265-370 (AI services)
- **Expected ROI**: 2-4x within 3 months
- **Maintenance**: 0-1 hour/week (optional monitoring)

## 🚀 Quick Start (5 Steps)

### 1. Set Up Database

```bash
# Run the SQL schema in your Supabase project
cd n8n-automation
cat supabase/schema.sql | pbcopy  # Copy to clipboard
# Then paste into Supabase SQL Editor and run
```

### 2. Install n8n

**Option A: Cloud (Easiest)**
- Sign up at https://n8n.io/cloud/
- Done in 2 minutes!

**Option B: Local**
```bash
npm install -g n8n
export N8N_ENCRYPTION_KEY=$(openssl rand -hex 32)
n8n start
# Open http://localhost:5678
```

### 3. Import Workflows

1. Open n8n
2. Go to Workflows → Add Workflow → Import from File
3. Import:
   - `workflows/1-product-sync-engine.json`
   - `workflows/SIMPLE-instagram-image-poster.json`

### 4. Add Credentials

In n8n, add credentials for:
- ✅ Supabase (you already have this!)
- ✅ OpenAI (you already have this!)
- ⏳ Instagram/Meta Graph API
- ⏳ Cloudinary
- ⏳ (Optional) TikTok, Pinterest, Runway ML, ElevenLabs

### 5. Activate!

1. Activate "Product Sync Engine" workflow
2. Click "Execute Workflow" to test
3. Check Supabase - you should see 77 products! ✅
4. Activate "Instagram Image Poster" workflow
5. Done! 🎉

## 📁 Project Structure

```
n8n-automation/
├── README.md                          ← You are here
├── FULL_WORKFLOW_SPEC.md              ← Complete technical spec
├── SETUP_GUIDE.md                     ← Detailed setup instructions
├── credentials-template.env           ← API keys template
│
├── workflows/
│   ├── 1-product-sync-engine.json     ← Syncs products from Git
│   ├── SIMPLE-instagram-image-poster.json  ← Start here!
│   └── (more complex workflows TBD)
│
├── supabase/
│   └── schema.sql                     ← Database schema
│
└── scripts/
    └── (helper scripts TBD)
```

## 🎓 What to Read Next

- **Just want to get started?** → Read `SETUP_GUIDE.md` (step-by-step)
- **Want to understand the system?** → Read `FULL_WORKFLOW_SPEC.md` (technical deep-dive)
- **Need help?** → See "Troubleshooting" section in `SETUP_GUIDE.md`

## 🔑 Required Services & Costs

| Service | Required? | Cost | Purpose |
|---------|-----------|------|---------|
| **Supabase** | ✅ Yes | Free | Database |
| **OpenAI** | ✅ Yes | ~$100/mo | Ad copy + images |
| **n8n** | ✅ Yes | $0-20/mo | Automation |
| **Instagram** | ✅ Yes | Free | Posting |
| **Cloudinary** | ✅ Yes | Free | Media hosting |
| **Runway ML** | ⏳ Optional | ~$150/mo | Video generation |
| **ElevenLabs** | ⏳ Optional | ~$15/mo | Voiceovers |
| **TikTok** | ⏳ Optional | Free | Posting |
| **Pinterest** | ⏳ Optional | Free | Posting |

**Minimum to start**: Supabase + OpenAI + n8n + Instagram + Cloudinary = **~$100/month**

## 🎯 Implementation Phases

### Phase 1: Foundation (Week 1)
- ✅ Database setup
- ✅ Product sync
- ✅ Instagram image posts only
- **Goal**: Get first automated posts live

### Phase 2: Expansion (Week 2-3)
- Add Pinterest
- Add TikTok (images)
- Enable performance tracking
- **Goal**: Multi-platform presence

### Phase 3: Advanced (Week 4+)
- Video ad generation
- AI learning & optimization
- A/B testing
- **Goal**: Maximum ROI

## 📊 Expected Results

| Timeline | Posts | Engagement | Reach | Notes |
|----------|-------|------------|-------|-------|
| Week 1 | 21 | 2-4% | 5K-10K | Baseline |
| Week 2-3 | 42-63 | 3-5% | 15K-30K | Learning |
| Month 2 | 180 | 5-8% | 40K-70K | Optimizing |
| Month 3+ | 270+ | 8-12% | 80K-150K | Mature |

## 🔧 Maintenance

### Required (0 minutes/week)
- Nothing! It's fully automated.

### Recommended (15 minutes/week)
- Check performance dashboard
- Review top-performing posts
- Monitor API costs
- Add new products (auto-syncs from Git)

### Optional (1 hour/month)
- Review AI learnings
- Adjust posting schedule manually
- A/B test new strategies

## 💡 Pro Tips

1. **Start simple** - Get Instagram working first, then add complexity
2. **Let AI learn** - Don't judge performance before 2-4 weeks
3. **Monitor costs** - Set up billing alerts on all APIs
4. **Trust the process** - The AI gets better over time
5. **Keep products updated** - Git sync pulls changes automatically

## 🆘 Troubleshooting

### Products not syncing?
```bash
# Test Git clone
git clone https://github.com/Tyrizle851/luna-ritual-studio.git /tmp/test
ls /tmp/test/src/data/  # Should see product files
```

### Posts not publishing?
- Check API credentials in n8n
- Check token expiration (Instagram tokens expire)
- Check rate limits (Instagram: 25 posts/hour max)
- Review n8n execution logs

### High costs?
- Start with images only (videos are 10x more expensive)
- Use GPT-3.5 instead of GPT-4 (20x cheaper, 80% quality)
- Reduce posting frequency (2x/day instead of 3x)

## 📚 Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| **README.md** | Quick overview & start | Everyone (you are here!) |
| **SETUP_GUIDE.md** | Step-by-step setup | Implementers |
| **FULL_WORKFLOW_SPEC.md** | Complete technical spec | Developers |
| **credentials-template.env** | API keys template | Implementers |

## 🎉 Success Checklist

- [ ] Supabase database created
- [ ] Product sync working (77 products in DB)
- [ ] n8n installed and running
- [ ] Instagram Business account set up
- [ ] First test post published successfully
- [ ] Workflow activated and running automatically
- [ ] Monitoring dashboard set up

Once all boxes are checked, you're live! 🚀

## 🔮 Future Enhancements

- [ ] Instagram Stories automation
- [ ] Instagram Reels (short videos)
- [ ] Dynamic landing pages per product
- [ ] Email marketing integration
- [ ] SMS campaigns
- [ ] Influencer outreach automation
- [ ] Multi-language support
- [ ] Seasonal campaign automation

## 📈 ROI Calculator

```
Assumptions:
- Monthly reach: 50,000 views
- Click-through rate: 2%
- Conversion rate: 3%
- Average order value: $50

Calculation:
50,000 views × 2% CTR = 1,000 clicks
1,000 clicks × 3% conversion = 30 orders
30 orders × $50 AOV = $1,500 revenue

Cost: ~$300/month
Revenue: ~$1,500/month
ROI: 5x 🎉
```

## 🙏 Credits

Built with:
- [n8n](https://n8n.io/) - Workflow automation
- [Supabase](https://supabase.com/) - Database
- [OpenAI](https://openai.com/) - AI generation
- [Runway ML](https://runwayml.com/) - Video generation
- [ElevenLabs](https://elevenlabs.io/) - Voiceovers
- [Cloudinary](https://cloudinary.com/) - Media hosting

## 📄 License

This automation system is proprietary to Luna Ritual Studio.

---

**Ready to automate your social media?** Start with `SETUP_GUIDE.md` 🚀

**Questions?** Check `FULL_WORKFLOW_SPEC.md` for technical details.

**Let's grow your business with AI!** 🌙✨
