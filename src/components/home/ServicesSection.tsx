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
  {
    icon: FileCheck,
    title: "ISO 22000",
    description: "Sistem Manajemen Keamanan Pangan untuk industri makanan dan minuman.",
  },
  {
    icon: Leaf,
    title: "ISO 50001",
    description: "Sistem Manajemen Energi untuk efisiensi dan penghematan energi perusahaan.",
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
  {
    icon: Palmtree,
    title: "RSPO",
    description: "Sertifikasi kelapa sawit berkelanjutan dengan standar internasional RSPO.",
  },
  {
    icon: FileCheck,
    title: "SNI",
    description: "Sertifikasi Standar Nasional Indonesia untuk produk berkualitas dan aman.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="section-title text-foreground mb-4 md:mb-6">Layanan Kami</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
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
                ISO Series
              </TabsTrigger>
              <TabsTrigger 
                value="special" 
                className="rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white data-[state=active]:shadow-glow hover:scale-105"
              >
                Sertifikasi Khusus
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="iso" className="animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
              {isoServices.map((service, index) => (
                <div
                  key={index}
                  className="relative animate-slide-up group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative p-3 md:p-6 h-full bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 rounded-xl md:rounded-2xl transition-all duration-300" />
                    
                    <div className="relative flex flex-col h-full items-center text-center">
                      <div className="relative w-10 h-10 md:w-14 md:h-14 mb-2 md:mb-4 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-primary/30 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <service.icon className="text-white" size={18} />
                        <div className="absolute inset-0 rounded-lg md:rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 md:mb-3">
                        {service.title}
                      </h3>
                      <p className="hidden md:block text-sm md:text-base text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="special" className="animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
              {specialServices.map((service, index) => (
                <div
                  key={index}
                  className="relative animate-slide-up group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative p-3 md:p-6 h-full bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 rounded-xl md:rounded-2xl transition-all duration-300" />
                    
                    <div className="relative flex flex-col h-full items-center text-center">
                      <div className="relative w-10 h-10 md:w-14 md:h-14 mb-2 md:mb-4 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-primary/30 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <service.icon className="text-white" size={18} />
                        <div className="absolute inset-0 rounded-lg md:rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 md:mb-3">
                        {service.title}
                      </h3>
                      <p className="hidden md:block text-sm md:text-base text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Link to="/services">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:shadow-glow transition-all text-base md:text-lg px-8 py-6">
              Lihat Semua Layanan
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
