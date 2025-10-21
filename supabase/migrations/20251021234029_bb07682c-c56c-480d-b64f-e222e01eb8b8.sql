-- Add 'equal' to certificate_template enum
ALTER TYPE certificate_template ADD VALUE IF NOT EXISTS 'equal';

-- Add new columns for Equal template
ALTER TABLE public.certificates 
ADD COLUMN IF NOT EXISTS trading_name TEXT,
ADD COLUMN IF NOT EXISTS main_site_address TEXT,
ADD COLUMN IF NOT EXISTS other_sites TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS certification_criteria TEXT,
ADD COLUMN IF NOT EXISTS certification_approval_date DATE,
ADD COLUMN IF NOT EXISTS original_audit_date DATE,
ADD COLUMN IF NOT EXISTS certification_expiration_date DATE,
ADD COLUMN IF NOT EXISTS isic_code TEXT,
ADD COLUMN IF NOT EXISTS managing_partner TEXT,
ADD COLUMN IF NOT EXISTS managing_practice TEXT;

-- Add comments for documentation
COMMENT ON COLUMN public.certificates.trading_name IS 'Trading name(s) of the organization (Equal template)';
COMMENT ON COLUMN public.certificates.main_site_address IS 'Main site name and address (Equal template)';
COMMENT ON COLUMN public.certificates.other_sites IS 'Other permanent sites (Equal template)';
COMMENT ON COLUMN public.certificates.website IS 'Organization website URL (Equal template)';
COMMENT ON COLUMN public.certificates.certification_criteria IS 'Certification criteria/standard (Equal template)';
COMMENT ON COLUMN public.certificates.certification_approval_date IS 'Date when certification was approved (Equal template)';
COMMENT ON COLUMN public.certificates.original_audit_date IS 'Original audit date(s) (Equal template)';
COMMENT ON COLUMN public.certificates.certification_expiration_date IS 'Certification expiration date (Equal template)';
COMMENT ON COLUMN public.certificates.isic_code IS 'ISIC code(s) for industry classification (Equal template)';
COMMENT ON COLUMN public.certificates.managing_partner IS 'Managing partner organization (Equal template)';
COMMENT ON COLUMN public.certificates.managing_practice IS 'Managing practice organization (Equal template)';