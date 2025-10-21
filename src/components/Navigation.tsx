import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, CheckCircle, Shield, BookOpen, GraduationCap } from "lucide-react";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedTrainingISO, setSelectedTrainingISO] = useState<string | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [openMobilePrograms, setOpenMobilePrograms] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const isoStandards = [
    {
      code: "ISO 37001",
      title: "Anti-Bribery Management Systems",
      description: "Sistem Manajemen Anti-Penyuapan untuk mencegah, mendeteksi, dan mengatasi risiko suap dalam organisasi. Membantu membangun budaya integritas dan transparansi bisnis yang beretika."
    },
    {
      code: "ISO 21001",
      title: "Educational Organizations Management",
      description: "Sistem Manajemen Organisasi Pendidikan untuk meningkatkan kualitas layanan pendidikan. Memastikan pembelajaran yang efektif dan pengembangan berkelanjutan bagi peserta didik."
    },
    {
      code: "ISO 27001",
      title: "Information Security Management",
      description: "Sistem Manajemen Keamanan Informasi untuk melindungi data dan informasi sensitif organisasi. Mencakup kontrol keamanan cyber, privasi data, dan manajemen risiko informasi."
    },
    {
      code: "ISO 45001",
      title: "Occupational Health & Safety",
      description: "Sistem Manajemen Kesehatan dan Keselamatan Kerja (K3) untuk menciptakan lingkungan kerja yang aman. Mencegah kecelakaan kerja dan penyakit akibat kerja melalui pendekatan sistematis."
    },
    {
      code: "ISO 14001",
      title: "Environmental Management Systems",
      description: "Sistem Manajemen Lingkungan untuk mengelola dampak lingkungan organisasi secara berkelanjutan. Meningkatkan efisiensi sumber daya dan memenuhi komitmen keberlanjutan lingkungan."
    },
    {
      code: "ISO 9001",
      title: "Quality Management Systems",
      description: "Sistem Manajemen Mutu untuk memastikan konsistensi kualitas produk dan layanan. Meningkatkan kepuasan pelanggan melalui perbaikan berkelanjutan dan efisiensi operasional."
    },
    {
      code: "ISO 22000",
      title: "Food Safety Management",
      description: "Sistem Manajemen Keamanan Pangan untuk industri makanan dan minuman. Memastikan keamanan produk pangan dari bahan baku hingga konsumen akhir sesuai standar HACCP."
    },
    {
      code: "ISO 50001",
      title: "Energy Management Systems",
      description: "Sistem Manajemen Energi untuk meningkatkan efisiensi penggunaan energi. Mengurangi biaya operasional dan jejak karbon melalui optimalisasi konsumsi energi organisasi."
    },
    {
      code: "ISO 22716",
      title: "Cosmetics Good Manufacturing Practice",
      description: "Standar GMP Kosmetik untuk memastikan produksi kosmetik yang aman dan berkualitas. Mencakup kontrol higiene, dokumentasi, dan sistem mutu produksi kosmetik."
    },
    {
      code: "ISO 13485",
      title: "Medical Devices Quality Management",
      description: "Sistem Manajemen Mutu Alat Kesehatan untuk manufaktur dan distribusi perangkat medis. Memenuhi persyaratan regulasi dan keamanan produk alat kesehatan."
    },
    {
      code: "ISO/IEC 17025",
      title: "Testing & Calibration Laboratories",
      description: "Standar Kompetensi Laboratorium Pengujian dan Kalibrasi. Memastikan hasil pengujian yang akurat, valid, dan diakui secara internasional untuk laboratorium teknis."
    },
    {
      code: "ISO 22301",
      title: "Business Continuity Management",
      description: "Sistem Manajemen Kontinuitas Bisnis untuk menghadapi gangguan operasional. Memastikan organisasi dapat terus beroperasi saat terjadi bencana atau insiden kritis."
    }
  ];

  const trainingMenu = {
    programs: [
      {
        type: "Awareness ISO",
        description: "Program pelatihan pengenalan dan pemahaman dasar standar ISO untuk seluruh karyawan dalam organisasi",
        icon: BookOpen,
      },
      {
        type: "Lead Auditor",
        description: "Program pelatihan auditor utama untuk melakukan audit sistem manajemen sesuai standar internasional",
        icon: GraduationCap,
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
    { path: "/training", label: "Training" },
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
              if (link.path === "/training") {
                return (
                  <NavigationMenu key={link.path}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-sm xl:text-base font-medium bg-transparent hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground data-[active]:bg-destructive data-[active]:text-destructive-foreground data-[state=open]:bg-destructive data-[state=open]:text-destructive-foreground">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent 
                          className="bg-background shadow-xl border border-border !overflow-visible"
                          onMouseLeave={() => {
                            setSelectedProgram(null);
                            setSelectedTrainingISO(null);
                          }}
                        >
                          <div className="w-auto" style={{ position: 'relative', overflow: 'visible' }}>
                            <div className="p-5 relative" style={{ overflow: 'visible' }}>
                              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                                Training Programs
                              </h3>
                              <div className="relative" style={{ overflow: 'visible' }}>
                                {/* Left Column - Training Programs */}
                                <div className="w-[350px]">
                                  <div className="space-y-3">
                                    {trainingMenu.programs.map((program) => {
                                      const IconComponent = program.icon;
                                      return (
                                        <div
                                          key={program.type}
                                          onMouseEnter={() => setSelectedProgram(program.type)}
                                          className={`group flex items-start gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                                            selectedProgram === program.type
                                              ? 'bg-primary/10 border-l-2 border-primary'
                                              : 'hover:bg-accent/50'
                                          }`}
                                        >
                                          <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                            selectedProgram === program.type ? 'text-primary' : 'text-muted-foreground'
                                          }`} />
                                          <div className="flex-1">
                                            <p className={`text-sm font-semibold mb-1 ${
                                              selectedProgram === program.type ? 'text-primary' : 'text-foreground'
                                            }`}>
                                              {program.type}
                                            </p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{program.description}</p>
                                          </div>
                                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform duration-200 mt-1" />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Middle Column - ISO Standards List */}
                                {selectedProgram && (
                                  <div 
                                    className="absolute left-[370px] top-0 w-[500px] z-[100] bg-card shadow-lg border border-border/50 rounded-xl p-5 animate-in fade-in-0 slide-in-from-left-1 duration-200"
                                    style={{ pointerEvents: 'auto', position: 'absolute' }}
                                  >
                                    <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                                      ISO Standards - {selectedProgram}
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                      {isoStandards.map((iso) => (
                                        <div
                                          key={iso.code}
                                          onMouseEnter={() => setSelectedTrainingISO(iso.code)}
                                          className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                                            selectedTrainingISO === iso.code
                                              ? 'bg-primary/10 border-l-2 border-primary'
                                              : 'hover:bg-accent/50'
                                          }`}
                                        >
                                          <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${
                                            selectedTrainingISO === iso.code ? 'text-primary' : 'text-muted-foreground'
                                          }`} />
                                          <span className={`text-sm font-medium ${
                                            selectedTrainingISO === iso.code ? 'text-primary' : 'text-foreground'
                                          }`}>
                                            {iso.code}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Right Column - ISO Description */}
                                {selectedTrainingISO && (
                                  <div 
                                    className="absolute left-[890px] top-0 w-auto min-w-[320px] max-w-[360px] z-[100] bg-muted shadow-lg border border-border/50 rounded-xl p-5 animate-in fade-in-0 slide-in-from-left-1 duration-200"
                                    style={{ pointerEvents: 'auto', position: 'absolute' }}
                                  >
                                    {(() => {
                                      const iso = isoStandards.find((s) => s.code === selectedTrainingISO);
                                      return iso ? (
                                        <div>
                                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-3">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            <span className="text-sm font-semibold text-primary">{iso.code}</span>
                                          </div>
                                          <h4 className="text-base font-semibold text-foreground mb-2">{iso.title}</h4>
                                          <p className="text-sm text-muted-foreground leading-relaxed">{iso.description}</p>
                                        </div>
                                      ) : null;
                                    })()}
                                  </div>
                                )}
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
                        <NavigationMenuTrigger className="text-sm xl:text-base font-medium bg-transparent hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground data-[active]:bg-destructive data-[active]:text-destructive-foreground data-[state=open]:bg-destructive data-[state=open]:text-destructive-foreground">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent 
                          className="bg-background shadow-xl border border-border !overflow-visible"
                          onMouseLeave={() => setSelectedService(null)}
                        >
                          <div className="w-auto" style={{ position: 'relative', overflow: 'visible' }}>
                            <div className="p-5 relative" style={{ overflow: 'visible' }}>
                              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                                ISO Certification Services
                              </h3>
                              <div className="relative" style={{ overflow: 'visible' }}>
                                {/* Left Column - ISO List */}
                                <div className="w-[300px]">
                                  <div className="space-y-1">
                                    {isoStandards.map((iso, idx) => (
                                      <div
                                        key={idx}
                                        onMouseEnter={() => setSelectedService(iso.code)}
                                        className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                                          selectedService === iso.code
                                            ? 'bg-primary/10 border-l-2 border-primary'
                                            : 'hover:bg-accent/50'
                                        }`}
                                      >
                                        <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${
                                          selectedService === iso.code ? 'text-primary' : 'text-muted-foreground'
                                        }`} />
                                        <span className={`text-sm font-medium flex-grow ${
                                          selectedService === iso.code ? 'text-primary' : 'text-foreground'
                                        }`}>
                                          {iso.code}
                                        </span>
                                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform duration-200" />
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Right Column - Floating Popup Description */}
                                {selectedService && (() => {
                                  const iso = isoStandards.find(
                                    s => s.code === selectedService
                                  );
                                  
                                  if (iso) {
                                    return (
                                      <div 
                                        className="absolute left-[310px] top-0 w-auto min-w-[320px] max-w-[360px] z-[100] bg-card shadow-lg border border-border/50 rounded-xl p-5 animate-in fade-in-0 slide-in-from-left-1 duration-200"
                                        style={{ pointerEvents: 'auto', position: 'absolute' }}
                                      >
                                        <h4 className="text-sm font-semibold text-foreground mb-2">{iso.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                          {iso.description}
                                        </p>
                                      </div>
                                    );
                                  }
                                  return null;
                                })()}
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
                if (link.path === "/training") {
                  return (
                    <Collapsible key={link.path} open={isTrainingOpen} onOpenChange={setIsTrainingOpen}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-destructive active:bg-destructive/10 active:text-destructive py-1.5 transition-colors">
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${isTrainingOpen ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-2 space-y-2">
                        {trainingMenu.programs.map((program) => {
                          const IconComponent = program.icon;
                          const programKey = program.type.toLowerCase().replace(/\s+/g, '-');
                          const isProgramOpen = openMobilePrograms[programKey] || false;
                          
                          return (
                            <Collapsible 
                              key={program.type} 
                              open={isProgramOpen} 
                              onOpenChange={(open) => setOpenMobilePrograms(prev => ({ ...prev, [programKey]: open }))}
                            >
                              <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-primary py-1.5 transition-colors">
                                <div className="flex items-center gap-2">
                                  <IconComponent className="h-4 w-4" />
                                  <span>{program.type}</span>
                                </div>
                                <ChevronDown className={`h-4 w-4 transition-transform ${isProgramOpen ? 'rotate-180' : ''}`} />
                              </CollapsibleTrigger>
                              <CollapsibleContent className="pl-6 mt-1 space-y-1">
                                {isoStandards.map((iso) => (
                                  <Link
                                    key={`${programKey}-${iso.code}`}
                                    to="/training"
                                    className="flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                    <span>{iso.code}</span>
                                  </Link>
                                ))}
                              </CollapsibleContent>
                            </Collapsible>
                          );
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  );
                }

                if (link.path === "/services") {
                  return (
                    <Collapsible key={link.path} open={isServicesOpen} onOpenChange={setIsServicesOpen}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-destructive active:bg-destructive/10 active:text-destructive py-1.5 transition-colors">
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-2 space-y-2">
                        {isoStandards.map((iso) => (
                          <Link
                            key={iso.code}
                            to="/services"
                            className="flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <CheckCircle className="h-3 w-3" />
                            <span>{iso.code}</span>
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  );
                }
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium py-1.5 transition-colors hover:text-destructive active:bg-destructive/10 active:text-destructive ${
                      isActive(link.path) ? "text-destructive font-semibold" : "text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <button
                onClick={() => {
                  setIsVerifyDialogOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 mt-2"
              >
                Certificate Check
              </button>

              {user && (
                <div className="pt-2 mt-2 border-t border-border">
                  <div className="flex flex-col gap-2">
                    <div className="text-xs text-muted-foreground px-2">
                      {user.email}
                    </div>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="text-sm font-medium text-foreground hover:text-destructive py-1.5 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-sm font-medium text-destructive hover:text-destructive/80 py-1.5 transition-colors text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
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
