import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import {
  Feather,
  Maximize2,
  Minimize2,
  Bold,
  Italic,
  Heading2,
  List,
  Quote,
  Terminal,
  Columns,
  Copy,
} from "lucide-react";

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

  const selectedNotebook =
    notebooks.find((notebook) => notebook.id === selectedNotebookId) ??
    notebooks[0] ??
    null;
  const selectedNote =
    selectedNotebook?.notes.find((note) => note.id === selectedNoteId) ??
    selectedNotebook?.notes[0] ??
    null;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
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

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#F8FAFC] font-sans text-slate-800 antialiased select-none">
      <section
        className={`flex h-full shrink-0 flex-col border-r border-slate-200/40 bg-[#FAFAFB] transition-all duration-[500ms] ${
          isDistractionFree
            ? "pointer-events-none w-0 border-r-0 opacity-0"
            : "fixed z-20 h-full w-full md:relative md:w-72"
        }`}
      >
        <div className="flex flex-col gap-4 border-b border-slate-200/30 bg-[#FAFAFB] p-5">
          <div className="flex items-center justify-between">
            <select
              value={selectedNotebook.id}
              onChange={(e) => {
                const target = notebooks.find((nb) => nb.id === e.target.value);

                if (target) {
                  setSelectedNotebookId(target.id);
                  setSelectedNoteId(target.notes[0]?.id ?? "");
                }
              }}
              className="cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 shadow-xs focus:outline-none"
            >
              {notebooks.map((nb) => (
                <option key={nb.id} value={nb.id}>
                  {nb.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setIsDistractionFree(true)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200/50 hover:text-slate-700 md:hidden"
            >
              <Columns className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto bg-[#FAFAFB] p-3">
          {selectedNotebook.notes.map((note) => (
            <div
              key={note.id}
              onClick={() => {
                setSelectedNoteId(note.id);
                if (window.innerWidth < 768) {
                  setIsDistractionFree(true);
                }
              }}
              className={`flex cursor-pointer flex-col gap-1 rounded-2xl p-4 transition-all duration-200 ${
                note.id === selectedNote.id
                  ? "border border-slate-200/50 bg-white shadow-xs"
                  : "hover:bg-slate-200/20"
              }`}
            >
              <h3 className="truncate text-xs font-medium text-slate-900">
                {note.title}
              </h3>
              <p className="truncate text-[11px] text-slate-400">
                {note.preview}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-slate-300">
                {note.updatedAt}
              </p>
            </div>
          ))}
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
        </header>

        {editor && (
          <BubbleMenu
            editor={editor}
            options={{ placement: "top" }}
            className="flex items-center gap-0.5 rounded-xl border border-slate-800 bg-slate-900/95 p-1 text-white shadow-xl backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded-lg p-1.5 transition-colors ${
                editor.isActive("bold")
                  ? "bg-white/20 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Bold className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`rounded-lg p-1.5 transition-colors ${
                editor.isActive("italic")
                  ? "bg-white/20 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Italic className="h-3.5 w-3.5" />
            </button>
            <div className="mx-1 h-3.5 w-[1px] bg-slate-700" />
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`rounded-lg p-1.5 transition-colors ${
                editor.isActive("heading", { level: 2 })
                  ? "bg-white/20 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Heading2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`rounded-lg p-1.5 transition-colors ${
                editor.isActive("bulletList")
                  ? "bg-white/20 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`rounded-lg p-1.5 transition-colors ${
                editor.isActive("blockquote")
                  ? "bg-white/20 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Quote className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`rounded-lg p-1.5 transition-colors ${
                editor.isActive("codeBlock")
                  ? "bg-white/20 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
            </button>
            <button
  type="button"
  onClick={() => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      "\n"
    );

    navigator.clipboard.writeText(selectedText);
  }}
  className="rounded-lg p-1.5 text-slate-400 hover:text-white"
>
  <Copy className="h-3.5 w-3.5" />
</button>
          </BubbleMenu>
        )}

        <div className="mx-auto flex-1 w-full max-w-3xl overflow-y-auto px-6 py-12 sm:px-12 md:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
