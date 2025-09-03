-- Add consumer role to existing enum
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'consumer';

-- Update profiles table to match our needs (only add columns that don't exist)
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS kyc_status TEXT DEFAULT 'pending';