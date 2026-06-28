import React, { useState } from "react";
import { Plus, Search, Loader2, Sparkles, Inbox } from "lucide-react";
import type { Note } from "../types/notes.types";

interface NotesPanelProps {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onNoteCreate: () => Promise<void>;
  isLoading: boolean;
  notebookName: string;
}

// Safe client-side parser fallback for SSR/Testing environments
class Parser {
  parseFromString(markup: string, mimeType: string) {
    if (typeof window !== "undefined" && window.DOMParser) {
      return new DOMParser().parseFromString(markup, mimeType as DOMParserSupportedType);
    }
    // Simple regex fallback if DOMParser isn't available
    const clean = markup.replace(/<\/?[^>]+(>|$)/g, "");
    return { body: { textContent: clean } };
  }
}

export const NotesPanel: React.FC<NotesPanelProps> = ({
  notes,
  selectedNoteId,
  onNoteSelect,
  onNoteCreate,
  isLoading,
  notebookName,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Remove HTML tags for clean text snippets
  const getCleanSnippet = (htmlContent: string) => {
    if (!htmlContent) return "No additional text";
    const doc = new Parser().parseFromString(htmlContent, "text/html");
    const text = doc.body.textContent || "";
    return text.trim() || "No additional text";
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) => {
    const titleMatch = (note.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    const contentMatch = getCleanSnippet(note.content).toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || contentMatch;
  });

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

  return (
    <div className="w-80 border-r border-slate-200/50 bg-[#F8FAFC] flex flex-col h-full shrink-0 select-none">
      {/* Header Info & Create action */}
      <div className="px-5 pt-6 pb-4 shrink-0 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Current Space
            </span>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight font-sans truncate pr-2 mt-0.5">
              📁 {notebookName || "Active Notebook"}
            </h2>
          </div>
          <button
            onClick={onNoteCreate}
            disabled={isLoading}
            className="
              flex items-center gap-1 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 
              shadow-[0_1px_3px_rgba(0,0,0,0.02)]
              transition-all duration-300 transform-gpu
              hover:-translate-y-[1px] hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300
              active:translate-y-0 active:scale-[0.98] whitespace-nowrap cursor-pointer disabled:opacity-50
            "
          >
            <Plus className="h-3 w-3 text-slate-400 stroke-[2.5]" />
            <span>New Note</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reflections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-200/30 border border-transparent rounded-xl pl-8.5 pr-3 py-1.5 text-xs focus:outline-none focus:bg-white focus:border-slate-200 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Dynamic Sub-header Info */}
      <div className="flex items-center justify-between px-5 py-2.5 border-t border-b border-slate-200/40 bg-white/50 shrink-0">
        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase tabular-nums">
          Notes Stream ({filteredNotes.length})
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Loading Skeletons */}
        {isLoading && notes.length === 0 && (
          <div className="space-y-2.5 py-6 flex flex-col items-center justify-center animate-pulse">
            <Loader2 className="h-5 w-5 text-slate-300 animate-spin stroke-[1.5] mb-1" />
            <span className="text-[10px] font-medium text-slate-400 tracking-tight font-sans">
              Gathering thoughts...
            </span>
          </div>
        )}

        {/* Empty Space State (Zero total notes in notebook) */}
        {!isLoading && notes.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center px-4 py-10 rounded-2xl border border-dashed border-slate-200/80 bg-white/40 mt-2">
            <div className="p-3 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.01)] border border-slate-100 mb-3 text-slate-400 animate-bounce">
              <Sparkles className="h-4 w-4 stroke-[1.5]" />
            </div>
            <h4 className="text-xs font-semibold text-slate-800 tracking-tight font-sans">
              Pristine Canvas
            </h4>
            <p className="text-[10px] text-slate-400 font-sans mt-1 max-w-[180px] leading-relaxed">
              This space has no entries. Let's record your first reflection.
            </p>
            <button
              onClick={onNoteCreate}
              className="
                mt-4 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all duration-200 active:scale-98 shadow-sm cursor-pointer
              "
            >
              <Plus className="h-3 w-3 stroke-[2]" />
              <span>Create note</span>
            </button>
          </div>
        )}

        {/* Search Empty State */}
        {!isLoading && notes.length > 0 && filteredNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center px-4 py-12 text-slate-400">
            <Inbox className="h-6 w-6 stroke-[1.2] mb-2 opacity-60" />
            <p className="text-xs font-sans">No matching thoughts found</p>
          </div>
        )}

        {/* Render Notes */}
        {!isLoading && filteredNotes.length > 0 && filteredNotes.map((note) => {
          const isSelected = note.id === selectedNoteId;
          const snippet = getCleanSnippet(note.content);

          return (
            <div
              key={note.id}
              onClick={() => onNoteSelect(note.id)}
              className={`
                group flex cursor-pointer flex-col gap-2 rounded-xl p-4 transition-all duration-300 hover:-translate-y-[1px]
                ${
                  isSelected
                    ? "bg-white border border-slate-200/60 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.03)]"
                    : "border border-transparent hover:bg-slate-200/30"
                }
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <h3
                  className={`
                    truncate text-xs font-medium tracking-tight font-sans transition-colors duration-200
                    ${isSelected ? "text-slate-900 font-bold" : "text-slate-600 group-hover:text-slate-900"}
                  `}
                >
                  {note.title || "Untitled Draft"}
                </h3>
                <span className="shrink-0 text-[9px] font-bold tracking-wider text-slate-400 font-sans mt-0.5 tabular-nums">
                  {formatDate(note.updatedAt)}
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-400 line-clamp-2 pointer-events-none font-sans">
                {snippet}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default NotesPanel;
