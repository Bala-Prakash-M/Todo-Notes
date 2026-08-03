import {
  BookOpen,
  Star,
  Clock,
  Tag,
  Briefcase,
  Share2,
  Settings,
  RefreshCw,
  Folder,
  X,
} from "lucide-react";
import useScreenSize from "../../../shared/hooks/useScreenSize";

type SidebarProps = {
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<"notebooks" | "tasks">>;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({
  setCurrentView,
  currentView,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}: SidebarProps) => {
  const userName = localStorage.getItem("userName") || "Anastasia";
  const email = localStorage.getItem("email") || "anastasia@icylab.co";
  const { isMobile, isDesktop, isPad } = useScreenSize();

  return (
    <>
      {/* GLOBAL KINETIC PIPELINE INJECTION */}
      <style>{`
    @keyframes entryReveal {
      from { 
        opacity: 0; 
        transform: translateY(6px); 
        filter: blur(2px);
      }
      to { 
        opacity: 1; 
        transform: translateY(0);
        filter: blur(0);
      }
    }
    @keyframes profileCardReveal {
      from { 
        opacity: 0; 
        transform: translateY(-10px); 
        filter: blur(4px);
      }
      to { 
        opacity: 1; 
        transform: translateY(0);
        filter: blur(0);
      }
    }
    @keyframes profileTextReveal {
      from { opacity: 0; transform: translateX(-6px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes flowerRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}</style>

      {/* 1. STRUCTURAL DESKTOP & PAD NAVIGATION SYSTEM LAYER */}
      {(isDesktop || isPad) && (
        <aside
          style={{
            animation: "entryReveal 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
          className="w-64 border-r border-slate-200/50 bg-white flex flex-col justify-between p-6 shrink-0 h-full z-20 select-none relative overflow-hidden"
        >
          {/* HIGH-PERFORMANCE CONTINUOUS KINETIC CONTOUR BACKDROP */}
          {/* SLEEK KINETIC AMBIENT VIGNETTE */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            {/* A large, ultra-soft radial pulse that gently shifts in the background */}
            <div
              className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-slate-400/[0.07] blur-[80px]"
              style={{
                animation: "ambientDrift 25s ease-in-out infinite alternate",
              }}
            />
          </div>

          {/* Inject this hardware-accelerated fluid transform inside your global <style> tag */}
          <style>
            {`
            @keyframes ambientDrift {
              0% { 
                transform: translate(0, 0) scale(1); 
              }
              50% { 
                transform: translate(40px, 80px) scale(1.15); 
                opacity: 0.8;
              }
              100% { 
                transform: translate(-20px, 140px) scale(0.95); 
              }
            }
          `}
          </style>

          {/* FULL-CANVAS BALANCING SHIELD */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40 pointer-events-none z-[1]" />

          {/* SUBTLE CENTER BLENDING MASK
      Radial fade that keeps the pattern crisp on the edges but fades it slightly towards the text links
    */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/80 pointer-events-none z-[1]" />

          <div className="space-y-8 relative z-10">
            {/* Dynamic Initials Profile Section */}
            <div
              style={{
                animation:
                  "profileCardReveal 650ms cubic-bezier(0.16, 1, 0.3, 1) both",
              }}
              className="flex items-center gap-3 pb-3 border-b border-slate-100/80 group cursor-pointer select-none opacity-0"
            >
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wider flex items-center justify-center border border-slate-900/10 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-slate-800 group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.15)] shrink-0">
                {userName ? (
                  userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                )}
              </div>

              <div className="min-w-0 flex-1 overflow-hidden">
                <h4
                  style={{
                    animation:
                      "profileTextReveal 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
                    animationDelay: "150ms",
                  }}
                  className="text-sm font-semibold tracking-tight text-slate-800 font-['Plus_Jakarta_Sans'] group-hover:text-slate-900 transition-colors truncate opacity-0"
                >
                  {userName}
                </h4>
                <p
                  style={{
                    animation:
                      "profileTextReveal 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
                    animationDelay: "195ms",
                  }}
                  className="text-xs text-slate-400 truncate font-['Plus_Jakarta_Sans'] font-medium opacity-0"
                >
                  {email}
                </p>
              </div>
            </div>

            {/* Content Navigation Block Links */}
            <nav className="space-y-6 font-['Plus_Jakarta_Sans']">
              <div>
                <p className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2.5">
                  Main
                </p>
                <div className="space-y-1 relative">
                  <button
                    type="button"
                    onClick={() => setCurrentView("notebooks")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group relative ${
                      currentView === "notebooks"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/80"
                    }`}
                  >
                    <BookOpen
                      className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 ${currentView === "notebooks" ? "opacity-100" : "opacity-70"}`}
                    />
                    <span>Notebooks</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentView("tasks")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group relative ${
                      currentView === "tasks"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/80"
                    }`}
                  >
                    <Clock
                      className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 ${currentView === "tasks" ? "opacity-100" : "opacity-70"}`}
                    />
                    <span>Tasks</span>
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 transition-all duration-200 group"
                  >
                    <Star className="w-4 h-4 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5" />
                    <span>Favorites</span>
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 transition-all duration-200 group"
                  >
                    <Tag className="w-4 h-4 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5" />
                    <span>Tags</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2.5">
                  Order
                </p>
                <div className="space-y-1">
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 transition-all duration-200 group"
                  >
                    <Folder className="w-4 h-4 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5" />
                    <span>Notebooks</span>
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 transition-all duration-200 group"
                  >
                    <Briefcase className="w-4 h-4 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5" />
                    <span>Projects</span>
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 transition-all duration-200 group"
                  >
                    <Share2 className="w-4 h-4 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5" />
                    <span>Shared</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>

          {/* Persistent Settings Control Box */}
          <div className="space-y-1 pt-4 border-t border-slate-100 font-['Plus_Jakarta_Sans'] relative z-10">
            <button
              type="button"
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-50/50 rounded-xl transition-all duration-200 group"
            >
              <Settings className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-45" />
              <span>Settings</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-50/50 rounded-xl transition-all duration-200 group"
            >
              <RefreshCw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180" />
              <span>Sync Status</span>
            </button>
          </div>
        </aside>
      )}

      {/* 2. INDEPENDENT MOBILE DRAWER PORTAL ACTION COMPONENT */}
      {isMobile && (
        <>
          {/* Backdrop Fog Overlay */}
          <div
            className={`fixed inset-0 bg-slate-950/30 backdrop-blur-xs z-40 transition-opacity duration-300 ease-out ${
              isMobileSidebarOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Floating Canvas Sheet Panel Container — Clean and entirely pattern-free to ensure perfect 60FPS mobile performance */}
          <aside
            className={`fixed top-0 left-0 h-full w-68 bg-white border-r border-slate-200/80 p-6 z-50 flex flex-col justify-between shadow-[20px_0_50px_rgba(0,0,0,0.04)] transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-['Plus_Jakarta_Sans'] text-[10px] font-bold tracking-wider flex items-center justify-center border border-slate-900/10 shadow-xs">
                    {userName
                      ? userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "U"}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 font-['Plus_Jakarta_Sans'] truncate max-w-[130px]">
                    {userName}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4 stroke-[2]" />
                </button>
              </div>

              <nav className="space-y-6 font-['Plus_Jakarta_Sans']">
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentView("notebooks");
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                      currentView === "notebooks"
                        ? "bg-slate-900 text-white"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Notebooks</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentView("tasks");
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                      currentView === "tasks"
                        ? "bg-slate-900 text-white"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Tasks</span>
                  </button>
                </div>
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
