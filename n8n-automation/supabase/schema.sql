-- ============================================
-- Luna Ritual Studio - Supabase Schema
-- Fully Automated AI Social Media Advertising
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for text search

-- ============================================
-- TABLE: products
-- Synced from Git repository TypeScript files
-- ============================================

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'affirmations', 'candles', 'fashion', 'supplements'
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,

  -- Product details (varies by category)
  brand TEXT,
  scent TEXT,
  burn_time TEXT,
  servings TEXT,
  sizes TEXT[],
  colors TEXT[],
  benefits TEXT[],
  formats TEXT[], -- for affirmations

  -- Media
  image_url TEXT NOT NULL,
  image_local_path TEXT,
  additional_images TEXT[],

  -- SEO & Discovery
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,

  -- Ad Generation Metadata
  synced_at TIMESTAMP DEFAULT NOW(),
  last_ad_created_at TIMESTAMP,
  total_ads_created INTEGER DEFAULT 0,
  avg_engagement_rate NUMERIC DEFAULT 0,
  best_performing_platform TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_last_ad ON products(last_ad_created_at NULLS FIRST);
CREATE INDEX IF NOT EXISTS idx_products_engagement ON products(avg_engagement_rate DESC);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING GIN(tags);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING GIN(
  to_tsvector('english', name || ' ' || description || ' ' || COALESCE(brand, ''))
);

-- ============================================
-- TABLE: ad_posts
-- All generated and published ads
-- ============================================

CREATE TABLE IF NOT EXISTS ad_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,

  -- Platform & Type
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok', 'pinterest')),
  post_type TEXT NOT NULL CHECK (post_type IN ('image', 'video', 'carousel', 'story', 'reel')),

  -- Generated Content
  caption TEXT NOT NULL,
  media_urls TEXT[] NOT NULL,
  hashtags TEXT[],
  cta TEXT,

  -- AI Generation Metadata
  ai_prompt TEXT,
  ai_model_used TEXT,
  ai_concept JSONB, -- full AI-generated concept
  generation_time_seconds INTEGER,
  generation_cost_usd NUMERIC,

  -- Publishing Details
  scheduled_for TIMESTAMP NOT NULL,
  published_at TIMESTAMP,
  platform_post_id TEXT,
  platform_post_url TEXT,
  publish_status TEXT DEFAULT 'scheduled' CHECK (
    publish_status IN ('scheduled', 'publishing', 'published', 'failed')
  ),
  publish_error TEXT,

  -- Performance Metrics
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  engagement_rate NUMERIC DEFAULT 0,
  conversion_count INTEGER DEFAULT 0,
  revenue_generated NUMERIC DEFAULT 0,

  -- A/B Testing
  ad_variant TEXT, -- 'a', 'b', 'c'
  test_group TEXT,
  is_control BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ad_posts_platform ON ad_posts(platform);
