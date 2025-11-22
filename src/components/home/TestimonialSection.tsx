import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Bp. Triono Suwignyo",
    position: "Factory Manager",
    company: "PT Panca Tirta Prigen - Kosme Nutrition - J99 Corporation Group",
    content: "Kami sangat terbantu dengan proses sertifikasi sistem keamanan pangan ISO 22000 yang diminta cepat oleh calon pelanggan JIWATER, dan Axis Global Sertifikasi sebagai agensi Americo Quality Standards Registech melayani realisasi dengan profesional, cepat dan benar benar nama perusahaan kami tercantum di jaringan internasional dan nasional (IAF)",
    rating: 5,
    image: "/src/assets/testimonials/client-5.jpg",
  },
  {
    name: "Ibu Fika Kharisyanti, S. Farm.",
    position: "Operation Manager",
    company: "Stem Cell Center - Universitas Airlangga",
    content: "Kami harus menjaga mutu pelayanan Stem Cell Center - Universitas Airlangga, namun peraturan senantiasa berganti-ganti, untung kami dibantu oleh Axis Global Sertifikasi - Equal Assurance dengan konsultan PT Idea Multiple Management. Semua Permasalahan menjadi mudah dan tidak perlu lagi khawartir",
    rating: 5,
    image: "/src/assets/testimonials/client-6.jpg",
  },
  {
    name: "Ibu Ririn Pujiastuti, S.S",
    position: "Direktur Utama",
    company: "KKSP RSUD DR Soetomo",
    content: "Kami selalu terbantu oleh Axis Global Sertifikasi yang memiliki layanan affiliasi sertifikasi komplit, dan tidak sekedar melakukan audit sertifikasi namun kami mendapatkan bonus pelatihan jika kami membutuhkan.",
    rating: 5,
    image: "/src/assets/testimonials/client-7.jpg",
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="section-title text-foreground mb-4 md:mb-6">Apa Kata Klien Kami</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Kepercayaan klien adalah prioritas utama kami
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-500 group ${
                  index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-0"
                }`}
              >
                <div className="relative p-3 md:p-6 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 rounded-xl md:rounded-2xl transition-all duration-300" />
                  
                  <div className="relative p-5 md:p-6 lg:p-10 text-center">
                    <Quote className="text-primary mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300" size={48} />
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform duration-300" size={24} style={{ transitionDelay: `${i * 50}ms` }} />
                      ))}
                    </div>
                    <p className="text-base md:text-lg lg:text-xl text-foreground mb-8 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="w-16 h-16 md:w-20 md:h-20 border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                        <AvatarImage 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg md:text-xl font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2">
                        <p className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {testimonial.name}
                        </p>
                        <p className="text-sm md:text-base font-semibold text-primary">
                          {testimonial.position}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-primary hover:bg-primary/90 p-3 rounded-full transition-all shadow-primary"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-primary-foreground" size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-primary hover:bg-primary/90 p-3 rounded-full transition-all shadow-primary"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-primary-foreground" size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-8" : "bg-muted"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
