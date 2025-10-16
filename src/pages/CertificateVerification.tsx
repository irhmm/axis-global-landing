import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Certificate } from "@/types/certificate";
import { Smartphone, AlertCircle, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AmericoTemplate } from "@/components/certificate-templates";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CertificateVerification() {
  const [searchParams] = useSearchParams();
  const certNumber = searchParams.get("cert");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchForm, setSearchForm] = useState({
    clientName: '',
    certificateNumber: ''
  });

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const first3Letters = searchForm.clientName.trim().substring(0, 3).toUpperCase();
    
    if (first3Letters.length < 3) {
      setError("Please enter at least 3 letters of company name");
      return;
    }
    
    if (!searchForm.certificateNumber.trim()) {
      setError("Please enter certificate number");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .ilike("company_name", `${first3Letters}%`)
        .eq("certificate_number", searchForm.certificateNumber.trim())
        .maybeSingle();
      
      if (error) throw error;
      
      if (!data) {
        setError("Certificate not found. Please check your company name and certificate number.");
      } else {
        setCertificate(data);
      }
    } catch (err) {
      console.error("Error searching certificate:", err);
      setError("Failed to search certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAnother = () => {
    setCertificate(null);
    setError(null);
    setSearchForm({ clientName: '', certificateNumber: '' });
  };

  const renderTemplate = () => {
    if (!certificate) return null;

    switch (certificate.template_type) {
      case 'americo':
        return <AmericoTemplate certificate={certificate} />;
      case 'modern':
        // Future: ModernTemplate
        return <AmericoTemplate certificate={certificate} />;
      case 'classic':
        // Future: ClassicTemplate
        return <AmericoTemplate certificate={certificate} />;
      default:
        return <AmericoTemplate certificate={certificate} />;
    }
  };

  return (
    <>
      {/* Show template rendering if certificate found */}
      {certificate && !loading && (
        <>
          {renderTemplate()}
          {!certNumber && (
            <div className="fixed bottom-8 right-8 z-50">
              <Button 
                onClick={handleSearchAnother}
                className="bg-red-600 hover:bg-red-700 text-white shadow-lg"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Another Certificate
              </Button>
            </div>
          )}
        </>
      )}

      {/* Error, Loading, and Default states with Navigation */}
      {(!certificate || loading || error) && (
        <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
          <Navigation />
          <div className="flex-1 bg-gradient-to-b from-background to-muted/20 px-4 py-12">
            <div className="max-w-4xl mx-auto">
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

              {/* Search Form - No Certificate */}
              {!certNumber && !loading && !certificate && (
                <Card className="max-w-2xl mx-auto shadow-lg">
                  <CardHeader className="bg-red-600 text-white rounded-t-xl p-6">
                    <h2 className="text-2xl font-bold text-center">Check Certificate Status</h2>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSearch} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground block uppercase">
                          Client Name (Please enter first 3 letters only of your company name)
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter first 3 letters..."
                          value={searchForm.clientName}
                          onChange={(e) => setSearchForm(prev => ({ ...prev, clientName: e.target.value }))}
                          className="w-full"
                          maxLength={50}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground block uppercase">
                          Certificate No.
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter certificate number..."
                          value={searchForm.certificateNumber}
                          onChange={(e) => setSearchForm(prev => ({ ...prev, certificateNumber: e.target.value }))}
                          className="w-full"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg"
                        disabled={loading}
                      >
                        {loading ? "SEARCHING..." : "CHECK STATUS"}
                      </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Smartphone className="w-5 h-5" />
                        <p className="text-sm">
                          Or scan the QR code on your certificate
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
