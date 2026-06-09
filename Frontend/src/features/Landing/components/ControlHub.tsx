import React, { useState, useEffect, useRef } from "react";

interface SearchItem {
  id: string;
  category: "Notebook" | "Note" | "Todo";
  title: string;
}

// Internal mock data collection mimicking full-stack retrieval items
const MOCK_DATA: SearchItem[] = [
  { id: "1", category: "Notebook", title: "Backend Architecture" },
  { id: "2", category: "Note", title: "JWT Authentication Flow" },
  { id: "3", category: "Todo", title: "Build Landing Page" },
  { id: "4", category: "Notebook", title: "Personal Philosophy Journal" },
  { id: "5", category: "Note", title: "Meditations on Minimalism" },
];

export const ControlHub: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("token");

  // Keyboard shortcut listener for structural command palette invocation (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Synchronize structural layout focus onto input when palette overlay triggers
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (menuButtonRef.current?.contains(target)) return;
      if (menuPanelRef.current?.contains(target)) return;

      setIsMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  // Handle local data slice sorting calculations
  const filteredResults = MOCK_DATA.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedResults = filteredResults.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, SearchItem[]>,
  );

  return (
    <>
      {/* WHISPER-LIGHT TOP CONTROL HUB */}
      {/* REMASTERED SKEUOMORPHIC FLOATING CONTROL HUB 
    - Added a soft, semi-translucent background container to frame the buttons safely.
    - Subtle drop-shadow adds immediate tactile definition against the topography below.
*/}
      <div className="absolute top-8 right-8 sm:right-12 lg:right-16 z-40 flex items-center space-x-2 select-none bg-[#f4f6f8]/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        {/* Universal Search Activation Element */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          /* CHANGED: Boosted color to text-[#3d4956] and increased padding for a better click target */
          className="p-2.5 text-[#3d4956] hover:text-[#1e252c] transition-colors duration-300 focus:outline-none relative group rounded-full hover:bg-white/40"
          title="Search Menu (Ctrl+K)"
        >
          {/* CHANGED: Increased font size to text-2xl and weight to give it presence */}
          <span
            className="text-2xl font-normal leading-none block transform -translate-y-[1px]"
            style={{ fontFamily: "serif" }}
          >
            ⌕
          </span>

          {/* Tooltip hint adjusted for the new layout layout structure */}
          <span className="absolute hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] tracking-widest text-[#566474] font-mono top-12 right-2 whitespace-nowrap bg-[#f4f6f8] px-2 py-0.5 rounded border border-white/60 shadow-sm">
            ctrl + k
          </span>
        </button>

        {/* Thin vertical separator divider to structure the floating island */}
        <span
          className="h-4 w-[1px] bg-neutral-300/60 block"
          aria-hidden="true"
        />

        {/* Ambient Personal Archive Control Toggle */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          /* CHANGED: Color updated to match, padded evenly to stay perfectly symmetrical */
          className="p-3 text-[#3d4956] hover:text-[#1e252c] transition-colors duration-500 focus:outline-none relative z-50 rounded-full hover:bg-white/40"
        >
          {/* Kinetic shift from Hamburger bars to a minimal close diagonal */}
          {/* CHANGED: Scaled bounding box slightly to w-5 h-3.5 for an exact optical optical balance with the search icon */}
          <div className="w-5 h-3.5 flex flex-col justify-between items-end">
            <span
              className={`w-5 h-[1.5px] bg-current transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
            />
            <span
              className={`w-3.5 h-[1.5px] bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0 w-0" : ""}`}
            />
            <span
              className={`w-4 h-[1.5px] bg-current transition-all duration-300 ${isMenuOpen ? "-rotate-45 w-5 -translate-y-[6px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* PERSONAL ARCHIVE INTERACTIVE FLYOUT PANEL */}
      <div
        ref={menuPanelRef}
        /* RATIONALE:
     - Clear text-spacing animations are completely removed to maintain total structural stillness.
     - Enhanced background blend by setting a light /35 opacity opacity block.
     - The interactive behavior uses sibling dimming via the parent 'group/nav' trigger. Hovering over an option leaves it crystal clear while the other layout anchors quietly recede.
  */
        className={`absolute top-24 right-8 sm:right-12 lg:right-16 z-30 w-64 bg-[#f4f6f8]/35 backdrop-blur-md rounded-xl p-6 border-t border-l border-white/60 border-b border-r border-[#cbd3dc]/30 flex flex-col space-y-5 select-none antialiased transform-gpu transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-[0.98] pointer-events-none"
        }`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {token ? (
          <>
            {/* 1. Identity Link Portal */}
            <a
              href="#profile"
              className="group flex flex-col items-start space-y-0.5 pb-3 border-b border-neutral-300/20 focus:outline-none"
            >
              <span className="text-sm font-normal text-[#2d363f] tracking-wide transition-colors duration-300 group-hover:text-neutral-500">
                Marcus Aurelius
              </span>
            </a>

            {/* 2. Core Navigational Routes 
          - 'group/nav' tracks the overarching navigation block.
          - Hovering anywhere inside this block dims all items, but the specific hovered item stays at full opacity.
      */}
            <nav className="group/nav flex flex-col space-y-3 pt-1">
              {[
                { label: "Notebooks", href: "#notebooks" },
                { label: "Todos", href: "#todos" },
                { label: "About Space", href: "#about" },
              ].map((route) => (
                <a
                  key={route.label}
                  href={route.href}
                  className="w-full text-[11px] font-mono tracking-[0.2em] text-[#4e5d6c] hover:text-[#2d363f] uppercase py-0.5 transition-all duration-300 ease-out group-hover/nav:opacity-40 hover:!opacity-100"
                >
                  {route.label}
                </a>
              ))}
            </nav>

            {/* 3. Structured Sign Out Execution */}
            <div className="pt-3 border-t border-neutral-300/20">
              <button
                type="button"
                className="w-full text-left font-mono text-[10px] tracking-[0.2em] text-[#8a99a8] hover:text-[#c94a4a] uppercase transition-colors duration-300 focus:outline-none"
              >
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Unauthenticated Quiet Introspective Prompt */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#657383] uppercase block">
                system_status
              </span>
              <p className="text-xs font-normal text-[#4e5d6c] leading-relaxed tracking-wide">
                this space is currently locked. authentication is required to
                access your archives_
              </p>
            </div>

            {/* Guest Navigation Footprints */}
            <nav className="flex flex-col pt-2 border-t border-neutral-300/20">
              <a
                href="#about"
                className="text-[11px] font-mono tracking-[0.2em] text-[#4e5d6c] hover:text-[#2d363f] uppercase py-0.5 transition-colors duration-300"
              >
                About Space
              </a>
            </nav>

            {/* Minimalist Authentication Entry Link */}
            <button
              type="button"
              className="w-full font-mono text-[11px] tracking-[0.25em] bg-[#2d363f] text-[#f4f6f8] rounded-md py-2.5 text-center uppercase hover:bg-[#3d4956] transition-colors duration-300 focus:outline-none border border-transparent active:border-white/10 shadow-sm"
            >
              Login
            </button>
          </>
        )}
      </div>

      {/* COMMAND OVERLAY PORTAL MATRIX (Raycast/Spotlight Adaptation) */}
      <div
        className={`fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-[#eef1f5]/30 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSearchOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSearchOpen(false)}
      >
        <div
          className={`w-full max-w-xl bg-[#f4f6f8]/90 backdrop-blur-lg rounded-xl border border-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSearchOpen
              ? "translate-y-0 scale-100"
              : "translate-y-4 scale-[0.98]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Input Anchor Search Track */}
          <div className="flex items-center border-b border-neutral-300/40 px-4 py-3.5">
            <span className="text-lg text-neutral-400 font-mono mr-3 select-none">
              ⌕
            </span>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="look deep inside into notebooks, notes, tasks..."
              className="w-full bg-transparent font-sans text-sm text-neutral-800 placeholder-neutral-400/70 focus:outline-none"
            />
            <span className="text-[9px] font-mono text-neutral-400 tracking-widest border border-neutral-300/60 rounded px-1.5 py-0.5 select-none">
              ESC
            </span>
          </div>

          {/* Result Engine Manifest Window */}
          <div className="max-h-72 overflow-y-auto p-4 space-y-4">
            {searchQuery === "" ? (
              <div className="py-8 text-center font-mono text-[11px] tracking-widest text-neutral-400/80">
                type to look into your spaces_
              </div>
            ) : filteredResults.length > 0 ? (
              Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className="space-y-1.5">
                  <h5 className="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase pl-2 select-none">
                    {category}
                  </h5>
                  <div className="space-y-0.5">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="w-full text-left font-sans text-xs text-neutral-700 hover:text-neutral-900 px-2 py-2 rounded hover:bg-white/50 transition-all flex items-center justify-between group"
                      >
                        <span className="tracking-wide">{item.title}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-neutral-400">
                          open →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center font-mono text-[11px] tracking-widest text-neutral-400/60 italic">
                the space remains clear.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