CREATE INDEX IF NOT EXISTS idx_ad_posts_product ON ad_posts(product_id);
CREATE INDEX IF NOT EXISTS idx_ad_posts_scheduled ON ad_posts(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_ad_posts_published ON ad_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_ad_posts_engagement ON ad_posts(engagement_rate DESC);
CREATE INDEX IF NOT EXISTS idx_ad_posts_status ON ad_posts(publish_status);

-- ============================================
-- TABLE: ai_learning_data
-- AI-discovered patterns and insights
-- ============================================

CREATE TABLE IF NOT EXISTS ai_learning_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_category TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok', 'pinterest')),

  -- Winning Strategies
  winning_prompts JSONB, -- [{prompt: "...", avg_engagement: 5.2, sample_size: 10}]
  winning_hashtags TEXT[],
  winning_post_times TIME[],
  winning_video_lengths INTEGER[], -- in seconds
  winning_music_styles TEXT[],
  winning_visual_styles TEXT[],
  winning_ctas TEXT[],
  winning_caption_styles JSONB,

  -- Performance Benchmarks
  avg_engagement_rate NUMERIC,
  best_engagement_rate NUMERIC,
  avg_conversion_rate NUMERIC,
  avg_click_rate NUMERIC,

  -- Statistical Data
  total_posts_analyzed INTEGER,
  date_range_start DATE,
  date_range_end DATE,

  -- AI-Generated Insights
  insights TEXT,
  recommended_optimizations JSONB,
  confidence_score NUMERIC, -- 0-100

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Unique constraint: one learning record per category+platform
CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_learning_category_platform
  ON ai_learning_data(product_category, platform);

CREATE INDEX IF NOT EXISTS idx_ai_learning_updated ON ai_learning_data(updated_at DESC);

-- ============================================
-- TABLE: post_schedule
-- Optimized posting schedule (auto-updated by AI)
-- ============================================

CREATE TABLE IF NOT EXISTS post_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok', 'pinterest')),
  optimal_post_time TIME NOT NULL,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday, 6=Saturday, NULL=all days
  timezone TEXT DEFAULT 'America/Los_Angeles',

  -- Performance Data
  avg_engagement_at_time NUMERIC,
  sample_size INTEGER,

  -- Control
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0, -- higher = more important

  -- Metadata
  last_performance_check TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_post_schedule_active ON post_schedule(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_post_schedule_platform ON post_schedule(platform);
CREATE INDEX IF NOT EXISTS idx_post_schedule_time ON post_schedule(optimal_post_time);

-- ============================================
-- TABLE: performance_snapshots
-- Daily performance summaries for analytics
-- ============================================

CREATE TABLE IF NOT EXISTS performance_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  snapshot_date DATE NOT NULL,
  platform TEXT NOT NULL,

  -- Aggregate Metrics
  total_posts INTEGER,
  total_views INTEGER,
  total_engagement INTEGER,
  avg_engagement_rate NUMERIC,
  total_clicks INTEGER,
  total_conversions INTEGER,
  total_revenue NUMERIC,

  -- Top Performers
  top_post_id UUID REFERENCES ad_posts(id),
  top_product_id TEXT REFERENCES products(id),

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_performance_snapshots_date_platform
  ON performance_snapshots(snapshot_date, platform);

CREATE INDEX IF NOT EXISTS idx_performance_snapshots_date ON performance_snapshots(snapshot_date DESC);

-- ============================================
-- TABLE: api_usage_tracking
-- Track API costs and usage
-- ============================================

CREATE TABLE IF NOT EXISTS api_usage_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service TEXT NOT NULL, -- 'openai', 'runway', 'elevenlabs', etc.
  operation TEXT NOT NULL, -- 'image-generation', 'video-generation', etc.
  cost_usd NUMERIC NOT NULL,
  tokens_used INTEGER,
  request_time_ms INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  related_ad_id UUID REFERENCES ad_posts(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_api_usage_service ON api_usage_tracking(service);
CREATE INDEX IF NOT EXISTS idx_api_usage_created ON api_usage_tracking(created_at DESC);

-- ============================================
-- FUNCTIONS: Helper Functions
-- ============================================

-- Function: Get random products for ad creation (weighted by performance)
CREATE OR REPLACE FUNCTION get_random_products_for_ads(count INTEGER)
RETURNS TABLE (
  id TEXT,
  name TEXT,
  category TEXT,
  description TEXT,
  price NUMERIC,
  image_url TEXT,
  tags TEXT[],
  benefits TEXT[],
  brand TEXT,
  scent TEXT,
  last_ad_created_at TIMESTAMP,
  avg_engagement_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.category,
    p.description,
    p.price,
    p.image_url,
    p.tags,
    p.benefits,
    p.brand,
    p.scent,
    p.last_ad_created_at,
    p.avg_engagement_rate
  FROM products p
  WHERE p.in_stock = true
  ORDER BY
    -- Prioritize products with no recent ads
    COALESCE(p.last_ad_created_at, '1970-01-01'::TIMESTAMP) ASC,
    -- Then by low ad count
    p.total_ads_created ASC,
    -- Add randomness
    RANDOM()
  LIMIT count;
END;
$$ LANGUAGE plpgsql;

-- Function: Calculate engagement rate
CREATE OR REPLACE FUNCTION calculate_engagement_rate(
  views_count INTEGER,
  likes_count INTEGER,
  comments_count INTEGER,
  shares_count INTEGER,
  saves_count INTEGER
)
RETURNS NUMERIC AS $$
BEGIN
  IF views_count = 0 THEN
    RETURN 0;
  END IF;

  RETURN (
    (COALESCE(likes_count, 0) +
     COALESCE(comments_count, 0) * 2 + -- comments worth 2x
     COALESCE(shares_count, 0) * 3 + -- shares worth 3x
     COALESCE(saves_count, 0) * 2) -- saves worth 2x
    ::NUMERIC / NULLIF(views_count, 0)
  ) * 100;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function: Aggregate performance metrics for AI learning
CREATE OR REPLACE FUNCTION aggregate_performance_metrics()
RETURNS TABLE (
  product_category TEXT,
  platform TEXT,
  total_posts INTEGER,
  avg_engagement_rate NUMERIC,
  best_engagement_rate NUMERIC,
  winning_hashtags TEXT[],
  winning_post_times TIME[],
  insights JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.category,
    ap.platform,
    COUNT(ap.id)::INTEGER as total_posts,
    AVG(ap.engagement_rate) as avg_engagement_rate,
    MAX(ap.engagement_rate) as best_engagement_rate,

    -- Most used hashtags in top 20% of posts
    ARRAY(
      SELECT DISTINCT unnest(ap2.hashtags)
      FROM ad_posts ap2
      WHERE ap2.product_id = p.id
        AND ap2.platform = ap.platform
        AND ap2.engagement_rate > (
          SELECT PERCENTILE_CONT(0.8) WITHIN GROUP (ORDER BY engagement_rate)
          FROM ad_posts
          WHERE product_id = p.id AND platform = ap.platform
        )
      LIMIT 10
    ) as winning_hashtags,

    -- Best posting times (from top performers)
    ARRAY(
      SELECT DISTINCT published_at::TIME
      FROM ad_posts ap2
      WHERE ap2.product_id = p.id
        AND ap2.platform = ap.platform
        AND ap2.engagement_rate > (
          SELECT PERCENTILE_CONT(0.8) WITHIN GROUP (ORDER BY engagement_rate)
          FROM ad_posts
          WHERE product_id = p.id AND platform = ap.platform
        )
      ORDER BY published_at::TIME
      LIMIT 5
    ) as winning_post_times,

    -- Insights JSON
    jsonb_build_object(
      'total_views', SUM(ap.views),
      'total_clicks', SUM(ap.clicks),
      'total_conversions', SUM(ap.conversion_count),
      'avg_click_rate', AVG(ap.clicks::NUMERIC / NULLIF(ap.views, 0)) * 100,
      'top_performing_post_id', (
        SELECT id FROM ad_posts
        WHERE product_id = p.id AND platform = ap.platform
        ORDER BY engagement_rate DESC
        LIMIT 1
      )
    ) as insights

  FROM products p
  JOIN ad_posts ap ON p.id = ap.product_id
  WHERE ap.published_at IS NOT NULL
    AND ap.published_at > NOW() - INTERVAL '30 days'
  GROUP BY p.category, ap.platform
  HAVING COUNT(ap.id) >= 5; -- only include if we have enough data
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS: Auto-update timestamps
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ad_posts_updated_at BEFORE UPDATE ON ad_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_learning_updated_at BEFORE UPDATE ON ai_learning_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_post_schedule_updated_at BEFORE UPDATE ON post_schedule
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TRIGGERS: Auto-calculate engagement rate
-- ============================================

CREATE OR REPLACE FUNCTION auto_calculate_engagement_rate()
RETURNS TRIGGER AS $$
BEGIN
  NEW.engagement_rate = calculate_engagement_rate(
    NEW.views,
    NEW.likes,
    NEW.comments,
    NEW.shares,
    NEW.saves
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_ad_posts_engagement BEFORE INSERT OR UPDATE ON ad_posts
  FOR EACH ROW EXECUTE FUNCTION auto_calculate_engagement_rate();

-- ============================================
-- TRIGGERS: Update product stats when ad is published
-- ============================================

CREATE OR REPLACE FUNCTION update_product_ad_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.published_at IS NOT NULL AND OLD.published_at IS NULL THEN
    UPDATE products
    SET
      last_ad_created_at = NEW.published_at,
      total_ads_created = total_ads_created + 1
    WHERE id = NEW.product_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_stats_on_publish AFTER UPDATE ON ad_posts
  FOR EACH ROW EXECUTE FUNCTION update_product_ad_stats();

-- ============================================
-- SEED DATA: Default posting schedule
-- ============================================

-- Clear existing schedule
TRUNCATE TABLE post_schedule;

-- Instagram - 3x daily
INSERT INTO post_schedule (platform, optimal_post_time, avg_engagement_at_time, priority)
VALUES
  ('instagram', '09:00:00', 0, 1),
  ('instagram', '14:00:00', 0, 2),
  ('instagram', '19:00:00', 0, 3);

-- TikTok - 3x daily (slightly offset from Instagram)
INSERT INTO post_schedule (platform, optimal_post_time, avg_engagement_at_time, priority)
VALUES
  ('tiktok', '08:30:00', 0, 1),
  ('tiktok', '13:30:00', 0, 2),
  ('tiktok', '18:30:00', 0, 3);

-- Pinterest - 3x daily (offset for different audience)
INSERT INTO post_schedule (platform, optimal_post_time, avg_engagement_at_time, priority)
VALUES
  ('pinterest', '10:00:00', 0, 1),
  ('pinterest', '15:00:00', 0, 2),
  ('pinterest', '20:00:00', 0, 3);

-- ============================================
-- VIEWS: Convenience views for analytics
-- ============================================

-- View: Recent performance by platform
CREATE OR REPLACE VIEW v_recent_performance AS
SELECT
  platform,
  DATE(published_at) as post_date,
  COUNT(*) as posts_count,
  SUM(views) as total_views,
  SUM(likes) as total_likes,
  SUM(comments) as total_comments,
  SUM(shares) as total_shares,
  SUM(clicks) as total_clicks,
  AVG(engagement_rate) as avg_engagement_rate
FROM ad_posts
WHERE published_at > NOW() - INTERVAL '30 days'
  AND published_at IS NOT NULL
GROUP BY platform, DATE(published_at)
ORDER BY post_date DESC, platform;

-- View: Top performing products
CREATE OR REPLACE VIEW v_top_products AS
SELECT
  p.id,
  p.name,
  p.category,
  COUNT(ap.id) as total_ads,
  AVG(ap.engagement_rate) as avg_engagement,
  SUM(ap.views) as total_views,
  SUM(ap.clicks) as total_clicks,
  SUM(ap.conversion_count) as total_conversions
FROM products p
LEFT JOIN ad_posts ap ON p.id = ap.product_id
WHERE ap.published_at > NOW() - INTERVAL '30 days'
GROUP BY p.id, p.name, p.category
ORDER BY avg_engagement DESC;

-- View: Upcoming scheduled posts
CREATE OR REPLACE VIEW v_upcoming_posts AS
SELECT
  ap.id,
  ap.platform,
  ap.scheduled_for,
  ap.publish_status,
  p.name as product_name,
  p.category as product_category
FROM ad_posts ap
JOIN products p ON ap.product_id = p.id
WHERE ap.publish_status = 'scheduled'
  AND ap.scheduled_for > NOW()
ORDER BY ap.scheduled_for ASC;

-- ============================================
-- ROW LEVEL SECURITY (Optional - for multi-tenant)
-- ============================================

-- Enable RLS on all tables
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ad_posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ai_learning_data ENABLE ROW LEVEL SECURITY;

-- Create policies as needed for your use case

-- ============================================
-- GRANTS: Ensure service role has access
-- ============================================

-- Grant all privileges to service role (for n8n)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Luna Ritual Studio database schema created successfully!';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Import your product data';
  RAISE NOTICE '2. Configure n8n workflows';
  RAISE NOTICE '3. Add API credentials';
  RAISE NOTICE '4. Activate workflows';
  RAISE NOTICE '5. Let the AI work its magic! 🚀';
END $$;
