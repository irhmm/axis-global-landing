import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { certificateSchema, CertificateFormData } from "@/schemas/certificateSchema";
import { CertificateTemplate } from "@/types/certificate";
import { TemplateSelector } from "@/components/admin/TemplateSelector";
import { format } from "date-fns";
import { QrCode } from "lucide-react";
import { AmericoForm } from "@/components/admin/forms/AmericoForm";
import { SisCertForm } from "@/components/admin/forms/SisCertForm";

export default function CertificateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get template from URL query params
  const [searchParams] = useSearchParams();
  const templateParam = searchParams.get('template') as CertificateTemplate | null;
  
  const [loading, setLoading] = useState(false);
  
  // Get default values based on template
  const getDefaultValues = (template: CertificateTemplate): Partial<CertificateFormData> => {
    const base = {
      template_type: template,
    };
    
    if (template === 'americo') {
      return {
        ...base,
        certification_body: "Americo",
        accreditation_body: "UAF",
      };
    }
    
    if (template === 'siscert') {
      // Pre-filled example data based on SIS Cert template
      const today = new Date();
      const nextYear = new Date(today);
      nextYear.setFullYear(today.getFullYear() + 3);
      const surveillanceDate = new Date(today);
      surveillanceDate.setFullYear(today.getFullYear() + 1);
      
      return {
        ...base,
        certificate_number: "SIS-QMS-2024-001",
        company_name: "PT. Contoh Perusahaan Indonesia",
        certificate_standard: "ISO 9001:2015",
        certification_body: "SIS Certifications",
        accreditation_body: "KAN",
        status: "active",
        address: "Jl. Contoh No. 123, Jakarta Selatan",
        certified_location: "Head Office: Jl. Contoh No. 123, Jakarta Selatan, Indonesia",
        country: "Indonesia",
        issue: "ISSUE NO.1",
        issue_date: today,
        expiry_date: nextYear,
        surveillance_date: surveillanceDate,
        first_issue_date: today,
        latest_issue_date: today,
        ea_code: "EA 28",
        scope: "Design, Development, Production and Distribution of Quality Management System Services",
      };
    }
    
    return base;
  };

  const [formData, setFormData] = useState<Partial<CertificateFormData>>(
    getDefaultValues(templateParam || "americo")
  );

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchCertificate();
    }
  }, [id]);

  const fetchCertificate = async () => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setFormData({
        certificate_number: data.certificate_number,
        company_name: data.company_name,
        certificate_standard: data.certificate_standard,
        issue_date: new Date(data.issue_date),
        surveillance_date: new Date(data.surveillance_date),
        expiry_date: new Date(data.expiry_date),
        certification_body: data.certification_body,
        accreditation_body: data.accreditation_body,
        template_type: data.template_type || "americo",
        // SIS Cert fields
        address: data.address,
        certified_location: data.certified_location,
        country: data.country,
        issue: data.issue,
        first_issue_date: data.first_issue_date ? new Date(data.first_issue_date) : undefined,
        latest_issue_date: data.latest_issue_date ? new Date(data.latest_issue_date) : undefined,
        recertification_date: data.recertification_date ? new Date(data.recertification_date) : undefined,
        ea_code: data.ea_code,
        scope: data.scope,
        status: data.status,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch certificate",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = certificateSchema.parse(formData);

      const certificateData: any = {
        certificate_number: validated.certificate_number,
        company_name: validated.company_name,
        certificate_standard: validated.certificate_standard,
        issue_date: format(validated.issue_date, "yyyy-MM-dd"),
        surveillance_date: format(validated.surveillance_date, "yyyy-MM-dd"),
        expiry_date: format(validated.expiry_date, "yyyy-MM-dd"),
        certification_body: validated.certification_body,
        accreditation_body: validated.accreditation_body,
        template_type: validated.template_type,
        // SIS Cert optional fields
        address: validated.address || null,
        certified_location: validated.certified_location || null,
        country: validated.country || null,
        issue: validated.issue || null,
        first_issue_date: validated.first_issue_date ? format(validated.first_issue_date, "yyyy-MM-dd") : null,
        latest_issue_date: validated.latest_issue_date ? format(validated.latest_issue_date, "yyyy-MM-dd") : null,
        recertification_date: validated.recertification_date ? format(validated.recertification_date, "yyyy-MM-dd") : null,
        ea_code: validated.ea_code || null,
        scope: validated.scope || null,
        status: validated.status || 'active',
      };

      if (isEditMode) {
        const { error } = await supabase
          .from("certificates")
          .update(certificateData)
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Certificate updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("certificates")
          .insert([certificateData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Certificate created successfully",
        });
      }

      navigate("/admin/certificates");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save certificate",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verificationUrl = formData.certificate_number
    ? `${window.location.origin}/verify?cert=${formData.certificate_number}`
    : "";

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">
            {isEditMode ? "Edit Certificate" : "New Certificate"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isEditMode ? "Update certificate information" : "Create a new certificate"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Only show template selector if no template param or in edit mode */}
          {(!templateParam || isEditMode) && (
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Template Selection</CardTitle>
                <CardDescription className="text-sm">
                  {isEditMode 
                    ? "Template cannot be changed for existing certificates" 
                    : "Choose the visual design for this certificate"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TemplateSelector
                  value={(formData.template_type as CertificateTemplate) || "americo"}
                  onChange={(value) => {
                    if (!isEditMode) {
                      setFormData({ ...getDefaultValues(value), template_type: value });
                    }
                  }}
                  disabled={isEditMode}
                />
              </CardContent>
            </Card>
          )}

          {/* Render template-specific form */}
          {formData.template_type === 'americo' && (
            <AmericoForm
              formData={formData}
              setFormData={setFormData}
              isEditMode={isEditMode}
            />
          )}

          {formData.template_type === 'siscert' && (
            <SisCertForm
              formData={formData}
              setFormData={setFormData}
              isEditMode={isEditMode}
            />
          )}

          {/* Coming Soon for other templates */}
          {formData.template_type !== 'americo' && formData.template_type !== 'siscert' && (
            <Card className="border-border/50 shadow-sm">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  This template is coming soon. Please select Americo or SIS Cert template.
                </p>
              </CardContent>
            </Card>
          )}

          {verificationUrl && (
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <QrCode className="w-5 h-5" />
                  Verification URL
                </CardTitle>
                <CardDescription className="text-sm">
                  Use this URL to verify the certificate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-muted/50 rounded-lg break-all border border-border/50">
                  <a
                    href={verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {verificationUrl}
                  </a>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading} className="h-10">
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Saving...
                </>
              ) : (
                <>
                  {isEditMode ? "Update Certificate" : "Create Certificate"}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/certificates")}
              className="h-10 border-border/50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
