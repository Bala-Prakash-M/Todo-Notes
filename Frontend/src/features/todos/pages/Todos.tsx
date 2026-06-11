import React, { useState, useEffect } from "react";
import { ArchitecturalTexture } from "../components/Texture";
import { useTodos } from "../hooks/handle.todos.hook";

export const TasksPage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  // State to manage our out-of-the-box minimal pop-up
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [taskContent, setTaskContent] = useState("");

  const { 
    todos, 
    handleToggleComplete, 
    handleDeleteTask, 
    formatDetailedTimestamp, 
    formatted, 
    setCurrentTime, 
    loading,
    mutating,
    handleCreateTodo 
  } = useTodos();  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [setCurrentTime]);

  // Handler for creating a task and closing the pop-up safely
  const onConfirmCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskContent.trim()) return;

      handleCreateTodo(taskContent);
    // Reset state parameters
    setTaskContent("");
    setIsPopupOpen(false);
  };

  const renderColoredTime = () => {
    if (!formatted) return "System Offline";
    const splitIndex = formatted.indexOf("//");
    if (splitIndex === -1) return formatted;

    const prefix = formatted.substring(0, splitIndex + 2);
    const timeString = formatted.substring(splitIndex + 2);

    return (
      <>
        <span className="text-slate-400">{prefix}</span>
        <span className="text-indigo-600 font-bold tracking-widest pl-1">{timeString}</span>
      </>
    );
  };

  return (
    <div className="h-screen w-full bg-[#f0f2f6] text-slate-900 font-sans antialiased flex flex-col md:flex-row relative overflow-hidden select-none">
      
      <ArchitecturalTexture />

      {/* FIXED SYSTEM NAVIGATION (Desktop Sidebar / Mobile Floating Dock) */}
      <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 md:bottom-0 md:relative w-[90%] max-w-sm md:w-20 h-16 md:h-full border border-slate-300/80 md:border-t-0 md:border-b-0 md:border-r bg-white/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-0 rounded-full md:rounded-none px-6 md:px-0 py-0 md:py-6 flex flex-row md:flex-col items-center justify-between z-40 shrink-0 shadow-[0_8px_32px_rgba(15,23,42,0.08)] md:shadow-none transition-all duration-500">
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-start w-full md:w-auto gap-0 md:gap-10 flex-1 md:flex-initial">
          <div className="h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white font-serif text-base cursor-pointer transform hover:rotate-180 transition-transform duration-500 hidden md:flex">
            ◐
          </div>
          <nav className="flex flex-row md:flex-col gap-1 sm:gap-2 md:gap-4 items-center justify-around md:justify-center w-full">
            {["⌂", "▤", "✓", "☊"].map((icon, idx) => (
              <button
                key={idx}
                className={`h-10 w-10 md:h-11 md:w-11 flex items-center justify-center rounded-full md:rounded-xl text-base md:text-lg transition-all duration-300 cursor-pointer ${
                  idx === 2
                    ? "bg-slate-950 text-white md:bg-slate-900/10 md:text-slate-950 shadow-sm font-bold"
                    : "text-slate-500 hover:text-slate-950 hover:bg-slate-200/50"
                }`}
              >
                {icon}
              </button>
            ))}
          </nav>
        </div>

        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden border border-slate-400/60 cursor-pointer shrink-0 ml-2 md:ml-0">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </aside>

      {/* MAIN APP DISPLAY CORE */}
      <main
        className={`flex-1 flex flex-col h-full z-10 max-w-4xl mx-auto w-full px-5 sm:px-10 md:px-12 pt-6 sm:pt-10 md:pt-12 pb-24 md:pb-6 transition-all duration-700 ease-out transform ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {/* Fixed Header Layer */}
        <div className="shrink-0 flex flex-col gap-4 sm:gap-5">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full border-b-2 border-slate-900 pb-4 sm:pb-5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] sm:text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.25em]">
                workspace_directory
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif italic font-light text-slate-950 tracking-wide">
                Tasks
              </h1>
            </div>

            {/* Actions Stack Control Elements */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              <div className="relative border-b border-slate-400 focus-within:border-slate-950 transition-colors duration-300 flex-1 sm:flex-initial">
                <input
                  type="text"
                  placeholder="search tasks..."
                  className="bg-transparent px-1 py-1 text-sm font-sans focus:outline-none w-full sm:w-44 placeholder-slate-400 font-medium"
                />
              </div>
              
              {/* Clicking this safely triggers our customized pop-up view state */}
              <button 
                onClick={() => setIsPopupOpen(true)}
                className="bg-slate-950 text-white rounded-full px-4 sm:px-5 h-9 sm:h-10 text-xs font-mono font-black uppercase tracking-widest hover:bg-black transition-colors duration-300 cursor-pointer shadow-sm shrink-0"
              >
                + new_task
              </button>
            </div>
          </header>

          {/* Time Matrix Sub-Header Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-[11px] sm:text-sm font-mono font-black text-slate-950 uppercase tracking-wider cursor-pointer flex items-center">
              {renderColoredTime()}
            </div>
          </div>
        </div>

        {/* SCROLLABLE TASK WORKSPACE LIST */}
        <div
          className="flex-1 overflow-y-auto mt-4 sm:mt-6 pr-1 w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex flex-col gap-1 min-h-full pb-8 relative">
            
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center py-20 gap-3 transition-opacity duration-300">
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 rounded-full border-2 border-slate-300 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-slate-950 animate-spin" />
                </div>
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest animate-pulse">
                  syncing ledger_nodes...
                </span>
              </div>
            ) : todos.length === 0 ? (
              <p className="text-xs font-mono font-bold text-slate-400 py-6">
                no tasks initialized inside this ledger index.
              </p>
            ) : (
              todos.map((task, idx) => (
                <div
                  key={task.id + task.title}
                  style={{ animationDelay: `${idx * 30}ms` }}
                  className="w-full border-b border-slate-300/60 py-4 flex items-start justify-between group px-1 gap-3 transition-all duration-300 hover:bg-slate-950/[0.01] animate-[fadeInUp_0.4s_ease-out_both]"
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => handleToggleComplete(task)}
                      disabled={mutating}
                      className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 mt-0.5 ${
                        mutating ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                      } ${
                        task.completed
                          ? "bg-slate-950 border-slate-950 text-white scale-100"
                          : "border-slate-400 hover:border-slate-950 bg-transparent text-transparent hover:scale-105"
                      }`}
                    >
                      <span className="text-[10px] font-bold leading-none select-none">✓</span>
                    </button>

                    <div className="flex flex-col gap-1 min-w-0">
                      <h3
                        className={`text-sm sm:text-base font-sans font-medium transition-all duration-300 tracking-tight leading-snug break-words ${
                          task.completed
                            ? "text-slate-400 line-through decoration-slate-400/50 font-normal opacity-60"
                            : "text-slate-950"
                        }`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex flex-col gap-0.5 text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider leading-none">
                        <span>
                          created //{" "}
                          <span className="text-slate-500 font-semibold">
                            {formatDetailedTimestamp(task.createdAt)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center shrink-0 pt-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                      disabled={mutating}
                      className={`text-[10px] font-mono font-black tracking-wide transition-colors uppercase px-1 py-0.5 ${
                        mutating
                          ? "cursor-not-allowed text-slate-300"
                          : "cursor-pointer text-slate-400 hover:text-rose-700 active:scale-95"
                      }`}
                    >
                      [delete]
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* FOOTER ACCENT LAYER */}
            {!loading && (
              <footer className="w-full text-center flex flex-col gap-2.5 pt-16 mt-auto">
                <div className="flex items-center justify-center gap-3 w-full">
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-400/40" />
                  <div className="h-1.5 w-1.5 rounded-full border border-slate-400/60 flex items-center justify-center bg-[#f0f2f6]">
                    <span className="h-0.5 w-0.5 rounded-full bg-slate-950 animate-pulse" />
                  </div>
                  <span className="text-[9px] font-mono font-black text-slate-950 uppercase tracking-[0.3em] pl-0.5">
                    the_archive
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full border border-slate-400/60 flex items-center justify-center bg-[#f0f2f6]">
                    <span className="h-0.5 w-0.5 rounded-full bg-slate-950 animate-pulse" />
                  </div>
                  <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-400/40" />
                </div>
                <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest">
                  Your thoughts are preserved. Clear mind, smooth motion.
                </p>
              </footer>
            )}
          </div>
        </div>
      </main>

      {/* ====================================================================
          OUT-OF-THE-BOX MINIMAL POP-UP OVERLAY (The Content Creator)
          ==================================================================== */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out_both]">
          
          {/* Backdrop blur layer that mimics a lens shifting focus */}
          <div 
            onClick={() => setIsPopupOpen(false)}
            className="absolute inset-0 bg-slate-900/10 backdrop-blur-md cursor-pointer"
          />

          {/* Minimal Floating Drawer Card */}
          <div className="relative w-full max-w-md bg-[#f0f2f6]/95 border-2 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.15)] flex flex-col gap-6 animate-[fadeInUp_0.4s_ease-out_both]">
            
            {/* Pop-up Identity Tags */}
            <div className="flex items-center justify-between border-b border-slate-300/60 pb-3">
              <span className="text-[10px] font-mono font-black text-slate-900 uppercase tracking-[0.2em]">
                node_initialization
              </span>
              <button 
                onClick={() => setIsPopupOpen(false)}
                className="text-[10px] font-mono font-black text-slate-400 hover:text-slate-950 uppercase transition-colors focus:outline-none cursor-pointer"
              >
                [esc]
              </button>
            </div>

            {/* Input Submission Framework Container */}
            <form onSubmit={onConfirmCreate} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 border-b-2 border-slate-900 pb-2 focus-within:border-indigo-600 transition-colors duration-300">
                <label className="text-[10px] font-mono font-black text-slate-900 uppercase tracking-widest">
                  content // description
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  name="content"
                  placeholder="enter task descriptor statement string..."
                  value={taskContent}
                  onChange={(e) => setTaskContent(e.target.value)}
                  className="block w-full bg-transparent text-base font-sans font-medium text-slate-950 placeholder-slate-400/60 focus:outline-none py-1 tracking-wide"
                />
              </div>

              {/* Minimal Capsule Confirm Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-mono font-black text-slate-500 hover:text-slate-950 uppercase transition-colors cursor-pointer"
                >
                  cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-6 rounded-full text-xs font-mono font-black tracking-widest uppercase bg-slate-950 text-white hover:bg-black transition-all duration-300 cursor-pointer shadow-md"
                >
                  confirm_entry
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};