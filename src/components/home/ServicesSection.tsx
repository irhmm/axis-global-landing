import { FileCheck, Leaf, PlaneTakeoff, GraduationCap, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: FileCheck,
    title: "Sertifikasi ISO 9001",
    description: "Sistem Manajemen Mutu untuk meningkatkan kualitas produk dan kepuasan pelanggan.",
  },
  {
    icon: Leaf,
    title: "Sertifikasi ISO 14001",
    description: "Sistem Manajemen Lingkungan untuk pengelolaan lingkungan yang berkelanjutan.",
  },
  {
    icon: ClipboardCheck,
    title: "Sertifikasi ISO 45001",
    description: "Sistem Manajemen Keselamatan dan Kesehatan Kerja untuk lingkungan kerja yang aman.",
  },
  {
    icon: Leaf,
    title: "Sertifikasi Halal",
    description: "Sertifikasi produk halal sesuai standar BPJPH dan MUI untuk pasar Muslim.",
  },
  {
    icon: PlaneTakeoff,
    title: "Sertifikasi Haji & Umrah",
    description: "Lisensi penyelenggara perjalanan ibadah haji dan umrah dari Kementerian Agama.",
  },
  {
    icon: GraduationCap,
    title: "Pelatihan & Konsultasi",
    description: "Pendampingan implementasi, audit internal, dan pelatihan sistem manajemen.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-foreground mb-4">Layanan Kami</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Solusi lengkap untuk kebutuhan sertifikasi dan konsultasi bisnis Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-primary transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="text-primary" size={28} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="shadow-primary">
            Lihat Semua Layanan
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
