-- Add new optional fields for SIS Cert template
ALTER TABLE certificates 
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS certified_location TEXT,
  ADD COLUMN IF NOT EXISTS country VARCHAR(100),
  ADD COLUMN IF NOT EXISTS issue VARCHAR(50),
  ADD COLUMN IF NOT EXISTS first_issue_date DATE,
  ADD COLUMN IF NOT EXISTS latest_issue_date DATE,
  ADD COLUMN IF NOT EXISTS recertification_date DATE,
  ADD COLUMN IF NOT EXISTS ea_code VARCHAR(50),
  ADD COLUMN IF NOT EXISTS scope TEXT,
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

-- Update template enum to include siscert
ALTER TYPE certificate_template ADD VALUE IF NOT EXISTS 'siscert';

-- Add check constraint for status
ALTER TABLE certificates
  ADD CONSTRAINT valid_status CHECK (status IN ('active', 'inactive', 'suspended'));