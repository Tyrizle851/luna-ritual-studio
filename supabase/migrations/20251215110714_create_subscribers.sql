-- Create subscribers table for newsletter signups
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source TEXT CHECK (source IN ('newsletter', 'popup', 'checkout')),
  discount_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_subscribers_email ON public.subscribers(email);
CREATE INDEX idx_subscribers_status ON public.subscribers(status);
CREATE INDEX idx_subscribers_created_at ON public.subscribers(created_at);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public signup)
CREATE POLICY "Anyone can subscribe"
ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Only service role can read (for admin/analytics)
CREATE POLICY "Service role can read subscribers"
ON public.subscribers
FOR SELECT
USING (auth.jwt() ->> 'role' = 'service_role');

-- Allow update for unsubscribe
CREATE POLICY "Anyone can unsubscribe"
ON public.subscribers
FOR UPDATE
USING (true)
WITH CHECK (status = 'unsubscribed');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_subscribers_updated_at
  BEFORE UPDATE ON public.subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
