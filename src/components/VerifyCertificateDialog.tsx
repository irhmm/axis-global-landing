import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VerifyCertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VerifyCertificateDialog({
  open,
  onOpenChange,
}: VerifyCertificateDialogProps) {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    clientName: "",
    certificateNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedClientName = searchForm.clientName.trim();
    const trimmedCertNumber = searchForm.certificateNumber.trim();

    if (trimmedClientName.length < 3) {
      setError("Please enter at least 3 letters of company name");
      return;
    }

    if (!trimmedCertNumber) {
      setError("Please enter certificate number");
      return;
    }

    setIsLoading(true);

    try {
      const first3Letters = trimmedClientName.substring(0, 3);
      const { data, error: searchError } = await supabase
        .from("certificates")
        .select("*")
        .ilike("company_name", `${first3Letters}%`)
        .eq("certificate_number", trimmedCertNumber)
        .maybeSingle();

      if (searchError) throw searchError;

      if (data) {
        // Close dialog and navigate to certificate page
        onOpenChange(false);
        setSearchForm({ clientName: "", certificateNumber: "" });
        navigate(`/verify?cert=${trimmedCertNumber}`);
      } else {
        setError(
          "Certificate not found. Please check your company name and certificate number."
        );
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search certificate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden border-0 shadow-2xl backdrop-blur-sm">
        <DialogHeader className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-8 px-8 border-b border-border/50">
          <DialogTitle className="text-2xl sm:text-3xl font-semibold tracking-tight text-muted-foreground">
            Certificate Verification
          </DialogTitle>
          <p className="text-muted-foreground/70 text-sm sm:text-base mt-3 font-light">
            Verify the authenticity of your certification credentials
          </p>
        </DialogHeader>

        <form onSubmit={handleSearch} className="p-6 sm:p-8 space-y-6 bg-gradient-to-b from-background via-background to-muted/10">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm shadow-lg animate-in slide-in-from-top-2 backdrop-blur-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0 animate-pulse" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-3 group">
            <Label
              htmlFor="clientName"
              className="text-base font-dm-sans font-semibold text-muted-foreground flex items-center gap-2.5 tracking-wide"
            >
              <span className="w-2 h-2 rounded-full bg-primary shadow-sm"></span>
              Client Name
            </Label>
            <p className="text-xs text-muted-foreground ml-4 leading-relaxed">
              Please enter first 3 letters only of your company name
            </p>
            <Input
              id="clientName"
              type="text"
              placeholder="e.g., ABC"
              value={searchForm.clientName}
              onChange={(e) =>
                setSearchForm({ ...searchForm, clientName: e.target.value })
              }
              className="h-12 sm:h-14 text-base border border-border focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md bg-background/80 backdrop-blur-sm"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-3 group">
            <Label
              htmlFor="certificateNumber"
              className="text-base font-dm-sans font-semibold text-muted-foreground flex items-center gap-2.5 tracking-wide"
            >
              <span className="w-2 h-2 rounded-full bg-primary shadow-sm"></span>
              Certificate Number
            </Label>
            <Input
              id="certificateNumber"
              type="text"
              placeholder="e.g., CERT-2025-001"
              value={searchForm.certificateNumber}
              onChange={(e) =>
                setSearchForm({
                  ...searchForm,
                  certificateNumber: e.target.value,
                })
              }
              className="h-12 sm:h-14 text-base border border-border focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md bg-background/80 backdrop-blur-sm"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 sm:py-7 text-base sm:text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] rounded-xl mt-8 relative overflow-hidden group"
            disabled={isLoading}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
            {isLoading ? (
              <span className="flex items-center gap-2 relative z-10">
                <span className="animate-spin">⏳</span>
                Verifying Certificate...
              </span>
            ) : (
              <span className="relative z-10">VERIFY CERTIFICATE</span>
            )}
          </Button>

          <div className="pt-6 border-t border-border/30">
            <div className="flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-muted/30 border border-border/30 backdrop-blur-sm hover:bg-muted/40 transition-colors duration-300">
              <Smartphone className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground block mb-1">Quick tip:</span>
                Scan the QR code on your certificate for instant verification
              </p>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
