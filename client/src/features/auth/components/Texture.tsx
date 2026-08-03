import React from "react";
import useScreenSize from "../../../shared/hooks/useScreenSize";

export const ArchitecturalTexture: React.FC = () => {
  const { isMobile } = useScreenSize();

  // --- 1. PURE HARDWARE ACCELERATED MOBILE CANVAS STRATEGY ---
  if (isMobile) {
    return (
      <div 
        className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden bg-[#cbd1db]"
        style={{ willChange: 'opacity' }}
      >
        {/* Soft, ultra-lightweight mobile structural vignette depth (0% CPU impact) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#d7dce4]/40 via-transparent to-[#f1f4f9]/30" />
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(15,23,42,0.03)]" />
      </div>
    );
  }

  // --- 2. LUXURY KINETIC DESKTOP CONFIGURATION ---
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden bg-[#d2d7df]">
      <style>{`
        @keyframes subtleDriftOne {
          0% { transform: translate3d(0, 0, 0) scale(1.02); }
          50% { transform: translate3d(-6px, -4px, 0) scale(1.04); }
          100% { transform: translate3d(0, 0, 0) scale(1.02); }
        }
        @keyframes subtleDriftTwo {
          0% { transform: translate3d(0, 0, 0) scale(1.03); }
          50% { transform: translate3d(6px, 4px, 0) scale(1.01); }
          100% { transform: translate3d(0, 0, 0) scale(1.03); }
        }
        @keyframes subtleDriftThree {
          0% { transform: translate3d(0, 0, 0) scale(1.01); }
          50% { transform: translate3d(-4px, 6px, 0) scale(1.03); }
          100% { transform: translate3d(0, 0, 0) scale(1.01); }
        }
        
        .wave-layer-1 {
          animation: subtleDriftOne 26s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          will-change: transform;
        }
        .wave-layer-2 {
          animation: subtleDriftTwo 32s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          will-change: transform;
        }
        .wave-layer-3 {
          animation: subtleDriftThree 28s cubic-bezier(0.16, 1, 0.3, 1) infinite;
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
        <rect width="1440" height="900" fill="#cbd1db" />

        <path
          className="wave-layer-1 transform-gpu"
          d="M 0,200 C 300,150 450,50 700,100 C 950,150 1100,300 1250,200 C 1400,100 1350,0 1440,0 L 1440,900 L 0,900 Z"
          fill="#d7dce4"
          stroke="#c7ccd5"
          strokeWidth="1"
        />

        <path
          className="wave-layer-2 transform-gpu"
          d="M 0,350 C 250,300 350,150 600,220 C 850,290 1000,450 1200,350 C 1350,250 1380,100 1440,80 L 1440,900 L 0,900 Z"
          fill="#e2e6ee"
          stroke="#d2d6de"
          strokeWidth="1"
        />

        <path
          className="wave-layer-3 transform-gpu"
          d="M 0,760 C 180,720 280,840 480,780 C 680,720 880,860 1080,800 C 1220,760 1340,830 1440,780 L 1440,900 L 0,900 Z"
          fill="#f1f4f9"
          stroke="#e1e4e9"
          strokeWidth="1"
        />
      </svg>

      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(15,23,42,0.04)] pointer-events-none" />
      
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-slate-900/[0.02] via-transparent to-white/[0.1] pointer-events-none"
        style={{ mixBlendMode: "overlay" }}
      />
    </div>
  );
};