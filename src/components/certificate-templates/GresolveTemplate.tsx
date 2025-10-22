import { Certificate } from "@/types/certificate";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Smartphone, XCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import gresolveLogo from "@/assets/gresolve-logo.png";
import { getCertificateStatus, getStatusBadgeColor, getStatusLabel } from "@/lib/certificateStatus";

interface GresolveTemplateProps {
  certificate: Certificate;
}

export function GresolveTemplate({ certificate }: GresolveTemplateProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const status = getCertificateStatus(certificate.expiry_date);
  const isExpired = status === 'expired';

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Header with Logo */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img 
                src={gresolveLogo} 
                alt="Gresolve Logo" 
                className="h-24 w-24 object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#dc2626' }}>
              AXIS Global Sertifikasi
            </h1>
            <p className="text-base sm:text-lg text-gray-600">Certificate Verification System</p>
          </div>

          {/* Success Banner */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-sm sm:text-base font-medium text-green-700">
                Certificate Information Retrieved Successfully
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className={`border rounded-lg p-4 flex items-center justify-center gap-3 ${getStatusBadgeColor(status)}`}>
              {isExpired ? (
                <XCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <p className="text-sm sm:text-base font-semibold">
                Certificate Status: {getStatusLabel(status)}
              </p>
            </div>
          </div>

          {/* Expired Warning */}
          {isExpired && (
            <div className="max-w-2xl mx-auto mb-6">
              <div className="bg-red-50 border border-red-300 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm sm:text-base font-medium text-red-800">
                  ⚠️ This certificate has expired on <strong>{formatDate(certificate.expiry_date)}</strong>
                </p>
              </div>
            </div>
          )}

          {/* Certificate Card */}
          <Card className="max-w-2xl mx-auto shadow-md border border-gray-200 bg-white">
            <CardContent className="p-6 sm:p-8">
              {/* Certificate Details */}
              <div className="space-y-0">
                {/* Certificate Number */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600 mb-1 sm:mb-0">Certificate Number:</span>
                  <span className="text-sm sm:text-right text-gray-900 break-words sm:ml-4">{certificate.certificate_number}</span>
                </div>

                {/* Company Name */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600 mb-1 sm:mb-0">Company Name:</span>
                  <span className="text-sm sm:text-right text-gray-900 break-words sm:ml-4">{certificate.company_name}</span>
                </div>

                {/* Certificate Standard */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600 mb-1 sm:mb-0">Certificate Standard:</span>
                  <span className="text-sm sm:text-right text-gray-900 sm:ml-4">{certificate.certificate_standard}</span>
                </div>

                {/* Issue Date */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600 mb-1 sm:mb-0">Issue Date:</span>
                  <span className="text-sm sm:text-right text-gray-900 sm:ml-4">{formatDate(certificate.issue_date)}</span>
                </div>

                {/* Surveillance */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600 mb-1 sm:mb-0">Surveillance:</span>
                  <span className="text-sm sm:text-right text-gray-900 sm:ml-4">{formatDate(certificate.surveillance_date)}</span>
                </div>

                {/* Expired Date/Recertification */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600 mb-1 sm:mb-0">Expired Date/Recertification:</span>
                  <span className="text-sm sm:text-right text-gray-900 sm:ml-4">{formatDate(certificate.expiry_date)}</span>
                </div>

                {/* Certification Body */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600 mb-1 sm:mb-0">Certification Body:</span>
                  <span className="text-sm sm:text-right text-gray-900 sm:ml-4">{certificate.certification_body}</span>
                </div>

                {/* Accreditation Body */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-3">
                  <span className="text-sm text-gray-600 mb-1 sm:mb-0">Accreditation Body:</span>
                  <span className="text-sm sm:text-right text-gray-900 sm:ml-4">{certificate.accreditation_body}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Info */}
          <div className="max-w-2xl mx-auto mt-6">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-start md:justify-center gap-3">
              <Smartphone className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-xs text-gray-700 leading-relaxed text-left md:text-center">
                This information was retrieved by scanning a QR code on your certificate
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="max-w-2xl mx-auto mt-4 mb-8 text-center">
            <p className="text-sm text-gray-500">
              For verification inquiries, contact our support team.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
