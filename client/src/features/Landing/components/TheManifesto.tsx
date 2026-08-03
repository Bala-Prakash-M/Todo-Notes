import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface PillarData {
  id: string;
  num: string;
  label: string;
  title: string;
  boldSnippet: string;
  bodyText: string;
  // Holds structural content arrays rather than raw backend Prisma code strings
  previewContent: React.ReactNode;
}

const pillarDataset: PillarData[] = [
  {
    id: "notebooks",
    num: "01",
    label: "Structured Space",
    title: "Notebooks.",
    boldSnippet: "Build lasting collections.",
    bodyText:
      "Some ideas deserve more than a quick note. Keep projects, journals, research, and long-form writing together in a space that grows with them.",
    previewContent: (
      <div className="space-y-4 font-sans text-xs md:text-sm text-slate-700 animate-[fadeIn_0.5s_ease-out]">
        <div className="border-b border-slate-300/60 pb-2 flex justify-between items-baseline">
          <span className="font-medium text-slate-900 font-serif italic text-base">
            // Travel Plans
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            8 entries
          </span>
        </div>

        <div className="border-b border-slate-300/60 pb-2 flex justify-between items-baseline opacity-80">
          <span className="font-medium text-slate-900 font-serif italic text-base">
            // Books to Read
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            14 entries
          </span>
        </div>

        <div className="border-b border-slate-300/60 pb-2 flex justify-between items-baseline opacity-60">
          <span className="font-medium text-slate-900 font-serif italic text-base">
            // Personal Journal
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            22 entries
          </span>
        </div>
      </div>
    )
  },

  {
    id: "thoughts",
    num: "02",
    label: "Passing Moments",
    title: "Thoughts.",
    boldSnippet: "Capture what appears.",
    bodyText:
      "Ideas rarely arrive on schedule. Save passing observations, questions, reminders, and moments before they quietly disappear.",
    previewContent: (
      <div className="space-y-4 font-sans text-[11px] text-slate-600 animate-[fadeIn_0.5s_ease-out]">
        <div className="bg-slate-200/50 p-3 border border-slate-300/40 relative">
          <span className="absolute right-2 top-2 text-[9px] text-slate-400">
            09:42 // Today
          </span>
          <p className="pr-16 leading-relaxed">
            I should visit the sea at least once this year.
          </p>
        </div>

        <div className="bg-slate-200/50 p-3 border border-slate-300/40 relative opacity-70">
          <span className="absolute right-2 top-2 text-[9px] text-slate-400">
            11:18 // Yesterday
          </span>
          <p className="pr-16 leading-relaxed">
            Why do some places feel familiar even when you've never been there?
          </p>
        </div>
      </div>
    )
  },

  {
    id: "tasks",
    num: "03",
    label: "Small Intentions",
    title: "Tasks.",
    boldSnippet: "Track what matters.",
    bodyText:
      "Some thoughts ask for action. Keep daily responsibilities, personal goals, and small promises close to the ideas that inspired them.",
    previewContent: (
      <div className="space-y-3 font-sans text-xs md:text-sm text-slate-700 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 border border-slate-400 rounded-none shrink-0" />
          <span className="text-slate-800 tracking-wide font-medium">
            Call the dentist.
          </span>
        </div>

        <div className="flex items-center gap-3 opacity-70">
          <span className="w-3 h-3 border border-slate-400 rounded-none shrink-0" />
          <span className="text-slate-800 tracking-wide">
            Finish reading the last chapter.
          </span>
        </div>

        <div className="flex items-center gap-3 opacity-40 line-through">
          <span className="w-3 h-3 bg-slate-500 border border-slate-500 rounded-none shrink-0" />
          <span className="text-slate-500 tracking-wide">
            Buy groceries for the weekend.
          </span>
        </div>
      </div>
    )
  }
];

