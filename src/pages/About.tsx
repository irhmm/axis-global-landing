import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import integrityImg from "@/assets/values/integrity.jpg";
import professionalismImg from "@/assets/values/professionalism.jpg";
import collaborationImg from "@/assets/values/collaboration.jpg";
import improvementImg from "@/assets/values/improvement.jpg";

const values = [
  {
    icon: Heart,
    title: "Integritas",
    description: "Menjunjung tinggi kejujuran dan transparansi dalam setiap layanan yang kami berikan.",
    image: integrityImg,
  },
  {
    icon: Award,
    title: "Profesionalisme",
    description: "Tim sertifikasi bersertifikat dengan pengalaman dan keahlian di bidangnya.",
    image: professionalismImg,
  },
  {
    icon: Users,
    title: "Kolaboratif",
    description: "Bekerja sama dengan klien untuk mencapai tujuan sertifikasi bersama.",
    image: collaborationImg,
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description: "Selalu berinovasi dan meningkatkan kualitas layanan kami.",
    image: improvementImg,
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">Tentang Axis Global Sertifikasi</h1>
            <p className="text-base md:text-xl max-w-3xl mx-auto opacity-90">
              Partner terpercaya untuk sertifikasi standar internasional di Indonesia
            </p>
          </div>
        </section>

        {/* Company Profile */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16 animate-fade-in">
              <h2 className="mb-6">Siapa Kami</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">Axis Global Sertifikasi</strong> adalah badan sertifikasi berbasis ISO dan standar lainnya, terkait dengan sistem manajemen kompetensi SDM dan pengujian peralatan atau mesin yang profesional dan kredibel secara nasional maupun internasional.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Axis Global Sertifikasi tidak sekedar melakukan audit sertifikasi tetapi juga membantu organisasi untuk mampu menciptakan sustainability innovation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hal ini hanya bisa dilakukan oleh para auditor kami yang memiliki kompetensi dan pengalaman yang cukup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Vision */}
              <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 animate-slide-up">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Eye className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Visi</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Menjadi badan sertifikasi terdepan di Indonesia yang membantu perusahaan mencapai 
                    standar internasional dan meningkatkan daya saing di pasar global.
                  </p>
                </CardContent>
              </Card>

              {/* Mission */}
              <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 animate-slide-up" style={{ animationDelay: "100ms" }}>
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Target className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Misi</h3>
                  <ul className="text-left space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Memberikan layanan sertifikasi berkualitas tinggi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Membantu klien mencapai sertifikasi dengan efisien</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Meningkatkan kompetensi SDM melalui pelatihan</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 md:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12 animate-fade-in">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Nilai-Nilai Kami</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Prinsip yang menjadi fondasi dalam setiap layanan yang kami berikan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="animate-slide-up group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-full bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    {/* Image Section - Top */}
                    <div className="relative h-20 md:h-28 overflow-hidden bg-muted/20">
                      <img 
                        src={value.image} 
                        alt={value.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="eager"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
                      
                      {/* Icon Overlay */}
                      <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <value.icon className="text-white w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    </div>
                    
                    {/* Content Section - Bottom */}
                    <div className="relative p-3 md:p-5 flex flex-col items-center text-center">
                      <h3 className="text-sm md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 md:mb-3">
                        {value.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Stats */}
        <section className="py-12 md:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center animate-fade-in">
                <div className="text-5xl font-bold text-primary mb-2">10+</div>
                <p className="text-muted-foreground">Tahun Pengalaman</p>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="text-5xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Klien Terlayani</p>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="text-5xl font-bold text-primary mb-2">98%</div>
                <p className="text-muted-foreground">Tingkat Kepuasan</p>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
                <div className="text-5xl font-bold text-primary mb-2">15+</div>
                <p className="text-muted-foreground">Konsultan Ahli</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
