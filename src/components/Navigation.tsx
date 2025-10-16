import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import VerifyCertificateDialog from "@/components/VerifyCertificateDialog";

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
            <div className="w-11 h-11 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-lg md:text-xl">AG</span>
            </div>
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
            <button
              onClick={() => setIsVerifyDialogOpen(true)}
              className="text-sm xl:text-base font-medium transition-colors hover:text-primary whitespace-nowrap"
            >
              Verify Certificate
            </button>
          </div>

          {/* Auth Buttons - Right Desktop */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin/dashboard">
                    <Button variant="outline" size="sm" className="rounded-full px-5 font-medium">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button 
                  size="sm" 
                  className="rounded-full px-5 font-medium"
                  onClick={() => signOut()}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="rounded-full px-6 font-medium">
                  Login
                </Button>
              </Link>
            )}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-3 border-t border-border pt-4 animate-fade-in bg-background">
            <div className="flex flex-col gap-3">
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
                className="text-sm font-medium transition-colors hover:text-primary py-1.5 text-left"
              >
                Verify Certificate
              </button>
              <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-border">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full rounded-full font-medium">
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button 
                      size="sm" 
                      className="w-full rounded-full font-medium"
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full rounded-full font-medium">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
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
