import { Certificate } from "@/types/certificate";
import { format } from "date-fns";
import { CheckCircle, ChevronLeft, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import sisCertLogo from "@/assets/siscert-logo.png";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header Navigation */}
      <header className="bg-primary shadow-lg border-b border-primary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Kembali</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Beranda</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <img 
              src={sisCertLogo} 
              alt="SisCert Logo" 
              className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain"
            />
          </div>
          <div className="inline-block mb-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm">
              Verifikasi Sertifikat
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 tracking-tight">
            Detail Sertifikat
          </h1>
        </div>

        {/* Certificate Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-scale-in">
            {/* Header Section with Status */}
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-6 sm:px-8 lg:px-10 py-6 border-b border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {getStatusBadge(certificate.status)}
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary text-primary-foreground rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold">
                    {certificate.certificate_standard}
                  </Badge>
                  <Badge className="bg-secondary text-secondary-foreground rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold">
                    {certificate.accreditation_body}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="px-6 sm:px-8 lg:px-10 py-8 space-y-8">
              {/* Organization Name */}
              <div className="text-center py-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
                  {certificate.company_name}
                </h2>
                <div className="mt-4 inline-flex items-center gap-2 bg-accent/50 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-muted-foreground">No. Sertifikat:</span>
                  <span className="text-sm font-bold text-foreground">{certificate.certificate_number}</span>
                </div>
              </div>

              {/* Location Information */}
              {(certificate.address || certificate.certified_location || certificate.country) && (
                <div className="bg-muted/30 rounded-xl p-6 space-y-4 border border-border/50">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                    Informasi Lokasi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificate.address && (
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Alamat
                        </label>
                        <p className="text-sm md:text-base text-foreground leading-relaxed">
                          {certificate.address}
                        </p>
                      </div>
                    )}
                    {certificate.certified_location && (
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Lokasi Sertifikasi
                        </label>
                        <p className="text-sm md:text-base text-foreground leading-relaxed">
                          {certificate.certified_location}
                        </p>
                      </div>
                    )}
                    {certificate.country && (
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Negara
                        </label>
                        <p className="text-sm md:text-base text-foreground font-medium">
                          {certificate.country}
                        </p>
                      </div>
                    )}
                    {certificate.issue && (
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Issue
                        </label>
                        <p className="text-sm md:text-base text-foreground font-medium">
                          {certificate.issue}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dates Section */}
              <div className="bg-muted/30 rounded-xl p-6 space-y-4 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                  Informasi Tanggal
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certificate.first_issue_date && (
                    <div className="bg-card rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-colors">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                        Tanggal Penerbitan Pertama
                      </label>
                      <p className="text-sm md:text-base text-foreground font-semibold">
                        {formatDate(certificate.first_issue_date)}
                      </p>
                    </div>
                  )}
                  {certificate.latest_issue_date && (
                    <div className="bg-card rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-colors">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                        Tanggal Penerbitan Terbaru
                      </label>
                      <p className="text-sm md:text-base text-foreground font-semibold">
                        {formatDate(certificate.latest_issue_date)}
                      </p>
                    </div>
                  )}
                  <div className="bg-card rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-colors">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                      Tanggal Kadaluarsa
                    </label>
                    <p className="text-sm md:text-base text-foreground font-semibold">
                      {formatDate(certificate.expiry_date)}
                    </p>
                  </div>
                  {certificate.recertification_date && (
                    <div className="bg-card rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-colors">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                        Tanggal Re-Sertifikasi
                      </label>
                      <p className="text-sm md:text-base text-foreground font-semibold">
                        {formatDate(certificate.recertification_date)}
                      </p>
                    </div>
                  )}
                  <div className="bg-card rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-colors">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                      Surveillance Berikutnya
                    </label>
                    <p className="text-sm md:text-base text-foreground font-semibold">
                      {formatDate(certificate.surveillance_date)}
                    </p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-colors">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                      EA Code/Kategori
                    </label>
                    <p className="text-sm md:text-base text-foreground font-semibold">
                      {certificate.ea_code || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scope Section */}
              {certificate.scope && (
                <div className="bg-muted/30 rounded-xl p-6 space-y-4 border border-border/50">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                    Ruang Lingkup
                  </h3>
                  <div className="bg-card rounded-lg p-5 border border-border/50">
                    <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-wrap">
                      {certificate.scope}
                    </p>
                  </div>
                </div>
              )}

              {/* Certification Body */}
              <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                  Badan Sertifikasi
                </h3>
                <p className="text-base md:text-lg text-foreground font-bold">
                  {certificate.certification_body}
                </p>
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-6 sm:px-8 lg:px-10 py-6 border-t border-border">
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-border/50">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
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
        </div>
      </main>
    </div>
  );
}
