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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

          {/* Additional Fields for SIS Cert Template */}
          {formData.template_type === 'siscert' && (
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Additional SIS Cert Fields</CardTitle>
                <CardDescription className="text-sm">Optional fields specific to SIS Cert template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address || ""}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Full address of the organization"
                      className="min-h-[80px] border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="certified_location" className="text-sm font-medium">Certified Location</Label>
                    <Textarea
                      id="certified_location"
                      value={formData.certified_location || ""}
                      onChange={(e) => setFormData({ ...formData, certified_location: e.target.value })}
                      placeholder="Location that is certified"
                      className="min-h-[80px] border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="country" className="text-sm font-medium">Country</Label>
                    <Input
                      id="country"
                      value={formData.country || ""}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g., Indonesia"
                      className="h-10 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="issue" className="text-sm font-medium">Issue</Label>
                    <Input
                      id="issue"
                      value={formData.issue || ""}
                      onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                      placeholder="e.g., ISSUE NO.1"
                      className="h-10 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">First Issue Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-10 justify-start text-left font-normal border-border/50",
                            !formData.first_issue_date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.first_issue_date ? (
                            format(formData.first_issue_date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.first_issue_date}
                          onSelect={(date) => setFormData({ ...formData, first_issue_date: date })}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Latest Issue Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-10 justify-start text-left font-normal border-border/50",
                            !formData.latest_issue_date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.latest_issue_date ? (
                            format(formData.latest_issue_date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.latest_issue_date}
                          onSelect={(date) => setFormData({ ...formData, latest_issue_date: date })}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Re-Certification Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-10 justify-start text-left font-normal border-border/50",
                            !formData.recertification_date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.recertification_date ? (
                            format(formData.recertification_date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.recertification_date}
                          onSelect={(date) => setFormData({ ...formData, recertification_date: date })}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="ea_code" className="text-sm font-medium">EA Code/Category</Label>
                    <Input
                      id="ea_code"
                      value={formData.ea_code || ""}
                      onChange={(e) => setFormData({ ...formData, ea_code: e.target.value })}
                      placeholder="e.g., EA 28"
                      className="h-10 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                    <Select
                      value={formData.status || 'active'}
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
                    <Label htmlFor="scope" className="text-sm font-medium">Scope</Label>
                    <Textarea
                      id="scope"
                      value={formData.scope || ""}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      placeholder="Detailed scope of certification"
                      className="min-h-[120px] border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
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
