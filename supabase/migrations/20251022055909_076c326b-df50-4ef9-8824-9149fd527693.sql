-- Create success_stories table
CREATE TABLE public.success_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  certification TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view success stories"
ON public.success_stories
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert success stories"
ON public.success_stories
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update success stories"
ON public.success_stories
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete success stories"
ON public.success_stories
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_success_stories_updated_at
BEFORE UPDATE ON public.success_stories
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create storage bucket for success stories
INSERT INTO storage.buckets (id, name, public)
VALUES ('success-stories', 'success-stories', true);

-- Storage policies for success stories bucket
CREATE POLICY "Anyone can view success story images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'success-stories');

CREATE POLICY "Admins can upload success story images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'success-stories' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update success story images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'success-stories' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete success story images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'success-stories' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Create index for ordering
CREATE INDEX idx_success_stories_display_order ON public.success_stories(display_order);