import step1Image from "@/assets/workflow-step-1.jpg";
import step2Image from "@/assets/workflow-step-2.jpg";
import step3Image from "@/assets/workflow-step-3.jpg";
import step4Image from "@/assets/workflow-step-4.jpg";
import step5Image from "@/assets/workflow-step-5.jpg";

const steps = [
  {
    image: step1Image,
    number: "01",
    title: "Perencanaan Awal",
    description: "Pemahaman standar ISO dan kajian awal penerapan sistem.",
  },
  {
    image: step2Image,
    number: "02",
    title: "Pengembangan Sistem",
    description: "Penyusunan kebijakan dan dokumentasi sistem manajemen ISO.",
  },
  {
    image: step3Image,
    number: "03",
    title: "Penerapan",
    description: "Sosialisasi dan implementasi persyaratan ISO di seluruh lini organisasi.",
  },
  {
    image: step4Image,
    number: "04",
    title: "Evaluasi",
    description: "Audit internal, tinjauan manajemen, dan persiapan menuju proses sertifikasi.",
  },
  {
    image: step5Image,
    number: "05",
    title: "Sertifikasi",
    description: "Pelaksanaan audit sertifikasi, perbaikan hasil audit, pengambilan keputusan sertifikasi, dan kegiatan surveillance di tahun berikutnya.",
  },
];

const WorkflowSection = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">ISO Certification Process</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Proses sistematis dan terstruktur untuk memastikan kesuksesan sertifikasi ISO Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-32 left-full w-full h-0.5 bg-gradient-to-r from-primary/40 to-transparent z-0" />
              )}
              
              <div className="relative bg-card rounded-xl border border-border/50 hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 z-10 group overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-5xl font-bold text-primary/30">
                    {step.number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
