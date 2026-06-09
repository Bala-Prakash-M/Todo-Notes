import React, { useState, useEffect } from "react";
import { TextureSVGContent } from "./TextureSVGContent";
import { ControlHub } from "./ControlHub";

export const TextureSVG: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textOpacity = Math.max(1 - scrollY / 700, 0);

  return (
    <div className="relative w-full bg-[#eceef2] font-sans antialiased">
      {/* =========================================================
          SECTION 1: THE GRAVITATIONAL SINGULARITY CANVASES
          ========================================================= */}
      <div className="relative h-[105vh] w-full overflow-hidden">
        {/* CHANGED: Swapped static parent tracking for a multi-layered kinetic stack.
            The wrapper maintains a micro breathing cycle while child rings handle independent vorticity.
        */}
        <div className="absolute inset-0 z-0 pointer-events-none transform-gpu scale-[1.1] animate-[vortex-breathing_16s_ease-in-out_infinite]">
          <svg
            className="w-full h-full object-cover object-center"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter
                id="singularity-depth"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feOffset dx="2" dy="4" />
                <feGaussianBlur stdDeviation="5" result="offset-blur" />
                <feComposite
                  operator="out"
                  in="SourceGraphic"
                  in2="offset-blur"
                  result="inverse"
                />
                <feFlood
                  floodColor="#66778a"
                  floodOpacity="0.45"
                  result="shadow-color"
                />
                <feComposite
                  operator="in"
                  in="shadow-color"
                  in2="inverse"
                  result="shadow"
                />

                <feOffset
                  dx="-1"
                  dy="-1"
                  in="SourceGraphic"
                  result="lit-offset"
                />
                <feGaussianBlur
                  stdDeviation="2"
                  in="lit-offset"
                  result="lit-blur"
                />
                <feComposite
                  operator="out"
                  in="SourceGraphic"
                  in2="lit-blur"
                  result="lit-inverse"
                />
                <feFlood
                  floodColor="#ffffff"
                  floodOpacity="0.85"
                  result="lit-color"
                />
                <feComposite
                  operator="in"
                  in="lit-color"
                  in2="lit-inverse"
                  result="highlight"
                />

                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="shadow" />
                  <feMergeNode in="highlight" />
                </feMerge>
              </filter>
            </defs>

            {/* Base Universe Plate Material */}
            <rect width="1000" height="1000" fill="#eceef2" />

            {/* =========================================================
                CONCENTRIC HYPNOTIC VORTEX COILS
                - Centered exactly on the (500, 500) coordinate grid.
                - Each layer possesses individual class tracking for variable rotational speeds.
                ========================================================= */}

            {/* Spacetime Distortion Field - Layer 1 (Outer Horizon - Slow Drag) */}
            <path
              className="origin-center transform-gpu animate-[orbit-slow_28s_linear_infinite]"
              d="M 500 50 
                 C 780 50, 950 220, 950 500 
                 C 950 780, 780 950, 500 950 
                 C 220 950, 50 780, 50 500 
                 C 50 220, 220 50, 500 50 Z"
              fill="#e3e8ee"
              filter="url(#singularity-depth)"
            />

            {/* Spacetime Distortion Field - Layer 2 (Ergosphere Threshold - Counter Swirl) */}
            <path
              className="origin-center transform-gpu animate-[orbit-reverse_20s_linear_infinite]"
              d="M 500 160 
                 C 700 140, 840 280, 840 500 
                 C 840 720, 680 840, 500 840 
                 C 320 840, 160 680, 160 500 
                 C 160 320, 300 180, 500 160 Z"
              fill="#d9e0e9"
              filter="url(#singularity-depth)"
            />

            {/* Spacetime Distortion Field - Layer 3 (Event Horizon Capture - Accelerated Cascade) */}
            <path
              className="origin-center transform-gpu animate-[orbit-medium_14s_linear_infinite]"
              d="M 500 280 
                 C 630 270, 720 370, 720 500 
                 C 720 630, 610 720, 500 720 
                 C 390 720, 280 610, 280 500 
                 C 280 390, 370 290, 500 280 Z"
              fill="#cbd4df"
              filter="url(#singularity-depth)"
            />

            {/* Spacetime Distortion Field - Layer 4 (Photon Sphere Rim - High Velocity vortex) */}
            <path
              className="origin-center transform-gpu animate-[orbit-fast_8s_linear_infinite]"
              d="M 500 390 
                 C 570 385, 610 430, 610 500 
                 C 610 570, 560 610, 500 610 
                 C 440 610, 390 560, 390 500 
                 C 390 440, 430 395, 500 390 Z"
              fill="#b9c5d3"
              filter="url(#singularity-depth)"
            />

            {/* The Pure Singularity Core Void (Ultimate Central Inward Gravitational Pull) */}
            <path
              className="origin-center transform-gpu animate-[orbit-fast_5s_linear_infinite]"
              d="M 500 465 
                 C 525 465, 535 480, 535 500 
                 C 535 520, 520 535, 500 535 
                 C 480 535, 465 515, 465 500 
                 C 465 485, 475 465, 500 465 Z"
              fill="#a7b5c4"
              filter="url(#singularity-depth)"
            />
          </svg>
        </div>

        {/* MIST HORIZON DISCOVERABLE BLEND */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#eceef2] to-transparent z-10 pointer-events-none" />

        {/* UTILITY COMPONENT LINK PORTAL OVERLAY */}
        <ControlHub />

        {/* MID-SCREEN SUSPENDED MANUSCRIPT LAYOUT */}
        <div
          className="relative z-20 mx-auto max-w-7xl px-8 sm:px-16 lg:px-24 flex flex-col h-full transition-opacity duration-500 ease-out"
          style={{ opacity: textOpacity }}
        >
          <main className="h-full flex items-center justify-center">
            <div className="w-full max-w-xl animate-[fadeIn_2.2s_ease-out_both]">
              <TextureSVGContent
                onEnterSpace={() => console.log("Grounded portal activated")}
              />
            </div>
          </main>
        </div>
      </div>

      {/* Global CSS Kinetic Class Injector */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        /* Hypnotic Vortex Calibration Engine */
        @keyframes orbit-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-medium { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-fast { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        /* Counter-Rotation layer generates spatial friction to enhance depth trickery */
        @keyframes orbit-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        
        /* Breathes the viewport scale back and forth to keep the lines fluid */
        @keyframes vortex-breathing {
          0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); }
          50% { transform: scale(1.07) translate3d(2px, -3px, 0); }
          /* Add this inside your <style> tag to protect mobile performance */
@media (max-width: 768px) {
  svg path {
    /* Turns off complex filter blurs on smaller mobile processors */
    filter: none !important; 
  }
  @keyframes vortex-breathing {
    /* Simplify breathing on mobile to reduce rendering pressure */
    0%, 100% { transform: scale(1.04); }
    50% { transform: scale(1.06); }
  }
}
        }
      `}</style>
    </div>
  );
};
