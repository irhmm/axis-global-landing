import { useState } from "react";
import { X } from "lucide-react";
import client1 from "@/assets/clients/client-1.jpg";
import client2 from "@/assets/clients/client-2.jpg";
import client3 from "@/assets/clients/client-3.jpg";
import client4 from "@/assets/clients/client-4.jpg";
import client5 from "@/assets/clients/client-5.jpg";
import client6 from "@/assets/clients/client-6.jpg";
import client7 from "@/assets/clients/client-7.jpg";
import client8 from "@/assets/clients/client-8.jpg";
import client9 from "@/assets/clients/client-9.jpg";

interface Story {
  image: string;
  client: string;
  certification: string;
  category: string;
}

const successStories: Story[] = [
  {
    image: client1,
    client: "Penyerahan Sertifikat ISO",
    certification: "ISO 9001:2015",
    category: "Sistem Manajemen Mutu",
  },
  {
    image: client2,
    client: "Audit Lapangan",
    certification: "ISO 14001:2015",
    category: "Sistem Manajemen Lingkungan",
  },
  {
    image: client3,
    client: "Klien Profesional",
    certification: "ISO 45001:2018",
    category: "Sistem Manajemen K3",
  },
  {
    image: client4,
    client: "Sertifikasi Berhasil",
    certification: "ISO 22000:2018",
    category: "Keamanan Pangan",
  },
  {
    image: client5,
    client: "Tim Audit Profesional",
    certification: "ISO 27001:2013",
    category: "Keamanan Informasi",
  },
  {
    image: client6,
    client: "Pencapaian Sertifikat",
    certification: "ISO 50001:2018",
    category: "Manajemen Energi",
  },
  {
    image: client7,
    client: "Proses Sertifikasi",
    certification: "ISO 37001:2016",
    category: "Anti Penyuapan",
  },
  {
    image: client8,
    client: "Kemitraan Sukses",
    certification: "ISO 13485:2016",
    category: "Alat Kesehatan",
  },
  {
    image: client9,
    client: "Momen Profesional",
    certification: "ISO 17025:2017",
    category: "Laboratorium",
  },
];

const SuccessStoriesSection = () => {
  const [selectedImage, setSelectedImage] = useState<Story | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kisah Sukses Klien Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dokumentasi perjalanan sertifikasi bersama klien-klien terpercaya yang telah mempercayai layanan kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(story)}
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={story.image}
                  alt={`${story.client} - ${story.certification} - Sertifikasi ${story.category}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-semibold text-lg mb-1">{story.client}</h3>
                <p className="text-sm text-white/90 mb-1">{story.certification}</p>
                <p className="text-xs text-white/80">{story.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          
          <div className="max-w-4xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image}
              alt={`${selectedImage.client} - ${selectedImage.certification}`}
              className="w-full h-auto rounded-lg"
            />
            <div className="bg-background/95 p-6 rounded-b-lg mt-2">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {selectedImage.client}
              </h3>
              <p className="text-muted-foreground mb-1">{selectedImage.certification}</p>
              <p className="text-sm text-muted-foreground">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SuccessStoriesSection;
