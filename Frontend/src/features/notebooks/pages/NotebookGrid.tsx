import React, { useState } from "react";
import { 
  Folder, 
  MoreHorizontal, 
  Plus, 
  BookOpen, 
  Star, 
  Clock, 
  Tag, 
  Briefcase, 
  Share2, 
  Settings, 
  RefreshCw,
  Search,
  SlidersHorizontal,
  Menu,
  X
} from "lucide-react";
import { TasksPage } from "../../todos/pages/Todos";

const notebooks = [
  {
    id: "cmqt42h1f000020u9oaiqvbg8",
    name: "Psychology",
    userId: "cmq5j7mm40000tgu90c7thayi",
    createdAt: "2026-06-25T06:18:23.812Z",
    updatedAt: "2026-06-25T06:18:23.812Z",
    notes: [
      { id: "note_p1", title: "Introduction to Psychology 👩‍🏫" },
      { id: "note_p2", title: "Week 1, lecture notes" },
      { id: "note_p3", title: "What is Psychology? History & Schools" },
      { id: "note_p4", title: "Behavioral vs Cognitive Theories" },
      { id: "note_p5", title: "Brain Anatomy & Neural Pathways" },
    ],
  },
  {
    id: "cmqt42sei000120u9nxs8mqs0",
    name: "Groceries",
    userId: "cmq5j7mm40000tgu90c7thayi",
    createdAt: "2026-06-25T06:18:38.538Z",
    updatedAt: "2026-06-25T06:18:38.538Z",
    notes: [
      { id: "note_g1", title: "Grocery list 🛒" },
      { id: "note_g2", title: "Weekly Meal Prep Ingredients" },
      { id: "note_g3", title: "Snacks for the office" },
      { id: "note_g4", title: "Sunday Dinner Supplies" },
    ],
  },
  {
    id: "cmqt43abc000220u9zxcvbnm1",
    name: "Thai Chicken",
    userId: "cmq5j7mm40000tgu90c7thayi",
    createdAt: "2026-06-25T06:20:12.441Z",
    updatedAt: "2026-06-25T06:22:45.110Z",
    notes: [
      { id: "note_t1", title: "Recipe 🍛" },
      { id: "note_t2", title: "Sauce Mix Ratios" },
      { id: "note_t3", title: "Alternative Marinades (Ginger/Garlic)" },
    ],
  },
  {
    id: "cmqt44xyz000320u9lkjhgfd2",
    name: "Autumn is coming",
    userId: "cmq5j7mm40000tgu90c7thayi",
    createdAt: "2026-06-25T06:25:01.992Z",
    updatedAt: "2026-06-25T06:25:01.992Z",
    notes: [
      { id: "note_a1", title: "I'm exhausted all over again 🫣" },
      { id: "note_a2", title: "Late night musings & warm tea" },
      { id: "note_a3", title: "Cozy sweaters to buy this season" },
      { id: "note_a4", title: "October reading list goals" },
      { id: "note_a5", title: "Rainy afternoon playlists" },
    ],
  },
];

const NOTEBOOK_THEMES = [
  { bg: "#FCE7F3", accent: "#DB2777" },
  { bg: "#DBEAFE", accent: "#2563EB" },
  { bg: "#F3F4F6", accent: "#4B5563" },
  { bg: "#DCFCE7", accent: "#16A34A" },
];

const getThemeForName = (name: string) => {
  const normalizedName = name.toLowerCase().trim();
  if (normalizedName.includes("psychology")) return NOTEBOOK_THEMES[0];
  if (normalizedName.includes("groceries") || normalizedName.includes("grocery")) return NOTEBOOK_THEMES[1];
  if (normalizedName.includes("chicken") || normalizedName.includes("thai")) return NOTEBOOK_THEMES[2];
  if (normalizedName.includes("autumn")) return NOTEBOOK_THEMES[3];
  return NOTEBOOK_THEMES[0];
};

const formatTimestamp = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recent";
  }
};

