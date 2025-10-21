import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CertificateFormData } from "@/schemas/certificateSchema";
import { DatePickerField } from "./shared/DatePickerField";
import { FormSection } from "./shared/FormSection";

interface SisCertFormProps {
  formData: Partial<CertificateFormData>;
  setFormData: (data: Partial<CertificateFormData>) => void;
  isEditMode: boolean;
}

export function SisCertForm({ formData, setFormData, isEditMode }: SisCertFormProps) {
  return (
    <div className="space-y-5">
      <div className="text-xs text-muted-foreground">
        * Required fields
      </div>

      {/* Section 1: Basic Information */}
      <FormSection
        title="Basic Information"
        description="Core certificate details"
        borderColor="border-l-red-600"
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
              placeholder="e.g., SIS-QMS-2024-001"
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
                <SelectItem value="active">Active</SelectItem>
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
              placeholder="Full legal name of the organization"
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
            <p className="text-xs text-muted-foreground">Standard name and version</p>
          </div>
        </div>
      </FormSection>

      {/* Section 2: Location Information */}
      <FormSection
        title="Location Information"
        description="Address and certified location details"
        borderColor="border-l-blue-500"
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-sm font-medium">
              Address
            </Label>
            <Textarea
              id="address"
              value={formData.address || ""}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Full address of the organization headquarters"
              className="min-h-[80px] border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="certified_location" className="text-sm font-medium">
              Certified Location
            </Label>
            <Textarea
              id="certified_location"
              value={formData.certified_location || ""}
              onChange={(e) => setFormData({ ...formData, certified_location: e.target.value })}
              placeholder="Location(s) covered by this certificate"
              className="min-h-[80px] border-border/50 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground">Can include multiple sites if applicable</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="country" className="text-sm font-medium">
              Country
            </Label>
            <Input
              id="country"
              value={formData.country || ""}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="e.g., Indonesia"
              className="h-10 border-border/50 focus:border-primary"
            />
          </div>
        </div>
      </FormSection>

      {/* Section 3: Certification Details */}
      <FormSection
        title="Certification Details"
        description="Issuing and accreditation bodies"
        borderColor="border-l-green-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="issue" className="text-sm font-medium">
              Issue
            </Label>
            <Input
              id="issue"
              value={formData.issue || ""}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              placeholder="e.g., ISSUE NO.1"
              className="h-10 border-border/50 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground">Issue or revision number</p>
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

          <div className="space-y-1.5">
            <Label htmlFor="ea_code" className="text-sm font-medium">
              EA Code / Category
            </Label>
            <Input
              id="ea_code"
              value={formData.ea_code || ""}
              onChange={(e) => setFormData({ ...formData, ea_code: e.target.value })}
              placeholder="e.g., EA 28"
              className="h-10 border-border/50 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground">European cooperation for Accreditation code</p>
          </div>
        </div>
      </FormSection>

      {/* Section 4: Dates */}
      <FormSection
        title="Certificate Dates"
        description="All important dates related to this certificate"
        borderColor="border-l-amber-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePickerField
            label="First Issue Date"
            value={formData.first_issue_date}
            onChange={(date) => setFormData({ ...formData, first_issue_date: date })}
            helperText="Initial certification date"
          />

          <DatePickerField
            label="Latest Issue Date"
            value={formData.latest_issue_date}
            onChange={(date) => setFormData({ ...formData, latest_issue_date: date })}
            helperText="Most recent certificate issue"
          />

          <DatePickerField
            label="Issue Date"
            value={formData.issue_date}
            onChange={(date) => setFormData({ ...formData, issue_date: date })}
            required
            helperText="Current certificate issue date"
          />

          <DatePickerField
            label="Certificate Expiry Date"
            value={formData.expiry_date}
            onChange={(date) => setFormData({ ...formData, expiry_date: date })}
            required
            helperText="When certificate expires"
          />

          <DatePickerField
            label="Re-Certification Date"
            value={formData.recertification_date}
            onChange={(date) => setFormData({ ...formData, recertification_date: date })}
            helperText="Scheduled re-certification audit"
          />

          <DatePickerField
            label="Next Surveillance Due On"
            value={formData.surveillance_date}
            onChange={(date) => setFormData({ ...formData, surveillance_date: date })}
            required
            helperText="Next surveillance audit date"
          />
        </div>
      </FormSection>

      {/* Section 5: Scope */}
      <FormSection
        title="Scope of Certification"
        description="Detailed description of what is certified"
        borderColor="border-l-purple-500"
      >
        <div className="space-y-1.5">
          <Label htmlFor="scope" className="text-sm font-medium">
            Scope
          </Label>
          <Textarea
            id="scope"
            value={formData.scope || ""}
            onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
            placeholder="Describe the full scope of certification including all activities, processes, and products covered by this certificate"
            className="min-h-[120px] border-border/50 focus:border-primary"
          />
          <p className="text-xs text-muted-foreground">
            Include all relevant details about what is covered by the certification
          </p>
        </div>
      </FormSection>
    </div>
  );
}
