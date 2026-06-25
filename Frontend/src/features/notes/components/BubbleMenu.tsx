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
} from 'lucide-react';

interface BubbleMenusProps {
  editor: Editor;
}

const BubbleMenus = ({ editor }: BubbleMenusProps) => {
  return (
    <div>
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
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`rounded-lg p-1.5 transition-colors ${
                editor.isActive("underline")
                  ? "bg-white/20 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <UnderlineIcon className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`rounded-lg p-1.5 transition-colors ${
                editor.isActive("highlight")
                  ? "bg-white/20 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Highlighter className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setColor("#ef4444").run()}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white"
            >
              <Palette className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
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
              onClick={() => {
                const url = window.prompt("Enter URL");

                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={`rounded-lg p-1.5 transition-colors ${
                editor.isActive("link")
                  ? "bg-white/20 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LinkIcon className="h-3.5 w-3.5" />
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
                  "\n",
                );

                navigator.clipboard.writeText(selectedText);
              }}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </BubbleMenu>
    </div>
  )
}

export default BubbleMenus;
