import { ClipboardCheck, FileText, Layers, SearchCheck, Award } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Perencanaan Awal",
    description: "Pemahaman standar ISO dan kajian awal penerapan sistem.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Pengembangan Sistem",
    description: "Penyusunan kebijakan dan dokumentasi sistem manajemen ISO.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Penerapan",
    description: "Sosialisasi dan implementasi persyaratan ISO di seluruh lini organisasi.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Evaluasi",
    description: "Audit internal, tinjauan manajemen, dan persiapan menuju proses sertifikasi.",
    icon: SearchCheck,
  },
  {
    number: "05",
    title: "Sertifikasi",
    description: "Pelaksanaan audit sertifikasi, perbaikan hasil audit, pengambilan keputusan sertifikasi, dan kegiatan surveillance di tahun berikutnya.",
    icon: Award,
  },
];

const WorkflowSection = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">ISO Certification Process</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Proses sistematis dan terstruktur untuk memastikan kesuksesan sertifikasi ISO Anda
          </p>
        </div>

        {/* Process Flow Container */}
        <div className="relative max-w-7xl mx-auto overflow-x-auto pb-4">
          {/* Horizontal Timeline for All Resolutions */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8 min-w-max px-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div key={index} className="flex items-center">
                  {/* Step Item */}
                  <div
                    className="relative animate-fade-in flex-shrink-0"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col items-center w-44 md:w-52">
                      {/* Icon Circle */}
                      <div className="relative z-10 mb-3 group">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 flex items-center justify-center group-hover:border-primary/40 group-hover:shadow-glow transition-all duration-300">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elegant">
                            <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" strokeWidth={1.5} />
                          </div>
                        </div>
                        {/* Number Badge */}
                        <div className="absolute -bottom-2 -right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-xs md:text-sm text-primary shadow-md">
                          {step.number}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h3 className="text-sm md:text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Arrow */}
                  {index < steps.length - 1 && (
                    <div className="flex items-center flex-shrink-0 mx-2 md:mx-4">
                      <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-primary/60 to-primary/30" />
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-primary/60" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
