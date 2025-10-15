import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Certificate } from "@/types/certificate";
import { CheckCircle, Smartphone, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function CertificateVerification() {
  const [searchParams] = useSearchParams();
  const certNumber = searchParams.get("cert");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (certNumber) {
      fetchCertificate(certNumber);
    }
  }, [certNumber]);

  const fetchCertificate = async (certNum: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("certificate_number", certNum)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setError("Certificate not found");
      } else {
        setCertificate(data);
      }
    } catch (err) {
      console.error("Error fetching certificate:", err);
      setError("Failed to fetch certificate");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <Navigation />
      <div className="flex-1 bg-gradient-to-b from-background to-muted/20 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#667eea" }}>
              Americo
            </h1>
            <p className="text-lg text-muted-foreground">Certificate Verification System</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-destructive mb-2">Certificate Not Found</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
          )}

          {/* Success State */}
          {certificate && !loading && (
            <>
              {/* Success Banner */}
              <div className="bg-green-50 dark:bg-green-950/20 border-2 border-green-500 rounded-xl p-6 mb-8 flex items-center gap-4">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-green-900 dark:text-green-100">
                    Certificate Verified Successfully
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    This certificate is valid and registered in our system
                  </p>
                </div>
              </div>

              {/* Certificate Details Card */}
              <div className="bg-card border border-border rounded-xl shadow-lg p-6 md:p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Certificate Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Certificate Number</p>
                    <p className="text-lg font-semibold">{certificate.certificate_number}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Company Name</p>
                    <p className="text-lg font-semibold">{certificate.company_name}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Certificate Standard</p>
                    <p className="text-lg font-semibold">{certificate.certificate_standard}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Issue Date</p>
                    <p className="text-lg font-semibold">{formatDate(certificate.issue_date)}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Surveillance</p>
                    <p className="text-lg font-semibold">{formatDate(certificate.surveillance_date)}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Expired Date/Recertification</p>
                    <p className="text-lg font-semibold">{formatDate(certificate.expiry_date)}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Certification Body</p>
                    <p className="text-lg font-semibold">{certificate.certification_body}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Accreditation Body</p>
                    <p className="text-lg font-semibold">{certificate.accreditation_body}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Default State - No Certificate */}
          {!certNumber && !loading && (
            <div className="text-center py-12">
              <Smartphone className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Scan QR Code to Verify</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Use your smartphone to scan the QR code on your certificate to verify its authenticity
              </p>
            </div>
          )}

          {/* Info Section */}
          <div className="bg-muted/50 rounded-xl p-6 text-center">
            <Smartphone className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              For verification inquiries, please contact us at verification@americo.com
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
