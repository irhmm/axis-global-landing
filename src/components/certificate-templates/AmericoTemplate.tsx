import { Certificate } from "@/types/certificate";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Smartphone } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface AmericoTemplateProps {
  certificate: Certificate;
}

export function AmericoTemplate({ certificate }: AmericoTemplateProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: '#667eea' }}>
              Americo
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">Certificate Verification System</p>
          </div>

          {/* Success Banner */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center justify-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-sm sm:text-base font-medium text-green-700 dark:text-green-300">
                Certificate Information Retrieved Successfully
              </p>
            </div>
          </div>

          {/* Certificate Card */}
          <Card className="max-w-2xl mx-auto shadow-lg border-border/50">
            <CardContent className="p-6 sm:p-8">
              {/* Certificate Details */}
              <div className="space-y-4">
                {/* Certificate Number */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-border/30">
                  <span className="text-sm text-muted-foreground mb-1 sm:mb-0">Certificate Number:</span>
                  <span className="text-base font-semibold">{certificate.certificate_number}</span>
                </div>

                {/* Company Name */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-border/30">
                  <span className="text-sm text-muted-foreground mb-1 sm:mb-0">Company Name:</span>
                  <span className="text-base font-semibold text-right">{certificate.company_name}</span>
                </div>

                {/* Certificate Standard */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-border/30">
                  <span className="text-sm text-muted-foreground mb-1 sm:mb-0">Certificate Standard:</span>
                  <span className="text-base font-semibold">{certificate.certificate_standard}</span>
                </div>

                {/* Issue Date */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-border/30">
                  <span className="text-sm text-muted-foreground mb-1 sm:mb-0">Issue Date:</span>
                  <span className="text-base font-semibold">{formatDate(certificate.issue_date)}</span>
                </div>

                {/* Surveillance */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-border/30">
                  <span className="text-sm text-muted-foreground mb-1 sm:mb-0">Surveillance:</span>
                  <span className="text-base font-semibold">{formatDate(certificate.surveillance_date)}</span>
                </div>

                {/* Expired Date/Recertification */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-border/30">
                  <span className="text-sm text-muted-foreground mb-1 sm:mb-0">Expired Date/Recertification:</span>
                  <span className="text-base font-semibold">{formatDate(certificate.expiry_date)}</span>
                </div>

                {/* Certification Body */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-border/30">
                  <span className="text-sm text-muted-foreground mb-1 sm:mb-0">Certification Body:</span>
                  <span className="text-base font-semibold">{certificate.certification_body}</span>
                </div>

                {/* Accreditation Body */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3">
                  <span className="text-sm text-muted-foreground mb-1 sm:mb-0">Accreditation Body:</span>
                  <span className="text-base font-semibold">{certificate.accreditation_body}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Info */}
          <div className="max-w-2xl mx-auto mt-6">
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-5 flex items-center justify-center gap-3">
              <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div className="text-center">
                <p className="text-sm text-foreground leading-relaxed">
                  This information was retrieved by<br />
                  scanning a QR code on your certificate
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="max-w-2xl mx-auto mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              For verification inquiries, contact our support team.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
