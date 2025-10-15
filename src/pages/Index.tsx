import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkflowSection from "@/components/home/WorkflowSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-[72px]">
        <HeroSlider />
        <AboutSection />
        <ServicesSection />
        <WorkflowSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
