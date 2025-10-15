import { Shield, Award, Users, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Terpercaya",
    description: "Pengalaman bertahun-tahun dalam industri sertifikasi",
  },
  {
    icon: Award,
    title: "Tersertifikasi",
    description: "Tim konsultan bersertifikat internasional",
  },
  {
    icon: Users,
    title: "Profesional",
    description: "Pendampingan penuh dari awal hingga selesai",
  },
  {
    icon: Globe,
    title: "Global Standard",
    description: "Mengikuti standar internasional terbaru",
  },
];

const partners = [
  "ISO", "BPJPH", "KEMENAG", "SNI", "OHSAS", "HACCP", "GMP", "HALAL MUI"
];

const AboutSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-foreground mb-4">Tentang Axis Global Certification</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Kami adalah konsultan profesional yang membantu perusahaan Anda mendapatkan sertifikasi 
            ISO, Halal, dan Haji & Umrah dengan proses yang mudah, cepat, dan terpercaya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg shadow-card hover:shadow-primary transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Partner Logos Scroll */}
        <div className="overflow-hidden">
          <p className="text-center text-muted-foreground mb-6 text-sm uppercase tracking-wide">
            Partner & Afiliasi Kami
          </p>
          <div className="relative">
            <div className="flex animate-scroll">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8 px-6 py-3 bg-card rounded-lg shadow-sm"
                >
                  <p className="text-foreground font-semibold text-lg whitespace-nowrap">
                    {partner}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
