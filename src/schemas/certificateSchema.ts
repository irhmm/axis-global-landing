import { z } from "zod";

// Preprocess helpers: coerce null/undefined to empty string for optional text fields
const str = (max: number) =>
  z.preprocess((v) => (v == null ? "" : v), z.string().max(max));

// Status: default to 'active' when null/undefined/empty
const statusStr = z.preprocess(
  (v) => (v == null || v === "" ? "active" : v),
  z.string()
);

export const certificateSchema = z.object({
  certificate_number: z
    .string()
    .min(1, "Certificate number is required")
    .max(50),
  company_name: z
    .string()
    .min(1, "Company name is required")
    .max(200),
  certificate_standard: z
    .string()
    .min(1, "Certificate standard is required")
    .max(100),
  issue_date: z.date({ required_error: "Issue date is required" }),
  surveillance_date: z.date({ required_error: "Surveillance date is required" }),
  expiry_date: z.date({ required_error: "Expiry date is required" }),
  certification_body: z
    .string()
    .min(1, "Certification body is required")
    .max(100),
  accreditation_body: z
    .string()
    .min(1, "Accreditation body is required")
    .max(100),
  template_type: z
    .enum(["americo", "modern", "classic", "siscert", "equal", "gresolve"]) 
    .default("americo"),

  // Optional fields for SIS Cert template - allow empty strings and null via preprocess
  address: str(500),
  certified_location: str(500),
  country: str(100),
  issue: str(50),
  first_issue_date: z.date().optional(),
  latest_issue_date: z.date().optional(),
  recertification_date: z.date().optional(),
  ea_code: str(50),
  scope: str(2000),
  status: statusStr,

  // Optional fields for Equal template - allow empty strings and null via preprocess
  trading_name: str(200),
  main_site_address: str(500),
  other_sites: str(1000),
  website: str(200),
  certification_criteria: str(100),
  certification_approval_date: z.date().optional(),
  original_audit_date: z.date().optional(),
  certification_expiration_date: z.date().optional(),
  isic_code: str(100),
  managing_partner: str(200),
  managing_practice: str(200),
});

export type CertificateFormData = z.infer<typeof certificateSchema>;
