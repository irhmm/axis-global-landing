-- Create ENUM for certificate templates
CREATE TYPE public.certificate_template AS ENUM ('americo', 'modern', 'classic');

-- Add template_type column to certificates table
ALTER TABLE public.certificates 
ADD COLUMN template_type certificate_template NOT NULL DEFAULT 'americo';

-- Create index for better performance when filtering by template
CREATE INDEX certificates_template_idx ON public.certificates(template_type);

-- Add comment for documentation
COMMENT ON COLUMN public.certificates.template_type IS 'The visual template used for certificate display';