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
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden border-0 shadow-2xl">
        <DialogHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white py-6 px-8 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Check Certificate Status
          </DialogTitle>
          <p className="text-red-50 text-sm mt-2 font-normal">
            Enter your company details to verify your certification
          </p>
        </DialogHeader>

        <form onSubmit={handleSearch} className="p-8 space-y-6 bg-gradient-to-b from-background to-muted/20">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-destructive/10 border-l-4 border-destructive rounded-lg text-destructive text-sm shadow-sm animate-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <Label
              htmlFor="clientName"
              className="text-sm font-semibold text-foreground flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              Client Name
            </Label>
            <p className="text-xs text-muted-foreground -mt-1 ml-3.5">
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
              className="h-12 text-base border-2 focus:border-red-600 transition-all"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="certificateNumber"
              className="text-sm font-semibold text-foreground flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
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
              className="h-12 text-base border-2 focus:border-red-600 transition-all"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Checking...
              </span>
            ) : (
              "CHECK STATUS"
            )}
          </Button>

          <div className="pt-6 border-t border-border/50">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
              <Smartphone className="h-5 w-5 flex-shrink-0 text-red-600" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Quick tip:</span> Scan the QR code on your certificate for instant verification
              </p>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
