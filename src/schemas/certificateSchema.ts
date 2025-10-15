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
});

export type CertificateFormData = z.infer<typeof certificateSchema>;
