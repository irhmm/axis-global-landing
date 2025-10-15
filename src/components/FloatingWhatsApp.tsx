import whatsappIcon from "@/assets/whatsapp-icon.png";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/6281268746727"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse rings */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse"></div>
        
        {/* Main button */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-110 overflow-hidden">
          {/* WhatsApp Logo */}
          <img 
            src={whatsappIcon} 
            alt="WhatsApp" 
            className="w-full h-full object-cover"
          />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 md:mr-4 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-2 md:px-4 md:py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        <span className="text-xs md:text-sm font-medium">Chat dengan kami</span>
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 md:border-8 border-transparent border-l-foreground"></div>
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
