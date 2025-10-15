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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Phone Card */}
            <div className="relative group animate-slide-up">
              <div className="relative p-6 h-full bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 rounded-xl md:rounded-2xl transition-all duration-300" />
                
                <div className="relative flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-primary/30 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Phone className="text-white w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">Telepon</h3>
                    <a 
                      href="tel:+6281268746727" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base font-medium block"
                    >
                      +62 812 6874 6727
                    </a>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Senin - Jumat
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="relative group animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="relative p-6 h-full bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 rounded-xl md:rounded-2xl transition-all duration-300" />
                
                <div className="relative flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-primary/30 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Mail className="text-white w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">Email</h3>
                    <a 
                      href="mailto:axisglobalcertification@gmail.com" 
                      className="text-muted-foreground hover:text-primary transition-colors text-xs md:text-sm font-medium break-all"
                    >
                      axisglobalcertification@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="relative group animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="relative p-6 h-full bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 rounded-xl md:rounded-2xl transition-all duration-300" />
                
                <div className="relative flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-primary/30 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <MapPin className="text-white w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">Kantor Pusat</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-2">
                      Intiland Suite Tower Level 3<br />
                      Jl. PB Sudirman Kav. 101-103<br />
                      Surabaya, Indonesia
                    </p>
                    <div className="inline-block bg-primary/10 px-3 py-1.5 rounded-lg">
                      <p className="text-xs text-foreground font-medium">
                        <span className="text-primary">09:00 - 17:00 WIB</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-10 md:mt-12 text-center">
            <div className="relative group">
              <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl md:rounded-2xl p-6 md:p-8 animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 rounded-xl md:rounded-2xl transition-all duration-300" />
                
                <div className="relative">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                    Konsultasi Sekarang
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base mb-5 max-w-2xl mx-auto">
                    Dapatkan solusi terbaik untuk kebutuhan sertifikasi bisnis Anda
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <a 
                      href="https://wa.me/6281268746727" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:shadow-glow transition-all hover:scale-105 text-sm md:text-base"
                    >
                      <Phone className="w-4 h-4 md:w-5 md:h-5" />
                      WhatsApp Kami
                    </a>
                    <a 
                      href="mailto:axisglobalcertification@gmail.com"
                      className="inline-flex items-center gap-2 bg-card border-2 border-primary text-primary font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-primary hover:text-white transition-all hover:scale-105 text-sm md:text-base"
                    >
                      <Mail className="w-4 h-4 md:w-5 md:h-5" />
                      Kirim Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
