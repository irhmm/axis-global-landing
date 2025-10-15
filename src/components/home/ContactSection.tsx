import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Hubungi Kami</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Siap membantu Anda mencapai standar internasional. Konsultasi gratis untuk kebutuhan sertifikasi Anda.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
            <div className="bg-card p-6 rounded-lg shadow-card hover:shadow-elegant transition-all">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Telepon</h3>
                  <p className="text-muted-foreground">+62 812 6874 6727</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-card hover:shadow-elegant transition-all">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-muted-foreground text-sm">axisglobalcertification@gmail.com</p>
                  <p className="text-muted-foreground text-sm">axiscertificate.com</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-card hover:shadow-elegant transition-all md:col-span-3">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Alamat Kantor</h3>
                  <p className="text-muted-foreground">
                    Intiland Suite Tower Level 3<br />
                    Jl. PB Sudirman Kav. 101-103<br />
                    Surabaya, Indonesia
                  </p>
                  <p className="text-sm text-muted-foreground mt-3">
                    <strong>Jam Kerja:</strong> Senin - Jumat, 09:00 - 17:00 WIB
                  </p>
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
