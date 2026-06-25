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

interface Note {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  content: string;
}

interface Notebook {
  id: string;
  name: string;
  accent: string;
  notes: Note[];
}

const initialNotebooks: Notebook[] = [
  {
    id: "nb1",
    name: "Psychology & Behaviour",
    accent: "#DB2777",
    notes: [
      {
        id: "n1",
        title: "Introduction to Cognitive Distortions",
        preview: "An analysis of emotional reasoning frameworks...",
        updatedAt: "Jun 25",
        content:
          "<h2>Introduction to Cognitive Distortions</h2><p>Highlight any piece of text to summon the elegant <strong>floating bubble menu</strong> right at your cursor canvas context.</p>",
      },
    ],
  },
];

export const EditorPage: React.FC = () => {
  const [notebooks, setNotebooks] = useState<Notebook[]>(initialNotebooks);
  const [selectedNotebookId, setSelectedNotebookId] = useState(
    initialNotebooks[0]?.id ?? "",
  );
  const [selectedNoteId, setSelectedNoteId] = useState(
    initialNotebooks[0]?.notes[0]?.id ?? "",
  );
  const [isDistractionFree, setIsDistractionFree] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const selectedNotebook =
    notebooks.find((notebook) => notebook.id === selectedNotebookId) ??
    notebooks[0] ??
    null;
  const selectedNote =
    selectedNotebook?.notes.find((note) => note.id === selectedNoteId) ??
    selectedNotebook?.notes[0] ??
    null;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: selectedNote?.content ?? "",
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[65vh] text-slate-800 leading-relaxed tracking-wide text-[15px] prose-headings:font-serif prose-headings:text-slate-900 prose-headings:font-normal prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-blockquote:font-serif prose-blockquote:text-slate-500 prose-blockquote:border-l-2 prose-blockquote:border-slate-300 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ul:pl-5 prose-code:font-mono prose-code:text-indigo-600 prose-code:bg-slate-100/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-xl prose-pre:font-mono",
      },
    },
    onUpdate: ({ editor: activeEditor }) => {
      const html = activeEditor.getHTML();

      setNotebooks((prev) =>
        prev.map((notebook) => ({
          ...notebook,
          notes: notebook.notes.map((note) =>
            note.id === selectedNoteId ? { ...note, content: html } : note,
          ),
        })),
      );
    },
  });

  useEffect(() => {
    if (!selectedNotebook) {
      return;
    }

    const activeNoteExists = selectedNotebook.notes.some(
      (note) => note.id === selectedNoteId,
    );

    if (!activeNoteExists) {
      setSelectedNoteId(selectedNotebook.notes[0]?.id ?? "");
    }
  }, [selectedNotebook, selectedNoteId]);

  useEffect(() => {
    if (!editor || !selectedNote) {
      return;
    }

    if (editor.getHTML() !== selectedNote.content) {
      editor.commands.setContent(selectedNote.content);
    }
  }, [editor, selectedNote]);

  if (!selectedNotebook || !selectedNote) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] text-slate-500">
        No notebook or note is available yet.
      </div>
    );
  }

  const handleSave = () => {
    // Your save logic here
    console.log("Saving note...");
  };

  const handleDelete = () => {
    // Your delete logic here
    console.log("Deleting note...");
    setIsMenuOpen(false);
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#F8FAFC] font-sans text-slate-800 antialiased select-none">
      <section
        className={`fixed top-0 left-0 bottom-0 z-20 flex h-full shrink-0 flex-col border-r border-slate-100 bg-[#F8FAFC] transition-all duration-[350ms] ease-in-out md:relative md:z-0 ${
          isDistractionFree
            ? "pointer-events-none w-0 border-r-0 opacity-0"
            : "w-full sm:w-80 md:w-80 opacity-100"
        }`}
      >
        {/* Inner wrapper with an absolute width ensures text/items do not wrap awkwardly while collapsing */}
        <div className="flex h-full w-full flex-col overflow-hidden min-w-[320px] sm:min-w-[320px] md:min-w-0">
          {/* Top Section: Scope Selector with extra spacing */}
          <div className="px-5 pt-8 pb-4 shrink-0">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-0.5">
                Current Workspace
              </span>

              <div className="relative flex items-center rounded-xl bg-slate-200/40 px-3 py-2 transition-colors hover:bg-slate-200/60">
                <select
                  value={selectedNotebook.id}
                  onChange={(e) => {
                    const target = notebooks.find(
                      (nb) => nb.id === e.target.value,
                    );
                    if (target) {
                      setSelectedNotebookId(target.id);
                      setSelectedNoteId(target.notes[0]?.id ?? "");
                    }
                  }}
                  className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  {notebooks.map((nb) => (
                    <option key={nb.id} value={nb.id}>
                      📁 {nb.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 text-[9px] text-slate-500">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* Section Header: Recent Notes opposite New Note button */}
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-b border-slate-200/30 bg-slate-50/50 shrink-0">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase whitespace-nowrap">
              Recent Notes ({selectedNotebook.notes.length})
            </span>

            <div className="flex items-center gap-2">
              {/* Subtle, aligned New Note button */}
              <button
                type="button"
                onClick={() => console.log("Creating new note...")}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 whitespace-nowrap"
              >
                <Plus className="h-3 w-3 opacity-70" />
                <span>New Note</span>
              </button>

              {/* Mobile close sidebar button */}
              <button
                type="button"
                onClick={() => setIsDistractionFree(true)}
                className="text-slate-400 hover:text-slate-600 md:hidden ml-1"
              >
                <Columns className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* List Canvas */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2 bg-[#F8FAFC] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {selectedNotebook.notes.map((note) => {
              const isSelected = note.id === selectedNote.id;
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
                      className={`truncate text-xs font-semibold ${isSelected ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"}`}
                    >
                      {note.title || "Untitled Draft"}
                    </h3>
                    <span className="shrink-0 text-[9px] font-medium tracking-tight text-slate-400 mt-0.5">
                      {note.updatedAt.split(" ")[0]}
                    </span>
                  </div>

                  <p className="line-clamp-2 text-[11px] leading-relaxed text-slate-400 group-hover:text-slate-500">
                    {note.preview || "Empty reflection..."}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <main className="relative flex min-w-0 flex-1 flex-col bg-white">
        <header className="z-10 flex h-14 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-2 text-xs text-slate-400">
            {isDistractionFree && (
              <button
                type="button"
                onClick={() => setIsDistractionFree(false)}
                className="mr-1 rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-slate-100"
              >
                <Columns className="h-4 w-4" />
              </button>
            )}
            <span className="hidden truncate font-medium text-slate-500 sm:block">
              {selectedNotebook.name}
            </span>
            <span className="hidden opacity-40 sm:block">/</span>
            <span className="truncate font-serif italic text-slate-400">
              {selectedNote.title}
            </span>
          </div>

          {/* Header Actions Area */}
          <div className="flex items-center gap-2">
            {/* Save Button */}
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50/80 border border-emerald-200/60 p-2 sm:px-5 sm:py-2 text-sm font-medium text-emerald-700 transition-all duration-200 hover:bg-emerald-100 hover:text-emerald-800 active:scale-98"
              title="Save changes"
            >
              <Save className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Save changes</span>
            </button>

            {/* Distraction Free Toggle */}
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

            {/* 3-Dot Dropdown Menu */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className={`rounded-xl p-2 transition-colors hover:bg-slate-50 hover:text-slate-700 ${
                  isMenuOpen ? "bg-slate-50 text-slate-700" : "text-slate-400"
                }`}
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-1 w-40 origin-top-right rounded-xl border border-slate-200 bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none z-30">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-left text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50"
                  >
                    Delete Note
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {editor && <BubbleMenus editor={editor} />}

        {/* Note size expanded: max-w-3xl changed to max-w-5xl */}
        <div className="mx-auto flex-1 w-full max-w-5xl overflow-y-auto px-6 py-12 sm:px-12 md:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mb-8 flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Feather className="h-3 w-3 opacity-60" /> thought_canvas //{" "}
              {selectedNote.id.slice(-4)}
            </div>
            <input
              type="text"
              value={selectedNote.title}
              onChange={(e) => {
                const updatedTitle = e.target.value;

                setNotebooks((prev) =>
                  prev.map((notebook) => ({
                    ...notebook,
                    notes: notebook.notes.map((note) =>
                      note.id === selectedNoteId
                        ? { ...note, title: updatedTitle }
                        : note,
                    ),
                  })),
                );
              }}
              className="w-full border-none bg-transparent font-serif text-2xl font-normal tracking-tight text-slate-900 outline-none placeholder:text-slate-200 focus:ring-0 sm:text-3xl"
              placeholder="Untitled Reflection"
            />
          </div>

          <div className="relative w-full">
            <EditorContent editor={editor} />
          </div>
        </div>
      </main>
    </div>
  );
};
