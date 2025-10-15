import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "PT. Maju Bersama Indonesia",
    role: "Direktur Operasional",
    content: "Proses sertifikasi ISO 9001 bersama Axis Global sangat profesional dan efisien. Tim mereka memberikan pendampingan yang luar biasa dari awal hingga akhir.",
    rating: 5,
  },
  {
    name: "CV. Berkah Mandiri",
    role: "General Manager",
    content: "Sangat terbantu dengan konsultasi sertifikasi Halal. Prosesnya cepat dan tim sangat responsif dalam menjawab setiap pertanyaan kami.",
    rating: 5,
  },
  {
    name: "PT. Global Wisata Tour",
    role: "CEO",
    content: "Axis Global membantu kami mendapatkan lisensi penyelenggara haji & umrah dengan mudah. Highly recommended untuk yang ingin memulai bisnis travel haji umrah!",
    rating: 5,
  },
  {
    name: "PT. Industri Sejahtera",
    role: "HSE Manager",
    content: "Implementasi ISO 45001 berjalan lancar berkat bimbingan tim Axis Global. Sangat memahami kebutuhan industri kami.",
    rating: 5,
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
              <Card
                key={index}
                className={`transition-all duration-500 ${
                  index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-0"
                }`}
              >
                <CardContent className="p-8 md:p-12 lg:p-16 text-center">
                  <Quote className="text-primary mx-auto mb-6 md:mb-8" size={48} />
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
                    ))}
                  </div>
                  <p className="text-base md:text-lg lg:text-xl text-foreground mb-8 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="card-title text-foreground">{testimonial.name}</p>
                    <p className="text-sm md:text-base text-muted-foreground mt-2">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
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
