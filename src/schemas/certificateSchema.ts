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
  template_type: z.enum(['americo', 'modern', 'classic', 'siscert']).default('americo'),
  // Optional fields for SIS Cert template
  address: z.string().max(500).optional(),
  certified_location: z.string().max(500).optional(),
  country: z.string().max(100).optional(),
  issue: z.string().max(50).optional(),
  first_issue_date: z.date().optional(),
  latest_issue_date: z.date().optional(),
  recertification_date: z.date().optional(),
  ea_code: z.string().max(50).optional(),
  scope: z.string().max(2000).optional(),
  status: z.string().optional().default('active'),
});

export type CertificateFormData = z.infer<typeof certificateSchema>;
