import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#e9ecf0] text-slate-800 pt-32 pb-20 px-6 sm:px-12 md:px-24 select-none border-t border-slate-300/40">
      <div className="max-w-6xl mx-auto flex flex-col gap-24">
        
        {/* TOP LEVEL: Identity & The Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Product Identity & Supporting Statement */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <h2 className="text-xl font-normal tracking-tight text-slate-900 font-serif">
              The Archive
            </h2>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed font-sans font-light">
              Built for notes, thoughts, and small intentions. A quiet place for loud thoughts.
            </p>
          </div>

          {/* Spacer for Negative Space */}
          <div className="hidden md:block md:col-span-2" />

          {/* The Three Pillars (Editorial Manifest) */}
          <div className="md:col-span-5 flex flex-col gap-2.5 pt-1">
            <span className="text-xs font-mono tracking-[0.15em] text-slate-400 uppercase mb-1">
              Core Pillars
            </span>
            <p className="text-sm font-sans font-normal text-slate-700 tracking-wide">
              Build notebooks.
            </p>
            <p className="text-sm font-sans font-normal text-slate-700 tracking-wide">
              Capture thoughts.
            </p>
            <p className="text-sm font-sans font-normal text-slate-700 tracking-wide">
              Track tasks.
            </p>
          </div>
        </div>

        {/* BOTTOM LEVEL: Utilities, Socials, & Metadata */}
        <div className="flex flex-col gap-8 pt-8 border-t border-slate-300/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            {/* Utility Navigation */}
            <nav className="flex items-center gap-8 text-xs font-mono tracking-wider text-slate-500">
              <a 
                href="#about" 
                className="hover:text-slate-900 transition-colors duration-300 ease-out relative group py-1"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-slate-900 transition-all duration-300 ease-out group-hover:w-full" />
              </a>
              
              <a 
                href="#contact" 
                className="hover:text-slate-900 transition-colors duration-300 ease-out relative group py-1"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-slate-900 transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </nav>

            {/* Curated Personal Social Links */}
            <div className="flex items-center gap-6 text-xs font-mono tracking-wider text-slate-400">
              <span className="text-[11px] text-slate-300 uppercase tracking-widest pointer-events-none hidden xs:inline">
                Maker //
              </span>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors duration-300 ease-out py-1"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors duration-300 ease-out py-1"
              >
                LinkedIn
              </a>
              <a 
                href="https://x.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors duration-300 ease-out py-1"
              >
                X
              </a>
            </div>

          </div>

          {/* Copyright Alignment */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 tracking-tight">
            <p>&copy; {currentYear} The Archive. All rights reserved.</p>
            <p className="hidden sm:block font-light italic text-slate-400/80">Fin.</p>
          </div>
        </div>

      </div>
    </footer>
  );
};