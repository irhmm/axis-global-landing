import { FileCheck, Leaf, PlaneTakeoff, Lock, Palmtree, Shield, GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const isoServices = [
  {
    icon: FileCheck,
    title: "ISO 9001",
    description: "Sistem Manajemen Mutu untuk meningkatkan kualitas produk dan kepuasan pelanggan.",
  },
  {
    icon: Leaf,
    title: "ISO 14001",
    description: "Sistem Manajemen Lingkungan untuk pengelolaan lingkungan yang berkelanjutan.",
  },
  {
    icon: Lock,
    title: "ISO 27001",
    description: "Sistem Manajemen Keamanan Informasi untuk melindungi aset data perusahaan.",
  },
  {
    icon: Shield,
    title: "ISO 45001",
    description: "Sistem Manajemen Kesehatan dan Keselamatan Kerja untuk lingkungan kerja yang aman.",
  },
];

const specialServices = [
  {
    icon: Leaf,
    title: "Sertifikasi Halal",
    description: "Sertifikasi produk halal sesuai standar BPJPH dan MUI untuk pasar Muslim.",
  },
  {
    icon: Palmtree,
    title: "ISPO",
    description: "Sertifikasi perkebunan kelapa sawit berkelanjutan dengan standar Indonesia.",
  },
  {
    icon: PlaneTakeoff,
    title: "Haji & Umrah",
    description: "Lisensi penyelenggara perjalanan ibadah haji dan umrah dari Kementerian Agama.",
  },
  {
    icon: GraduationCap,
    title: "Pelatihan & Sertifikasi",
    description: "Program pelatihan dan sertifikasi profesional untuk meningkatkan kompetensi SDM.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Layanan Kami</h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-3xl mx-auto">
            Solusi lengkap sertifikasi ISO, Halal, ISPO, dan Haji & Umrah dengan standar internasional
          </p>
        </div>

        <Tabs defaultValue="iso" className="w-full">
          <div className="flex justify-center mb-8 md:mb-10">
            <TabsList className="inline-flex bg-secondary/50 backdrop-blur-md border border-border/50 rounded-full p-1.5 shadow-lg">
              <TabsTrigger 
                value="iso" 
                className="rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white data-[state=active]:shadow-glow hover:scale-105"
              >
                <span className="mr-1.5">✅</span>
                ISO Series
              </TabsTrigger>
              <TabsTrigger 
                value="special" 
                className="rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white data-[state=active]:shadow-glow hover:scale-105"
              >
                <span className="mr-1.5">🌿</span>
                Sertifikasi Khusus
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="iso" className="animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {isoServices.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-elegant transition-all duration-300 animate-slide-up hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="p-4 md:p-6">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                      <service.icon className="text-white" size={20} />
                    </div>
                    <CardTitle className="text-sm md:text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                    <CardDescription className="text-xs md:text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="special" className="animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {specialServices.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-elegant transition-all duration-300 animate-slide-up hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="p-4 md:p-6">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                      <service.icon className="text-white" size={20} />
                    </div>
                    <CardTitle className="text-sm md:text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                    <CardDescription className="text-xs md:text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Link to="/services">
            <Button size="lg" className="shadow-primary bg-gradient-to-r from-primary to-primary/90 hover:shadow-glow transition-all">
              Lihat Semua Layanan
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
