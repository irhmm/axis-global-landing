import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Send, Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pesan Berhasil Dikirim!",
      description: "Terima kasih telah menghubungi kami. Tim kami akan segera menghubungi Anda.",
    });
    setFormData({ name: "", email: "", company: "", phone: "", message: "" });
  };

  const whatsappNumber = "6281268746727";
  const whatsappMessage = encodeURIComponent("Halo Axis Global Certification, saya ingin berkonsultasi mengenai sertifikasi.");

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 animate-fade-in">Hubungi Kami</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Siap membantu Anda mencapai standar internasional. Konsultasi gratis untuk kebutuhan sertifikasi Anda.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-primary transition-all animate-slide-up">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="text-primary" size={28} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Telepon</h3>
                  <p className="text-muted-foreground text-sm">+62 812 6874 6727</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-primary transition-all animate-slide-up" style={{ animationDelay: "100ms" }}>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-primary" size={28} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-muted-foreground text-sm mb-1">axisglobalcertification@gmail.com</p>
                  <p className="text-muted-foreground text-sm">axiscertificate.com</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-primary transition-all animate-slide-up" style={{ animationDelay: "200ms" }}>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-primary" size={28} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Jam Kerja</h3>
                  <p className="text-muted-foreground text-sm mb-1">Senin - Jumat</p>
                  <p className="text-muted-foreground text-sm">09:00 - 17:00 WIB</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="animate-slide-in-right">
                <h2 className="text-3xl font-bold mb-2">Kirim Pesan</h2>
                <p className="text-muted-foreground mb-8">
                  Isi formulir di bawah ini dan kami akan menghubungi Anda secepatnya.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nama Lengkap <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email <span className="text-primary">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@perusahaan.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        No. Telepon <span className="text-primary">*</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+62 812 3456 7890"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Nama Perusahaan
                    </label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="PT. Nama Perusahaan"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Pesan <span className="text-primary">*</span>
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan kebutuhan sertifikasi Anda atau pertanyaan yang ingin ditanyakan..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full shadow-primary">
                    <Send className="mr-2" size={18} />
                    Kirim Pesan
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-4">Atau hubungi kami langsung via WhatsApp:</p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button variant="outline" size="lg" className="w-full">
                      <MessageSquare className="mr-2" size={18} />
                      Chat via WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              {/* Map & Address */}
              <div className="animate-slide-up">
                <h2 className="text-3xl font-bold mb-2">Lokasi Kantor</h2>
                <p className="text-muted-foreground mb-8">
                  Kunjungi kantor kami atau hubungi untuk membuat janji konsultasi.
                </p>

                <Card className="mb-6 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Alamat Lengkap</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Intiland Suite Tower Level 3<br />
                          Jl. PB Sudirman Kav. 101-103<br />
                          Surabaya, Indonesia
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Google Maps Embed */}
                <div className="rounded-lg overflow-hidden shadow-card h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1234567890!2d106.8000000!3d-6.2500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Axis Global Certification Office Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
