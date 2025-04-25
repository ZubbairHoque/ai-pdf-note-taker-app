import React from "react";
import { Editor } from "@tiptap/react";
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Heading, AlignJustify } from "lucide-react";

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
          onClick={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          className={`p-2 border border-black rounded ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}`}
        >
          <AlignLeft className="w-5 h-5 text-black" />
        </button>

        {/* Align Center Button */}
        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          className={`p-2 border border-black rounded ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""}`}
        >
          <AlignCenter className="w-5 h-5 text-black" />
        </button>

        {/* Align Right Button */}
        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
          className={`p-2 border border-black rounded ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}`}
        >
          <AlignRight className="w-5 h-5 text-black" />
        </button>

        {/* Justify Button */}
        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
          className={`p-2 border border-black rounded ${editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""}`}
        >
          <AlignJustify className="w-5 h-5 text-black" />
        </button>

        {/* Font Size Input with Dropdown */}
        <input
          type="number"
          min="2"
          max="40"
          step="1"
          list="fontSizes"
          onChange={(e) => {
            const fontSize = Number(e.target.value);
            if (fontSize >= 2 && fontSize <= 40) {
              editor.chain().focus().setMark("textStyle", { fontSize: `${fontSize}px` }).run();
            }
          }}
          className="p-2 border border-black rounded w-20"
          placeholder="Font Size"
        />
        <datalist id="fontSizes">
          {/* Options from 8 to 24 at intervals of 2 */}
          {Array.from({ length: 9 }, (_, i) => 8 + i * 2).map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
          {/* Options from 28 to 32 at intervals of 4 */}
          {Array.from({ length: 2 }, (_, i) => 28 + i * 4).map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </datalist>

        {/* Heading Button */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 border border-black rounded ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}`}
        >
          <Heading className="w-5 h-5 text-black" />
        </button>
      </div>
    )
  );
}

export default EditorExtension;