import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { certificateSchema, CertificateFormData } from "@/schemas/certificateSchema";
import { CertificateTemplate } from "@/types/certificate";
import { TemplateSelector } from "@/components/admin/TemplateSelector";
import { format } from "date-fns";
import { CalendarIcon, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CertificateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get template from URL query params
  const [searchParams] = useSearchParams();
  const templateParam = searchParams.get('template') as CertificateTemplate | null;
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CertificateFormData>>({
    certification_body: "Americo",
    accreditation_body: "UAF",
    template_type: templateParam || "americo",
  });

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

      const certificateData = {
        certificate_number: validated.certificate_number,
        company_name: validated.company_name,
        certificate_standard: validated.certificate_standard,
        issue_date: format(validated.issue_date, "yyyy-MM-dd"),
        surveillance_date: format(validated.surveillance_date, "yyyy-MM-dd"),
        expiry_date: format(validated.expiry_date, "yyyy-MM-dd"),
        certification_body: validated.certification_body,
        accreditation_body: validated.accreditation_body,
        template_type: validated.template_type,
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
                <CardDescription className="text-sm">Choose the visual design for this certificate</CardDescription>
              </CardHeader>
              <CardContent>
                <TemplateSelector
                  value={(formData.template_type as CertificateTemplate) || "americo"}
                  onChange={(value) => setFormData({ ...formData, template_type: value })}
                />
              </CardContent>
            </Card>
          )}

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Certificate Details</CardTitle>
              <CardDescription className="text-sm">Enter the certificate information below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="certificate_number" className="text-sm font-medium">Certificate Number *</Label>
                  <Input
                    id="certificate_number"
                    value={formData.certificate_number || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, certificate_number: e.target.value })
                    }
                    className="h-10 border-border/50 focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="company_name" className="text-sm font-medium">Company Name *</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                    className="h-10 border-border/50 focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="certificate_standard" className="text-sm font-medium">Certificate Standard *</Label>
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
                  <Label className="text-sm font-medium">Issue Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-10 justify-start text-left font-normal border-border/50",
                          !formData.issue_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.issue_date ? (
                          format(formData.issue_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.issue_date}
                        onSelect={(date) => setFormData({ ...formData, issue_date: date })}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Surveillance Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-10 justify-start text-left font-normal border-border/50",
                          !formData.surveillance_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.surveillance_date ? (
                          format(formData.surveillance_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.surveillance_date}
                        onSelect={(date) =>
                          setFormData({ ...formData, surveillance_date: date })
                        }
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Expiry Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-10 justify-start text-left font-normal border-border/50",
                          !formData.expiry_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.expiry_date ? (
                          format(formData.expiry_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.expiry_date}
                        onSelect={(date) => setFormData({ ...formData, expiry_date: date })}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="certification_body" className="text-sm font-medium">Certification Body *</Label>
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
                  <Label htmlFor="accreditation_body" className="text-sm font-medium">Accreditation Body *</Label>
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
            </CardContent>
          </Card>

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
