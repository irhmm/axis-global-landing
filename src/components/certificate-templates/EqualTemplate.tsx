import { Certificate } from "@/types/certificate";
import { format } from "date-fns";
import { CheckCircle, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import equalLogo from "@/assets/equal-logo.jpeg";

interface EqualTemplateProps {
  certificate: Certificate;
}

export function EqualTemplate({ certificate }: EqualTemplateProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd-MMM-yyyy");
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status?: string) => {
    const statusValue = status || 'active';
    const statusConfig = {
      active: { label: 'Approved', class: 'bg-green-500 hover:bg-green-600' },
      inactive: { label: 'Inactive', class: 'bg-gray-500 hover:bg-gray-600' },
      suspended: { label: 'Suspended', class: 'bg-orange-500 hover:bg-orange-600' },
    };
    const config = statusConfig[statusValue as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <Badge className={`${config.class} text-white rounded-md px-3 py-1 text-sm font-semibold flex items-center gap-1 w-fit`}>
        <CheckCircle className="w-4 h-4" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="bg-card shadow-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-foreground hover:bg-muted px-3 py-2 rounded-lg transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Home</span>
          </button>
        </div>
      </header>

      {/* Logo Section */}
      <div className="bg-[#0993a6] py-8">
        <div className="container mx-auto px-4">
          <img 
            src={equalLogo} 
            alt="Equal Assurance Logo" 
            className="h-32 w-auto object-contain mx-auto"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Client Details
          </h1>
        </div>

        {/* Certificate Card */}
        <div className="max-w-5xl mx-auto bg-card rounded-lg shadow-lg border border-border p-6 sm:p-8 lg:p-10 space-y-6">
          {/* Organization Name */}
          <div className="pb-4 border-b border-border">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {certificate.company_name}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Certification Status:</span>
              {getStatusBadge(certificate.status)}
            </div>
          </div>

          {/* Certificate Information Grid */}
          <div className="space-y-6">
            {/* Certificate Number */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">Certificate Number(s):</h3>
              <p className="text-base text-[#00A3AD] font-medium">{certificate.certificate_number}</p>
            </div>

            {/* Trading Name */}
            {certificate.trading_name && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Trading Name(s):</h3>
                <p className="text-base text-muted-foreground">{certificate.trading_name}</p>
              </div>
            )}

            {/* Main Site Name and Address */}
            {certificate.main_site_address && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Main Site Name and Address:</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{certificate.main_site_address}</p>
              </div>
            )}

            {/* Other Permanent Sites */}
            {certificate.other_sites && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Other Permanent Sites:</h3>
                <p className="text-base text-muted-foreground">{certificate.other_sites}</p>
              </div>
            )}

            {/* Website */}
            {certificate.website && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Website:</h3>
                <a 
                  href={certificate.website.startsWith('http') ? certificate.website : `https://${certificate.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-[#00A3AD] hover:underline"
                >
                  {certificate.website}
                </a>
              </div>
            )}

            {/* Certification Criteria */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">Certification Criteria:</h3>
              <p className="text-base text-muted-foreground">{certificate.certification_criteria || certificate.certificate_standard}</p>
            </div>

            {/* Certification Scope */}
            {certificate.scope && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Certification Scope:</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{certificate.scope}</p>
              </div>
            )}

            {/* Certification Approval Date */}
            {certificate.certification_approval_date && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Certification Approval Date:</h3>
                <p className="text-base text-muted-foreground">{formatDate(certificate.certification_approval_date)}</p>
              </div>
            )}

            {/* Original Audit Date */}
            {certificate.original_audit_date && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Original Audit Date(s):</h3>
                <p className="text-base text-muted-foreground">{formatDate(certificate.original_audit_date)}</p>
              </div>
            )}

            {/* Certification Expiration Date */}
            {certificate.certification_expiration_date && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Certification Expiration Date:</h3>
                <p className="text-base text-muted-foreground">{formatDate(certificate.certification_expiration_date)}</p>
              </div>
            )}

            {/* ISIC Code */}
            {certificate.isic_code && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">ISIC Code(s):</h3>
                <p className="text-base text-muted-foreground">{certificate.isic_code}</p>
              </div>
            )}

            {/* Managing Partner */}
            {certificate.managing_partner && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Managing Partner:</h3>
                <p className="text-base text-muted-foreground">{certificate.managing_partner}</p>
              </div>
            )}

            {/* Managing Practice */}
            {certificate.managing_practice && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Managing Practice:</h3>
                <p className="text-base text-muted-foreground">{certificate.managing_practice}</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-8 bg-gradient-to-r from-[#0993a6]/5 via-[#0993a6]/10 to-[#0993a6]/5 rounded-lg p-6 border border-border">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-border/50">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0993a6]/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#0993a6]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    <span className="font-semibold">Certificate Verification:</span> Scan the QR code or visit our website to verify the authenticity of this certificate.
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    For more information, please contact our support team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
