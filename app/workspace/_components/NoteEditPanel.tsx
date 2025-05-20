import React, { useRef } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Copy,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  Strikethrough,
  TextQuote,
  Underline,
} from "lucide-react";
import { EditorContent } from "@tiptap/react";
import { toast } from "sonner";

const NoteEditPanel = ({
  editor,
  onSave,
  onBack,
  onClose,
}: {
  editor: any;
  onSave: () => void;
  onBack: () => void;
  onClose: () => void;
}) => {
  // Track the initial content to detect changes
  const initialContent = useRef(editor?.getHTML());

  // Helper to check for unsaved changes
  const hasChanges = () => initialContent.current !== editor?.getHTML();

  // Confirm before closing/back if there are unsaved changes
  const handleClose = () => {
    if (hasChanges()) {
      if (!window.confirm("You have unsaved changes. Are you sure you want to close?")) return;
    }
    onClose();
  };
  const handleBack = () => {
    if (hasChanges()) {
      if (!window.confirm("You have unsaved changes. Are you sure you want to go back?")) return;
    }
    onBack();
  };

  // Save and clear editor
  const handleSave = () => {
    onSave();
    // Do NOT clear the editor here, let the parent handle it if needed
    // editor.commands.clearContent();
    // initialContent.current = "";
  };

  // Handle copy functionality
  const handleCopy = (html: string) => {
    navigator.clipboard.write([
      new window.ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([html], { type: "text/plain" }),
      }),
    ]);
    toast("Note copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
      <div className="bg-white rounded shadow-lg p-6 max-w-xl w-full relative border border-gray-300 max-h-screen overflow-y-auto flex flex-col">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={handleClose}
          title="Close"
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4">Edit Note</h2>
        {/* Toolbar (no Sparkles or Notebook) */}
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <div className="relative group border border-black rounded p-2 flex gap-2 items-center">
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
              Heading Adjustment
            </span>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""}><Heading1 /></button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""}><Heading2 /></button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive("heading", { level: 3 }) ? "text-blue-500" : ""}><Heading3 /></button>
          </div>
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "text-blue-500 relative group" : "relative group"}><Bold /></button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "text-blue-500 relative group" : "relative group"}><Italic /></button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "text-blue-500 relative group" : "relative group"}><Underline /></button>
          <button onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive("code") ? "text-blue-500 relative group" : "relative group"}><Code /></button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "text-blue-500 relative group" : "relative group"}><List /></button>
          <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "text-blue-500 relative group" : "relative group"}><TextQuote /></button>
          <button onClick={() => editor.chain().focus()?.toggleHighlight().run()} className={editor.isActive("highlight") ? "text-blue-500 relative group" : "relative group"}><Highlighter /></button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive("strike") ? "text-blue-500 relative group" : "relative group"}><Strikethrough /></button>
          <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={editor.isActive({ textAlign: "left" }) ? "text-blue-500 relative group" : "relative group"}><AlignLeft /></button>
          <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={editor.isActive({ textAlign: "center" }) ? "text-blue-500 relative group" : "relative group"}><AlignCenter /></button>
          <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={editor.isActive({ textAlign: "right" }) ? "text-blue-500 relative group" : "relative group"}><AlignRight /></button>
        </div>
        {/* Tiptap Editor with its own scroll */}
        <div className="border rounded mb-4 max-h-[300px] overflow-y-auto">
          <EditorContent editor={editor} />
        </div>
        <div className="flex gap-2 mt-auto justify-between">
          <div>
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
              onClick={() => handleCopy(editor.getHTML())}
            >
              <Copy size={18} />
            </button>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditPanel;