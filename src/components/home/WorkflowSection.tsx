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
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">ISO Certification Process</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Proses sistematis dan terstruktur untuk memastikan kesuksesan sertifikasi ISO Anda
          </p>
        </div>

        {/* Process Flow Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Connection Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-elegant opacity-30" />
            
            <div className="grid grid-cols-5 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="relative animate-fade-in group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Icon Circle */}
                    <div className="relative z-10 mb-6">
                      <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 flex items-center justify-center group-hover:border-primary/40 group-hover:shadow-glow transition-all duration-300">
                        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elegant">
                          <Icon className="w-20 h-20 text-primary-foreground" strokeWidth={1.5} />
                        </div>
                      </div>
                      {/* Number Badge */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-lg text-primary shadow-md">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center px-2">
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-6 items-start">
                    {/* Icon Circle */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elegant">
                          <Icon className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
                        </div>
                      </div>
                      {/* Number Badge */}
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-sm text-primary shadow-md">
                        {step.number}
                      </div>

                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-primary/40 to-transparent" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
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
