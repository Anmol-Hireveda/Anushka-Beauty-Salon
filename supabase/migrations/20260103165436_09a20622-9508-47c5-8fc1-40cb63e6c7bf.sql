-- Create storage bucket for review profile pictures
INSERT INTO storage.buckets (id, name, public) 
VALUES ('review-photos', 'review-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload to the bucket
CREATE POLICY "Anyone can upload review photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'review-photos');

-- Allow anyone to view review photos
CREATE POLICY "Anyone can view review photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'review-photos');

-- Add profile_image_url column to reviews table
ALTER TABLE public.reviews 
ADD COLUMN IF NOT EXISTS profile_image_url TEXT;