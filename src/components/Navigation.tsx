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

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [isAffiliationOpen, setIsAffiliationOpen] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState<string | null>(null);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const affiliationMenu = {
    certificateAffiliate: [
      { name: "Americo", accreditation: "UAF" },
      { name: "Siscert", accreditation: "IAS" },
      { name: "TSI", accreditation: "KAN" },
      { name: "TUV", accreditation: "NORD" },
      { name: "BSi" },
      { name: "UKS", accreditation: "EGAC" },
      { name: "Sucofindo", accreditation: "KAN" }
    ],
    otherCertifications: [
      "Sertifikasi Kemenaker",
      "Sertifikasi BNSP",
      "Sertifikasi Halal Kemenag"
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
          <Link to="/" className="flex items-center gap-2.5 md:gap-3 flex-shrink-0">
            <img 
              src={logo} 
              alt="Axis Global Sertifikasi Logo" 
              className="w-11 h-11 md:w-12 md:h-12 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-base md:text-lg font-bold text-foreground leading-tight">Axis Global</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Certification</p>
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
                        <NavigationMenuTrigger className="text-sm xl:text-base font-medium bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
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
                                        onMouseEnter={() => setSelectedAffiliate(cert.name)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-md transition-all cursor-pointer ${
                                          selectedAffiliate === cert.name
                                            ? 'bg-primary/10 text-primary'
                                            : 'hover:bg-accent'
                                        }`}
                                      >
                                        <span className="text-sm font-medium">
                                          • {cert.name}
                                        </span>
                                        <ChevronRight className="w-4 h-4" />
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Right Column - Accreditation Details */}
                                <div className="pl-4 bg-accent/30 rounded-r-md flex items-start justify-center py-4">
                                  {selectedAffiliate ? (
                                    <div className="w-full px-2">
                                      {(() => {
                                        const cert = affiliationMenu.certificateAffiliate.find(
                                          c => c.name === selectedAffiliate
                                        );
                                        
                                        if (cert?.accreditation) {
                                          return (
                                            <div className="space-y-4">
                                              <div>
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                                  Accreditation Body
                                                </p>
                                                <p className="text-lg font-bold text-primary">
                                                  {cert.accreditation}
                                                </p>
                                              </div>
                                              <div className="border-2 border-dashed border-border rounded-lg h-24 flex items-center justify-center bg-muted/50">
                                                <span className="text-sm text-muted-foreground">Logo Placeholder</span>
                                              </div>
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
                                    <div className="text-center py-8 px-4">
                                      <p className="text-sm text-muted-foreground">
                                        Hover over a certificate to see details
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
                        className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary py-1.5 transition-colors"
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
                                      onClick={() => setSelectedAffiliate(
                                        selectedAffiliate === cert.name ? null : cert.name
                                      )}
                                      className={`flex items-center justify-between px-2 py-2 rounded-md transition-all cursor-pointer ${
                                        selectedAffiliate === cert.name
                                          ? 'bg-primary/10 text-primary'
                                          : 'active:bg-accent'
                                      }`}
                                    >
                                      <span className="text-xs font-medium">
                                        • {cert.name}
                                      </span>
                                      <ChevronRight className="w-3 h-3" />
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Right Column - Accreditation Details */}
                              <div className="pl-2 bg-accent/30 rounded-r-md flex items-start justify-center py-2">
                                {selectedAffiliate ? (
                                  <div className="w-full px-1">
                                    {(() => {
                                      const cert = affiliationMenu.certificateAffiliate.find(
                                        c => c.name === selectedAffiliate
                                      );
                                      
                                      if (cert?.accreditation) {
                                        return (
                                          <div className="space-y-2">
                                            <div>
                                              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                                Accreditation
                                              </p>
                                              <p className="text-sm font-bold text-primary">
                                                {cert.accreditation}
                                              </p>
                                            </div>
                                            <div className="border-2 border-dashed border-border rounded-lg h-16 flex items-center justify-center bg-muted/50">
                                              <span className="text-[10px] text-muted-foreground">Logo</span>
                                            </div>
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div className="text-center py-4">
                                            <p className="text-[10px] text-muted-foreground">
                                              No accreditation
                                            </p>
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>
                                ) : (
                                  <div className="text-center py-4 px-1">
                                    <p className="text-[10px] text-muted-foreground">
                                      Tap certificate to see details
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
