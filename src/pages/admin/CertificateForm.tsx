import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { format } from "date-fns";
import { CalendarIcon, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CertificateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CertificateFormData>>({
    certification_body: "Americo",
    accreditation_body: "UAF",
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            {isEditMode ? "Edit Certificate" : "New Certificate"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditMode ? "Update certificate information" : "Create a new certificate"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Details</CardTitle>
              <CardDescription>Enter the certificate information below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="certificate_number">Certificate Number *</Label>
                  <Input
                    id="certificate_number"
                    value={formData.certificate_number || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, certificate_number: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificate_standard">Certificate Standard *</Label>
                  <Input
                    id="certificate_standard"
                    value={formData.certificate_standard || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, certificate_standard: e.target.value })
                    }
                    placeholder="e.g., ISO 9001:2015"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Issue Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
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
                    <PopoverContent className="w-auto p-0" align="start">
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

                <div className="space-y-2">
                  <Label>Surveillance Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
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
                    <PopoverContent className="w-auto p-0" align="start">
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

                <div className="space-y-2">
                  <Label>Expiry Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
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
                    <PopoverContent className="w-auto p-0" align="start">
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

                <div className="space-y-2">
                  <Label htmlFor="certification_body">Certification Body *</Label>
                  <Input
                    id="certification_body"
                    value={formData.certification_body || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, certification_body: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accreditation_body">Accreditation Body *</Label>
                  <Input
                    id="accreditation_body"
                    value={formData.accreditation_body || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, accreditation_body: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {verificationUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Verification URL
                </CardTitle>
                <CardDescription>
                  Use this URL to verify the certificate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg break-all">
                  <a
                    href={verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {verificationUrl}
                  </a>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEditMode ? "Update Certificate" : "Create Certificate"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/certificates")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
