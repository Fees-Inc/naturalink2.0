-- Add consumer role to existing enum
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'consumer';

-- Update profiles table to match our needs (columns we don't have yet)
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS kyc_status TEXT DEFAULT 'pending';

-- Update articles policies to use correct status values
DROP POLICY IF EXISTS "Published articles are viewable by everyone" ON public.articles;
CREATE POLICY "Articles are viewable by everyone" ON public.articles
  FOR SELECT USING (status = 'publie'::article_status OR author_id = auth.uid());

-- Update comments policies
DROP POLICY IF EXISTS "Approved comments are viewable by everyone" ON public.comments;
CREATE POLICY "Comments are viewable by everyone" ON public.comments
  FOR SELECT USING (is_approved = true);

DROP POLICY IF EXISTS "Users can manage their own comments" ON public.comments;
CREATE POLICY "Users can create comments" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments" ON public.comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments" ON public.comments
  FOR DELETE USING (auth.uid() = author_id);