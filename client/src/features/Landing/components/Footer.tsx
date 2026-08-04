import React, { useState } from "react";
import { useLenis } from "lenis/react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const lenis = useLenis();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("pbala1851@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#e9ecf0] text-slate-800 pt-24 pb-16 px-6 sm:px-12 md:px-24 select-none border-t border-slate-300/60">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* TOP LEVEL: Identity & The Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Product Identity & Supporting Statement */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <h2 className="text-2xl font-medium tracking-tight text-slate-900 font-serif">
              The Archive
            </h2>
            <p className="text-base text-slate-700 max-w-sm leading-relaxed font-sans">
              Built for notes, thoughts, and small intentions. A quiet place for loud thoughts.
            </p>
          </div>

          {/* Spacer for Negative Space */}
          <div className="hidden md:block md:col-span-2" />

          {/* The Three Pillars */}
          <div className="md:col-span-5 flex flex-col gap-3 pt-1">
            <span className="text-xs font-mono font-semibold tracking-widest text-slate-600 uppercase mb-1">
              Core Pillars
            </span>
            <p className="text-sm font-sans font-medium text-slate-800 tracking-wide">
              Build notebooks.
            </p>
            <p className="text-sm font-sans font-medium text-slate-800 tracking-wide">
              Capture thoughts.
            </p>
            <p className="text-sm font-sans font-medium text-slate-800 tracking-wide">
              Track tasks.
            </p>
          </div>
        </div>

        {/* BOTTOM LEVEL: Utilities, Socials, & Metadata */}
        <div className="flex flex-col gap-8 pt-8 border-t border-slate-300/70">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            {/* Utility Navigation */}
            <nav className="flex items-center gap-8 text-sm font-mono tracking-wider font-medium text-slate-700">
              <a 
                href="#about" 
                className="hover:text-blue-900 transition-colors duration-200 relative group py-1"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-slate-900 transition-all duration-300 ease-out group-hover:w-full" />
              </a>
              
              <a 
                href="mailto:pbala1851@gmail.com"
                onClick={handleCopyEmail}
                className="hover:text-blue-900 transition-colors duration-200 relative group py-1 inline-flex items-center"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-slate-900 transition-all duration-300 ease-out group-hover:w-full" />

                {/* Copied Tooltip */}
                <span
                  className={`absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[11px] font-sans font-medium text-white bg-slate-900 rounded shadow-md pointer-events-none transition-all duration-200 ease-out ${
                    copied
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  }`}
                >
                  Copied!
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                </span>
              </a>
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-6 text-sm font-mono tracking-wider text-slate-700">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest pointer-events-none hidden xs:inline">
                Maker //
              </span>
              <a 
                href="https://github.com/Bala-Prakash-M" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-900 font-medium transition-colors duration-200 py-1"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/bala-prakash-027725362/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-900 font-medium transition-colors duration-200 py-1"
              >
                LinkedIn
              </a>
              <a 
                href="https://x.com/BalaPrakas74044" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-900 font-medium transition-colors duration-200 py-1"
              >
                X
              </a>
            </div>

          </div>

          {/* Copyright Metadata & Back-to-Top Button */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 font-medium tracking-tight">
            <p>&copy; {currentYear} The Archive. All rights reserved.</p>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex items-center gap-1.5 hover:text-slate-900 transition-colors duration-200 focus:outline-none"
            >
              <span>Back to top</span>
              <svg
                className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform duration-200 ease-out"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};