export const NotebookDashboard: React.FC = () => {
  const userName = localStorage.getItem("userName") || "Anastasia";
  const email = localStorage.getItem("email") || "anastasia@icylab.co";

  const [currentView, setCurrentView] = useState<"notebooks" | "tasks">("notebooks");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen bg-[#F8FAFC] text-slate-800 antialiased font-sans overflow-hidden select-none relative">
      
      {/* 1. LEFT SIDEBAR COMPONENT (Hidden on Mobile, Visible on MD up) */}
      <aside className="w-64 border-r border-slate-200/60 bg-white flex flex-col justify-between p-6 shrink-0 h-full z-20 hidden md:flex">
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shadow-sm">🐼</div>
            <div>
              <h4 className="text-sm font-semibold tracking-tight text-slate-800">{userName}</h4>
              <p className="text-xs text-slate-400 truncate max-w-[140px]">{email}</p>
            </div>
          </div>

          <nav className="space-y-6">
            <div>
              <p className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">Main</p>
              <div className="space-y-0.5">
                <button 
                  onClick={() => setCurrentView("notebooks")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                    currentView === "notebooks" 
                      ? "bg-slate-100 text-slate-900" 
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <BookOpen className="w-4 h-4 opacity-80" /> Notebooks
                </button>
                <button 
                  onClick={() => setCurrentView("tasks")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                    currentView === "tasks" 
                      ? "bg-slate-100 text-slate-900" 
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <Clock className="w-4 h-4 opacity-80" /> Tasks
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
                  <Star className="w-4 h-4 opacity-70" /> Favorites
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
                  <Tag className="w-4 h-4 opacity-70" /> Tags
                </button>
              </div>
            </div>

            <div>
              <p className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">Order</p>
              <div className="space-y-0.5">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
                  <Folder className="w-4 h-4 opacity-70" /> Notebooks
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
                  <Briefcase className="w-4 h-4 opacity-70" /> Projects
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
                  <Share2 className="w-4 h-4 opacity-70" /> Shared
                </button>
              </div>
            </div>
          </nav>
        </div>

        <div className="space-y-1.5 pt-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">
            <Settings className="w-3.5 h-3.5" /> Settings
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Sync Status
          </button>
        </div>
      </aside>

      {/* MOBILE FLOATING DRAWER BAR OVERLAY PANEL */}
      <div 
        className={`fixed inset-0 bg-slate-950/20 backdrop-blur-md z-40 md:hidden transition-all duration-300 ${
          isMobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 p-6 z-50 flex flex-col justify-between transform transition-transform duration-500 ease-out md:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="text-lg">🐼</div>
              <h4 className="text-sm font-semibold text-slate-800 truncate max-w-[140px]">{userName}</h4>
            </div>
            <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
          </div>
          <nav className="space-y-6">
            <div className="space-y-1">
              <button 
                onClick={() => { setCurrentView("notebooks"); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl ${currentView === "notebooks" ? "bg-slate-100 text-slate-900" : "text-slate-500"}`}
              >
                <BookOpen className="w-4 h-4" /> Notebooks
              </button>
              <button 
                onClick={() => { setCurrentView("tasks"); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl ${currentView === "tasks" ? "bg-slate-100 text-slate-900" : "text-slate-500"}`}
              >
                <Clock className="w-4 h-4" /> Tasks
              </button>
            </div>
          </nav>
        </div>
      </aside>

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
              <span>Home</span><span>/</span>
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
              <SlidersHorizontal className="w-3.5 h-3.5" /> <span className="hidden xs:inline">Filters</span>
            </button>
          </div>
        </header>

        {/* INDEPENDENT SCROLLING CENTER CANVAS PANEL */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-5xl w-full mx-auto h-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          
          {/* VIEW CONDITION 1: NOTEBOOKS RENDER */}
          {currentView === "notebooks" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">Notebook Spaces</h1>
                  <p className="text-xs text-slate-400 mt-0.5 hidden xs:block">Select a primary study node container.</p>
                </div>
                <button className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-medium hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 active:scale-95">
                  <Plus className="w-3.5 h-3.5" /> <span className="hidden xxs:inline">New Space</span>
                </button>
              </div>

              {/* Grid Canvas Responsive Breakdown Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {notebooks.map((notebook) => {
                  const theme = getThemeForName(notebook.name);
                  const noteCount = notebook.notes?.length || 0;

                  return (
                    <div
                      key={notebook.id}
                      style={{ backgroundColor: theme.bg }}
                      className="group relative rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-6 border border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),_0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),_0_12px_30px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between min-h-[180px] sm:min-h-[200px] cursor-pointer"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                          <div className="p-2 sm:p-2.5 rounded-xl bg-white shadow-[0_4px_10px_rgba(0,0,0,0.01)] border border-slate-100" style={{ color: theme.accent }}>
                            <Folder className="w-4 h-4 fill-current opacity-80" />
                          </div>
                          <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>

                        <h3 className="text-base sm:text-lg font-semibold text-slate-800 tracking-tight mb-3 sm:mb-4">
                          {notebook.name}
                        </h3>

                        {noteCount > 0 && (
                          <ul className="space-y-1.5 mb-4 opacity-75">
                            {notebook.notes.slice(0, 4).map((note) => (
                              <li key={note.id} className="text-xs text-slate-600 truncate flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                                <span className="truncate">{note.title}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-200/30 text-[10px] sm:text-[11px] text-slate-400">
                        <span>{noteCount} thoughts</span>
                        <span>{formatTimestamp(notebook.updatedAt)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW CONDITION 2: TASKS LEDGER RENDER */}
          {currentView === "tasks" && (
            <TasksPage />
          )}

        </div>
      </main>
    </div>
  );
};