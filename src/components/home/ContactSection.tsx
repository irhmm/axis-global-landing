import { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih, kami akan segera menghubungi Anda.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Hubungi Kami</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Siap membantu Anda mencapai standar internasional. Konsultasi gratis untuk kebutuhan sertifikasi Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="animate-slide-in-right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nama Lengkap
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
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
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Pesan
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ceritakan kebutuhan sertifikasi Anda..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-glow transition-all">
                <Send className="mr-2" size={18} />
                Kirim Pesan
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-slide-up">
            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Telepon</h3>
                  <p className="text-muted-foreground">+62 812-3456-7890</p>
                  <p className="text-muted-foreground">+62 21-1234-5678</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground">info@axisglobal.co.id</p>
                  <p className="text-muted-foreground">konsultasi@axisglobal.co.id</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Alamat Kantor</h3>
                  <p className="text-muted-foreground">
                    Jl. Profesional No. 123<br />
                    Jakarta Selatan, DKI Jakarta<br />
                    Indonesia 12345
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Jam Kerja:</strong> Senin - Jumat, 09:00 - 17:00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
