import { Network, Target, Users, Handshake, Globe, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Users,
    title: "Expert Auditors & Practitioners",
    description: "Tim auditor dan praktisi bersertifikat internasional dengan pengalaman luas",
  },
  {
    icon: Target,
    title: "Transparent & Objective",
    description: "Proses audit yang transparan dan objektif sesuai standar global",
  },
  {
    icon: Network,
    title: "Performance-Driven Improvement",
    description: "Fokus pada peningkatan kinerja bisnis yang terukur dan berkelanjutan",
  },
  {
    icon: Handshake,
    title: "Partnership-Oriented Service",
    description: "Pendekatan kemitraan jangka panjang untuk kesuksesan bersama",
  },
  {
    icon: Globe,
    title: "Globally Recognized Standard",
    description: "Sertifikasi dengan standar yang diakui secara internasional",
  },
  {
    icon: Leaf,
    title: "Sustainability-Focused",
    description: "Komitmen terhadap praktik bisnis yang berkelanjutan dan bertanggung jawab",
  },
];

const partners = [
  "ISO", "BPJPH", "KEMENAG", "SNI", "OHSAS", "HACCP", "GMP", "HALAL MUI"
];

const AboutSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Side - Title */}
          <div className="animate-slide-in-right">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">• ABOUT US</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              The Best Partner For Global Business Certification
            </h2>
            <Link to="/about">
              <Button variant="outline" size="lg" className="group">
                Read More
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
          </div>

          {/* Right Side - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
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
