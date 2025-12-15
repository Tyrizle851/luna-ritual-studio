-- Create subscribers table for newsletter signups
CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  source TEXT DEFAULT 'newsletter',
  discount_code TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for newsletter signup)
CREATE POLICY "Allow public insert" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (true);

-- Only service role can read/update/delete
CREATE POLICY "Service role can manage subscribers"
ON public.subscribers
FOR ALL
USING (auth.role() = 'service_role');

-- Create index on email for faster lookups
CREATE INDEX idx_subscribers_email ON public.subscribers(email);