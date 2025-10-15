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
    <section className="relative py-12 md:py-24 xl:py-28 bg-gradient-to-br from-background via-background to-primary/[0.02] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-0 md:opacity-100" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-0 md:opacity-100" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-14 xl:gap-16 items-start mb-12 md:mb-20">
          {/* Left Side - Title (2 columns) */}
          <div className="lg:col-span-2 animate-slide-in-right">
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 bg-primary/5 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-pulse" />
              <p className="text-xs md:text-sm uppercase tracking-widest text-primary font-medium">ABOUT US</p>
            </div>
            <h2 className="text-2xl md:text-4xl xl:text-5xl font-semibold leading-[1.2] mb-4 md:mb-8 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              The Best Partner For Global Business Improvement
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
              Membangun kepercayaan melalui standar internasional dan komitmen terhadap keunggulan.
            </p>
            <Link to="/about">
              <Button 
                size="default"
                className="group bg-gradient-to-r from-primary to-primary/90 hover:shadow-glow transition-all duration-300 rounded-xl font-semibold md:px-8 shadow-primary"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right Side - Features Grid (3 columns) */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="animate-slide-up group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative p-3 md:p-6 h-full bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 rounded-xl md:rounded-2xl transition-all duration-300" />
                    
                    <div className="relative flex flex-col h-full">
                      <div className="relative w-10 h-10 md:w-14 md:h-14 mb-2 md:mb-4 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-primary/30 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <IconComponent className="text-white" size={20} />
                        <div className="absolute inset-0 rounded-lg md:rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-xs md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight md:leading-snug">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partner Logos Scroll */}
        <div className="relative overflow-hidden py-6 md:py-8">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50">
              <span className="text-muted-foreground text-xs md:text-sm uppercase tracking-wider font-medium">
                Trusted Partners
              </span>
            </div>
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="relative">
            <div className="flex animate-scroll hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-2 md:mx-4"
                >
                  <div className="group relative px-4 py-2 md:px-8 md:py-4 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-lg md:rounded-xl border border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 rounded-lg md:rounded-xl transition-all duration-300" />
                    <p className="relative text-foreground font-bold text-sm md:text-base whitespace-nowrap tracking-wide group-hover:text-primary transition-colors">
                      {partner}
                    </p>
                  </div>
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
          animation: scroll 30s linear infinite;
        }
        .hover\:shadow-glow:hover {
          box-shadow: 0 0 40px hsl(1 94% 59% / 0.3);
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
