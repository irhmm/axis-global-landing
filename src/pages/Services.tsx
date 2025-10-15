import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileCheck, Leaf, PlaneTakeoff, GraduationCap, ClipboardCheck, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: FileCheck,
    title: "Sertifikasi ISO 9001:2015",
    description: "Sistem Manajemen Mutu (Quality Management System)",
    benefits: [
      "Meningkatkan kepuasan pelanggan",
      "Efisiensi operasional perusahaan",
      "Kredibilitas dan reputasi bisnis",
      "Akses ke pasar global",
    ],
    process: "6-12 bulan (tergantung kesiapan organisasi)",
  },
  {
    icon: Leaf,
    title: "Sertifikasi ISO 14001:2015",
    description: "Sistem Manajemen Lingkungan (Environmental Management System)",
    benefits: [
      "Pengelolaan dampak lingkungan",
      "Kepatuhan regulasi lingkungan",
      "Efisiensi penggunaan sumber daya",
      "Citra perusahaan yang peduli lingkungan",
    ],
    process: "6-12 bulan (tergantung kesiapan organisasi)",
  },
  {
    icon: ClipboardCheck,
    title: "Sertifikasi ISO 45001:2018",
    description: "Sistem Manajemen Keselamatan dan Kesehatan Kerja (OH&S)",
    benefits: [
      "Mengurangi risiko kecelakaan kerja",
      "Meningkatkan produktivitas karyawan",
      "Kepatuhan regulasi K3",
      "Biaya kompensasi lebih rendah",
    ],
    process: "6-12 bulan (tergantung kesiapan organisasi)",
  },
  {
    icon: Leaf,
    title: "Sertifikasi Halal (BPJPH)",
    description: "Sertifikasi Produk Halal untuk pasar konsumen Muslim",
    benefits: [
      "Akses pasar Muslim domestik dan internasional",
      "Kepercayaan konsumen Muslim",
      "Kepatuhan regulasi halal Indonesia",
      "Daya saing produk meningkat",
    ],
    process: "3-6 bulan (tergantung jenis produk)",
  },
  {
    icon: PlaneTakeoff,
    title: "Lisensi Haji & Umrah",
    description: "Penyelenggara Perjalanan Ibadah Umrah (PPIU) & Haji Khusus",
    benefits: [
      "Lisensi resmi dari Kementerian Agama",
      "Pelatihan SDM travel haji umrah",
      "Konsultasi sistem operasional",
      "Pendampingan hingga lisensi terbit",
    ],
    process: "4-8 bulan (tergantap kelengkapan dokumen)",
  },
  {
    icon: GraduationCap,
    title: "Pelatihan & Konsultasi",
    description: "Pendampingan Implementasi Sistem Manajemen",
    benefits: [
      "Pelatihan ISO & sistem manajemen",
      "Audit internal berkala",
      "Gap analysis & corrective action",
      "Dokumentasi sistem manajemen",
    ],
    process: "Disesuaikan dengan kebutuhan klien",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 animate-fade-in">Layanan Sertifikasi Profesional</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Solusi lengkap untuk kebutuhan sertifikasi ISO, Halal, dan Haji & Umrah dengan standar internasional
            </p>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-primary transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="bg-primary/5 p-8 flex flex-col justify-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <service.icon className="text-primary" size={32} />
                      </div>
                      <CardHeader className="p-0">
                        <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                      </CardHeader>
                    </div>
                    
                    <CardContent className="col-span-2 p-8">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="text-primary" size={20} />
                          Manfaat
                        </h3>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <span className="text-primary mt-1">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <Shield className="text-primary" size={20} />
                          Durasi Proses
                        </h3>
                        <p className="text-muted-foreground">{service.process}</p>
                      </div>

                      <Button className="shadow-primary">
                        Konsultasi Layanan Ini
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
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
              <Button size="lg" className="shadow-primary">
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
