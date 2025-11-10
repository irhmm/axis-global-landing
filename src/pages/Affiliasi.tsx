import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Award, Globe, CheckCircle } from "lucide-react";
import isoLogo from "@/assets/accreditation/iso.png";
import halalLogo from "@/assets/accreditation/halal.jpg";
import bsnLogo from "@/assets/accreditation/bsn.jpeg";
import kemnakerLogo from "@/assets/accreditation/kemnaker.png";
import iafLogo from "@/assets/accreditation/iaf.webp";
import kanLogo from "@/assets/accreditation/kan.png";
import uafLogo from "@/assets/accreditation/uaf.webp";
import iasLogo from "@/assets/accreditation/ias.png";
import egacLogo from "@/assets/accreditation/egac.png";
import jasAnzLogo from "@/assets/accreditation/jas-anz.png";

const affiliations = [
  {
    name: "International Organization for Standardization (ISO)",
    logo: isoLogo,
    description: "Lembaga internasional yang menetapkan standar kualitas, lingkungan, dan keselamatan kerja yang diakui secara global.",
    benefits: [
      "Standar internasional yang diakui di seluruh dunia",
      "Meningkatkan kredibilitas bisnis",
      "Akses ke pasar global",
    ],
  },
  {
    name: "Badan Penyelenggara Jaminan Produk Halal (BPJPH)",
    logo: halalLogo,
    description: "Lembaga pemerintah Indonesia yang berwenang menyelenggarakan jaminan produk halal.",
    benefits: [
      "Sertifikasi halal resmi dari pemerintah Indonesia",
      "Akses ke pasar konsumen Muslim Indonesia",
      "Kepatuhan regulasi halal nasional",
    ],
  },
  {
    name: "Badan Standardisasi Nasional (BSN)",
    logo: bsnLogo,
    description: "Lembaga pemerintah yang bertanggung jawab di bidang standardisasi nasional Indonesia (SNI).",
    benefits: [
      "Standar nasional Indonesia (SNI)",
      "Harmonisasi dengan standar internasional",
      "Pengakuan produk berkualitas",
    ],
  },
  {
    name: "Kementerian Ketenagakerjaan Republik Indonesia (Kemenaker)",
    logo: kemnakerLogo,
    description: "Lembaga pemerintah yang mengatur dan membina ketenagakerjaan, termasuk sertifikasi kompetensi kerja dan sistem manajemen keselamatan dan kesehatan kerja (K3).",
    benefits: [
      "Sertifikasi kompetensi kerja yang diakui nasional",
      "Lisensi Lembaga Sertifikasi Profesi (LSP)",
      "Pengakuan kompetensi SDM sesuai SKKNI",
    ],
  },
  {
    name: "International Accreditation Forum (IAF)",
    logo: iafLogo,
    description: "Organisasi global untuk akreditasi lembaga sertifikasi yang memastikan konsistensi standar internasional.",
    benefits: [
      "Pengakuan sertifikasi di berbagai negara",
      "Konsistensi audit internasional",
      "Kepercayaan stakeholder global",
    ],
  },
  {
    name: "Komite Akreditasi Nasional (KAN)",
    logo: kanLogo,
    description: "Lembaga akreditasi nasional Indonesia yang memberikan akreditasi kepada lembaga sertifikasi, laboratorium, dan lembaga inspeksi sesuai standar internasional ISO/IEC 17000 series.",
    benefits: [
      "Akreditasi nasional yang diakui oleh IAF dan ILAC",
      "Meningkatkan kepercayaan pasar domestik dan internasional",
      "Memenuhi persyaratan regulasi Indonesia",
    ],
  },
  {
    name: "United Accreditation Foundation (UAF)",
    logo: uafLogo,
    description: "Lembaga akreditasi internasional yang memberikan akreditasi kepada lembaga sertifikasi untuk berbagai skema standar manajemen sistem.",
    benefits: [
      "Pengakuan akreditasi multi-negara",
      "Fleksibilitas dalam cakupan akreditasi",
      "Kemitraan global yang luas",
    ],
  },
  {
    name: "International Accreditation Service (IAS)",
    logo: iasLogo,
    description: "Lembaga akreditasi internasional berbasis di Amerika Serikat yang terakreditasi oleh ANSI National Accreditation Board (ANAB) dan diakui secara global.",
    benefits: [
      "Akreditasi dengan standar internasional tertinggi",
      "Pengakuan di Amerika Utara dan global",
      "Kredibilitas tinggi di pasar internasional",
    ],
  },
  {
    name: "Emirates Global Accreditation Centre (EGAC)",
    logo: egacLogo,
    description: "Lembaga akreditasi internasional dari Uni Emirat Arab yang memberikan akreditasi untuk lembaga sertifikasi dengan fokus pada wilayah Timur Tengah dan global.",
    benefits: [
      "Akses ke pasar Timur Tengah dan Afrika",
      "Pengakuan di negara-negara Gulf Cooperation Council (GCC)",
      "Standar internasional dengan pemahaman pasar lokal",
    ],
  },
  {
    name: "Joint Accreditation System of Australia and New Zealand (JAS-ANZ)",
    logo: jasAnzLogo,
    description: "Lembaga akreditasi gabungan Australia dan Selandia Baru yang memberikan akreditasi kepada lembaga sertifikasi, laboratorium, dan lembaga inspeksi di kawasan Asia-Pasifik.",
    benefits: [
      "Pengakuan akreditasi di Australia, Selandia Baru, dan Asia-Pasifik",
      "Standar audit yang ketat dan berkualitas tinggi",
      "Anggota penuh IAF dan ILAC",
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
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
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
                    <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform p-3 shadow-sm border border-border/30">
                      {affiliation.logo ? (
                        <img 
                          src={affiliation.logo} 
                          alt={`${affiliation.name} logo`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Shield className="text-primary" size={24} />
                      )}
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
