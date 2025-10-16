import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Certificate } from "@/types/certificate";
import { Shield, AlertCircle, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AmericoTemplate } from "@/components/certificate-templates";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CertificateVerification() {
  const [searchParams] = useSearchParams();
  const certNumber = searchParams.get("cert");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        setIsDialogOpen(false);
        setError(null);
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
    setIsDialogOpen(true);
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

      {/* Landing page with dialog - shown when no certificate */}
      {!certificate && !certNumber && (
        <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
          <Navigation />
          <div className="flex-1 bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-4 py-12">
            <div className="text-center max-w-2xl mx-auto">
              <Shield className="w-24 h-24 mx-auto mb-6 text-red-600" />
              <h1 className="text-4xl font-bold mb-4 text-foreground">Verify Your Certificate</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Click below to check certificate status and authenticity
              </p>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-6 text-lg">
                    <Search className="w-5 h-5 mr-2" />
                    Verify Certificate
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader className="bg-red-600 text-white -m-6 mb-0 p-6 rounded-t-lg">
                    <DialogTitle className="text-xl font-bold text-center text-white">
                      Check Certificate Status
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="p-6">
                    {/* Loading State */}
                    {loading && (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                      </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                          <div>
                            <h4 className="text-sm font-semibold text-destructive mb-1">Not Found</h4>
                            <p className="text-sm text-muted-foreground">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Search Form */}
                    {!loading && (
                      <form onSubmit={handleSearch} className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground block uppercase tracking-wide">
                            Client Name (First 3 Letters)
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
                          <label className="text-xs font-semibold text-muted-foreground block uppercase tracking-wide">
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
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-5 text-base"
                          disabled={loading}
                        >
                          CHECK STATUS
                        </Button>
                      </form>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              
              <p className="text-sm text-muted-foreground mt-8 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                Or scan the QR code on your certificate
              </p>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
