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
                        <NavigationMenuContent className="bg-white dark:bg-gray-900 shadow-xl border border-border">
                          <div className="w-[500px] p-6">
                            {/* Certificate Affiliate Section */}
                            <div className="mb-6">
                              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                                Sertificate Affiliate
                              </h3>
                              <div className="grid gap-2">
                                {affiliationMenu.certificateAffiliate.map((cert, idx) => (
                                  <Link
                                    key={idx}
                                    to="/affiliasi"
                                    className="block px-3 py-2 rounded-md hover:bg-accent transition-colors group"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                        {cert.name}
                                        {cert.accreditation && (
                                          <span className="text-muted-foreground ml-2">- {cert.accreditation}</span>
                                        )}
                                      </span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Other Certifications Section */}
                            <div className="pt-4 border-t border-border">
                              <div className="grid gap-2">
                                {affiliationMenu.otherCertifications.map((cert, idx) => (
                                  <Link
                                    key={idx}
                                    to="/affiliasi"
                                    className="block px-3 py-2 rounded-md hover:bg-accent transition-colors group"
                                  >
                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                      {cert}
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
                        <div className="mt-2 ml-4 flex flex-col gap-2 border-l-2 border-border pl-4">
                          {/* Certificate Affiliate Section */}
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                              Sertificate Affiliate
                            </p>
                            {affiliationMenu.certificateAffiliate.map((cert, idx) => (
                              <Link
                                key={idx}
                                to="/affiliasi"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors"
                              >
                                • {cert.name}
                                {cert.accreditation && (
                                  <span className="text-muted-foreground"> - {cert.accreditation}</span>
                                )}
                              </Link>
                            ))}
                          </div>

                          {/* Other Certifications */}
                          <div className="pt-2 border-t border-border">
                            {affiliationMenu.otherCertifications.map((cert, idx) => (
                              <Link
                                key={idx}
                                to="/affiliasi"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors"
                              >
                                • {cert}
                              </Link>
                            ))}
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
