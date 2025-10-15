import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    { path: "/verify", label: "Verify Certificate" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background shadow-md py-3" : "bg-background/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center md:gap-8">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary rounded-full flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-xl md:text-2xl">AG</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground leading-tight">Axis Global</h1>
              <p className="text-xs md:text-sm text-muted-foreground -mt-0.5">Certification</p>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-colors hover:text-primary relative whitespace-nowrap ${
                  isActive(link.path) ? "text-primary font-semibold" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Right */}
          <div className="hidden md:flex justify-end gap-3">
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin/dashboard">
                    <Button variant="outline" size="default" className="rounded-full px-6 font-medium">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button 
                  size="default" 
                  className="rounded-full px-6 font-medium"
                  onClick={() => signOut()}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button size="default" className="rounded-full px-6 md:px-8 font-medium text-base">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            className="md:hidden col-start-3 justify-self-end p-2 hover:bg-muted rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    isActive(link.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" size="default" className="w-full rounded-full font-medium">
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button 
                    size="default" 
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
                  <Button size="default" className="w-full rounded-full font-medium text-base">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
