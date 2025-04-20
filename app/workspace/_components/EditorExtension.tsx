import React from 'react';
import { Editor } from '@tiptap/react';
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Heading } from 'lucide-react';

function EditorExtension({ editor }: { editor: Editor | null }) {
  return (
    editor && (
      <div className="p-5 flex gap-3 flex-wrap">
        {/* Bold Button */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 border border-black rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          <Bold className="w-5 h-5 text-black" />
        </button>

        {/* Italic Button */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 border border-black rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        >
          <Italic className="w-5 h-5 text-black" />
        </button>

        {/* Underline Button */}
        <button
          onClick={() => editor.chain().focus().setMark('underline').run()}
          className={`p-2 border border-black rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
        >
          <span className="w-8 h-5 text-black underline">U</span>
        </button>

        {/* Align Left Button */}
        <button
          onClick={() => editor.chain().focus().updateAttributes('paragraph', { textAlign: 'left' }).run()}
          className={`p-2 border border-black rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
        >
          <AlignLeft className="w-5 h-5 text-black" />
        </button>

        {/* Align Center Button */}
        <button
          onClick={() => editor.chain().focus().updateAttributes('paragraph', { textAlign: 'center' }).run()}
          className={`p-2 border border-black rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
        >
          <AlignCenter className="w-5 h-5 text-black" />
        </button>

        {/* Align Right Button */}
        <button
          onClick={() => editor.chain().focus().updateAttributes('paragraph', { textAlign: 'right' }).run()}
          className={`p-2 border border-black rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
        >
          <AlignRight className="w-5 h-5 text-black" />
        </button>

        {/* Heading Button */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 border border-black rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
        >
          <Heading className="w-5 h-5 text-black" />
        </button>
      </div>
    )
  );
}

export default EditorExtension;