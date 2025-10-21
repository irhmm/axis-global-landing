import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import VerifyCertificateDialog from "@/components/VerifyCertificateDialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.png";
import uafLogo from "@/assets/accreditation/uaf.png";
import iasLogo from "@/assets/accreditation/ias.png";
import kanLogo from "@/assets/accreditation/kan.webp";
import nordLogo from "@/assets/accreditation/tuv-nord.jpg";
import egacLogo from "@/assets/accreditation/egac.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [isAffiliationOpen, setIsAffiliationOpen] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState<string | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const affiliationMenu = {
    certificateAffiliate: [
      { name: "Americo", accreditation: "UAF", logo: uafLogo },
      { name: "Siscert", accreditation: "IAS", logo: iasLogo },
      { name: "TSI", accreditation: "KAN", logo: kanLogo },
      { name: "TUV", accreditation: "NORD", logo: nordLogo },
      { name: "BSi" },
      { name: "UKS", accreditation: "EGAC", logo: egacLogo },
      { name: "Sucofindo", accreditation: "KAN", logo: kanLogo }
    ],
    otherCertifications: [
      "Sertifikasi Kemenaker",
      "Sertifikasi BNSP",
      "Sertifikasi Halal Kemenag"
    ]
  };

  const servicesMenu = {
    isoStandards: [
      { 
        code: "ISO 37001", 
        title: "Anti-Bribery Management Systems",
        description: "Sistem Manajemen Anti-Penyuapan untuk mencegah, mendeteksi, dan mengatasi risiko suap dalam organisasi. Membantu membangun budaya integritas dan transparansi bisnis yang beretika."
      },
      { 
        code: "ISO 21001", 
        title: "Educational Organizations Management",
        description: "Sistem Manajemen Organisasi Pendidikan untuk meningkatkan kualitas dan efektivitas layanan pendidikan. Memastikan kepuasan peserta didik dan stakeholder pendidikan."
      },
      { 
        code: "ISO 27001", 
        title: "Information Security Management",
        description: "Sistem Manajemen Keamanan Informasi untuk melindungi data dan informasi sensitif organisasi. Mengelola risiko keamanan informasi secara sistematis dan terstruktur."
      },
      { 
        code: "ISO 45001", 
        title: "Occupational Health & Safety",
        description: "Sistem Manajemen Kesehatan dan Keselamatan Kerja untuk menciptakan lingkungan kerja yang aman. Mengurangi risiko kecelakaan kerja dan meningkatkan kesejahteraan karyawan."
      },
      { 
        code: "ISO 14001", 
        title: "Environmental Management Systems",
        description: "Sistem Manajemen Lingkungan untuk mengelola tanggung jawab lingkungan secara sistematis. Meningkatkan kinerja lingkungan dan meminimalkan dampak operasional terhadap lingkungan."
      },
      { 
        code: "ISO 9001", 
        title: "Quality Management Systems",
        description: "Sistem Manajemen Mutu untuk meningkatkan kepuasan pelanggan dan kualitas produk/layanan. Standar internasional yang paling banyak diterapkan di berbagai industri."
      },
      { 
        code: "ISO 22000", 
        title: "Food Safety Management Systems",
        description: "Sistem Manajemen Keamanan Pangan untuk memastikan keamanan produk pangan sepanjang rantai pasokan. Melindungi konsumen dari bahaya kontaminasi makanan."
      },
      { 
        code: "ISO 50001", 
        title: "Energy Management Systems",
        description: "Sistem Manajemen Energi untuk meningkatkan efisiensi energi dan mengurangi biaya operasional. Mendukung keberlanjutan dan pengurangan emisi karbon perusahaan."
      },
      { 
        code: "ISO 22716", 
        title: "Cosmetics Good Manufacturing Practice",
        description: "Pedoman Praktik Manufaktur Kosmetik yang Baik untuk menjamin kualitas dan keamanan produk kosmetik. Memastikan produk kosmetik aman untuk konsumen."
      },
      { 
        code: "ISO 13485", 
        title: "Medical Devices Quality Management",
        description: "Sistem Manajemen Mutu Alat Kesehatan untuk memastikan keamanan dan efektivitas perangkat medis. Memenuhi persyaratan regulasi internasional untuk alat kesehatan."
      },
      { 
        code: "ISO/IEC 17025", 
        title: "Testing & Calibration Laboratories",
        description: "Standar untuk Laboratorium Pengujian dan Kalibrasi yang kompeten dan konsisten. Memastikan hasil pengujian dan kalibrasi yang akurat dan dapat dipercaya."
      },
      { 
        code: "ISO 22301", 
        title: "Business Continuity Management",
        description: "Sistem Manajemen Kontinuitas Bisnis untuk memastikan operasi bisnis tetap berjalan saat terjadi gangguan. Melindungi organisasi dari dampak insiden yang tidak terduga."
      }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/affiliasi", label: "Affiliation" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 ${
        isScrolled ? "bg-background shadow-md" : "bg-background shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between gap-4 h-full">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-1.5 md:gap-2 flex-shrink-0 transition-transform hover:scale-105">
            <img 
              src={logo} 
              alt="PT AXIS Global Sertifikasi Logo" 
              className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-lg"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-foreground leading-tight tracking-wide">AXIS Global</h1>
              <p className="text-xs md:text-sm text-muted-foreground -mt-0.5">PT AXIS Global Sertifikasi</p>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 flex-1">
            {navLinks.map((link) => {
              if (link.path === "/affiliasi") {
                return (
                  <NavigationMenu key={link.path}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-sm xl:text-base font-medium bg-transparent hover:bg-transparent hover:text-red-600 focus:bg-transparent focus:text-red-600 data-[active]:bg-transparent data-[active]:text-red-600 data-[state=open]:bg-transparent data-[state=open]:text-red-600">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent 
                          className="bg-background shadow-xl border border-border"
                          onMouseLeave={() => setSelectedAffiliate(null)}
                        >
                          <div className="w-[700px]">
                            {/* Certificate Affiliate Section - 2 Columns */}
                            <div className="p-6">
                              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                                Sertificate Affiliate
                              </h3>
                              <div className="grid grid-cols-2 gap-0">
                                {/* Left Column - Certificate Names */}
                                <div className="pr-4 border-r border-border">
                                  <div className="space-y-1">
                                    {affiliationMenu.certificateAffiliate.map((cert, idx) => (
                                      <div
                                        key={idx}
                                        onMouseEnter={() => cert.accreditation && setSelectedAffiliate(cert.name)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-md transition-all ${
                                          cert.accreditation ? 'cursor-pointer' : 'cursor-default'
                                        } ${
                                          selectedAffiliate === cert.name
                                            ? 'bg-primary/10 text-primary'
                                            : cert.accreditation ? 'hover:bg-accent' : ''
                                        }`}
                                      >
                                        <span className="text-sm font-medium">
                                          • {cert.name}
                                        </span>
                                        {cert.accreditation && <ChevronRight className="w-4 h-4" />}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Right Column - Accreditation Logo */}
                                <div className="pl-4 rounded-r-md flex items-center justify-center">
                                {selectedAffiliate ? (
                                  <div className="w-full h-full flex items-center justify-center p-4">
                                    {(() => {
                                      const cert = affiliationMenu.certificateAffiliate.find(
                                        c => c.name === selectedAffiliate
                                      );
                                      
                                      if (cert?.accreditation) {
                                        return (
                                          <div className="w-full max-w-[200px] rounded-lg overflow-hidden bg-white dark:bg-white p-3 border border-border/20 shadow-md">
                                            <img 
                                              src={cert.logo} 
                                              alt={`${cert.accreditation} Logo`}
                                              className="w-full h-24 object-contain"
                                            />
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div className="text-center py-6">
                                            <p className="text-sm text-muted-foreground">
                                              No accreditation available
                                            </p>
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>
                                ) : (
                                  <div className="text-center py-12 px-4">
                                    <p className="text-sm text-muted-foreground">
                                      Hover over a certificate to see accreditation logo
                                    </p>
                                  </div>
                                )}
                                </div>
                              </div>
                            </div>

                            {/* Other Certifications Section */}
                            <div className="px-6 pb-6 pt-2 border-t border-border">
                              <div className="space-y-1">
                                {affiliationMenu.otherCertifications.map((cert, idx) => (
                                  <Link
                                    key={idx}
                                    to="/affiliasi"
                                    className="block px-3 py-2 rounded-md hover:bg-accent transition-colors group"
                                  >
                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                      • {cert}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                );
              }

              if (link.path === "/services") {
                return (
                  <NavigationMenu key={link.path}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-sm xl:text-base font-medium bg-transparent hover:bg-transparent hover:text-red-600 focus:bg-transparent focus:text-red-600 data-[active]:bg-transparent data-[active]:text-red-600 data-[state=open]:bg-transparent data-[state=open]:text-red-600">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent 
                          className="bg-background shadow-xl border border-border"
                          onMouseLeave={() => setSelectedService(null)}
                        >
                          <div className="w-[700px]">
                            <div className="p-6">
                              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                                ISO Certification Services
                              </h3>
                              <div className="grid grid-cols-2 gap-0">
                                {/* Left Column - ISO List */}
                                <div className="pr-4 border-r border-border">
                                  <div className="space-y-1">
                                    {servicesMenu.isoStandards.map((iso, idx) => (
                                      <div
                                        key={idx}
                                        onMouseEnter={() => setSelectedService(iso.code)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-md transition-all cursor-pointer ${
                                          selectedService === iso.code
                                            ? 'bg-primary/10 text-primary'
                                            : 'hover:bg-accent'
                                        }`}
                                      >
                                        <span className="text-sm font-medium">
                                          • {iso.code}
                                        </span>
                                        <ChevronRight className="w-4 h-4" />
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Right Column - Description */}
                                <div className="pl-4 rounded-r-md flex items-start justify-start">
                                  {selectedService ? (
                                    <div className="w-full p-3 bg-white rounded-lg border border-border">
                                      {(() => {
                                        const iso = servicesMenu.isoStandards.find(
                                          s => s.code === selectedService
                                        );
                                        
                                        if (iso) {
                                          return (
                                            <p className="text-sm text-muted-foreground leading-snug">
                                              {iso.description}
                                            </p>
                                          );
                                        }
                                      })()}
                                    </div>
                                  ) : (
                                    <div className="text-center py-12 px-4">
                                      <p className="text-sm text-muted-foreground">
                                        Arahkan kursor ke ISO untuk melihat penjelasan
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                );
              }
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm xl:text-base font-medium transition-colors hover:text-primary relative whitespace-nowrap ${
                    isActive(link.path) ? "text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Certificate Check Button - Right */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <button
              onClick={() => setIsVerifyDialogOpen(true)}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Certificate Check
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden top-20" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-background shadow-lg border-t border-border z-50 animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => {
                if (link.path === "/affiliasi") {
                  return (
                    <div key={link.path}>
                      <button
                        onClick={() => setIsAffiliationOpen(!isAffiliationOpen)}
                        className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary active:text-red-600 py-1.5 transition-colors"
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isAffiliationOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isAffiliationOpen && (
                        <div className="mt-2 bg-background border border-border rounded-lg overflow-hidden">
                          {/* Certificate Affiliate Section - 2 Columns */}
                          <div className="p-4">
                            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                              Sertificate Affiliate
                            </p>
                            <div className="grid grid-cols-2 gap-0">
                              {/* Left Column - Certificate Names */}
                              <div className="pr-2 border-r border-border">
                                <div className="space-y-1">
                                  {affiliationMenu.certificateAffiliate.map((cert, idx) => (
                                    <div
                                      key={idx}
                                      onClick={() => cert.accreditation && setSelectedAffiliate(
                                        selectedAffiliate === cert.name ? null : cert.name
                                      )}
                                      className={`flex items-center justify-between px-2 py-2 rounded-md transition-all ${
                                        cert.accreditation ? 'cursor-pointer' : 'cursor-default'
                                      } ${
                                        selectedAffiliate === cert.name
                                          ? 'bg-primary/10 text-primary'
                                          : cert.accreditation ? 'active:bg-accent' : ''
                                      }`}
                                    >
                                      <span className="text-xs font-medium">
                                        • {cert.name}
                                      </span>
                                      {cert.accreditation && <ChevronRight className="w-3 h-3" />}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Right Column - Accreditation Logo */}
                              <div className="pl-2 rounded-r-md flex items-center justify-center">
                                {selectedAffiliate ? (
                                  <div className="w-full h-full flex items-center justify-center p-3">
                                    {(() => {
                                      const cert = affiliationMenu.certificateAffiliate.find(
                                        c => c.name === selectedAffiliate
                                      );
                                      
                                      if (cert?.accreditation) {
                                        return (
                                          <div className="w-full rounded-lg overflow-hidden bg-white dark:bg-white p-2 border border-border/20 shadow-md">
                                            <img 
                                              src={cert.logo} 
                                              alt={`${cert.accreditation} Logo`}
                                              className="w-full h-16 object-contain"
                                            />
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div className="text-center py-3">
                                            <p className="text-[9px] text-muted-foreground">
                                              No accreditation
                                            </p>
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>
                                ) : (
                                  <div className="text-center py-8 px-1">
                                    <p className="text-[10px] text-muted-foreground leading-tight">
                                      Tap certificate to see accreditation logo
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Other Certifications Section */}
                          <div className="px-4 pb-4 pt-2 border-t border-border">
                            <div className="space-y-1">
                              {affiliationMenu.otherCertifications.map((cert, idx) => (
                                <Link
                                  key={idx}
                                  to="/affiliasi"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-2 py-2 rounded-md active:bg-accent transition-colors"
                                >
                                  <span className="text-xs font-medium text-foreground">
                                    • {cert}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (link.path === "/services") {
                  return (
                    <div key={link.path}>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary active:text-red-600 py-1.5 transition-colors"
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isServicesOpen && (
                        <div className="mt-2 bg-background border border-border rounded-lg overflow-hidden">
                          <div className="p-4">
                            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                              ISO Certification Services
                            </p>
                            <div className="grid grid-cols-2 gap-0">
                              {/* Left Column - ISO List */}
                              <div className="pr-2 border-r border-border">
                                <div className="space-y-1">
                                  {servicesMenu.isoStandards.map((iso, idx) => (
                                    <div
                                      key={idx}
                                      onClick={() => setSelectedService(
                                        selectedService === iso.code ? null : iso.code
                                      )}
                                      className={`flex items-center justify-between px-2 py-2 rounded-md transition-all cursor-pointer ${
                                        selectedService === iso.code
                                          ? 'bg-primary/10 text-primary'
                                          : 'active:bg-accent'
                                      }`}
                                    >
                                      <span className="text-xs font-medium">
                                        • {iso.code}
                                      </span>
                                      <ChevronRight className="w-3 h-3" />
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Right Column - Description */}
                              <div className="pl-2 rounded-r-md flex items-start justify-start">
                                {selectedService && (
                                  <div className="w-full p-2 bg-white rounded-lg border border-border">
                                    {(() => {
                                      const iso = servicesMenu.isoStandards.find(
                                        s => s.code === selectedService
                                      );
                                      
                                      if (iso) {
                                        return (
                                          <p className="text-[10px] text-muted-foreground leading-snug">
                                            {iso.description}
                                          </p>
                                        );
                                      }
                                    })()}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary py-1.5 ${
                      isActive(link.path) ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsVerifyDialogOpen(true);
                }}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm uppercase tracking-wide text-center shadow-lg hover:shadow-xl transition-all duration-300 w-full border border-red-400/50"
              >
                Verify Certificate
              </button>
            </div>
          </div>
        )}
      </div>

      <VerifyCertificateDialog
        open={isVerifyDialogOpen}
        onOpenChange={setIsVerifyDialogOpen}
      />
    </nav>
  );
};

export default Navigation;
