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
        <div className="relative max-w-7xl mx-auto">
          {/* Desktop Zigzag Timeline */}
          <div className="hidden lg:block">
            <div className="relative min-h-[400px]">
              {/* Steps arranged in zigzag pattern */}
              <div className="flex justify-between items-center relative">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isTopRow = index % 2 === 0;
                  
                  return (
                    <div
                      key={index}
                      className="relative flex-1 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Connector Arrow */}
                      {index < steps.length - 1 && (
                        <>
                          {/* Horizontal line */}
                          <div className={`absolute ${isTopRow ? 'top-12' : 'bottom-12'} left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/60 to-primary/30 z-0`}>
                            {/* Diagonal connector to next level */}
                            <div className={`absolute right-0 top-0 w-0.5 ${isTopRow ? 'h-48 bg-gradient-to-b from-primary/30 to-primary/60' : 'h-48 -translate-y-48 bg-gradient-to-b from-primary/60 to-primary/30'}`} />
                          </div>
                          {/* Arrow tip */}
                          <div className={`absolute ${isTopRow ? 'top-12' : 'bottom-12'} right-0 translate-x-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-primary/60 z-10`} />
                        </>
                      )}

                      <div className={`flex flex-col items-center ${isTopRow ? 'pt-0' : 'pt-48'}`}>
                        {/* Icon Circle */}
                        <div className="relative z-10 mb-3 group">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 flex items-center justify-center group-hover:border-primary/40 group-hover:shadow-glow transition-all duration-300">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elegant">
                              <Icon className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
                            </div>
                          </div>
                          {/* Number Badge */}
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-sm text-primary shadow-md">
                            {step.number}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="text-center px-2 max-w-[180px]">
                          <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
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
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elegant">
                          <Icon className="w-8 h-8 text-primary-foreground" strokeWidth={1.5} />
                        </div>
                      </div>
                      {/* Number Badge */}
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-xs text-primary shadow-md">
                        {step.number}
                      </div>

                      {/* Connector Arrow */}
                      {index < steps.length - 1 && (
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-primary/60 to-primary/30">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-primary/60" />
                        </div>
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
