import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Heart,
    title: "Integritas",
    description: "Menjunjung tinggi kejujuran dan transparansi dalam setiap layanan yang kami berikan.",
  },
  {
    icon: Award,
    title: "Profesionalisme",
    description: "Tim konsultan bersertifikat dengan pengalaman dan keahlian di bidangnya.",
  },
  {
    icon: Users,
    title: "Kolaboratif",
    description: "Bekerja sama dengan klien untuk mencapai tujuan sertifikasi bersama.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description: "Selalu berinovasi dan meningkatkan kualitas layanan kami.",
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
                    Menjadi konsultan sertifikasi terdepan di Indonesia yang membantu perusahaan mencapai 
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
                      <span>Memberikan layanan konsultasi berkualitas tinggi</span>
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
                <Card
                  key={index}
                  className="group text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <value.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
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
