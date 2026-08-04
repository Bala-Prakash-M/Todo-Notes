import React, { useState, useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import {
  Feather,
  Maximize2,
  Minimize2,
  Columns,
  MoreVertical,
  Loader2,
  Notebook,
  CloudLightning,
  Check,
  AlertCircle,
} from "lucide-react";
import BubbleMenus from "./BubbleMenu";
import type { Note } from "../types/notes.types";

interface EditorPanelProps {
  note: Note | null;
  onSave: (id: string, title: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isDistractionFree: boolean;
  onToggleDistractionFree: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  note,
  onSave,
  onDelete,
  isDistractionFree,
  onToggleDistractionFree,
  isSidebarCollapsed,
  onToggleSidebar,
}) => {
  // Local edit states
  const [title, setTitle] = useState("");
  const [saveStatus, setSaveStatus] = useState<
    "saved" | "saving" | "unsaved" | "error"
  >("saved");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // References for tracking dirty states & current text to prevent closure stale values
  const isDirtyRef = useRef(false);
  const titleRef = useRef("");
  const contentRef = useRef("");
  const currentNoteIdRef = useRef<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Click outside listener for menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize Tiptap Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      Highlight,
      TextStyle,
      Color,
      Link.configure({ openOnClick: false }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[60vh] text-slate-800 leading-relaxed tracking-wide text-[15px] prose-headings:font-serif prose-headings:text-slate-900 prose-headings:font-normal prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-blockquote:font-serif prose-blockquote:text-slate-500 prose-blockquote:border-l-2 prose-blockquote:border-slate-300 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ul:pl-5 prose-code:font-mono prose-code:text-indigo-600 prose-code:bg-slate-100/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-xl prose-pre:font-mono",
      },
    },
    onUpdate: ({ editor: activeEditor }) => {
      const html = activeEditor.getHTML();
      if (html !== contentRef.current) {
        contentRef.current = html;
        markAsDirty();
      }
    },
  });

  // Handle Note Switch / Initialization
  useEffect(() => {
    // 1. Save pending changes on the previous note before switching
    if (currentNoteIdRef.current && isDirtyRef.current) {
      const prevId = currentNoteIdRef.current;
      const prevTitle = titleRef.current;
      const prevContent = contentRef.current;

      // Save instantly
      onSave(prevId, prevTitle, prevContent).catch((err) => {
        console.error("Autosave failed on note switch:", err);
      });
      isDirtyRef.current = false;
    }

    // Clear any pending debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    // 2. Set up the new note
    if (note) {
      const noteTitle = note.title || "";
      const timer = setTimeout(() => {
        setTitle(noteTitle);
        setSaveStatus("saved");
      }, 0);
      titleRef.current = note.title || "";
      contentRef.current = note.content || "";
      currentNoteIdRef.current = note.id;
      isDirtyRef.current = false;

      // Update Tiptap content
      if (editor) {
        editor.commands.setContent(note.content || "");
      }
      return () => clearTimeout(timer);
    } else {
      currentNoteIdRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note?.id, editor]);

  // Clean up and save pending changes on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (currentNoteIdRef.current && isDirtyRef.current) {
        // Fallback save on unmount
        onSave(
          currentNoteIdRef.current,
          titleRef.current,
          contentRef.current,
        ).catch((err) => {
          console.error("Autosave failed on unmount:", err);
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markAsDirty = () => {
    isDirtyRef.current = true;
    setSaveStatus("unsaved");
    triggerDebouncedSave();
  };

  const triggerDebouncedSave = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      saveActiveChanges();
    }, 1200); // 1.2 second debounce
  };

  const saveActiveChanges = async () => {
    if (!currentNoteIdRef.current || !isDirtyRef.current) return;

    setSaveStatus("saving");
    try {
      const activeId = currentNoteIdRef.current;
      const activeTitle = titleRef.current;
      const activeContent = contentRef.current;

      await onSave(activeId, activeTitle, activeContent);

      // Ensure we only clear dirty flag if note context hasn't shifted during the promise resolution
      if (currentNoteIdRef.current === activeId) {
        isDirtyRef.current = false;
        setSaveStatus("saved");
      }
    } catch (error) {
      console.error("Autosave failed:", error);
      setSaveStatus("error");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    titleRef.current = newTitle;
    markAsDirty();
  };

  const handleDeleteClick = () => {
    if (note) {
      if (
        confirm(
          `Are you sure you want to delete this note "${title || "Untitled"}"?`,
        )
      ) {
        onDelete(note.id);
        setIsMenuOpen(false);
      }
    }
  };

  // Render Status Text
  const renderStatus = () => {
    switch (saveStatus) {
      case "saving":
        return (
          <span className="flex items-center gap-1.5 text-slate-400">
            <Loader2 className="h-3 w-3 animate-spin stroke-[2]" />
            Saving...
          </span>
        );
      case "saved":
        return (
          <span className="flex items-center gap-1.5 text-emerald-600">
            <Check className="h-3 w-3 stroke-[2]" />
            Saved
          </span>
        );
      case "unsaved":
        return (
          <span className="flex items-center gap-1.5 text-amber-500">
            <CloudLightning className="h-3 w-3 stroke-[2]" />
            Unsaved changes
          </span>
        );
      case "error":
        return (
          <span className="flex items-center gap-1.5 text-rose-500">
            <AlertCircle className="h-3 w-3 stroke-[2]" />
            Save error
          </span>
        );
      default:
        return null;
    }
  };

  // 1. UNSELECTED / EMPTY STATE
  if (!note) {
    return (
      <main className="relative flex min-w-0 flex-1 flex-col items-center justify-center bg-white p-6 overflow-hidden">
        {/* Decorative Grid Mesh */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none select-none mix-blend-multiply">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 24 0 L 0 0 0 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="1.5 2.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative flex max-w-sm flex-col items-center text-center px-6 py-10 rounded-2xl animate-[fadeIn_0.5s_ease-out]">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.015)]">
            <Notebook className="h-5 w-5 stroke-[1.25]" />
          </div>
          <h2 className="text-[14px] font-medium tracking-tight text-slate-800 font-sans">
            Select a note to continue
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-[240px] font-sans">
            Choose a note from the left panel to start writing, or create a new
            note in your active space.
          </p>
        </div>
      </main>
    );
  }

  // 2. ACTIVE CANVAS EDITOR STATE
  return (
    <main className="relative flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden bg-white animate-[fadeIn_0.4s_ease-out]">
      {/* Editor Header Navigation */}
      <header className="z-10 flex h-14 shrink-0 items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md px-4 sm:px-8 select-none">
        <div className="flex min-w-0 items-center gap-2 text-xs text-slate-400 font-sans">
          {/* Show / Hide Sidebar toggle */}
          {isSidebarCollapsed && (
            <button
              onClick={onToggleSidebar}
              className="mr-1 rounded-lg p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Show Navigation"
            >
              <Columns className="h-4 w-4" />
            </button>
          )}
          <span className="hidden truncate font-medium text-slate-500 sm:block">
            Workspace Canvas
          </span>
          <span className="hidden opacity-40 sm:block">/</span>
          <span className="truncate font-serif italic text-slate-400 font-medium">
            {title || "Untitled Document"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold font-sans">
          {/* Save Status Indicators */}
          {renderStatus()}

          {/* Distraction Toggle */}
          <button
            onClick={onToggleDistractionFree}
            className="hidden rounded-xl p-2 text-slate-400 transition-colors duration-300 hover:bg-slate-50 hover:text-slate-700 md:block cursor-pointer"
            title={
              isDistractionFree
                ? "Exit Distraction Free"
                : "Distraction Free Mode"
            }
          >
            {isDistractionFree ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>

          {/* Action Menu (Delete, etc.) */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`rounded-xl p-2 transition-all duration-300 cursor-pointer ${
                isMenuOpen
                  ? "bg-slate-50 text-slate-700"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-44 origin-top-right rounded-xl border border-slate-200 bg-white p-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] z-50 animate-[fadeIn_0.2s_ease-out]">
                <button
                  onClick={handleDeleteClick}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-left text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50 font-sans cursor-pointer"
                >
                  Delete Reflection
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Formatting Bubble Menu */}
      {editor && <BubbleMenus editor={editor} />}

      {/* Editor Canvas Writing Container */}
      {/* 1. Full-width outer scroll container */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* 2. Inner constrained container for comfortable reading */}
        <div className="mx-auto w-full max-w-3xl px-6 py-8 sm:px-10 sm:py-12">
          <div className="mb-8 flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
              <Feather className="h-3 w-3 opacity-60" />
            </div>

            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full border-none bg-transparent p-0 font-serif text-2xl font-normal tracking-tight text-slate-900 outline-none placeholder:text-slate-200 focus:ring-0 sm:text-4xl"
              placeholder="Untitled Reflection"
            />
          </div>

          <div className="relative w-full max-w-none select-text prose prose-slate">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default EditorPanel;
