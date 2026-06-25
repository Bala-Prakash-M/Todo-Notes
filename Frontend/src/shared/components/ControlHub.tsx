import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface SearchItem {
  id: string;
  category: "Notebook" | "Note" | "Todo";
  title: string;
}

const MOCK_DATA: SearchItem[] = [
  { id: "1", category: "Notebook", title: "Backend Architecture" },
  { id: "2", category: "Note", title: "JWT Authentication Flow" },
  { id: "3", category: "Todo", title: "Build Landing Page" },
  { id: "4", category: "Notebook", title: "Personal Philosophy Journal" },
  { id: "5", category: "Note", title: "Meditations on Minimalism" },
];

export const ControlHub: React.FC = () => {

  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // FIX: Isolated single lazy initializer to read token without continuous disk thrashing
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userName, setUserName] = useState(() => localStorage.getItem("userName"));

  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  // Global Keybind Event Ingestion
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

  // Sync Command Palette Focus State
  useEffect(() => {
    if (isSearchOpen) {
      const frameTimeout = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(frameTimeout);
    } else {
      setSearchQuery("");
    }
  }, [isSearchOpen]);

  // Click Outside Dismissal Engine
  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menuButtonRef.current?.contains(target) || menuPanelRef.current?.contains(target)) {
        return;
      }
      setIsMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isMenuOpen]);

  // Search Vector Ingestion Math
  const filteredResults = MOCK_DATA.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedResults = filteredResults.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, SearchItem[]>
  );

  return (
    <>
      {/* THE ISOLATED FLOATING HUB CONTROL ANCHOR */}
      <div className="fixed top-8 right-8 sm:right-12 lg:right-16 z-50 flex flex-col items-end select-none">
        
        {/* THE FLOATING ISLAND BAR CONTROL CONTROLLER */}
        <div className="flex items-center space-x-2 bg-[#f4f6f8]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-colors duration-500">
          
          {/* Universal Command Activation Element */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 text-[#334155] hover:text-[#0f172a] transition-all duration-300 focus:outline-none relative group rounded-full hover:bg-white/50 flex items-center justify-center"
            title="Search Menu (Ctrl+K)"
          >
            <span className="text-xl font-normal leading-none block font-serif transform -translate-y-[1px]">
              ⌕
            </span>

            <span className="absolute hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] tracking-widest text-[#475569] font-mono top-12 right-0 whitespace-nowrap bg-[#f4f6f8] px-2 py-0.5 rounded border border-white/60 shadow-sm pointer-events-none">
              ctrl + k
            </span>
          </button>

          <span className="h-4 w-[1px] bg-slate-300/60 block" aria-hidden="true" />

          {/* Archive Menu Flyout Trigger */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 text-[#334155] hover:text-[#0f172a] transition-all duration-300 focus:outline-none relative rounded-full hover:bg-white/50 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="w-4 h-3 flex flex-col justify-between items-end">
              <span className={`w-4 h-[1.25px] bg-current transition-all duration-300 transform origin-right ${isMenuOpen ? "-rotate-45 -translate-x-[1px]" : ""}`} />
              <span className={`w-2.5 h-[1.25px] bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`w-3.5 h-[1.25px] bg-current transition-all duration-300 transform origin-right ${isMenuOpen ? "rotate-45 -translate-x-[1px] w-4" : ""}`} />
            </div>
          </button>
        </div>

        {/* PERSONAL ARCHIVE FLOATING FLYOUT PANEL 
            FIXED: Positioned directly inside the column stack below the pill, resolving tracking metrics layout breakage.
        */}
        <div
          ref={menuPanelRef}
          className={`mt-3 w-64 bg-[#f4f6f8]/80 backdrop-blur-lg rounded-xl p-6 border border-white/60 shadow-[0_12px_40px_rgba(15,23,42,0.04)] flex flex-col space-y-5 antialiased transform-gpu transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {token ? (
            <>
              <div className="flex flex-col space-y-0.5 pb-3 border-b border-slate-300/40">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Active Profile</span>
                <span className="text-sm font-medium text-slate-800 tracking-wide">
                  {userName}
                </span>
              </div>

              <nav className="group/nav flex flex-col space-y-3 pt-1">
                {[
                  { label: "Notebooks", href: "notebooks" },
                  { label: "Todos", href: "tasks" },
                  { label: "About Space", href: "#about" },
                ].map((route) => (
                  <a
                    key={route.label}
                    href={route.href}
                    className="w-full text-[11px] font-mono tracking-[0.2em] text-slate-600 hover:text-slate-900 uppercase py-0.5 transition-all duration-300 ease-out group-hover/nav:opacity-40 hover:!opacity-100"
                  >
                    {route.label}
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-slate-300/40">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userName");
                    localStorage.removeItem("email");
                    setToken(null);
                    setUserName(null);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left font-mono text-[10px] tracking-[0.2em] text-slate-400 hover:text-rose-600 uppercase transition-colors duration-300 focus:outline-none"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <span className="text-[9px] font-mono tracking-[0.3em] text-slate-500 uppercase block font-semibold">
                  system_status
                </span>
                <p className="text-xs font-normal text-slate-600 leading-relaxed tracking-wide">
                  This vault layer is currently locked. Pass authentication parameters to map your archives.
                </p>
              </div>

              <nav className="flex flex-col pt-3 border-t border-slate-300/40">
                <a
                  href="#about"
                  className="text-[11px] font-mono tracking-[0.2em] text-slate-600 hover:text-slate-900 uppercase py-0.5 transition-colors duration-300"
                >
                  About Space
                </a>
              </nav>

              <button
                type="button"
                onClick={() => {
                  // Testing helper route state toggle
                  localStorage.setItem("token", "mock-auth-payload");
                  setToken("mock-auth-payload");
                  setIsMenuOpen(false);
                  navigate("/auth");
                }}
                className="w-full font-mono text-[11px] tracking-[0.25em] bg-[#1e232a] text-[#f8fafc] hover:bg-[#0f172a] rounded-none py-2.5 text-center uppercase transition-all duration-300 focus:outline-none border border-transparent shadow-sm"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>

      {/* COMMAND PALETTE MODAL LAYER */}
      <div
        className={`fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-slate-900/10 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSearchOpen(false)}
      >
        <div
          className={`w-full max-w-xl bg-[#f4f6f8]/95 backdrop-blur-xl rounded-none border border-white/60 shadow-[0_32px_64px_rgba(15,23,42,0.08)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSearchOpen ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.985]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Input Header Field */}
          <div className="flex items-center border-b border-slate-300/40 px-5 py-4">
            <span className="text-xl text-slate-400 font-serif mr-4 select-none transform -translate-y-[1px]">⌕</span>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Look inside into notebooks, notes, or tasks..."
              className="w-full bg-transparent font-sans text-sm text-slate-800 placeholder-slate-400/80 focus:outline-none tracking-wide"
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="text-[9px] font-mono text-slate-400 tracking-widest border border-slate-300/80 rounded px-1.5 py-0.5 select-none hover:text-slate-700 hover:border-slate-600 transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Results Tracking Window */}
          <div className="max-h-72 overflow-y-auto p-5 space-y-5">
            {searchQuery === "" ? (
              <div className="py-12 text-center font-mono text-[11px] tracking-widest text-slate-400">
                Type variables to parse open spaces_
              </div>
            ) : filteredResults.length > 0 ? (
              Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className="space-y-2">
                  <h5 className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase pl-2 font-bold select-none">
                    {category}s
                  </h5>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="w-full text-left font-sans text-xs text-slate-700 hover:text-slate-900 px-3 py-2.5 hover:bg-white/60 transition-all flex items-center justify-between group border border-transparent hover:border-slate-200/40"
                      >
                        <span className="tracking-wide font-medium">{item.title}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-slate-400 tracking-wider">
                          trace →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center font-mono text-[11px] tracking-widest text-rose-400/80 italic">
                The current index remains clear.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
