export type CertificateTemplate = 'americo' | 'modern' | 'classic' | 'siscert';

export interface TemplateMetadata {
  value: CertificateTemplate;
  name: string;
  description: string;
  color: string;
}

export interface Certificate {
  id: string;
  certificate_number: string;
  company_name: string;
  certificate_standard: string;
  issue_date: string;
  surveillance_date: string;
  expiry_date: string;
  certification_body: string;
  accreditation_body: string;
  template_type: CertificateTemplate;
  created_at: string;
  updated_at: string;
  created_by?: string;
  // Additional fields for SIS Cert template
  address?: string;
  certified_location?: string;
  country?: string;
  issue?: string;
  first_issue_date?: string;
  latest_issue_date?: string;
  recertification_date?: string;
  ea_code?: string;
  scope?: string;
  status?: string;
}

export type AppRole = 'admin' | 'user';

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}
