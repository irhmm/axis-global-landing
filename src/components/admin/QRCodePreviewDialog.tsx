import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, QrCode, Globe } from "lucide-react";
import { getPublicBaseUrl, isDevelopmentEnvironment } from "@/lib/url";

interface QRCodePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: {
    certificate_number: string;
    company_name: string;
  } | null;
  qrCodeDataURL: string | null;
  onDownload: () => void;
}

export function QRCodePreviewDialog({
  open,
  onOpenChange,
  certificate,
  qrCodeDataURL,
  onDownload,
}: QRCodePreviewDialogProps) {
  if (!certificate || !qrCodeDataURL) return null;

  const publicBaseUrl = getPublicBaseUrl();
  const verificationUrl = `${publicBaseUrl}/verify?cert=${certificate.certificate_number}`;
  const isDevEnvironment = isDevelopmentEnvironment();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code Preview
          </DialogTitle>
          <DialogDescription>
            Scan kode QR ini untuk memverifikasi sertifikat
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="flex flex-col items-center gap-4 py-2 px-2">
            {/* QR Code Display */}
            <div className="bg-white p-4 rounded-lg border-2 border-border shadow-md">
              <img
                src={qrCodeDataURL}
                alt={`QR Code for ${certificate.certificate_number}`}
                className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]"
              />
            </div>

            {/* Certificate Info */}
            <div className="w-full space-y-2 text-center">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Certificate Number</p>
                <p className="text-base sm:text-lg font-semibold">{certificate.certificate_number}</p>
              </div>
              
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Company Name</p>
                <p className="text-sm sm:text-base">{certificate.company_name}</p>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  <p className="text-xs font-semibold break-all">Public Domain: {publicBaseUrl}</p>
                </div>
                
                {isDevEnvironment && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded px-3 py-2">
                    <p className="text-xs text-yellow-600 dark:text-yellow-500 text-center">
                      ⚠️ Running on localhost - QR codes will use localhost URL
                    </p>
                  </div>
                )}
                
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Verification URL</p>
                  <p className="text-xs font-mono text-muted-foreground break-all bg-muted px-2 py-1.5 rounded">
                    {verificationUrl}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={onDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download QR Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
