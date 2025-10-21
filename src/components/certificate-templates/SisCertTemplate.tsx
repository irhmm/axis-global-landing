import { Certificate } from "@/types/certificate";
import { format } from "date-fns";
import { CheckCircle, ChevronLeft, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface SisCertTemplateProps {
  certificate: Certificate;
}

export function SisCertTemplate({ certificate }: SisCertTemplateProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "yyyy-MM-dd");
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status?: string) => {
    const statusValue = status || 'active';
    const statusConfig = {
      active: { label: 'Active', class: 'bg-green-500 hover:bg-green-600' },
      inactive: { label: 'Inactive', class: 'bg-gray-500 hover:bg-gray-600' },
      suspended: { label: 'Suspended', class: 'bg-orange-500 hover:bg-orange-600' },
    };
    const config = statusConfig[statusValue as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <Badge className={`${config.class} text-white rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1 w-fit`}>
        <CheckCircle className="w-4 h-4" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Navigation */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </button>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Certificates Details
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            View Details For <span className="font-semibold text-red-600">{certificate.certificate_number}</span>
          </p>
        </div>

        {/* Certificate Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-8 lg:p-10">
          {/* Status Badge */}
          <div className="mb-6">
            {getStatusBadge(certificate.status)}
          </div>

          {/* Organization Name */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-gray-900 leading-tight">
              {certificate.company_name}
            </h2>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Address */}
            {certificate.address && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Address
                </label>
                <p className="text-base text-gray-900 leading-relaxed">
                  {certificate.address}
                </p>
              </div>
            )}

            {/* Certified Location */}
            {certificate.certified_location && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Certified Location
                </label>
                <p className="text-base text-gray-900 leading-relaxed">
                  {certificate.certified_location}
                </p>
              </div>
            )}

            {/* Country */}
            {certificate.country && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Country
                </label>
                <p className="text-base text-gray-900">
                  {certificate.country}
                </p>
              </div>
            )}

            {/* Issue */}
            {certificate.issue && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Issue
                </label>
                <p className="text-base text-gray-900">
                  {certificate.issue}
                </p>
              </div>
            )}
          </div>

          {/* Badges Section */}
          <div className="flex flex-wrap gap-3 mb-8">
            {/* Standard Badge */}
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 text-sm font-semibold">
              {certificate.certificate_standard}
            </Badge>

            {/* Accreditation Badge */}
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white rounded px-3 py-2 text-sm font-semibold">
              {certificate.accreditation_body}
            </Badge>

            {/* Certificate Number Badge */}
            <Badge className="bg-cyan-500 hover:bg-cyan-600 text-white rounded px-3 py-2 text-sm font-semibold">
              {certificate.certificate_number}
            </Badge>
          </div>

          {/* Dates Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* First Issue Date */}
            {certificate.first_issue_date && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  First Issue Date
                </label>
                <p className="text-base text-gray-900">
                  {formatDate(certificate.first_issue_date)}
                </p>
              </div>
            )}

            {/* Latest Issue Date */}
            {certificate.latest_issue_date && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Latest Issue Date
                </label>
                <p className="text-base text-gray-900">
                  {formatDate(certificate.latest_issue_date)}
                </p>
              </div>
            )}

            {/* Certificate Expiry Date */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Certificate Expiry Date
              </label>
              <p className="text-base text-gray-900">
                {formatDate(certificate.expiry_date)}
              </p>
            </div>

            {/* Re-Certification Due */}
            {certificate.recertification_date && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Re-Certification Due On
                </label>
                <p className="text-base text-gray-900">
                  {formatDate(certificate.recertification_date)}
                </p>
              </div>
            )}

            {/* Next Surveillance Due */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Next Surveillance Due On
              </label>
              <p className="text-base text-gray-900">
                {formatDate(certificate.surveillance_date)}
              </p>
            </div>

            {/* EA Code/Category */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                EA Code/Category
              </label>
              <p className="text-base text-gray-900">
                {certificate.ea_code || 'N/A'}
              </p>
            </div>
          </div>

          {/* Scope Section */}
          {certificate.scope && (
            <div className="space-y-2 mb-8 p-4 bg-gray-50 rounded-lg">
              <label className="text-sm font-medium text-gray-600 uppercase tracking-wide block">
                Scope
              </label>
              <p className="text-base text-gray-900 leading-relaxed whitespace-pre-wrap">
                {certificate.scope}
              </p>
            </div>
          )}

          {/* Certification Body */}
          <div className="space-y-1 mb-8">
            <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Certification Body
            </label>
            <p className="text-base text-gray-900 font-semibold">
              {certificate.certification_body}
            </p>
          </div>

          {/* Footer Info */}
          <div className="border-t pt-6 mt-6">
            <div className="bg-blue-50 rounded-lg p-4 md:p-6">
              <p className="text-sm md:text-base text-gray-700 text-center leading-relaxed">
                🔍 <span className="font-semibold">Verifikasi Sertifikat:</span> Scan QR code atau kunjungi website kami untuk memverifikasi keaslian sertifikat ini.
              </p>
              <p className="text-sm text-gray-600 text-center mt-2">
                Untuk informasi lebih lanjut, hubungi tim support kami.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
