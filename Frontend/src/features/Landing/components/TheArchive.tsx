import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface FragmentProps {
  label: string;          // Technical marker: task / note / log
  text: string;           // Expanded, high-contrast text
  alignmentClass: string; // Viewport grid alignment
  isSystemNote?: boolean; // Toggles between high-end Sans or technical Mono
}

const fragments: FragmentProps[] = [
  { 
    label: "task",
    text: "Audit PostgreSQL query performance and configure Prisma connection pooling parameters.", 
    alignmentClass: "justify-start pl-6 md:pl-24 py-20", 
    isSystemNote: false
  },
  { 
    label: "note",
    text: "Core architectural philosophy: Decouple the local synchronization engine from physical storage adapters.", 
    alignmentClass: "justify-end pr-6 md:pr-32 py-16", 
    isSystemNote: true
  },
  { 
    label: "task",
    text: "Refactor active JWT persistence from localStorage to cross-subdomain httpOnly cookie rotation.", 
    alignmentClass: "justify-center text-center py-24", 
    isSystemNote: false
  },
  { 
    label: "note",
    text: "Design layout architectures as if the developer is not opening an IDE, but stepping into a quiet workspace.", 
    alignmentClass: "justify-start pl-12 md:pl-40 py-18", 
    isSystemNote: true
  },
  { 
    label: "task",
    text: "Profile layout recalculation pathways to eliminate canvas SVG rendering thrashing on mobile screens.", 
    alignmentClass: "justify-end pr-10 md:pr-24 py-20", 
    isSystemNote: false
  },
  { 
    label: "note",
    text: "Minimize structural friction. True utility software should capture intention immediately without demanding organization.", 
    alignmentClass: "justify-center text-center py-24", 
    isSystemNote: true
  },
  { 
    label: "task",
    text: "Implement Zod schema guardrails to catch payload parsing exceptions during backend ingestion.", 
    alignmentClass: "justify-start pl-8 md:pl-32 py-20", 
    isSystemNote: false
  }
];

// Clean spring physics that handle pop-up and pop-down scaling without layout lag
const thoughtVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.97,
    y: 16
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 18
    }
  }
};

export const TheArchive: React.FC = () => {
  return (
    <section 
      className="relative w-full bg-[#e9ecf0] py-40 md:py-64 overflow-hidden select-none"
      style={{
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)'
      }}
    >
      
      {/* THE STATIC ARCHITECTURAL BLUEPRINT GRID */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg 
          className="w-full h-full" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 2400" 
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="carved-topography" x="-5%" y="-5%" width="110%" height="110%">
              <feOffset dx="1" dy="1.5" />
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite operator="out" in="SourceGraphic" in2="blur" result="inverse" />
              <feFlood floodColor="#475569" floodOpacity="0.2" result="shadow-color" />
              <feComposite operator="in" in="shadow-color" in2="inverse" result="shadow" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="shadow" />
              </feMerge>
            </filter>
          </defs>

          {/* Expanded engineering strata backdrop lines */}
          <path d="M -50 150 C 350 110, 650 190, 1550 130" fill="none" stroke="#cbd5e1" strokeWidth="1" filter="url(#carved-topography)" />
          <path d="M -50 650 C 400 700, 950 580, 1550 610" fill="none" stroke="#cbd5e1" strokeWidth="1" filter="url(#carved-topography)" />
          <path d="M -50 1250 C 300 1180, 750 1350, 1550 1200" fill="none" stroke="#cbd5e1" strokeWidth="1" filter="url(#carved-topography)" />
          <path d="M -50 1850 C 500 1900, 850 1780, 1550 1820" fill="none" stroke="#cbd5e1" strokeWidth="1" filter="url(#carved-topography)" />

          {/* Technical framing lines */}
          <line x1="280" y1="0" x2="280" y2="2400" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="1 20" opacity="0.25" />
          <line x1="1160" y1="0" x2="1160" y2="2400" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="1 20" opacity="0.25" />
        </svg>
      </div>

      {/* FRAGMENTS CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 flex flex-col">
        
        {fragments.map((fragment, index) => (
          <div 
            key={index} 
            className={`w-full flex ${fragment.alignmentClass}`}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={thoughtVariants}
              /* 
                once: false triggers the pop-up and pop-down sequence smoothly on scroll.
                The focus view zone margin is set to a precise -22% wrapper window, keeping 
                elements active only within the primary viewing field of the viewport.
              */
              viewport={{ 
                once: false, 
                amount: 0.3,
                margin: "-22% 0px -22% 0px" 
              }}
              className="max-w-2xl cursor-default will-change-transform transform-gpu flex items-start gap-5"
            >
              {/* Technical Indicator Stamp */}
              <span className="text-[11px] font-mono font-bold text-slate-500 mt-1.5 uppercase tracking-[0.2em] border border-slate-300/80 px-2 py-0.5 select-none bg-slate-200/40 shadow-sm shrink-0">
                {fragment.label}
              </span>

              {/* High-Contrast, Large Readability Systems */}
              {fragment.isSystemNote ? (
                <p className="text-xl md:text-2xl font-light font-sans text-slate-900 tracking-wide leading-relaxed">
                  {fragment.text}
                </p>
              ) : (
                <p className="text-base md:text-xl font-medium font-mono text-slate-800 tracking-tight leading-relaxed">
                  {fragment.text}
                </p>
              )}
            </motion.div>
          </div>
        ))}

      </div>
    </section>
  );
};