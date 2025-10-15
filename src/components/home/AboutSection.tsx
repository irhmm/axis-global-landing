import { Network, Target, Users, Handshake, Globe, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Users,
    title: "Expert Auditors & Practitioners",
    description: "Tim auditor dan praktisi bersertifikat internasional dengan pengalaman luas di berbagai industri",
  },
  {
    icon: Target,
    title: "Transparent & Objective",
    description: "Proses audit yang transparan dan objektif sesuai dengan standar internasional yang berlaku",
  },
  {
    icon: Network,
    title: "Performance-Driven Improvement",
    description: "Fokus pada peningkatan kinerja bisnis yang terukur, berkelanjutan, dan memberikan nilai tambah",
  },
  {
    icon: Handshake,
    title: "Partnership-Oriented Service",
    description: "Pendekatan kemitraan jangka panjang untuk kesuksesan bersama dengan komitmen penuh",
  },
  {
    icon: Globe,
    title: "Globally Recognized Standard",
    description: "Sertifikasi dengan standar yang diakui secara internasional di lebih dari 30 negara",
  },
  {
    icon: Leaf,
    title: "Sustainability-Focused",
    description: "Komitmen terhadap praktik bisnis yang berkelanjutan dan bertanggung jawab terhadap lingkungan",
  },
];

const partners = [
  "ISO", "BPJPH", "KEMENAG", "SNI", "OHSAS", "HACCP", "GMP", "HALAL MUI"
];

const AboutSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start mb-16">
          {/* Left Side - Title (2 columns) */}
          <div className="lg:col-span-2 animate-slide-in-right">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6 font-medium">• ABOUT US</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-8 text-foreground">
              The Best Partner For Global Business Improvement
            </h2>
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="group border-2 hover:bg-foreground hover:text-background transition-all rounded-lg font-semibold"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right Side - Features Grid (3 columns) */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="animate-slide-up flex flex-col items-start group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-foreground leading-snug">{feature.title}</h3>
                </div>
              );
            })}
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
