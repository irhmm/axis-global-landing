-- Update certificate PPIQ02-CCCQ01 with complete Equal template data
UPDATE public.certificates
SET
  trading_name = 'N/A',
  main_site_address = 'Politeknik Perkeretaapian Indonesia: Jl. Tirta Raya, Kota Madiun Jawa Timur 63132, Indonesia',
  other_sites = 'N/A',
  website = 'https://ppi.ac.id/',
  certification_criteria = 'ISO 9001:2015',
  certification_approval_date = '2024-10-18',
  original_audit_date = '2024-10-08',
  certification_expiration_date = '2027-10-08',
  isic_code = '8030 (Higher education)',
  managing_partner = 'Equal Assurance Pty Ltd',
  managing_practice = 'Laksana Cahaya Mandiri',
  issue_date = '2024-10-18',
  surveillance_date = '2025-10-18',
  expiry_date = '2027-10-08',
  certification_body = 'Equal Assurance',
  accreditation_body = 'JAS-ANZ',
  updated_at = now()
WHERE certificate_number = 'PPIQ02-CCCQ01';