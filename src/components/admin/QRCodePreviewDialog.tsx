import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, QrCode, Globe, RefreshCw } from "lucide-react";
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
  onRegenerate: () => void;
  isRegenerating?: boolean;
}

export function QRCodePreviewDialog({
  open,
  onOpenChange,
  certificate,
  qrCodeDataURL,
  onDownload,
  onRegenerate,
  isRegenerating = false,
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

        <DialogFooter className="gap-2 sm:gap-0 sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="gap-2"
            >
              {isRegenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </>
              )}
            </Button>
            <Button onClick={onDownload} className="gap-2" disabled={isRegenerating}>
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
