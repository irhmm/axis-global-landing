import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CertificateFormData } from "@/schemas/certificateSchema";
import { DatePickerField } from "./shared/DatePickerField";
import { FormSection } from "./shared/FormSection";

interface GresolveFormProps {
  formData: Partial<CertificateFormData>;
  setFormData: (data: Partial<CertificateFormData>) => void;
  isEditMode: boolean;
}

export function GresolveForm({ formData, setFormData, isEditMode }: GresolveFormProps) {
  return (
    <FormSection
      title="Certificate Details"
      description="Enter the basic certificate information"
      borderColor="border-l-red-600"
    >
      <div className="text-xs text-muted-foreground mb-4">
        * Required fields
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="certificate_number" className="text-sm font-medium">
            Certificate Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="certificate_number"
            value={formData.certificate_number || ""}
            onChange={(e) =>
              setFormData({ ...formData, certificate_number: e.target.value })
            }
            placeholder="e.g., AXIS-001-2024"
            className="h-10 border-border/50 focus:border-primary"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="company_name" className="text-sm font-medium">
            Company Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="company_name"
            value={formData.company_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, company_name: e.target.value })
            }
            placeholder="Enter company name"
            className="h-10 border-border/50 focus:border-primary"
            required
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="certificate_standard" className="text-sm font-medium">
            Certificate Standard <span className="text-destructive">*</span>
          </Label>
          <Input
            id="certificate_standard"
            value={formData.certificate_standard || ""}
            onChange={(e) =>
              setFormData({ ...formData, certificate_standard: e.target.value })
            }
            placeholder="e.g., ISO 9001:2015"
            className="h-10 border-border/50 focus:border-primary"
            required
          />
        </div>

        <DatePickerField
          label="Issue Date"
          value={formData.issue_date}
          onChange={(date) => setFormData({ ...formData, issue_date: date })}
          required
        />

        <DatePickerField
          label="Surveillance Date"
          value={formData.surveillance_date}
          onChange={(date) => setFormData({ ...formData, surveillance_date: date })}
          required
          helperText="Next surveillance audit date"
        />

        <DatePickerField
          label="Expiry Date"
          value={formData.expiry_date}
          onChange={(date) => setFormData({ ...formData, expiry_date: date })}
          required
        />

        <div className="space-y-1.5">
          <Label htmlFor="certification_body" className="text-sm font-medium">
            Certification Body <span className="text-destructive">*</span>
          </Label>
          <Input
            id="certification_body"
            value={formData.certification_body || ""}
            onChange={(e) =>
              setFormData({ ...formData, certification_body: e.target.value })
            }
            className="h-10 border-border/50 focus:border-primary"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="accreditation_body" className="text-sm font-medium">
            Accreditation Body <span className="text-destructive">*</span>
          </Label>
          <Input
            id="accreditation_body"
            value={formData.accreditation_body || ""}
            onChange={(e) =>
              setFormData({ ...formData, accreditation_body: e.target.value })
            }
            className="h-10 border-border/50 focus:border-primary"
            required
          />
        </div>
      </div>
    </FormSection>
  );
}
