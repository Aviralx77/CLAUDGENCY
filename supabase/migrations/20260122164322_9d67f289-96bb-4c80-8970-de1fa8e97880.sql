-- Add email format validation constraint to email_subscribers table
ALTER TABLE public.email_subscribers 
ADD CONSTRAINT email_format_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add length constraint
ALTER TABLE public.email_subscribers
ADD CONSTRAINT email_length_check
CHECK (char_length(email) <= 255);