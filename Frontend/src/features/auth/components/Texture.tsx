import React from "react";

export const ArchitecturalTexture: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden bg-[#d2d7df]">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* HIGH-CONTRAST NEUMORPHIC SHADOW PIPELINE */}
          <filter id="intense-paper-shadow" x="-20%" y="-20%" width="150%" height="150%">
            {/* Deep Under-shadow */}
            <feDropShadow 
              dx="3" 
              dy="8" 
              stdDeviation="7" 
              floodColor="#0f172a" 
              floodOpacity="0.22" 
            />
            {/* Direct Contact Edge Shadow */}
            <feDropShadow 
              dx="0" 
              dy="2" 
              stdDeviation="2" 
              floodColor="#0f172a" 
              floodOpacity="0.15" 
            />
            {/* Extruded White Bevel Rim */}
            <feDropShadow 
              dx="-2" 
              dy="-2" 
              stdDeviation="1.5" 
              floodColor="#ffffff" 
              floodOpacity="0.9" 
            />
          </filter>
        </defs>

        {/* Base Layer Canvas Floor: Darkest depth value */}
        <rect width="1440" height="900" fill="#cbd1db" />

        {/* LAYER 1: Top-down wave landscape (Step 1) */}
        <path
          d="M 0,200 C 300,150 450,50 700,100 C 950,150 1100,300 1250,200 C 1400,100 1350,0 1440,0 L 1440,900 L 0,900 Z"
          fill="#d7dce4"
          filter="url(#intense-paper-shadow)"
        />

        {/* LAYER 2: Mid-tier layout contour (Step 2 - Slightly lighter) */}
        <path
          d="M 0,350 C 250,300 350,150 600,220 C 850,290 1000,450 1200,350 C 1350,250 1380,100 1440,80 L 1440,900 L 0,900 Z"
          fill="#e2e6ee"
          filter="url(#intense-paper-shadow)"
        />

        {/* LAYER 3: The sweeping bottom-right layout feature 
            FIX: Color value brought to clean ivory-white (#f1f4f9) so it stands completely
            apart from the grayish-blue base plates and reflects the white shadow filters perfectly.
        */}
        <path
          d="M 0,760 C 180,720 280,840 480,780 C 680,720 880,860 1080,800 C 1220,760 1340,830 1440,780 L 1440,900 L 0,900 Z"
          fill="#f1f4f9"
          filter="url(#intense-paper-shadow)"
        />
      </svg>

      {/* Lighting overlay overlay matrix */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-slate-900/[0.05] via-transparent to-white/[0.15] pointer-events-none"
        style={{ mixBlendMode: "overlay" }}
      />
    </div>
  );
};