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
      <DialogContent className="sm:max-w-xl p-0 gap-0">
        <DialogHeader className="bg-red-600 text-white py-4 px-6 rounded-t-lg">
          <DialogTitle className="text-xl font-semibold">
            Check Certificate Status
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSearch} className="p-6 space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="clientName"
              className="text-sm font-medium uppercase text-muted-foreground"
            >
              Client Name (Please enter first 3 letters only of your company
              name)
            </Label>
            <Input
              id="clientName"
              type="text"
              placeholder="Enter first 3 letters..."
              value={searchForm.clientName}
              onChange={(e) =>
                setSearchForm({ ...searchForm, clientName: e.target.value })
              }
              className="h-12"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="certificateNumber"
              className="text-sm font-medium uppercase text-muted-foreground"
            >
              Certificate No.
            </Label>
            <Input
              id="certificateNumber"
              type="text"
              placeholder="Enter certificate number..."
              value={searchForm.certificateNumber}
              onChange={(e) =>
                setSearchForm({
                  ...searchForm,
                  certificateNumber: e.target.value,
                })
              }
              className="h-12"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "CHECKING..." : "CHECK STATUS"}
          </Button>

          <div className="pt-4 border-t border-border">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Smartphone className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>Or scan the QR code on your certificate</p>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
