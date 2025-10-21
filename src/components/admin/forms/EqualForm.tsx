import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CertificateFormData } from "@/schemas/certificateSchema";
import { DatePickerField } from "./shared/DatePickerField";
import { FormSection } from "./shared/FormSection";

interface EqualFormProps {
  formData: Partial<CertificateFormData>;
  setFormData: (data: Partial<CertificateFormData>) => void;
  isEditMode: boolean;
}

export function EqualForm({ formData, setFormData, isEditMode }: EqualFormProps) {
  return (
    <div className="space-y-5">
      <div className="text-xs text-muted-foreground">
        * Required fields
      </div>

      {/* Section 1: Basic Information */}
      <FormSection
        title="Basic Information"
        description="Essential certificate details for Equal Assurance"
        borderColor="border-l-teal-500"
      >
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
              placeholder="e.g., PPIQ02-CCCQ01"
              className="h-10 border-border/50 focus:border-primary"
              required
            />
            <p className="text-xs text-muted-foreground">Unique certificate identifier</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="status" className="text-sm font-medium">
              Status <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.status || "active"}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger className="h-10 border-border/50">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Approved</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="company_name" className="text-sm font-medium">
              Organization Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company_name"
              value={formData.company_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, company_name: e.target.value })
              }
              placeholder="e.g., Politeknik Perkeretaapian Indonesia Madiun"
              className="h-10 border-border/50 focus:border-primary"
              required
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="trading_name" className="text-sm font-medium">
              Trading Name(s)
            </Label>
            <Input
              id="trading_name"
              value={formData.trading_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, trading_name: e.target.value })
              }
              placeholder="Enter trading name or N/A"
              className="h-10 border-border/50 focus:border-primary"
            />
          </div>
        </div>
      </FormSection>

      {/* Section 2: Location Information */}
      <FormSection
        title="Location Information"
        description="Site and address details"
        borderColor="border-l-teal-500"
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="main_site_address" className="text-sm font-medium">
              Main Site Name and Address
            </Label>
            <Textarea
              id="main_site_address"
              value={formData.main_site_address || ""}
              onChange={(e) =>
                setFormData({ ...formData, main_site_address: e.target.value })
              }
              placeholder="Enter complete address with city and postal code"
              className="min-h-[80px] border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="other_sites" className="text-sm font-medium">
              Other Permanent Sites
            </Label>
            <Textarea
              id="other_sites"
              value={formData.other_sites || ""}
              onChange={(e) =>
                setFormData({ ...formData, other_sites: e.target.value })
              }
              placeholder="List other sites or enter N/A"
              className="min-h-[60px] border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="website" className="text-sm font-medium">
              Website
            </Label>
            <Input
              id="website"
              value={formData.website || ""}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="e.g., https://example.com"
              className="h-10 border-border/50 focus:border-primary"
            />
          </div>
        </div>
      </FormSection>

      {/* Section 3: Certification Details */}
      <FormSection
        title="Certification Details"
        description="Standards and scope information"
        borderColor="border-l-teal-500"
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="certification_criteria" className="text-sm font-medium">
              Certification Criteria
            </Label>
            <Input
              id="certification_criteria"
              value={formData.certification_criteria || ""}
              onChange={(e) =>
                setFormData({ ...formData, certification_criteria: e.target.value })
              }
              placeholder="e.g., ISO 9001:2015"
              className="h-10 border-border/50 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground">The specific standard criteria</p>
          </div>

          <div className="space-y-1.5">
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

          <div className="space-y-1.5">
            <Label htmlFor="scope" className="text-sm font-medium">
              Certification Scope
            </Label>
            <Textarea
              id="scope"
              value={formData.scope || ""}
              onChange={(e) =>
                setFormData({ ...formData, scope: e.target.value })
              }
              placeholder="Describe the scope of certification"
              className="min-h-[100px] border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="isic_code" className="text-sm font-medium">
              ISIC Code(s)
            </Label>
            <Input
              id="isic_code"
              value={formData.isic_code || ""}
              onChange={(e) =>
                setFormData({ ...formData, isic_code: e.target.value })
              }
              placeholder="e.g., 8030 (Higher education)"
              className="h-10 border-border/50 focus:border-primary"
            />
          </div>
        </div>
      </FormSection>

      {/* Section 4: Date Information */}
      <FormSection
        title="Date Information"
        description="Important dates for certification"
        borderColor="border-l-teal-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePickerField
            label="Certification Approval Date"
            value={formData.certification_approval_date}
            onChange={(date) => setFormData({ ...formData, certification_approval_date: date })}
          />

          <DatePickerField
            label="Original Audit Date(s)"
            value={formData.original_audit_date}
            onChange={(date) => setFormData({ ...formData, original_audit_date: date })}
          />

          <DatePickerField
            label="Certification Expiration Date"
            value={formData.certification_expiration_date}
            onChange={(date) => setFormData({ ...formData, certification_expiration_date: date })}
          />

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
          />

          <DatePickerField
            label="Expiry Date"
            value={formData.expiry_date}
            onChange={(date) => setFormData({ ...formData, expiry_date: date })}
            required
          />
        </div>
      </FormSection>

      {/* Section 5: Certification Body Information */}
      <FormSection
        title="Certification Body"
        description="Managing partner and practice details"
        borderColor="border-l-teal-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="managing_partner" className="text-sm font-medium">
              Managing Partner
            </Label>
            <Input
              id="managing_partner"
              value={formData.managing_partner || ""}
              onChange={(e) =>
                setFormData({ ...formData, managing_partner: e.target.value })
              }
              placeholder="e.g., Equal Assurance Pty Ltd"
              className="h-10 border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="managing_practice" className="text-sm font-medium">
              Managing Practice
            </Label>
            <Input
              id="managing_practice"
              value={formData.managing_practice || ""}
              onChange={(e) =>
                setFormData({ ...formData, managing_practice: e.target.value })
              }
              placeholder="e.g., Laksana Cahaya Mandiri"
              className="h-10 border-border/50 focus:border-primary"
            />
          </div>

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
              placeholder="e.g., Equal Assurance"
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
              placeholder="e.g., JAS-ANZ"
              className="h-10 border-border/50 focus:border-primary"
              required
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
}
