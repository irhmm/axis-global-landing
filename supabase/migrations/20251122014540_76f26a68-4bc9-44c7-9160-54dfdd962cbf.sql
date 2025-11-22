-- Add description and tags columns to success_stories table
ALTER TABLE public.success_stories
ADD COLUMN description TEXT,
ADD COLUMN tags TEXT[] DEFAULT '{}';

-- Add comment for documentation
COMMENT ON COLUMN public.success_stories.description IS 'Detailed description of the success story';
COMMENT ON COLUMN public.success_stories.tags IS 'Array of tags for categorization and filtering';