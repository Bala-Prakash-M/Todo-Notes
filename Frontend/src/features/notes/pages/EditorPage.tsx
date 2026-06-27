import React, { useState, useRef, useEffect } from "react";
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
  Save,
  Plus,
} from "lucide-react";
import BubbleMenus from "../components/BubbleMenu";
import useNotes from "../hooks/notes.hook";

interface Note {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  content: string;
}

export const EditorPage: React.FC = () => {
  // 1. DATA INJECTION PIPELINE (Consuming live notes array directly from API hooks layer)
  const { notes = [] } = useNotes();

  // 2. SELECTION METADATA TRACKERS
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 3. INTERNAL WORKSPACE SNAPSHOT STATE (Manages immediate structural updates before hitting API save)
  const [localActiveNote, setLocalActiveNote] = useState<Note | null>(null);

  // Auto-sync selection context when initial notes payload materializes
  useEffect(() => {
    if (notes.length > 0 && !selectedNoteId) {
      setSelectedNoteId(notes[0].id);
    }
  }, [notes, selectedNoteId]);

  // Keep internal localized note structures synced dynamically whenever selected note parameters shift
  useEffect(() => {
    const liveNote =
      notes.find((n) => n.id === selectedNoteId) || notes[0] || null;
    setLocalActiveNote(liveNote);
  }, [selectedNoteId, notes]);

  // Outside click menu close listeners
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 4. EDITOR ENGINE INJECTION
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
          "prose prose-slate max-w-none focus:outline-none min-h-[65vh] text-slate-800 leading-relaxed tracking-wide text-[15px] prose-headings:font-serif prose-headings:text-slate-900 prose-headings:font-normal prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-blockquote:font-serif prose-blockquote:text-slate-500 prose-blockquote:border-l-2 prose-blockquote:border-slate-300 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ul:pl-5 prose-code:font-mono prose-code:text-indigo-600 prose-code:bg-slate-100/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-xl prose-pre:font-mono",
      },
    },
    onUpdate: ({ editor: activeEditor }) => {
      const html = activeEditor.getHTML();
      setLocalActiveNote((prev) => (prev ? { ...prev, content: html } : null));
    },
  });

  // Inside your Editor Component or Active Note Context Provider
  useEffect(() => {
    if (editor && localActiveNote) {
      // Only update if the editor content actually differs to avoid cursor jumping
      const currentHTML = editor.getHTML();
      if (currentHTML !== localActiveNote.content) {
        editor.commands.setContent(localActiveNote.content || "", false);
      }
    }
  }, [localActiveNote, editor]);

  // Watch content changes and hydrate active workspace editor text tracks accurately
  useEffect(() => {
    if (!editor || !localActiveNote) return;
    if (editor.getHTML() !== localActiveNote.content) {
      editor.commands.setContent(localActiveNote.content);
    }
  }, [editor, selectedNoteId, localActiveNote]); // Rely strictly on identity shifts to avoid caret loops while typing

  if (notes.length === 0 || !localActiveNote) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] text-slate-500 font-['Plus_Jakarta_Sans'] text-xs font-semibold">
        No notes found inside this workspace yet.
      </div>
    );
  }

  const handleSave = () => {
    console.log(
      "Committing local active tracking state changes straight to active API:",
      localActiveNote,
    );
  };

  const handleDelete = () => {
    console.log("Deleting active note identity ID:", selectedNoteId);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#F8FAFC] font-sans text-slate-800 antialiased select-none">
      {/* LEFT SIDEBAR CONTROLS ELEMENT */}
      <section
        className={`fixed top-0 left-0 bottom-0 z-20 flex h-full shrink-0 flex-col border-r border-slate-100 bg-[#F8FAFC] transition-all duration-[350ms] ease-in-out md:relative md:z-0 ${
          isDistractionFree
            ? "pointer-events-none w-0 border-r-0 opacity-0"
            : "w-full sm:w-80 md:w-80 opacity-100"
        }`}
      >
        <div className="flex h-full w-full flex-col overflow-hidden min-w-[320px] sm:min-w-[320px] md:min-w-0">
          {/* Top Section Header */}
          <div className="px-5 pt-8 pb-4 shrink-0">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-0.5">
                Current Workspace
              </span>
              <div className="flex items-center px-0.5 py-1 text-sm font-bold text-slate-800 tracking-tight font-['Plus_Jakarta_Sans']">
                📁 API Managed Notebook
              </div>
            </div>
          </div>

          {/* Section Action Control Strip */}
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-b border-slate-200/30 bg-slate-50/50 shrink-0">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase whitespace-nowrap font-['Plus_Jakarta_Sans']">
              Recent Notes ({notes.length})
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  console.log("Creating brand new note instance context...")
                }
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 whitespace-nowrap font-['Plus_Jakarta_Sans']"
              >
                <Plus className="h-3 w-3 opacity-70 stroke-[2.5]" />
                <span>New Note</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDistractionFree(true)}
                className="text-slate-400 hover:text-slate-600 md:hidden ml-1"
              >
                <Columns className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Core Notes Array Flow Layout Panel */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2 bg-[#F8FAFC] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {notes.map((note) => {
              const isSelected = note.id === localActiveNote.id;
              return (
                <div
                  key={note.id}
                  onClick={() => {
                    setSelectedNoteId(note.id);
                    if (window.innerWidth < 768) {
                      setIsDistractionFree(true);
                    }
                  }}
                  className={`group flex cursor-pointer flex-col gap-1.5 rounded-xl p-4 transition-all duration-150 ${
                    isSelected
                      ? "bg-white shadow-xs ring-1 ring-slate-200/60"
                      : "hover:bg-slate-200/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className={`truncate text-xs font-semibold font-['Plus_Jakarta_Sans'] ${isSelected ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"}`}
                    >
                      {note.title || "Untitled Draft"}
                    </h3>
                    <span className="shrink-0 text-[9px] font-bold tracking-tight text-slate-400 font-['Plus_Jakarta_Sans'] mt-0.5">
                      {note.updatedAt ? note.updatedAt.split(" ")[0] : "Draft"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE CANVAS WORKSPACE WORKFLOW COMPONENT */}
      <main className="relative flex min-w-0 flex-1 flex-col bg-white">
        <header className="z-10 flex h-14 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-8 select-none">
          <div className="flex min-w-0 items-center gap-2 text-xs text-slate-400 font-['Plus_Jakarta_Sans']">
            {isDistractionFree && (
              <button
                type="button"
                onClick={() => setIsDistractionFree(false)}
                className="mr-1 rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-slate-100"
              >
                <Columns className="h-4 w-4" />
              </button>
            )}
            <span className="hidden truncate font-semibold text-slate-500 sm:block">
              Workspace Core
            </span>
            <span className="hidden opacity-40 sm:block">/</span>
            <span className="truncate font-serif italic text-slate-400">
              {localActiveNote.title || "Untitled Document"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Save Changes Core Button Action */}
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50/80 border border-emerald-200/60 p-2 sm:px-5 sm:py-2 text-xs font-bold text-emerald-700 transition-all duration-200 hover:bg-emerald-100 hover:text-emerald-800 active:scale-98 font-['Plus_Jakarta_Sans']"
            >
              <Save className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Save changes</span>
            </button>

            {/* Distraction Toggle */}
            <button
              type="button"
              onClick={() => setIsDistractionFree((prev) => !prev)}
              className="hidden rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700 md:block"
            >
              {isDistractionFree ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>

            {/* Context Layer System Controls */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className={`rounded-xl p-2 transition-colors hover:bg-slate-50 hover:text-slate-700 ${isMenuOpen ? "bg-slate-50 text-slate-700" : "text-slate-400"}`}
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-1 w-40 origin-top-right rounded-xl border border-slate-200 bg-white p-1 shadow-lg ring-1 ring-black/5 z-30">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-left text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 font-['Plus_Jakarta_Sans']"
                  >
                    Delete Note
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {editor && <BubbleMenus editor={editor} />}

        {/* Text Area Canvas Sheet */}
        <div className="mx-auto flex-1 w-full max-w-5xl overflow-y-auto px-6 py-12 sm:px-12 md:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mb-8 flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Feather className="h-3 w-3 opacity-60" /> thought_canvas //{" "}
              {localActiveNote.id ? localActiveNote.id.slice(-4) : "0000"}
            </div>

            <input
              type="text"
              value={localActiveNote.title}
              onChange={(e) => {
                const updatedTitle = e.target.value;
                setLocalActiveNote((prev) =>
                  prev ? { ...prev, title: updatedTitle } : null,
                );
              }}
              className="w-full border-none bg-transparent font-serif text-2xl font-normal tracking-tight text-slate-900 outline-none placeholder:text-slate-200 focus:ring-0 sm:text-3xl"
              placeholder="Untitled Reflection"
            />
          </div>

          <div className="relative w-full select-text">
            <EditorContent editor={editor} />
          </div>
        </div>
      </main>
    </div>
  );
};