export const TheManifesto: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("notebooks");
  const activePillar = pillarDataset.find(p => p.id === activeTab) || pillarDataset[0];

  return (
    <section className="relative w-full bg-[#e9ecf0] pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden select-none">
      
      {/* STATIC ARCHITECTURAL MATRIX LINES */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 1200" preserveAspectRatio="none">
          <line x1="0" y1="120" x2="1440" y2="120" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="0" y1="960" x2="1440" y2="960" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="480" y1="0" x2="480" y2="1200" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 12" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center">
        
        {/* THE MAIN INTERACTIVE HUB GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* LEFT PANEL: INTERACTIVE SELECTORS */}
          <div className="lg:col-span-5 flex flex-col space-y-6 border-l border-slate-300/60 pl-4 md:pl-8">
            {pillarDataset.map((pillar) => {
              const isSelected = pillar.id === activeTab;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className="group flex items-baseline gap-6 text-left focus:outline-none py-2 transition-all duration-500 cursor-pointer"
                >
                  <span className={`font-mono text-3xl md:text-5xl font-extralight transition-colors duration-700 ${isSelected ? 'text-slate-900 font-normal' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {pillar.num}
                  </span>
                  
                  <div className="flex flex-col">
                    <span className={`text-[10px] uppercase font-mono tracking-[0.25em] transition-colors duration-700 ${isSelected ? 'text-slate-500' : 'text-slate-400/60'}`}>
                      {pillar.label}
                    </span>
                    <span className={`text-xl md:text-2xl font-light font-sans tracking-tight transition-colors duration-700 ${isSelected ? 'text-slate-900 font-normal' : 'text-slate-500 group-hover:text-slate-700'}`}>
                      {pillar.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT PANEL: THE WORKSPACE ACCORDION SLAB */}
          <div className="lg:col-span-7 w-full min-h-[400px] bg-[#dfe3e9] border border-slate-300/80 p-6 md:p-8 flex flex-col justify-between relative shadow-sm transition-all duration-700 ease-out transform-gpu">
            
            {/* Top Bar Labeling */}
            <div className="w-full flex justify-between items-center border-b border-slate-400/40 pb-4 mb-6">
              <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold">
                Workspace Preview ledger // {activePillar.id}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase select-none">Active View</span>
            </div>

            {/* Split Panel: Functional Copy alongside Real Content Mockups */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start h-full">
              
              {/* Informational Core Definition Block */}
              <div className="md:col-span-6 flex flex-col space-y-3">
                <h4 className="text-base font-medium font-sans text-slate-900">
                  {activePillar.boldSnippet}
                </h4>
                <p className="text-xs md:text-sm font-normal text-slate-600 leading-relaxed tracking-wide">
                  {activePillar.bodyText}
                </p>
              </div>

              {/* REFACTORED WORKSPACE DISPLAY SHEET (No Code, Pure Clean Data Representation) */}
              <div className="md:col-span-6 bg-[#f4f6f9] border border-slate-300/80 p-5 rounded-none shadow-inner select-none min-h-[180px] flex flex-col justify-center">
                {activePillar.previewContent}
              </div>

            </div>

            {/* System Status Footers */}
            <div className="w-full border-t border-slate-400/40 pt-4 mt-6 flex justify-between items-center font-mono text-[10px] text-slate-400/80 uppercase tracking-widest">
              <span>Status: Synchronized</span>
              <span>Context: Inhabitable Data</span>
            </div>

          </div>

        </div>

        {/* =========================================================
            ADDED: THE PORTAL CTA THRESHOLD (Enter Space Portal Link)
            ========================================================= */}
        <div className="mt-24 md:mt-32 pt-16 w-full text-center border-t border-slate-300/60">
  <Link 
    to="/auth" 
    className="group inline-flex items-center gap-6 text-xs md:text-sm tracking-[0.25em] uppercase text-[#f8fafc] bg-[#1e232a] hover:bg-[#0f172a] transition-colors duration-500 ease-out focus:outline-none py-4 px-10 shadow-md font-sans font-medium rounded-none relative overflow-hidden transform-gpu will-change-transform"
  >
    <span>Enter the space</span>
    <ArrowRight 
      size={16} 
      strokeWidth={1.5} 
      className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-500 ease-out text-slate-400 group-hover:text-[#f8fafc]" 
    />
  </Link>
</div>

      </div>

      {/* Global CSS Injector to handle the fast fluid fade-in swap parameters on data switch */}
      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(4px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
    </section>
  );
};