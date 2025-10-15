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
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export type AppRole = 'admin' | 'user';

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}
