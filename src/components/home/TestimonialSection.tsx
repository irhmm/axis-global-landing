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
    name: "PT. Industri Sejahtera",
    role: "HSE Manager",
    content: "Implementasi ISO 45001 berjalan lancar berkat bimbingan tim Axis Global. Sangat memahami kebutuhan industri kami.",
    rating: 5,
  },
  {
    name: "PT. Karya Mandiri Sejahtera",
    role: "Quality Manager",
    content: "Proses audit dan sertifikasi ISO 14001 sangat terstruktur dan profesional. Tim Axis Global sangat membantu dalam meningkatkan sistem manajemen lingkungan kami.",
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
                    <div>
                      <p className="card-title text-foreground group-hover:text-primary transition-colors duration-300">{testimonial.name}</p>
                      <p className="text-sm md:text-base text-muted-foreground mt-2">{testimonial.role}</p>
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
