import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, CheckCircle, BookOpen, ClipboardCheck } from "lucide-react";
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

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const trainingMenu = {
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

  const servicesMenu = {
    programs: [
      {
        type: "Awareness ISO",
        title: "Program Awareness ISO",
        description: "Program pengenalan dan pemahaman dasar standar ISO untuk seluruh karyawan organisasi. Meningkatkan kesadaran tentang pentingnya implementasi standar ISO dalam operasional sehari-hari."
      },
      {
        type: "Lead Auditor",
        title: "Program Lead Auditor",
        description: "Program pelatihan auditor utama untuk melakukan audit sistem manajemen sesuai standar internasional. Mempersiapkan auditor yang kompeten dan tersertifikasi untuk melakukan audit internal maupun eksternal."
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
                          onMouseLeave={() => setSelectedTraining(null)}
                        >
                          <div className="w-auto" style={{ position: 'relative', overflow: 'visible' }}>
                            {/* ISO Training Programs Section */}
                            <div className="p-5 relative" style={{ overflow: 'visible' }}>
                              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                                ISO Training Programs
                              </h3>
                              <div className="relative" style={{ overflow: 'visible' }}>
                                {/* Left Column - ISO List */}
                                <div className="w-[300px]">
                                  <div className="space-y-1">
                                    {trainingMenu.isoStandards.map((iso, idx) => (
                                      <div
                                        key={idx}
                                        onMouseEnter={() => setSelectedTraining(iso.code)}
                                        className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                                          selectedTraining === iso.code
                                            ? 'bg-primary/10 border-l-2 border-primary'
                                            : 'hover:bg-accent/50'
                                        }`}
                                      >
                                        <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${
                                          selectedTraining === iso.code ? 'text-primary' : 'text-muted-foreground'
                                        }`} />
                                        <span className={`text-sm font-medium flex-grow ${
                                          selectedTraining === iso.code ? 'text-primary' : 'text-foreground'
                                        }`}>
                                          {iso.code}
                                        </span>
                                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform duration-200" />
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Right Column - Floating Popup Description */}
                                {selectedTraining && (() => {
                                  const iso = trainingMenu.isoStandards.find(
                                    s => s.code === selectedTraining
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

              if (link.path === "/services") {
                return (
                  <NavigationMenu key={link.path}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-sm xl:text-base font-medium bg-transparent hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground data-[active]:bg-destructive data-[active]:text-destructive-foreground data-[state=open]:bg-destructive data-[state=open]:text-destructive-foreground">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent 
                          className="bg-background shadow-xl border border-border"
                        >
                          <div className="w-[400px] p-5">
                            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                              Training Programs
                            </h3>
                            <div className="space-y-3">
                              {servicesMenu.programs.map((program, idx) => (
                                <Link
                                  key={idx}
                                  to="/services"
                                  className="group block p-4 rounded-lg transition-all duration-200 hover:bg-accent/50 border border-transparent hover:border-primary/20"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                      {program.type === "Awareness ISO" ? (
                                        <BookOpen className="w-5 h-5 text-primary" />
                                      ) : (
                                        <ClipboardCheck className="w-5 h-5 text-primary" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {program.title}
                                      </h4>
                                      <p className="text-xs text-muted-foreground leading-relaxed">
                                        {program.description}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              ))}
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
                    <div key={link.path}>
                      <button
                        onClick={() => setIsTrainingOpen(!isTrainingOpen)}
                        className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-destructive active:bg-destructive/10 active:text-destructive py-1.5 transition-colors"
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isTrainingOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isTrainingOpen && (
                        <div className="mt-2 bg-background border border-border rounded-lg overflow-hidden">
                          {/* ISO Training Programs Section - 2 Columns */}
                          <div className="p-4">
                            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                              ISO Training Programs
                            </p>
                            <div className="grid grid-cols-2 gap-0">
                              {/* Left Column - ISO List */}
                              <div className="pr-2 border-r border-border">
                                <div className="space-y-1">
                                  {trainingMenu.isoStandards.map((iso, idx) => (
                                    <div
                                      key={idx}
                                      onClick={() => setSelectedTraining(
                                        selectedTraining === iso.code ? null : iso.code
                                      )}
                                      className={`flex items-center justify-between px-2 py-2 rounded-md transition-all cursor-pointer ${
                                        selectedTraining === iso.code
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
                                {selectedTraining ? (
                                  <div className="w-full p-2 bg-white rounded-lg border border-border">
                                    {(() => {
                                      const iso = trainingMenu.isoStandards.find(
                                        s => s.code === selectedTraining
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
                                ) : (
                                  <div className="text-center py-8 px-1">
                                    <p className="text-[10px] text-muted-foreground leading-tight">
                                      Tap ISO code to see details
                                    </p>
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

                if (link.path === "/services") {
                  return (
                    <div key={link.path}>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-destructive active:bg-destructive/10 active:text-destructive py-1.5 transition-colors"
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
                              Training Programs
                            </p>
                            <div className="space-y-2">
                              {servicesMenu.programs.map((program, idx) => (
                                <Link
                                  key={idx}
                                  to="/services"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block p-3 rounded-lg transition-all active:bg-accent/50 border border-border"
                                >
                                  <div className="flex items-start gap-2">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                                      {program.type === "Awareness ISO" ? (
                                        <BookOpen className="w-4 h-4 text-primary" />
                                      ) : (
                                        <ClipboardCheck className="w-4 h-4 text-primary" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="text-xs font-semibold text-foreground mb-1">
                                        {program.title}
                                      </h4>
                                      <p className="text-[10px] text-muted-foreground leading-snug">
                                        {program.description}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              ))}
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
