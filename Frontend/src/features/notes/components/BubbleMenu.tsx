import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  Bold,
  Italic,
  Heading2,
  List,
  Quote,
  Terminal,
  Copy,
  Underline as UnderlineIcon,
  Highlighter,
  Palette,
  Link as LinkIcon,
} from "lucide-react";

interface BubbleMenusProps {
  editor: Editor;
}

const BubbleMenus = ({ editor }: BubbleMenusProps) => {
  return (
    <div>
      <BubbleMenu
        editor={editor}
        options={{ placement: "top" }}
        className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/95 p-1.5 text-white shadow-xl backdrop-blur-md"
      >
        {/* BOLD */}
        <div className="group relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`rounded-lg p-2 transition-colors ${
              editor.isActive("bold")
                ? "bg-white/20 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Bold className="h-4 w-4" />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
            Bold
          </span>
        </div>

        {/* ITALIC */}
        <div className="group relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`rounded-lg p-2 transition-colors ${
              editor.isActive("italic")
                ? "bg-white/20 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Italic className="h-4 w-4" />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
            Italic
          </span>
        </div>

        <div className="mx-1 h-4 w-[1px] bg-slate-700/60" />

        {/* UNDERLINE */}
        <div className="group relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`rounded-lg p-2 transition-colors ${
              editor.isActive("underline")
                ? "bg-white/20 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <UnderlineIcon className="h-4 w-4" />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
            Underline
          </span>
        </div>

        {/* HIGHLIGHT */}
        <div className="group relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`rounded-lg p-2 transition-colors ${
              editor.isActive("highlight")
                ? "bg-white/20 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Highlighter className="h-4 w-4" />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
            Highlight
          </span>
        </div>

        {/* TEXT COLOR */}
        <div className="group relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().setColor("#ef4444").run()}
            className="rounded-lg p-2 text-slate-400 hover:text-white transition-colors"
          >
            <Palette className="h-4 w-4" />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
            Red Text
          </span>
        </div>

        {/* HEADING 2 */}
        <div className="group relative flex items-center justify-center">
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`rounded-lg p-2 transition-colors ${
              editor.isActive("heading", { level: 2 })
                ? "bg-white/20 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
            Heading
          </span>
        </div>

        {/* BULLET LIST */}
        <div className="group relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`rounded-lg p-2 transition-colors ${
              editor.isActive("bulletList")
                ? "bg-white/20 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
            Bullet List
          </span>
        </div>

        {/* BLOCKQUOTE */}
        <div className="group relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`rounded-lg p-2 transition-colors ${
              editor.isActive("blockquote")
                ? "bg-white/20 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Quote className="h-4 w-4" />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
            Quote
          </span>
        </div>

        {/* LINK */}
        <div className="group relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              const url = window.prompt("Enter URL");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={`rounded-lg p-2 transition-colors ${
              editor.isActive("link")
                ? "bg-white/20 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
            Insert Link
          </span>
        </div>

        {/* CODE BLOCK */}
        <div className="group relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`rounded-lg p-2 transition-colors ${
              editor.isActive("codeBlock")
                ? "bg-white/20 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Terminal className="h-4 w-4" />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
            Code Block
          </span>
        </div>

        {/* COPY TEXT */}
        <div className="group relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              const selectedText = editor.state.doc.textBetween(
                editor.state.selection.from,
                editor.state.selection.to,
                "\n",
              );
              navigator.clipboard.writeText(selectedText);
            }}
            className="rounded-lg p-2 text-slate-400 hover:text-white transition-colors"
          >
            <Copy className="h-4 w-4" />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
            Copy Selection
          </span>
        </div>
      </BubbleMenu>
    </div>
  );
};

export default BubbleMenus;
