import { z } from "zod";

export const certificateSchema = z.object({
  certificate_number: z.string().min(1, "Certificate number is required").max(50),
  company_name: z.string().min(1, "Company name is required").max(200),
  certificate_standard: z.string().min(1, "Certificate standard is required").max(100),
  issue_date: z.date({ required_error: "Issue date is required" }),
  surveillance_date: z.date({ required_error: "Surveillance date is required" }),
  expiry_date: z.date({ required_error: "Expiry date is required" }),
  certification_body: z.string().min(1, "Certification body is required").max(100),
  accreditation_body: z.string().min(1, "Accreditation body is required").max(100),
  template_type: z.enum(['americo', 'modern', 'classic', 'siscert', 'equal', 'gresolve']).default('americo'),
  // Optional fields for SIS Cert template - allow empty strings
  address: z.string().max(500).default(""),
  certified_location: z.string().max(500).default(""),
  country: z.string().max(100).default(""),
  issue: z.string().max(50).default(""),
  first_issue_date: z.date().optional(),
  latest_issue_date: z.date().optional(),
  recertification_date: z.date().optional(),
  ea_code: z.string().max(50).default(""),
  scope: z.string().max(2000).default(""),
  status: z.string().default('active'),
  // Optional fields for Equal template - allow empty strings
  trading_name: z.string().max(200).default(""),
  main_site_address: z.string().max(500).default(""),
  other_sites: z.string().max(1000).default(""),
  website: z.string().max(200).default(""),
  certification_criteria: z.string().max(100).default(""),
  certification_approval_date: z.date().optional(),
  original_audit_date: z.date().optional(),
  certification_expiration_date: z.date().optional(),
  isic_code: z.string().max(100).default(""),
  managing_partner: z.string().max(200).default(""),
  managing_practice: z.string().max(200).default(""),
});

export type CertificateFormData = z.infer<typeof certificateSchema>;
