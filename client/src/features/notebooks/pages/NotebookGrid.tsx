import React, { useState } from "react";
import {
  Folder,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { TasksPage } from "../../todos/pages/Todos";
import { CreateNotebookModal } from "../components/CreateNotebookPopup";
import useNotebook from "../hooks/notebook.hook";
import Sidebar from "./Sidebar";

const formatTimestamp = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recent";
  }
};

export const NotebookDashboard: React.FC = () => {
  const { notebooks, createNotebook, isNotebookLoading, getNotebookStyles } =
    useNotebook();
  const [isCreateNotebookPopupOpen, setIsCreateNotebookPopupOpen] =
    useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"notebooks" | "tasks">(
    "notebooks",
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current && !scrollContainerRef.current.contains(e.target as Node)) {
      scrollContainerRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <div
      onWheel={handleWheel}
      className="flex w-full h-screen bg-[#F8FAFC] text-slate-800 antialiased font-sans overflow-hidden select-none relative"
    >
      {/* 1. LEFT SIDEBAR COMPONENT (Hidden on Mobile, Visible on MD up) */}
      <Sidebar
        setCurrentView={setCurrentView}
        currentView={currentView}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />

      {/* 2. DYNAMIC CENTER WORKSPACE CORE CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Top Header Controls (Fully Mobile Responsive) */}
        <header className="h-16 border-b border-slate-200/60 bg-white flex items-center justify-between px-4 sm:px-8 shrink-0 gap-2">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl md:hidden transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium uppercase tracking-wider">
              <span>Home</span>
              <span>/</span>
              <span className="text-slate-600 capitalize">{currentView}</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center max-w-xs sm:max-w-md px-1">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${currentView}...`}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-8 pr-3 py-1.5 text-xs sm:text-sm focus:outline-none focus:border-slate-300 transition-colors placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center shrink-0">
            <button className="flex items-center gap-1 px-2.5 py-1.5 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5" />{" "}
              <span className="hidden xs:inline">Filters</span>
            </button>
          </div>
        </header>

        {/* INDEPENDENT SCROLLING CENTER CANVAS PANEL */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-5xl w-full mx-auto h-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex flex-col justify-between"
        >
          <div className="flex-grow">
            {/* VIEW CONDITION 1: NOTEBOOKS RENDER */}
            {currentView === "notebooks" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 border-b border-slate-100 pb-5">
                <div className="space-y-0.5">
                  <h1 className="text-xl font-semibold tracking-tight text-slate-900 font-sans sm:text-2xl">
                    Notebook Spaces
                  </h1>
                  {/* Removed 'hidden xs:block'. The subtitle now renders smoothly across all screen widths. */}
                  <p className="text-[12px] text-slate-400 font-sans max-w-[280px] sm:max-w-none leading-normal">
                    Select a primary study node container.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreateNotebookPopupOpen(true)}
                  className={`
          group flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium font-sans w-full sm:w-auto
          /* Monochromatic premium tactile colors */
          bg-white text-slate-700 border border-slate-200/80
          
          /* Premium Deceleration Easing & Fluid Lift */
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          transform-gpu hover:-translate-y-[1.5px]
          
          /* Light Ambient Depth */
          shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)]
          hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.06)]
          hover:text-slate-900 hover:border-slate-300
          
          active:translate-y-0 active:scale-[0.99]
        `}
                >
                  <Plus
                    className="
            w-3.5 h-3.5 text-slate-400 
            transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:text-slate-600 group-hover:rotate-90
          "
                  />
                  {/* Clean, unhidden action label that stays fully visible */}
                  <span className="tracking-tight text-slate-600 group-hover:text-slate-900 font-medium">
                    New Space
                  </span>
                </button>
              </div>

              {/* SKELETON LOADING STATE BLOCK */}
              {isNotebookLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-pulse">
                  {[1, 2, 3].map((skeletonId) => (
                    <div
                      key={skeletonId}
                      className="rounded-[2rem] p-5 sm:p-6 bg-slate-100/70 border border-slate-200/40 flex flex-col justify-between min-h-[190px] sm:min-h-[210px]"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-5">
                          <div className="h-8 w-8 rounded-xl bg-slate-200" />
                          <div className="h-4 w-4 rounded-full bg-slate-200" />
                        </div>
                        <div className="h-5 bg-slate-200 rounded-lg w-2/3 mb-4" />
                        <div className="space-y-2">
                          <div className="h-3 bg-slate-200 rounded-sm w-5/6" />
                          <div className="h-3 bg-slate-200 rounded-sm w-4/5" />
                          <div className="h-3 bg-slate-200 rounded-sm w-3/4" />
                        </div>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-slate-200/40 mt-4">
                        <div className="h-3 bg-slate-200 rounded-sm w-12" />
                        <div className="h-3 bg-slate-200 rounded-sm w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {notebooks.map((notebook, index) => {
                    const { theme, shape } = getNotebookStyles(notebook.id);
                    const noteCount = notebook.notes?.length || 0;
                    const hasMoreThanFive = noteCount > 5;
                    const isMenuOpen = activeMenuId === notebook.id;

                    return (
                      <Link
                        to={`/${notebook.id}`}
                        key={notebook.id}
                        style={{
                          backgroundColor: theme.bg,
                          borderColor: `${theme.accent}15`,
                          // Progressively staggers each card's entry to create a cascading wave effect
                          animationDelay: `${index * 65}ms`,
                        }}
                        // Click wrapper logic safely untangles child button events
                        onClick={() => {
                          if (activeMenuId) setActiveMenuId(null);
                        }}
                        // DESIGN FIX: Reduced lift to 3px, softened hover shadows, and applied a smooth deceleration curve
                        className="group relative rounded-[2rem] p-6 border shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),_0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:-translate-y-[0.5px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between min-h-[200px] sm:min-h-[220px] cursor-pointer overflow-hidden opacity-0 scale-95 translate-y-4 animate-[cardReveal_750ms_cubic-bezier(0.16,1,0.3,1)_both]"
                      >
                        {/* GLOBAL INTERACTIVE KINETIC PIPELINE INJECTION */}
                        <style>{`
    @keyframes cardReveal {
      from { 
        opacity: 0; 
        transform: translateY(20px) scale(0.96); 
        filter: blur(4px);
      }
      to { 
        opacity: 1; 
        transform: translateY(0) scale(1);
        filter: blur(0);
      }
    }
  `}</style>

                        {/* HARDWARE-ACCELERATED BACKGROUND GLOW EFFECT */}
                        <div
                          className="absolute -top-6 -right-6 w-32 h-32 rounded-full pointer-events-none select-none opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-500 ease-out mix-blend-multiply blur-xl"
                          style={{ backgroundColor: theme.accent }}
                        />

                        {/* DECOUPLED INDEPENDENT VECTOR SHAPE OVERLAY */}
                        <div
                          className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.06] group-hover:opacity-[0.12] group-hover:rotate-6 group-hover:scale-102 transition-all duration-500 ease-out origin-top-right"
                          style={{ color: theme.accent }}
                        >
                          <svg
                            width="130"
                            height="130"
                            viewBox="0 0 120 120"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {shape}
                          </svg>
                        </div>

                        {/* Core Content Layout Area */}
                        <div className="relative z-10 flex flex-col justify-between h-full w-full">
                          <div>
                            {/* Header Action Control Bar */}
                            <div className="flex justify-between items-start mb-5 relative">
                              <div
                                className="p-2 rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] border transition-transform duration-300 group-hover:scale-105"
                                style={{
                                  color: theme.accent,
                                  borderColor: `${theme.accent}12`,
                                }}
                              >
                                <Folder className="w-4 h-4 fill-current opacity-90" />
                              </div>

                              {/* DROPDOWN ANCHOR LAYER */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation(); // Prevents clicking the card option mistakenly
                                    setActiveMenuId(
                                      isMenuOpen ? null : notebook.id,
                                    );
                                  }}
                                  className={`p-1.5 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                                    isMenuOpen
                                      ? "bg-white text-neutral-800 rotate-90 shadow-xs"
                                      : "text-neutral-400 hover:text-neutral-700 hover:bg-white/50"
                                  }`}
                                >
                                  {isMenuOpen ? (
                                    <X className="w-4 h-4 stroke-[2.5]" />
                                  ) : (
                                    <MoreHorizontal className="w-4 h-4" />
                                  )}
                                </button>

                                {/* PREMIUM CONTEXT DROPDOWN MENU */}
                                {isMenuOpen && (
                                  <div
                                    className="absolute right-0 top-9 w-38 bg-white border border-neutral-200/50 rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.01)] py-1.5 z-50 origin-top-right transition-all animate-[dropdownSnap_250ms_cubic-bezier(0.16,1,0.3,1)_both]"
                                    onClick={(e) => e.stopPropagation()} // Keeps menu active on inner clicks
                                  >
                                    <style>{`
                                      @keyframes dropdownSnap {
                                        from { opacity: 0; transform: scale(0.96) translateY(-4px); }
                                        to { opacity: 1; transform: scale(1) translateY(0); }
                                      }
                                    `}</style>

                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenuId(null);
                                        console.log(
                                          "Renaming notebook:",
                                          notebook.id,
                                        );
                                      }}
                                      className="w-full text-left px-3.5 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors flex items-center gap-2"
                                    >
                                      <span>Rename Space</span>
                                    </button>

                                    <div className="h-[1px] bg-neutral-100 my-1 mx-2" />

                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenuId(null);
                                        if (
                                          confirm(
                                            `Are you sure you want to delete "${notebook.name}"?`,
                                          )
                                        ) {
                                          console.log(
                                            "Deleting space ID:",
                                            notebook.id,
                                          );
                                        }
                                      }}
                                      className="w-full text-left px-3.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50/60 transition-colors flex items-center gap-2"
                                    >
                                      <span>Delete Space</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-4">
                              <h3
                                style={
                                  {
                                    "--accent-hover": theme.accent,
                                  } as React.CSSProperties
                                }
                                className="font-['Plus_Jakarta_Sans'] text-base sm:text-[17px] font-semibold text-neutral-800 tracking-tight leading-snug transition-colors duration-300 group-hover:text-[var(--accent-hover)]"
                              >
                                {notebook.name}
                              </h3>
                              <div
                                className="h-[1px] w-8 mt-1.5 rounded-full transition-all duration-300 origin-left group-hover:w-full opacity-30"
                                style={{ backgroundColor: theme.accent }}
                              />
                            </div>

                            {noteCount === 0 ? (
                              <p className="font-['Plus_Jakarta_Sans'] text-xs italic text-neutral-400/80 py-1 px-1">
                                No notes written yet
                              </p>
                            ) : (
                              <div className="relative mb-5 px-0.5">
                                <ul className="space-y-2 pb-1">
                                  {notebook.notes
                                    .slice(0, 5)
                                    .map((note, idx) => (
                                      <li
                                        key={note.id ?? idx}
                                        className="font-['Plus_Jakarta_Sans'] text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors duration-150 truncate flex items-center gap-2"
                                      >
                                        <span
                                          className="w-1 h-1 rounded-full bg-neutral-300 transition-colors duration-300 shrink-0"
                                          style={{
                                            backgroundColor: `${theme.accent}60`,
                                          }}
                                        />
                                        <span className="truncate tracking-normal">
                                          {note.title || "Untitled Draft"}
                                        </span>
                                      </li>
                                    ))}
                                </ul>

                                {hasMoreThanFive && (
                                  <div
                                    className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
                                    style={{
                                      backgroundImage: `linear-gradient(to bottom, transparent 0%, ${theme.bg} 90%)`,
                                    }}
                                  />
                                )}
                              </div>
                            )}
                          </div>

                          {/* Clean Metadata Footer Segment */}
                          <div className="mt-auto flex items-center justify-between pt-3.5 border-t border-neutral-900/5 font-['Plus_Jakarta_Sans'] text-[11px] font-semibold tracking-tight text-neutral-400/90">
                            <span
                              className="capitalize font-bold"
                              style={{ color: theme.accent }}
                            >
                              {noteCount}{" "}
                              {noteCount === 1 ? "thought" : "thoughts"}
                            </span>
                            <span className="font-medium text-neutral-400">
                              {formatTimestamp(notebook.updatedAt)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {currentView === "tasks" && <TasksPage />}
          </div>

          {/* Premium Minimalist Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] font-sans font-medium text-slate-400 select-none">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="tracking-wide">System active & secure</span>
            </div>
            <div className="flex items-center gap-1.5 tracking-wider font-mono uppercase text-[9px] sm:text-[10px]">
              <span>Notebook Core v1.0.0</span>
              <span className="text-slate-300 font-sans">•</span>
              <span>Reflections Engine</span>
            </div>
          </footer>
        </div>
      </main>
      {isCreateNotebookPopupOpen && (
        <CreateNotebookModal
          isOpen={isCreateNotebookPopupOpen}
          onClose={() => setIsCreateNotebookPopupOpen(false)}
          onCreate={createNotebook}
        />
      )}
    </div>
  );
};
