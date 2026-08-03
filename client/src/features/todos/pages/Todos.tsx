import React, { useState } from "react";
import { Check, Trash2, Plus, X, Loader2, FilePlus } from "lucide-react";
import { useTodos } from "../hooks/handle.todos.hook";

export const TasksPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [taskContent, setTaskContent] = useState("");

  const {
    todos,
    handleToggleComplete,
    handleDeleteTask,
    formatDetailedTimestamp,
    loading,
    mutating,
    handleCreateTodo,
  } = useTodos();

  const onConfirmCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskContent.trim() || mutating) return;

    handleCreateTodo(taskContent);
    setTaskContent("");
    setIsPopupOpen(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 relative min-h-0 flex flex-col">
      {/* Responsive Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Task Ledger
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Quick operational action items.
          </p>
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-medium hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 active:scale-98"
        >
          <Plus className="w-3.5 h-3.5" /> New Task
        </button>
      </div>

      {/* Scrollable Container System */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* ─── LOADING STATE UI ─── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 animate-[fadeIn_0.3s_ease-out]">
            <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
            <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-widest animate-pulse">
              Syncing ledger nodes...
            </span>
          </div>
        ) : todos.length === 0 ? (
          /* ─── EMPTY STATE UI ─── */
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-white/40 animate-[fadeIn_0.3s_ease-out]">
            <p className="text-xs sm:text-sm font-medium text-slate-400">
              No tasks initialized inside this workspace.
            </p>
          </div>
        ) : (
          /* ─── DATA RENDERING LIST ─── */
          todos.map((task, idx) => (
            <div
              key={task.id}
              onClick={() => !mutating && handleToggleComplete(task)}
              style={{ animationDelay: `${idx * 40}ms` }}
              className={`w-full bg-white rounded-2xl p-4 flex items-center justify-between group gap-3 border border-white/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),_0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),_0_8px_24px_rgba(0,0,0,0.03)] transition-all duration-300 select-none transform active:scale-[0.99] animate-[fadeInUp_0.4s_cubic-bezier(0.16,1,0.3,1)_both] ${
                mutating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <button
                  type="button"
                  disabled={mutating}
                  className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                    task.completed
                      ? "bg-emerald-500 border-emerald-500 text-white scale-100"
                      : "border-slate-300 hover:border-slate-500 bg-slate-50 text-transparent"
                  }`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </button>

                <div className="flex flex-col gap-0.5 min-w-0">
                  <h3
                    className={`text-sm font-medium transition-all duration-300 tracking-tight text-left break-words ${
                      task.completed
                        ? "text-slate-400 line-through opacity-60 font-normal"
                        : "text-slate-800"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <span className="text-[10px] font-medium text-slate-400 text-left">
                    {formatDetailedTimestamp(task.createdAt)}
                  </span>
                </div>
              </div>

              {/* Responsive: Instantly clickable icon on mobile, clear hover state trigger structure on desktop */}
              <button
                type="button"
                disabled={mutating}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task.id);
                }}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-xl transition-all md:opacity-0 md:group-hover:opacity-100 disabled:opacity-30 shrink-0 hover:bg-rose-50/50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
      {/* ─── STANDARDIZED MODAL INTERFACE ─── */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* LAYER 1: Immediate Backdrop Lens
      Activates instantly without delayed transition interpolations
    */}
          <div
            onClick={() => !mutating && setIsPopupOpen(false)}
            className="absolute inset-0 bg-neutral-900/15 backdrop-blur-xs"
          />

          {/* LAYER 2: Snappy Card Container 
      Uses the exact same high-performance animation from your notebook modal
    */}
          <div
            className="relative w-full max-w-sm bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-[0_20px_50px_rgba(27,27,27,0.06)] flex flex-col overflow-hidden"
            style={{
              animation:
                "modalSlideIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            {/* Keyframe Injector */}
            <style>{`
        @keyframes modalSlideIn {
          from { transform: translateY(12px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes flowerRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

            {/* PERFORMANCE-OPTIMIZED FLOWER BACKGROUND WATERMARK */}
            <div
              className="absolute -top-16 -right-16 pointer-events-none select-none text-neutral-900/[0.08] origin-center mix-blend-multiply"
              style={{ animation: "flowerRotate 90s linear infinite" }}
            >
              <svg
                width="220"
                height="220"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="1.5 2.5"
              >
                <path d="M50,50 A25,25 0 1,1 50,0 A25,25 0 1,1 50,50" />
                <path d="M50,50 A25,25 0 1,1 100,50 A25,25 0 1,1 50,50" />
                <path d="M50,50 A25,25 0 1,1 50,100 A25,25 0 1,1 50,50" />
                <path d="M50,50 A25,25 0 1,1 0,50 A25,25 0 1,1 50,50" />
                <path d="M50,50 A25,25 0 1,1 85.35,14.65 A25,25 0 1,1 50,50" />
                <path d="M50,50 A25,25 0 1,1 85.35,85.35 A25,25 0 1,1 50,50" />
                <path d="M50,50 A25,25 0 1,1 14.65,85.35 A25,25 0 1,1 50,50" />
                <path d="M50,50 A25,25 0 1,1 14.65,14.65 A25,25 0 1,1 50,50" />
              </svg>
            </div>

            {/* SUBTLE LINE-MASK BLENDING LAYER */}
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/40 to-white/95 pointer-events-none z-[1]" />

            {/* Close Button */}
            <button
              type="button"
              disabled={mutating}
              onClick={() => setIsPopupOpen(false)}
              className="absolute right-4 top-4 rounded-xl p-1.5 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700 transition-colors z-50 cursor-pointer disabled:opacity-40"
            >
              <X className="h-4 w-4 stroke-[1.8]" />
            </button>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full w-full">
              {/* Header Icon + Label */}
              <div className="flex flex-col items-center text-center mb-6 pt-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-800 mb-3 shadow-xs">
                  <FilePlus className="h-5 w-5 stroke-[1.5]" />
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] text-base font-semibold tracking-tight text-neutral-800">
                  Create New Task
                </h2>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-neutral-400 mt-1 max-w-[240px]">
                  Map out your actionable benchmarks for this workspace space.
                </p>
              </div>

              <form onSubmit={onConfirmCreate} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold tracking-wider text-neutral-400 uppercase px-0.5 text-left">
                    Task Title Description
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    disabled={mutating}
                    placeholder="What needs to be done?"
                    value={taskContent}
                    onChange={(e) => setTaskContent(e.target.value)}
                    className="w-full bg-neutral-50/50 border border-neutral-200/80 rounded-xl px-4 py-2.5 font-['Plus_Jakarta_Sans'] text-sm font-medium text-neutral-900 placeholder-neutral-300 outline-none transition-all duration-200 focus:border-neutral-400 focus:bg-white focus:ring-0 disabled:opacity-60"
                  />
                </div>

                {/* Action Row Layout Block */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    disabled={mutating}
                    onClick={() => setIsPopupOpen(false)}
                    className="flex-1 h-10 rounded-xl border border-neutral-200 font-['Plus_Jakarta_Sans'] text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-50 active:scale-98 disabled:opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={mutating || !taskContent.trim()}
                    className="flex-1 h-10 flex justify-center items-center gap-1.5 rounded-xl bg-slate-900 font-['Plus_Jakarta_Sans'] text-xs font-semibold text-white shadow-md shadow-slate-900/5 transition-all duration-200 hover:bg-slate-800 active:scale-98 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    {mutating && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    <span>{mutating ? "Confirming..." : "Confirm Entry"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
