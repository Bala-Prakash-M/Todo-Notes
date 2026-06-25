import React from "react";

export const ArchitecturalTexture: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden bg-[#d2d7df]">
      
      {/* Injecting gentle, hardware-accelerated fluid keyframes */}
      <style>{`
        @keyframes subtleDriftOne {
          0% { transform: scale(1.05) rotate(0deg) translateY(0px); }
          50% { transform: scale(1.08) rotate(1.5deg) translateY(-8px); }
          100% { transform: scale(1.05) rotate(0deg) translateY(0px); }
        }
        @keyframes subtleDriftTwo {
          0% { transform: scale(1.06) rotate(0deg) translateY(0px); }
          50% { transform: scale(1.03) rotate(-1.2deg) translateY(6px); }
          100% { transform: scale(1.06) rotate(0deg) translateY(0px); }
        }
        @keyframes subtleDriftThree {
          0% { transform: scale(1.04) rotate(0deg) translateX(0px); }
          50% { transform: scale(1.07) rotate(0.8deg) translateX(-10px); }
          100% { transform: scale(1.04) rotate(0deg) translateX(0px); }
        }
        
        .wave-layer-1 {
          transform-origin: 50% 30%;
          animation: subtleDriftOne 22s ease-in-out infinite;
          will-change: transform;
        }
        .wave-layer-2 {
          transform-origin: 40% 40%;
          animation: subtleDriftTwo 28s ease-in-out infinite;
          will-change: transform;
        }
        .wave-layer-3 {
          transform-origin: 60% 80%;
          animation: subtleDriftThree 25s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

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

        {/* Base Layer Canvas Floor */}
        <rect width="1440" height="900" fill="#cbd1db" />

        {/* LAYER 1: Top-down wave landscape */}
        <path
          className="wave-layer-1"
          d="M 0,200 C 300,150 450,50 700,100 C 950,150 1100,300 1250,200 C 1400,100 1350,0 1440,0 L 1440,900 L 0,900 Z"
          fill="#d7dce4"
          filter="url(#intense-paper-shadow)"
        />

        {/* LAYER 2: Mid-tier layout contour */}
        <path
          className="wave-layer-2"
          d="M 0,350 C 250,300 350,150 600,220 C 850,290 1000,450 1200,350 C 1350,250 1380,100 1440,80 L 1440,900 L 0,900 Z"
          fill="#e2e6ee"
          filter="url(#intense-paper-shadow)"
        />

        {/* LAYER 3: The sweeping bottom-right layout feature */}
        <path
          className="wave-layer-3"
          d="M 0,760 C 180,720 280,840 480,780 C 680,720 880,860 1080,800 C 1220,760 1340,830 1440,780 L 1440,900 L 0,900 Z"
          fill="#f1f4f9"
          filter="url(#intense-paper-shadow)"
        />
      </svg>

      {/* Lighting matrix overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-slate-900/[0.05] via-transparent to-white/[0.15] pointer-events-none"
        style={{ mixBlendMode: "overlay" }}
      />
    </div>
  );
};