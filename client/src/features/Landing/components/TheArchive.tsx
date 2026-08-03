import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FragmentProps {
  label: string; 
  text: string; 
  alignmentClass: string; 
  isSystemNote?: boolean; 
}

const fragments: FragmentProps[] = [
  {
    label: "task",
    text: "Call an old friend.",
    alignmentClass: "justify-start pl-6 md:pl-24 py-20",
    isSystemNote: false,
  },
  {
    label: "note",
    text: "Some places stay with you long after you've left them.",
    alignmentClass: "justify-end pr-6 md:pr-32 py-16",
    isSystemNote: true,
  },
  {
    label: "task",
    text: "Buy flowers for the weekend.",
    alignmentClass: "justify-center text-center py-24",
    isSystemNote: false,
  },
  {
    label: "note",
    text: "Why do old songs feel like places you can return to?",
    alignmentClass: "justify-start pl-12 md:pl-40 py-18",
    isSystemNote: true,
  },
  {
    label: "task",
    text: "Finish the book on the bedside table.",
    alignmentClass: "justify-end pr-10 md:pr-24 py-20",
    isSystemNote: false,
  },
  {
    label: "note",
    text: "Not everything important arrives with a plan.",
    alignmentClass: "justify-center text-center py-24",
    isSystemNote: true,
  },
  {
    label: "task",
    text: "Remember to water the plants.",
    alignmentClass: "justify-start pl-8 md:pl-32 py-20",
    isSystemNote: false,
  },
];

const ScrollFragment: React.FC<{ fragment: FragmentProps }> = ({ fragment }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /* SCROLL INTERPOLATION MAP (Adjusted for Early Exit):
    0.0  -> Bottom of screen (hidden)
    0.2  -> Scrolled up 20%, fully visible and settled
    0.65 -> Starts fading and moving out significantly earlier (just past screen center)
    0.85 -> Completely dissolved and cleared out well before the edge
  */
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.65, 0.85], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.65, 0.85], [24, 0, 0, -32]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.65, 0.85], [0.97, 1, 1, 0.96]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full flex ${fragment.alignmentClass}`}
    >
      <motion.div
        style={{ opacity, y, scale }}
        className="max-w-2xl cursor-default will-change-transform transform-gpu flex items-start gap-5"
      >
        <span className="text-[11px] font-mono font-bold text-slate-500 mt-1.5 uppercase tracking-[0.2em] border border-slate-300/80 px-2 py-0.5 select-none bg-slate-200/40 shadow-sm shrink-0">
          {fragment.label}
        </span>

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
  );
};

export const TheArchive: React.FC = () => {
  return (
    <section
      className="relative w-full bg-[#e9ecf0] py-40 md:py-64 overflow-hidden select-none"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
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
            <filter
              id="carved-topography"
              x="-5%"
              y="-5%"
              width="110%"
              height="110%"
            >
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

          <path d="M -50 150 C 350 110, 650 190, 1550 130" fill="none" stroke="#cbd5e1" strokeWidth="1" filter="url(#carved-topography)" />
          <path d="M -50 650 C 400 700, 950 580, 1550 610" fill="none" stroke="#cbd5e1" strokeWidth="1" filter="url(#carved-topography)" />
          <path d="M -50 1250 C 300 1180, 750 1350, 1550 1200" fill="none" stroke="#cbd5e1" strokeWidth="1" filter="url(#carved-topography)" />
          <path d="M -50 1850 C 500 1900, 850 1780, 1550 1820" fill="none" stroke="#cbd5e1" strokeWidth="1" filter="url(#carved-topography)" />

          <line x1="280" y1="0" x2="280" y2="2400" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="1 20" opacity="0.25" />
          <line x1="1160" y1="0" x2="1160" y2="2400" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="1 20" opacity="0.25" />
        </svg>
      </div>

      {/* FRAGMENTS CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 flex flex-col">
        {fragments.map((fragment, index) => (
          <ScrollFragment key={index} fragment={fragment} />
        ))}
      </div>
    </section>
  );
};