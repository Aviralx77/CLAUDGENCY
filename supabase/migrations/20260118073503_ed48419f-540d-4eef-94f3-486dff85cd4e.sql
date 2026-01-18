-- Create prompts table
CREATE TABLE public.prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  use_case TEXT NOT NULL,
  prompt TEXT NOT NULL,
  example_output TEXT,
  pro_tip TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on prompts
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- Public read access for prompts (no auth required)
CREATE POLICY "Anyone can read prompts"
ON public.prompts
FOR SELECT
USING (true);

-- Create email_subscribers table
CREATE TABLE public.email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on email_subscribers
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public insert for email capture
CREATE POLICY "Anyone can subscribe"
ON public.email_subscribers
FOR INSERT
WITH CHECK (true);

-- Prevent reading subscriber emails (admin only via service role)
CREATE POLICY "No public read access"
ON public.email_subscribers
FOR SELECT
USING (false);