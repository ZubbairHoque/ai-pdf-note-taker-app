import React from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading,
  AlignJustify,
  BoldIcon,
  Code,
  List,
  TextQuote,
  Highlighter,
  Strikethrough,
} from "lucide-react";

function EditorExtension({ editor }: { editor: Editor | null }) {
  return (
    editor && (
      <div className="p-5 flex gap-3 flex-wrap">
        {/* Bold Button */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 border border-black rounded ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
        >
          <Bold className="w-5 h-5 text-black" />
        </button>

        {/* Italic Button */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 border border-black rounded ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
        >
          <Italic className="w-5 h-5 text-black" />
        </button>

        {/* Underline Button */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 border border-black rounded ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
        >
          <span className="w-8 h-5 text-black underline">U</span>
        </button>

        {/* Align Left Button */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 border border-black rounded ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}`}
        >
          <AlignLeft className="w-5 h-5 text-black" />
        </button>

        {/* Align Center Button */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 border border-black rounded ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""}`}
        >
          <AlignCenter className="w-5 h-5 text-black" />
        </button>

        {/* Align Right Button */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 border border-black rounded ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}`}
        >
          <AlignRight className="w-5 h-5 text-black" />
        </button>

        {/* Justify Button */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-2 border border-black rounded ${editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""}`}
        >
          <AlignJustify className="w-5 h-5 text-black" />
        </button>

        {/* Code Button */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "text-blue-500" : ""}
        >
          <Code />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "text-blue-500" : ""}
        >
          <List />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "text-blue-500" : ""}
        >
          <TextQuote />
        </button>
        <button
          onClick={() => editor.chain().focus()?.toggleHighlight().run()}
          className={editor.isActive("highlight") ? "text-blue-500" : ""}
        >
          <Highlighter />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "text-blue-500" : ""}
        >
          <Strikethrough />
        </button>
      </div>
    )
  );
}

export default EditorExtension;
