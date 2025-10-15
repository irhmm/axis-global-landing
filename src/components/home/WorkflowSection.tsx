import { MessageSquare, FileSearch, Wrench, ClipboardCheck, Award } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Konsultasi Awal",
    description: "Diskusi kebutuhan dan analisis gap untuk menentukan jenis sertifikasi yang tepat.",
  },
  {
    icon: FileSearch,
    number: "02",
    title: "Analisis & Penawaran",
    description: "Evaluasi sistem yang ada dan penyusunan proposal serta timeline implementasi.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Implementasi & Pendampingan",
    description: "Pendampingan penuh dalam membangun dan menerapkan sistem manajemen.",
  },
  {
    icon: ClipboardCheck,
    number: "04",
    title: "Audit Internal",
    description: "Pelaksanaan audit internal untuk memastikan kesiapan menuju sertifikasi.",
  },
  {
    icon: Award,
    number: "05",
    title: "Sertifikasi & Pemeliharaan",
    description: "Audit eksternal dan pemeliharaan sertifikasi secara berkelanjutan.",
  },
];

const WorkflowSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-foreground mb-4">Alur Kerja Kami</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Proses sistematis dan terstruktur untuk memastikan kesuksesan sertifikasi Anda
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
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-primary/20 z-0" />
              )}
              
              <div className="relative bg-card p-6 rounded-lg shadow-card hover:shadow-primary transition-all duration-300 z-10">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-4 mx-auto shadow-primary">
                  <step.icon className="text-primary-foreground" size={28} />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary/20 mb-2">{step.number}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
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
