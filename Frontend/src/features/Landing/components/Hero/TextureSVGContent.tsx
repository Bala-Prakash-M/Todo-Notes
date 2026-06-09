import React from "react";

interface TextureSVGContentProps {
  onEnterSpace?: () => void;
}

export const TextureSVGContent: React.FC<TextureSVGContentProps> = ({
  onEnterSpace,
}) => {
  return (
    <div
      className="w-full max-w-4xl mx-auto text-center flex flex-col items-center space-y-6 pb-12 lg:pb-0 select-none antialiased pt-10 sm:pt-14 lg:pt-16"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* 1. Headline Group - Pure Sans-Serif
          No stylized scripts, no historic serifs. Just a highly legible, 
          clean, modern headline that stands out clearly over the background.
      */}
      <div className="animate-[slideIn_1.7s_cubic-bezier(0.16,1,0.3,1)_both] max-w-2xl">
        <h1 className="text-4xl sm:text-5xl lg:text-[48px] font-medium tracking-[-0.02em] text-[#2d363f] leading-[1.2]">
          A quiet place{" "}
          <span className="text-[#657383] font-light">for loud thoughts_</span>
        </h1>
      </div>

      {/* 2. Introspective Narrative Copy Group */}
      <div className="space-y-5 flex flex-col items-center">
        {/* Subcopy - Perfectly matching the header family for total cohesion */}
        <p className="text-sm font-normal text-[#3d4956] leading-relaxed max-w-xs sm:max-w-sm tracking-wide opacity-90 animate-[slideIn_2s_cubic-bezier(0.16,1,0.3,1)_both]">
          Build notebooks. Capture thoughts. Track tasks.
        </p>

        {/* 3. Action Trigger */}
        <div className="pt-2 animate-[fadeIn_2.4s_ease-out_both]">
          <button
            type="button"
            onClick={onEnterSpace}
            className="group relative inline-flex items-center space-x-4 text-xs font-medium tracking-[0.2em] text-[#2d363f] uppercase focus:outline-none"
          >
            <span className="relative py-1">
              Enter the space
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2d363f]/20 scale-x-100 transition-transform duration-500 origin-center group-hover:bg-[#2d363f]" />
            </span>
            <span className="transform transition-transform duration-500 ease-out group-hover:translate-x-2 text-[#657383] group-hover:text-[#2d363f]">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
