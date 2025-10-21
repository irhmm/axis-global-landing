import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Award, Globe, CheckCircle } from "lucide-react";

const affiliations = [
  {
    name: "International Organization for Standardization (ISO)",
    description: "Lembaga internasional yang menetapkan standar kualitas, lingkungan, dan keselamatan kerja yang diakui secara global.",
    benefits: [
      "Standar internasional yang diakui di seluruh dunia",
      "Meningkatkan kredibilitas bisnis",
      "Akses ke pasar global",
    ],
  },
  {
    name: "Badan Penyelenggara Jaminan Produk Halal (BPJPH)",
    description: "Lembaga pemerintah Indonesia yang berwenang menyelenggarakan jaminan produk halal.",
    benefits: [
      "Sertifikasi halal resmi dari pemerintah Indonesia",
      "Akses ke pasar konsumen Muslim Indonesia",
      "Kepatuhan regulasi halal nasional",
    ],
  },
  {
    name: "Badan Standardisasi Nasional (BSN)",
    description: "Lembaga pemerintah yang bertanggung jawab di bidang standardisasi nasional Indonesia (SNI).",
    benefits: [
      "Standar nasional Indonesia (SNI)",
      "Harmonisasi dengan standar internasional",
      "Pengakuan produk berkualitas",
    ],
  },
  {
    name: "Majelis Ulama Indonesia (MUI)",
    description: "Lembaga yang mengeluarkan fatwa halal dan menjadi rujukan sertifikasi halal di Indonesia.",
    benefits: [
      "Fatwa halal dari MUI",
      "Kepercayaan konsumen Muslim",
      "Standar halal yang ketat",
    ],
  },
  {
    name: "International Accreditation Forum (IAF)",
    description: "Organisasi global untuk akreditasi lembaga sertifikasi yang memastikan konsistensi standar internasional.",
    benefits: [
      "Pengakuan sertifikasi di berbagai negara",
      "Konsistensi audit internasional",
      "Kepercayaan stakeholder global",
    ],
  },
];

const Affiliasi = () => {
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
            <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">Partner & Afiliasi</h1>
            <p className="text-base md:text-xl max-w-3xl mx-auto opacity-90">
              Bekerja sama dengan lembaga sertifikasi internasional dan nasional terpercaya
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center animate-slide-up">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">5+</div>
                <p className="text-muted-foreground">Lembaga Partner</p>
              </div>
              <div className="text-center animate-slide-up" style={{ animationDelay: "100ms" }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <p className="text-muted-foreground">Sertifikat Diterbitkan</p>
              </div>
              <div className="text-center animate-slide-up" style={{ animationDelay: "200ms" }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">30+</div>
                <p className="text-muted-foreground">Negara Pengakuan</p>
              </div>
            </div>
          </div>
        </section>

        {/* Affiliations List */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12 animate-fade-in">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Lembaga Partner Kami</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Kami bekerja sama dengan lembaga-lembaga terpercaya untuk memastikan sertifikasi Anda diakui secara nasional dan internasional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {affiliations.map((affiliation, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Shield className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-xl">{affiliation.name}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {affiliation.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="text-primary" size={18} />
                      Keuntungan
                    </h4>
                    <ul className="space-y-2">
                      {affiliation.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 md:py-20 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Dipercaya oleh Berbagai Industri</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
              Dari manufaktur, food & beverage, hingga berbagai industri lainnya - kami telah membantu ratusan perusahaan mendapatkan sertifikasi yang mereka butuhkan
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {["Manufaktur", "Food & Beverage", "Travel & Tour", "Konstruksi", "Kesehatan", "Pendidikan", "Logistik", "Hospitality"].map((industry, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-card rounded-lg shadow-sm hover:shadow-primary transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="font-medium">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Affiliasi;
