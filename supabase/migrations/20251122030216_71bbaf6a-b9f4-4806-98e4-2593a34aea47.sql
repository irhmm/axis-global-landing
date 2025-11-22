-- Enable realtime for success_stories table
ALTER TABLE success_stories REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE success_stories;