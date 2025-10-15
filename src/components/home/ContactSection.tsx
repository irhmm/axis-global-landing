import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-primary bg-primary/10 px-4 py-2 rounded-full">
              Hubungi Kami
            </span>
          </div>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            Mari Wujudkan <span className="text-primary">Standar Terbaik</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto leading-relaxed">
            Konsultasi gratis untuk kebutuhan sertifikasi Anda. Tim profesional kami siap membantu mencapai standar internasional.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Phone Card */}
            <div className="group bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-elegant transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-1 animate-slide-up">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="text-white" size={32} />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary to-primary/80 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">Telepon</h3>
                  <a 
                    href="tel:+6281268746727" 
                    className="text-muted-foreground hover:text-primary transition-colors text-base font-medium"
                  >
                    +62 812 6874 6727
                  </a>
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    Senin - Jumat
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="group bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-elegant transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="text-white" size={32} />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary to-primary/80 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">Email</h3>
                  <a 
                    href="mailto:axisglobalcertification@gmail.com" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                  >
                    axisglobalcertification@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Address Card - spans full width on mobile, single column on larger screens */}
            <div className="group bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-elegant transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-1 animate-slide-up md:col-span-2 lg:col-span-1" style={{ animationDelay: "200ms" }}>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="text-white" size={32} />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary to-primary/80 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">Kantor Pusat</h3>
                  <p className="text-muted-foreground text-base leading-relaxed mb-3">
                    Intiland Suite Tower Level 3<br />
                    Jl. PB Sudirman Kav. 101-103<br />
                    Surabaya, Indonesia
                  </p>
                  <div className="inline-block bg-primary/10 px-4 py-2 rounded-lg">
                    <p className="text-sm text-foreground font-medium">
                      Senin - Jumat<br />
                      <span className="text-primary">09:00 - 17:00 WIB</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 md:p-10 animate-fade-in">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Konsultasi Gratis Sekarang
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Dapatkan solusi terbaik untuk kebutuhan sertifikasi bisnis Anda dari konsultan berpengalaman kami
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="https://wa.me/6281268746727" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-glow transition-all hover:scale-105"
                >
                  <Phone size={20} />
                  WhatsApp Kami
                </a>
                <a 
                  href="mailto:axisglobalcertification@gmail.com"
                  className="inline-flex items-center gap-2 bg-card border-2 border-primary text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-primary hover:text-white transition-all hover:scale-105"
                >
                  <Mail size={20} />
                  Kirim Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
