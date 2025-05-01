import React from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Code,
  List,
  TextQuote,
  Highlighter,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Sparkles,
} from "lucide-react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { chatSession } from "@/configs/AIModels";

function EditorExtension({ editor }: { editor: Editor | null }) {

  const {fileID} = useParams() as {fileID:string};
  const SearchAI = useAction(api.myAction.search);
  const onAiClick = async() => {
    const selectedText = editor?.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log("selectedText", selectedText);

    const result = await SearchAI({
      query: selectedText as string,
      fileID: fileID,
    });

    const UnformattedAns = JSON.parse(result as string);
    let AllUnformattedAns=" ";
    UnformattedAns&&UnformattedAns.forEach((item: any) => {
      AllUnformattedAns=AllUnformattedAns+item.pageContent
    });

    const PROMPT = "For question :" + selectedText + " and with the given content as answer," +
            " please give appropriate answer in HTML format and mark highlights lines. The answer content is: " + AllUnformattedAns;
        
        const AiModelResult = await chatSession.sendMessage (PROMPT);
        console.log (AiModelResult.response.text ());
};

  return (
    editor && (
      <div className="p-5 flex gap-3 flex-wrap">
        {/* Bold Button */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 border border-black rounded 
            ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
        >
          <Bold className="w-5 h-5 text-black" />
        </button>

        {/* Italic Button */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 border border-black rounded
             ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
        >
          <Italic className="w-5 h-5 text-black" />
        </button>

        {/* Underline Button */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 border border-black rounded 
            ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
        >
          <span className="w-8 h-5 text-black underline">U</span>
        </button>

        {/* Align Left Button */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 border border-black rounded 
            ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}`}
        >
          <AlignLeft className="w-5 h-5 text-black" />
        </button>

        {/* Align Center Button */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 border border-black rounded 
            ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""}`}
        >
          <AlignCenter className="w-5 h-5 text-black" />
        </button>

        {/* Align Right Button */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 border border-black rounded 
            ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}`}
        >
          <AlignRight className="w-5 h-5 text-black" />
        </button>

        {/* Justify Button */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-2 border border-black rounded 
            ${editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""}`}
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

        {/* List Button */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "text-blue-500" : ""}
        >
          <List />
        </button>

        {/* Blockquote Button */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "text-blue-500" : ""}
        >
          <TextQuote />
        </button>

        {/* Highlight Button */}
        <button
          onClick={() => editor.chain().focus()?.toggleHighlight().run()}
          className={editor.isActive("highlight") ? "text-blue-500" : ""}
        >
          <Highlighter />
        </button>

        {/* Strikethrough Button */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "text-blue-500" : ""}
        >
          <Strikethrough />
        </button>

        {/* Text Formatting Section */}
        <div className="border border-black rounded p-2 flex gap-3">
          {/* H1 Button */}
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 border border-black rounded ${
              editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""
            }`}
          >
            <Heading1 />
          </button>

          {/* H2 Button */}
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 border border-black rounded ${
              editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""
            }`}
          >
            <Heading2 />
          </button>

          {/* H3 Button */}
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`p-2 border border-black rounded ${
              editor.isActive("heading", { level: 3 }) ? "text-blue-500" : ""
            }`}
          >
            <Heading3 />
          </button>
        </div>

        {/* Sparkling Button */}
        <button onClick={() => onAiClick()} className={"hover:text-blue-500"}>
          <Sparkles />
        </button>
      </div>
    )
  );
}

export default EditorExtension;
