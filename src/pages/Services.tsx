import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileCheck, Leaf, PlaneTakeoff, GraduationCap, Shield, CheckCircle, Lock, Award, Factory, FlaskConical, GraduationCap as School, Utensils, Sparkles, RefreshCcw, KeyRound, Zap, Palmtree } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const isoServices = [
  {
    icon: FileCheck,
    code: "ISO 9001",
    title: "Sistem Manajemen Mutu",
    description: "Standar internasional untuk sistem manajemen mutu yang memastikan konsistensi kualitas produk dan layanan.",
  },
  {
    icon: Factory,
    code: "ISO 13485",
    title: "Sistem Manajemen Peralatan Medis",
    description: "Standar khusus untuk organisasi yang terlibat dalam desain, produksi, dan distribusi perangkat medis.",
  },
  {
    icon: Leaf,
    code: "ISO 14001",
    title: "Sistem Manajemen Lingkungan",
    description: "Standar untuk mengelola tanggung jawab lingkungan secara sistematis dan berkelanjutan.",
  },
  {
    icon: FlaskConical,
    code: "ISO/IEC 17025",
    title: "Kompetensi Laboratorium Pengujian dan Kalibrasi",
    description: "Standar untuk kompetensi laboratorium pengujian dan kalibrasi yang menghasilkan data valid.",
  },
  {
    icon: School,
    code: "ISO 21001",
    title: "Sistem Manajemen Organisasi Pendidikan",
    description: "Standar untuk meningkatkan kepuasan peserta didik dan stakeholder pendidikan lainnya.",
  },
  {
    icon: Utensils,
    code: "ISO 22000",
    title: "Sistem Manajemen Keamanan Pangan",
    description: "Standar untuk memastikan keamanan pangan di seluruh rantai pasokan makanan.",
  },
  {
    icon: Sparkles,
    code: "ISO 22716",
    title: "Praktik Produksi Kosmetik yang Baik (GMP)",
    description: "Pedoman untuk produksi, pengendalian, penyimpanan, dan pengiriman produk kosmetik yang aman.",
  },
  {
    icon: RefreshCcw,
    code: "ISO 22301",
    title: "Sistem Manajemen Keberlangsungan Bisnis",
    description: "Standar untuk melindungi, mengurangi kemungkinan, dan memastikan pemulihan dari insiden yang mengganggu.",
  },
  {
    icon: Lock,
    code: "ISO 27001",
    title: "Sistem Manajemen Keamanan Informasi",
    description: "Standar untuk mengelola keamanan aset informasi seperti data keuangan dan karyawan.",
  },
  {
    icon: Shield,
    code: "ISO 37001",
    title: "Sistem Manajemen Anti Penyuapan",
    description: "Standar untuk membantu organisasi mencegah, mendeteksi, dan menangani penyuapan.",
  },
  {
    icon: Shield,
    code: "ISO 45001",
    title: "Sistem Manajemen Kesehatan dan Keselamatan Kerja",
    description: "Standar untuk menciptakan tempat kerja yang aman dan sehat, mencegah cedera dan penyakit.",
  },
  {
    icon: Zap,
    code: "ISO 50001",
    title: "Sistem Manajemen Energi",
    description: "Standar untuk meningkatkan efisiensi energi dan mengurangi biaya serta emisi gas rumah kaca.",
  },
];

const specialServices = [
  {
    icon: Palmtree,
    code: "ISPO",
    title: "Sertifikasi Perkebunan Kelapa Sawit Berkelanjutan",
    description: "Sertifikasi untuk memastikan praktik perkebunan kelapa sawit yang berkelanjutan dan bertanggung jawab.",
  },
  {
    icon: Award,
    code: "Halal",
    title: "Sertifikasi Halal",
    description: "Untuk produk dan proses sesuai syariat Islam, diakui oleh BPJPH dan MUI.",
  },
  {
    icon: PlaneTakeoff,
    code: "Haji & Umrah",
    title: "Sertifikasi Haji & Umrah",
    description: "Lisensi untuk penyelenggara perjalanan ibadah haji dan umrah dari Kementerian Agama.",
  },
  {
    icon: GraduationCap,
    code: "Auditor",
    title: "Auditor Sertifikasi",
    description: "Pelatihan dan penugasan auditor profesional untuk berbagai standar sertifikasi.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
              Layanan Sertifikasi Axis Global
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
              Layanan Sertifikasi Profesional
            </h1>
            <p className="text-base md:text-xl max-w-3xl mx-auto opacity-90">
              Solusi lengkap untuk kebutuhan sertifikasi ISO, Halal, ISPO, dan Haji & Umrah dengan standar internasional
            </p>
          </div>
        </section>

        {/* Services Section with Tabs */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Layanan Sertifikasi Kami</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Pilih kategori layanan yang Anda butuhkan
              </p>
            </div>

            <Tabs defaultValue="iso" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-12 bg-muted/50 p-1">
                <TabsTrigger 
                  value="iso" 
                  className="text-sm md:text-base font-medium data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground"
                >
                  ISO Series ({isoServices.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="special"
                  className="text-sm md:text-base font-medium data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground"
                >
                  Sertifikasi Khusus ({specialServices.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="iso" className="mt-0 animate-fade-in">
                <div className="text-center mb-8">
                  <Badge className="mb-4" variant="outline">
                    Sertifikasi ISO Internasional
                  </Badge>
                  <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                    Standar internasional untuk berbagai sistem manajemen yang diakui secara global
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isoServices.map((service, index) => (
                    <Card
                      key={index}
                      className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <service.icon className="text-white" size={24} />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {service.code}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="special" className="mt-0 animate-fade-in">
                <div className="text-center mb-8">
                  <Badge className="mb-4" variant="outline">
                    Sertifikasi Spesialisasi
                  </Badge>
                  <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                    Layanan sertifikasi khusus untuk kebutuhan industri dan bisnis tertentu
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {specialServices.map((service, index) => (
                    <Card
                      key={index}
                      className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all">
                            <service.icon className="text-white" size={28} />
                          </div>
                          <Badge variant="secondary">
                            {service.code}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors mb-3">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4">Siap Memulai Proses Sertifikasi?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik untuk kebutuhan sertifikasi bisnis Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:shadow-glow transition-all">
                Konsultasi Gratis
              </Button>
              <Button size="lg" variant="outline">
                Download Brosur
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
