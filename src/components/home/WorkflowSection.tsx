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
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop Zigzag Timeline */}
          <div className="hidden lg:block relative">
            {/* Vertical Center Line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />
            
            <div className="space-y-16">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <div
                    key={index}
                    className={`relative animate-fade-in flex items-center gap-8 ${
                      isLeft ? 'flex-row' : 'flex-row-reverse'
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Content Side */}
                    <div className={`flex-1 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Icon Circle in Center */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/15 via-primary/10 to-transparent border-2 border-primary/30 flex items-center justify-center hover:border-primary/50 hover:shadow-glow transition-all duration-300">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elegant">
                          <Icon className="w-12 h-12 text-primary-foreground" strokeWidth={1.5} />
                        </div>
                      </div>
                      {/* Number Badge */}
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-lg text-primary shadow-md">
                        {step.number}
                      </div>
                    </div>

                    {/* Empty Space for Balance */}
                    <div className="flex-1" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-4 items-start">
                    {/* Icon Circle */}
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/15 via-primary/10 to-transparent border-2 border-primary/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elegant">
                          <Icon className="w-8 h-8 text-primary-foreground" strokeWidth={1.5} />
                        </div>
                      </div>
                      {/* Number Badge */}
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-xs text-primary shadow-md">
                        {step.number}
                      </div>

                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-primary/50 to-primary/20" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
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
