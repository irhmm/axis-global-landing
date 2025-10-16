import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Clock } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logo} 
                alt="Axis Global Sertifikasi Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h3 className="text-lg font-bold leading-tight">Axis Global</h3>
                <p className="text-xs text-background/70">Certification</p>
              </div>
            </div>
            <p className="text-sm text-background/80 leading-relaxed">
              Konsultan profesional untuk sertifikasi ISO, Halal, Haji & Umrah. Membantu bisnis Anda mencapai standar internasional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-background/80 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-sm text-background/80 hover:text-primary transition-colors">Layanan</Link></li>
              <li><Link to="/affiliasi" className="text-sm text-background/80 hover:text-primary transition-colors">Afiliasi</Link></li>
              <li><Link to="/about" className="text-sm text-background/80 hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link to="/contact" className="text-sm text-background/80 hover:text-primary transition-colors">Kontak</Link></li>
              
              {/* Auth Links */}
              <li className="pt-2 mt-2 border-t border-background/20">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin/dashboard" className="text-sm text-background/80 hover:text-primary transition-colors block mb-2">
                        Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => signOut()} 
                      className="text-sm text-background/80 hover:text-primary transition-colors text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/auth" className="text-sm text-background/80 hover:text-primary transition-colors">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li className="text-sm text-background/80">Sertifikasi ISO 9001</li>
              <li className="text-sm text-background/80">Sertifikasi ISO 14001</li>
              <li className="text-sm text-background/80">Sertifikasi ISO 45001</li>
              <li className="text-sm text-background/80">Sertifikasi Halal</li>
              <li className="text-sm text-background/80">Sertifikasi Haji & Umrah</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-background/80">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Intiland Suite Tower Level 3, Jl. PB Sudirman Kav. 101-103, Surabaya</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/80">
                <Phone size={16} className="flex-shrink-0" />
                <span>+62 812 6874 6727</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/80">
                <Mail size={16} className="flex-shrink-0" />
                <span>axisglobalcertification@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-background/80 mt-3 pt-3 border-t border-background/20">
                <Clock size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Jam Operasional</p>
                  <p className="text-xs text-background/70 mt-0.5">Senin - Jumat</p>
                  <p className="text-xs text-background/70">09:00 - 17:00 WIB</p>
                </div>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-sm text-background/70">
            © {currentYear} Axis Global Certification. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
