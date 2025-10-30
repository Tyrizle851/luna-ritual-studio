-- Create affirmation_generations table to store generation metadata
CREATE TABLE IF NOT EXISTS public.affirmation_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme TEXT NOT NULL,
  mood TEXT NOT NULL,
  layout_style TEXT,
  keywords TEXT,
  style_seed TEXT,
  image_url TEXT NOT NULL,
  image_path TEXT NOT NULL,
  image_size_bytes INTEGER,
  generation_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_affirmation_generations_created_at
  ON public.affirmation_generations(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_affirmation_generations_theme
  ON public.affirmation_generations(theme);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.affirmation_generations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.affirmation_generations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
  ON public.affirmation_generations
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow public insert (since we don't have auth yet)
CREATE POLICY "Allow public insert"
  ON public.affirmation_generations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create storage bucket for affirmation images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'affirmation-images',
  'affirmation-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/png', 'image/jpeg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read
CREATE POLICY "Allow public read access to affirmation images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'affirmation-images');

-- Create storage policy for public upload
CREATE POLICY "Allow public upload to affirmation images"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'affirmation-images');

-- Create storage policy for deletion (for cleanup)
CREATE POLICY "Allow service role to delete affirmation images"
  ON storage.objects
  FOR DELETE
  TO service_role
  USING (bucket_id = 'affirmation-images');

-- Create cleanup function to delete old images (older than 30 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_affirmation_images()
RETURNS TABLE (deleted_count INTEGER) AS $$
DECLARE
  v_deleted_count INTEGER := 0;
  v_record RECORD;
BEGIN
  -- Find records older than 30 days
  FOR v_record IN
    SELECT id, image_path
    FROM public.affirmation_generations
    WHERE created_at < NOW() - INTERVAL '30 days'
  LOOP
    -- Delete from storage
    PERFORM storage.delete('affirmation-images', v_record.image_path);

    -- Delete from database
    DELETE FROM public.affirmation_generations WHERE id = v_record.id;

    v_deleted_count := v_deleted_count + 1;
  END LOOP;

  RETURN QUERY SELECT v_deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a cron job schedule comment (requires pg_cron extension)
-- To enable: Run this in the SQL editor after pg_cron is installed:
-- SELECT cron.schedule('cleanup-old-affirmations', '0 2 * * *', 'SELECT public.cleanup_old_affirmation_images();');

COMMENT ON FUNCTION public.cleanup_old_affirmation_images() IS 'Deletes affirmation images and metadata older than 30 days. Should be run via cron job daily.';

-- Add index for cleanup efficiency
CREATE INDEX IF NOT EXISTS idx_affirmation_generations_cleanup
  ON public.affirmation_generations(created_at) WHERE created_at < NOW() - INTERVAL '30 days';
