import React, { useState } from "react";
import { Check, Trash2, Plus, X, Loader2 } from "lucide-react";
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

      {/* ─── SLOW-PHASE DIALOG OVERLAY CREATOR MODULE ─── */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ease-in-out ${
          isPopupOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Soft dark lens overlay */}
        <div
          onClick={() => !mutating && setIsPopupOpen(false)}
          className={`absolute inset-0 bg-slate-900/10 transition-all duration-700 ${
            isPopupOpen ? "backdrop-blur-md" : "backdrop-blur-none"
          }`}
        />

        {/* Slow-Phase Card Grow Container */}
        <div 
          className={`relative w-full max-w-md bg-white rounded-[2rem] p-5 sm:p-6 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col gap-5 sm:gap-6 transform transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) ${
            isPopupOpen ? "scale-100 translate-y-0 opacity-100" : "scale-[0.93] translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-sm font-semibold text-slate-800 tracking-tight">
              Create New Task
            </span>
            <button
              type="button"
              onClick={() => setIsPopupOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={onConfirmCreate} className="flex flex-col gap-5 sm:gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-left">
                Task Title Description
              </label>
              <input
                type="text"
                required
                autoFocus={isPopupOpen}
                disabled={mutating}
                placeholder="What needs to be done?"
                value={taskContent}
                onChange={(e) => setTaskContent(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-slate-300 transition-colors placeholder:text-slate-400 text-slate-800 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-1">
              <button
                type="button"
                disabled={mutating}
                onClick={() => setIsPopupOpen(false)}
                className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors rounded-xl disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={mutating || !taskContent.trim()}
                className="w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-medium hover:bg-slate-800 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {mutating && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>{mutating ? "Confirming..." : "Confirm Entry"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};