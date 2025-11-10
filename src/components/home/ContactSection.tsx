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
                      href="https://wa.me/6285236193969" 
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
