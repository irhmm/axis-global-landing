const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/6281268746727"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse rings */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse"></div>
        
        {/* Main button */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
          {/* WhatsApp Icon SVG */}
          <svg
            viewBox="0 0 32 32"
            className="w-8 h-8 md:w-10 md:h-10 text-white"
            fill="currentColor"
          >
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.825.739 5.482 2.031 7.791L0 32l8.391-2.002A15.927 15.927 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.016 22.609c-.339.952-1.997 1.748-2.827 1.859-.753.094-1.734.139-2.795-.175-1.484-.416-3.388-1.009-5.821-3.205-3.789-3.421-6.189-8.683-6.375-9.084-.178-.401-1.519-2.013-1.519-3.84 0-1.827.961-2.721 1.301-3.091.339-.37.741-.463 1.013-.463.233 0 .463.009.667.017.226.008.526-.086.826.627.301.713 1.031 2.509 1.121 2.693.09.184.15.397.031.644-.119.247-.178.401-.354.617-.178.217-.372.483-.531.649-.178.184-.364.382-.156.748.208.366.924 1.521 1.983 2.465 1.361 1.214 2.507 1.593 2.864 1.769.357.176.566.147.774-.087.208-.234.893-1.041 1.132-1.399.238-.358.476-.298.802-.178.326.119 2.065 973 2.423 1.15.357.177.595.266.682.415.088.148.088.852-.25 1.804z" />
          </svg>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-foreground text-background px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        <span className="text-sm font-medium">Chat with us on WhatsApp</span>
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-foreground"></div>
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
