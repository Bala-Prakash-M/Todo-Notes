import React, { useState } from "react";

// Types for structural safety
interface TaskItem {
  id: string;
  title: string;
  timeStart: string;
  timeEnd: string;
  category: "Backend" | "Design" | "Personal" | "Learning";
  colorClass: string;
  bgClass: string;
}

interface SidebarTask {
  title: string;
  date: string;
  colorClass: string;
}

export const TasksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"timeline" | "list">("timeline");

  // Mock static layout vectors matching the referenced interface state
  const dailyTasks: TaskItem[] = [
    {
      id: "1",
      title: "Backend Authentication API",
      timeStart: "08:00",
      timeEnd: "10:00",
      category: "Backend",
      colorClass: "bg-indigo-600",
      bgClass: "bg-[#edf0f7]/60 border-[#dbe1ee]",
    },
    {
      id: "2",
      title: "Design Login Experience",
      timeStart: "10:30",
      timeEnd: "12:00",
      category: "Design",
      colorClass: "bg-amber-600",
      bgClass: "bg-[#f9f6f0]/60 border-[#f1e9da]",
    },
    {
      id: "3",
      title: "DSA Practice",
      timeStart: "14:00",
      timeEnd: "15:30",
      category: "Personal",
      colorClass: "bg-emerald-600",
      bgClass: "bg-[#edf7f4]/60 border-[#daede7]",
    },
    {
      id: "4",
      title: "Read about Docker Networking",
      timeStart: "16:00",
      timeEnd: "17:30",
      category: "Learning",
      colorClass: "bg-purple-600",
      bgClass: "bg-[#f5edf7]/60 border-[#ebd9f1]",
    },
  ];

  const upcomingTasks: SidebarTask[] = [
    { title: "Learn Redis Basics", date: "Tomorrow", colorClass: "bg-amber-500" },
    { title: "Build Study Companion", date: "Feb 12", colorClass: "bg-amber-500" },
    { title: "Cloud Deployment", date: "Feb 15", colorClass: "bg-indigo-400" },
  ];

  const somedayTasks = [
    { title: "AI Integration Ideas", colorClass: "bg-indigo-400" },
    { title: "Write Technical Blog", colorClass: "bg-indigo-400" },
    { title: "Build Mobile App", colorClass: "bg-indigo-400" },
    { title: "Learn System Design", colorClass: "bg-indigo-400" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f0f2f6] text-slate-900 font-sans antialiased flex relative overflow-x-hidden select-none">
      
      {/* 1. ARCHITECTURAL BACKGROUND LINES (Replicated from the image) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,100 Q 400,200 600,600 T 1600,900" fill="none" stroke="#ffffff" strokeWidth="2" />
          <path d="M-50,300 Q 500,100 900,500 T 1800,400" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 2. SYSTEM SIDEBAR NAVIGATION PANEL */}
      <aside className="w-20 border-r border-slate-300/60 bg-transparent flex flex-col items-center justify-between py-6 z-10">
        <div className="flex flex-col items-center gap-10 w-full">
          {/* Brand Mark Accent */}
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-950 text-white font-serif text-lg">
            ◐
          </div>
          {/* Functional Navigation Blocks Stack */}
          <nav className="flex flex-col gap-6 w-full items-center">
            {["⌂", "▤", "✓", "☊", "📁"].map((icon, idx) => (
              <button
                key={idx}
                className={`h-11 w-11 flex items-center justify-center rounded-xl text-lg transition-all duration-300 cursor-pointer ${
                  idx === 2 
                    ? "bg-[#e5e9ee] border border-slate-400/40 text-slate-950 shadow-sm" 
                    : "text-slate-500 hover:text-slate-950 hover:bg-slate-200/50"
                }`}
              >
                {icon}
              </button>
            ))}
          </nav>
        </div>
        
        {/* User Identity Footer Slot */}
        <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-400/60 cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="Profile Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </aside>

      {/* MAIN SCREEN CONSOLE CORE */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 p-8 sm:p-10 z-10 max-w-[1600px] mx-auto w-full">
        
        {/* 3. CENTER COLUMN CONTENT WINDOW (Spans 8 Columns) */}
        <section className="xl:col-span-8 flex flex-col gap-8">
          
          {/* Dynamic Top Workspace Header Row */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full pb-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                The Archive
              </span>
              <h1 className="text-4xl font-normal font-serif text-slate-950 tracking-tight">
                Tasks
              </h1>
              <p className="text-sm font-mono text-slate-500 font-medium">
                Capture thoughts. Organize. Act.
              </p>
            </div>

            {/* Top Bar Actions Cluster */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search tasks..." 
                  className="bg-transparent border border-slate-300/80 rounded-lg px-4 py-2 pl-4 pr-10 text-sm font-sans focus:outline-none focus:border-slate-900 w-52 placeholder-slate-400 transition-colors"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 text-xs">⚲</span>
              </div>
              <button className="p-2 border border-slate-300/80 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-200/50 cursor-pointer text-sm">🎛</button>
              <button className="p-2 border border-slate-300/80 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-200/50 cursor-pointer text-sm">⚙</button>
              <button className="bg-slate-950 text-white rounded-lg px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer shadow-sm">
                + New Task
              </button>
            </div>
          </header>

          {/* Interactive Mode Filter Segment Tab Bar */}
          <div className="flex items-center justify-between border-b border-slate-300/40 pb-2 mt-2">
            <button className="flex items-center gap-1.5 text-sm font-bold text-slate-800 font-sans cursor-pointer group">
              Today, 9 February <span className="text-xs text-slate-400 group-hover:text-slate-950">▼</span>
            </button>
            <div className="flex items-center gap-4 text-xs font-mono font-bold tracking-wider uppercase">
              <button 
                onClick={() => setActiveTab("timeline")}
                className={`pb-2 relative cursor-pointer ${activeTab === "timeline" ? "text-slate-950 font-black" : "text-slate-400 hover:text-slate-700"}`}
              >
                Timeline
                {activeTab === "timeline" && <span className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-slate-950" />}
              </button>
              <button 
                onClick={() => setActiveTab("list")}
                className={`pb-2 relative cursor-pointer ${activeTab === "list" ? "text-slate-950 font-black" : "text-slate-400 hover:text-slate-700"}`}
              >
                List
                {activeTab === "list" && <span className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-slate-950" />}
              </button>
            </div>
          </div>

          {/* Core Daily Schedule Grid Timeline Map Layer */}
          <div className="flex flex-col relative pl-16 py-4 min-h-[500px]">
            {/* The Left Linear Architectural Time Axis Anchor Line */}
            <div className="absolute left-[3.5rem] top-0 bottom-0 w-[1px] bg-slate-300/80" />

            {/* Time Track Matrix Increment Markers */}
            {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].map((time, idx) => (
              <div key={idx} className="absolute left-0 text-[11px] font-mono font-bold text-slate-400" style={{ top: `${idx * 100 + 24}px` }}>
                {time}
                {/* Horizontal Tick Dot Overlay indicator */}
                <span className="absolute right-[-14px] top-[4px] h-1.5 w-1.5 rounded-full bg-slate-300 border border-slate-400/40" />
              </div>
            ))}

            {/* Active Display Panel Content Trays */}
            <div className="flex flex-col gap-12 pt-6 pl-6 z-10 w-full max-w-2xl">
              {dailyTasks.map((task) => (
                <div 
                  key={task.id}
                  className={`w-full p-5 rounded-2xl border flex items-center justify-between shadow-[0_4px_12px_rgba(15,23,42,0.01)] transition-all hover:scale-[1.01] ${task.bgClass}`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`h-2 w-2 rounded-full mt-2 shrink-0 ${task.colorClass}`} />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-medium font-sans text-slate-950 tracking-tight leading-none">
                        {task.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-400 font-bold">
                        {task.timeStart} – {task.timeEnd}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{task.category}</span>
                    <button className="text-slate-400 hover:text-slate-900 focus:outline-none cursor-pointer">⋮</button>
                  </div>
                </div>
              ))}
            </div>

            {/* End of Day Clean Architectural Footer Break */}
            <div className="w-full max-w-2xl text-center flex flex-col gap-2 pt-16 pl-6 mt-auto">
              <div className="flex items-center justify-center gap-4 w-full">
                <span className="h-[1px] flex-1 bg-slate-300/40" />
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">End of day</span>
                <span className="h-[1px] flex-1 bg-slate-300/40" />
              </div>
              <p className="text-xs font-mono text-slate-400 mt-2 italic leading-relaxed">
                You've planned your day well.<br />Take a break. Your future self will thank you.
              </p>
            </div>

          </div>
        </section>

        {/* 4. RIGHT COLUMN FLOATING DATA INSIGHT PANEL (Spans 4 Columns) */}
        <section className="xl:col-span-4 border border-slate-300/50 bg-[#edf0f5]/50 backdrop-blur-[4px] rounded-3xl p-6 flex flex-col gap-8 h-fit shadow-[0_12px_40px_rgba(15,23,42,0.02)]">
          
          {/* Minimal Dynamic Calendar Workspace Container */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm font-bold text-slate-900 font-serif">
              <h3>February 2021</h3>
              <div className="flex items-center gap-3 text-xs font-mono">
                <button className="text-slate-400 hover:text-slate-900 cursor-pointer">◀</button>
                <button className="text-slate-400 hover:text-slate-900 cursor-pointer">▶</button>
              </div>
            </div>
            {/* The Calendar Matrix Placeholder */}
            <div className="grid grid-cols-7 text-center gap-y-3 gap-x-1 text-xs font-mono pt-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, dIdx) => (
                <span key={dIdx} className="font-black text-slate-400 uppercase tracking-wider mb-1">{day}</span>
              ))}
              {Array.from({ length: 28 }, (_, i) => i + 1).map((date) => (
                <div key={date} className="w-full flex justify-center items-center py-1">
                  <span className={`h-7 w-7 flex items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
                    date === 9 
                      ? "bg-slate-950 text-white shadow-sm font-black" 
                      : "text-slate-700 hover:bg-slate-200/80"
                  }`}>
                    {date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Section Trace Wrapper */}
          <div className="flex flex-col gap-3.5 pt-4 border-t border-slate-300/40">
            <div className="flex items-center justify-between text-xs font-mono font-black text-slate-400 uppercase tracking-widest">
              <span>Upcoming</span>
              <span className="bg-slate-300/50 text-slate-700 px-1.5 py-0.5 rounded-full text-[10px]">3</span>
            </div>
            <ul className="flex flex-col gap-3">
              {upcomingTasks.map((uTask, uIdx) => (
                <li key={uIdx} className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${uTask.colorClass}`} />
                    <span className="text-slate-900 tracking-tight">{uTask.title}</span>
                  </div>
                  <span className="font-mono text-slate-400 font-bold">{uTask.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Someday Intentional Items Column Array */}
          <div className="flex flex-col gap-3.5 pt-4 border-t border-slate-300/40">
            <div className="flex items-center justify-between text-xs font-mono font-black text-slate-400 uppercase tracking-widest">
              <span>Someday</span>
              <span className="bg-slate-300/50 text-slate-700 px-1.5 py-0.5 rounded-full text-[10px]">4</span>
            </div>
            <ul className="flex flex-col gap-3">
              {somedayTasks.map((sTask, sIdx) => (
                <li key={sIdx} className="flex items-center gap-2.5 text-xs font-medium text-slate-900">
                  <span className={`h-1.5 w-1.5 rounded-full ${sTask.colorClass}`} />
                  <span className="tracking-tight">{sTask.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus Performance Metric Sparkline Accent */}
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-300/40 mt-auto">
            <div className="flex items-center justify-between text-xs font-mono font-black text-slate-400 uppercase tracking-widest">
              <span>Focus</span>
              <span className="text-slate-950 font-black normal-case">4h 30m</span>
            </div>
            {/* Minimal Vector Sparkline Trace Drawing Container */}
            <div className="w-full h-10 relative pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,15 Q25,2 50,14 T100,10" fill="none" stroke="#475569" strokeWidth="1.5" />
                <circle cx="25" cy="8" r="2" fill="#475569" />
                <circle cx="98" cy="10" r="2" fill="#475569" />
              </svg>
            </div>
            <p className="text-[11px] font-mono text-slate-400 font-bold leading-normal mt-1">
              Consistency over intensity.<br />Keep going.
            </p>
          </div>

        </section>
      </main>
    </div>
  );
};