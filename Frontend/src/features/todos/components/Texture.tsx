import React, { useState, useEffect } from "react";

export const ArchitecturalTexture: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden bg-[#f0f2f6]">
      {/* FLUID TOPOGRAPHIC TEXTURE CANVAS
        Matches the dashboard base tone (#f0f2f6). 
        Uses crisp light-to-dark stacked layers with dual offset drop-shadow filters.
      */}
      <svg
        className={`w-full h-full transition-opacity duration-1000 ease-in-out ${
          isMounted ? "opacity-90" : "opacity-0"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Natural Topographic Elevation Filter */}
          <filter id="topo-bevel-shadow" x="-20%" y="-20%" width="140%" height="140%">
            {/* Soft Ambient Shadow (Bottom-Right Drop) */}
            <feDropShadow 
              dx="3" 
              dy="6" 
              stdDeviation="7" 
              floodColor="#0f172a" 
              floodOpacity="0.08" 
            />
            {/* Extruded Rim Light Accent (Top-Left Edge) */}
            <feDropShadow 
              dx="-1.5" 
              dy="-1.5" 
              stdDeviation="1.5" 
              floodColor="#ffffff" 
              floodOpacity="0.85" 
            />
          </filter>
        </defs>

        {/* Base Layer 0: The Core Canvas Floor */}
        <rect width="1440" height="900" fill="#e8ebf0" />

        {/* Layer 1: Massive sweeping peripheral ridge */}
        <path
          d="M 0,180 C 350,120 500,30 800,80 C 1100,130 1200,280 1350,180 C 1420,130 1400,0 1440,0 L 1440,900 L 0,900 Z"
          fill="#ebedf2"
          filter="url(#topo-bevel-shadow)"
        />

        {/* Layer 2: Mid-tier layout plateau wave */}
        <path
          d="M 0,340 C 280,290 380,120 650,200 C 920,280 1050,420 1250,320 C 1380,220 1400,90 1440,70 L 1440,900 L 0,900 Z"
          fill="#edf0f5"
          filter="url(#topo-bevel-shadow)"
        />

        {/* Layer 3: Central landscape ring steps */}
        <path
          d="M 120,440 C 180,280 480,220 700,320 C 920,420 880,680 700,780 C 520,880 320,820 220,760 C 120,700 60,600 120,440 Z"
          fill="#f0f2f6"
          filter="url(#topo-bevel-shadow)"
        />
        {/* Layer 6: Lower left balancing sweep section */}
        <path
          d="M 0,720 C 160,680 260,800 480,740 C 700,680 800,850 980,850 L 0,900 Z"
          fill="#eaedf2"
          filter="url(#topo-bevel-shadow)"
        />
      </svg>

      {/* Soft ambient overhead overlay to settle the vector details cleanly */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-slate-900/[0.02] via-transparent to-white/[0.1] pointer-events-none"
        style={{ mixBlendMode: "overlay" }}
      />
    </div>
  );
};