const steps = [
  {
    number: "01",
    title: "Perencanaan Awal",
    description: "Pemahaman standar ISO dan kajian awal penerapan sistem.",
  },
  {
    number: "02",
    title: "Pengembangan Sistem",
    description: "Penyusunan kebijakan dan dokumentasi sistem manajemen ISO.",
  },
  {
    number: "03",
    title: "Penerapan",
    description: "Sosialisasi dan implementasi persyaratan ISO di seluruh lini organisasi.",
  },
  {
    number: "04",
    title: "Evaluasi",
    description: "Audit internal, tinjauan manajemen, dan persiapan menuju proses sertifikasi.",
  },
  {
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

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Flow */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex-1 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary border-y-4 border-y-transparent" />
                  </div>
                )}

                {/* Step Content */}
                <div className="relative z-10">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-2xl mb-4 shadow-lg">
                    {step.number}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-primary/50 relative">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-8 border-t-primary border-x-4 border-x-transparent" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
