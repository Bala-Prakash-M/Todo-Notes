import React, { useState, useMemo } from "react";
import { Plus, Search, Sparkles, Inbox, Folder, Columns } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Note } from "../types/notes.types";

interface NotesPanelProps {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onNoteCreate: () => Promise<void>;
  isLoading: boolean;
  notebookName: string;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

const stripHtmlTags = (htmlContent: string): string => {
  if (!htmlContent) return "No additional text";
  if (typeof window === "undefined" || !window.DOMParser) {
    return htmlContent.replace(/<\/?[^>]+(>|$)/g, "").trim() || "No additional text";
  }
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    return doc.body.textContent?.trim() || "No additional text";
  } catch {
    return htmlContent.replace(/<\/?[^>]+(>|$)/g, "").trim() || "No additional text";
  }
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Draft";
  }
};

// Ultra-bouncy fluid cascade configurations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.01,
    },
  },
};

const noteVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 480,
      damping: 22,
      mass: 0.55
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.94, 
    transition: { duration: 0.12, ease: "easeInOut" } 
  },
};

export const NotesPanel: React.FC<NotesPanelProps> = ({
  notes,
  selectedNoteId,
  onNoteSelect,
  onNoteCreate,
  isLoading,
  notebookName,
  isSidebarCollapsed = false,
  onToggleSidebar,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (listRef.current && !listRef.current.contains(e.target as Node)) {
      listRef.current.scrollTop += e.deltaY;
    }
  };

  const processedNotes = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      cleanSnippet: stripHtmlTags(note.content),
    }));
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return processedNotes;

    return processedNotes.filter((note) => {
      const titleMatch = (note.title || "").toLowerCase().includes(query);
      const contentMatch = note.cleanSnippet.toLowerCase().includes(query);
      return titleMatch || contentMatch;
    });
  }, [processedNotes, searchQuery]);

  return (
    <div 
      onWheel={handleWheel}
      className="w-80 border-r border-slate-200/60 bg-slate-50/50 flex flex-col h-full shrink-0 select-none antialiased"
    >
      {/* Header Info & Premium Action Button Layout */}
      <div className="px-5 pt-6 pb-4 shrink-0 flex flex-col gap-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Current Space
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 group cursor-default">
              <Folder className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <h2 className="text-sm font-semibold text-slate-800 tracking-tight truncate">
                {notebookName || "Active Notebook"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSidebarCollapsed && onToggleSidebar && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onToggleSidebar}
                className="hidden rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200/50 hover:text-slate-600 md:inline-flex cursor-pointer"
                title="Show Navigation"
              >
                <Columns className="h-3.5 w-3.5" />
              </motion.button>
            )}

            {/* Premium Engineered New Note Button */}
            <motion.button
              onClick={onNoteCreate}
              disabled={isLoading}
              whileTap={{ opacity: 0.85 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="group flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500/5 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {/* A quiet, non-rotating elegant pulse indicator instead of a frantic spinner */}
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-pulse" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center text-slate-400 transition-colors duration-200 group-hover:text-slate-600"
                    >
                      <Plus className="h-3.5 w-3.5 stroke-[2.2]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="transition-colors duration-200">New Note</span>
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-slate-600 transition-colors duration-200" />
          <input
            type="text"
            placeholder="Search reflections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-200/40 border border-transparent rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 transition-all placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 focus:shadow-sm"
          />
        </div>
      </div>

      {/* Dynamic Sub-header Info */}
      <div className="flex items-center justify-between px-5 py-2 border-t border-b border-slate-200/40 bg-slate-50/20 shrink-0">
        <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase tabular-nums">
          Notes Stream ({filteredNotes.length})
        </span>
      </div>

      {/* Main Content Area */}
      <div 
        ref={listRef}
        className="flex-1 min-h-0 overflow-y-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <LayoutGroup id="notes-panel-group">
          <AnimatePresence mode="popLayout">
            {/* Elegant Skeleton State */}
            {isLoading && notes.length === 0 && (
              <motion.div 
                key="loading-skeleton"
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                className="space-y-2 p-1"
              >
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-xl border border-transparent p-4 bg-white/60 space-y-2 animate-pulse">
                    <div className="flex justify-between items-center">
                      <div className="h-3 w-1/2 bg-slate-200 rounded" />
                      <div className="h-2 w-8 bg-slate-100 rounded" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2.5 w-full bg-slate-200/70 rounded" />
                      <div className="h-2.5 w-3/4 bg-slate-200/70 rounded" />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Empty Space State */}
            {!isLoading && notes.length === 0 && (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.93, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center px-4 py-12 rounded-xl border border-dashed border-slate-200/80 bg-white/40 mt-1"
              >
                <div className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-100 mb-3 text-slate-400/80">
                  <Sparkles className="h-4 w-4 stroke-[1.5]" />
                </div>
                <h4 className="text-xs font-medium text-slate-800 tracking-tight">
                  Pristine Canvas
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 max-w-[190px] leading-relaxed">
                  This space has no entries. Let's record your first reflection.
                </p>
                <motion.button
                  onClick={onNoteCreate}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-4 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 transition-all duration-200 shadow-sm cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[2]" />
                  <span>Create note</span>
                </motion.button>
              </motion.div>
            )}

            {/* Search Empty State */}
            {!isLoading && notes.length > 0 && filteredNotes.length === 0 && (
              <motion.div
                key="search-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center px-4 py-16 text-slate-400"
              >
                <Inbox className="h-5 w-5 stroke-[1.5] mb-2 opacity-50" />
                <p className="text-xs font-medium text-slate-500">No matching thoughts found</p>
              </motion.div>
            )}

            {/* Elastic Cascading Notes List Render */}
            {!isLoading && filteredNotes.length > 0 && (
              <motion.div
                key="notes-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1.5"
              >
                {filteredNotes.map((note) => {
                  const isSelected = note.id === selectedNoteId;

                  return (
                    <motion.div
                      key={note.id}
                      variants={noteVariants}
                      layout="position"
                      onClick={() => onNoteSelect(note.id)}
                      className={`
                        group relative flex cursor-pointer flex-col gap-1.5 rounded-xl p-4 transition-all duration-300 transform-gpu
                        hover:-translate-y-[1px] active:translate-y-0
                        ${isSelected
                          ? "bg-white border border-slate-200/60 shadow-[0_6px_20px_-4px_rgba(0,0,0,0.04)]"
                          : "border border-transparent hover:bg-slate-200/35 hover:shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        }
                      `}
                    >
                      {/* Hyper-responsive tracking capsule background with spring momentum */}
                      {isSelected && (
                        <motion.div
                          layoutId="selectedNoteActivePill"
                          className="absolute inset-0 border border-slate-200/80 rounded-xl pointer-events-none"
                          initial={{ borderRadius: "12px" }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 550,
                            damping: 28,
                            mass: 0.55
                          }}
                        />
                      )}

                      <motion.div layout="position" className="flex items-center justify-between gap-3 relative z-10 w-full">
                        <h3
                          className={`truncate text-xs tracking-tight transition-colors duration-200 flex-1
                            ${isSelected ? "font-semibold text-slate-900" : "font-medium text-slate-700 group-hover:text-slate-900"}
                          `}
                        >
                          {note.title || "Untitled Draft"}
                        </h3>
                        <span className="shrink-0 text-[10px] font-medium text-slate-400 tabular-nums">
                          {formatDate(note.updatedAt)}
                        </span>
                      </motion.div>
                      
                      <motion.p layout="position" className="text-[11px] leading-relaxed text-slate-400 line-clamp-2 pointer-events-none relative z-10 font-normal w-full">
                        {note.cleanSnippet}
                      </motion.p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default NotesPanel;
