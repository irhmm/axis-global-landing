import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import VerifyCertificateDialog from "@/components/VerifyCertificateDialog";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm xl:text-base font-medium transition-colors hover:text-primary relative whitespace-nowrap ${
                  isActive(link.path) ? "text-primary font-semibold" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Certificate Check Button - Right */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <button
              onClick={() => setIsVerifyDialogOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
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
              {navLinks.map((link) => (
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
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsVerifyDialogOpen(true);
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-3.5 rounded-xl text-sm uppercase tracking-wide text-center shadow-lg hover:shadow-xl transition-all duration-300 w-full border border-red-500/30"
              >
                Certificate Check
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
