import React, { useState, useEffect } from "react";
import { chatSession } from "@/configs/AIModels";
import { api } from "@/convex/_generated/api";
import { useAction, useMutation } from "convex/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  NotebookIcon,
  Sparkles,
  Strikethrough,
  TextQuote,
  Underline,
  Copy,
} from "lucide-react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import NoteEditPanel from "./NoteEditPanel";

function EditorExtension({ editor, note }: any) {
  const { fileID } = useParams();
  const searchAI = useAction(api.myAction.search);
  const deleteNote = useMutation(api.notes.DeleteNote);
  const updateNote = useMutation(api.notes.UpdateNote);

  const [showNote, setShowNote] = useState(false);
  const [editNote, setEditNote] = useState<any>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    console.log("Notes updated:", note);
  }, [note]);

  useEffect(() => {
    console.log("showNote state changed:", showNote);
  }, [showNote]);

  const onAiClick = async () => {
    toast("AI is getting your answer...");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log("Selected Text:", selectedText);
    const result = await searchAI({
      query: selectedText,
      fileID: fileID as string,
    });

    const UnformattedAns = JSON.parse(result);
    let unFormattedAnswer = "";
    UnformattedAns &&
      UnformattedAns.forEach((item: { pageContent: string }) => {
        unFormattedAnswer = unFormattedAnswer + item.pageContent;
      });
    console.log("Unformatted Answer:", unFormattedAnswer);

    const PROMPT = `For the question: "${selectedText}", provide an appropriate answer in HTML format using the given content: "${unFormattedAnswer}". Ensure the answer is well-structured and formatted correctly in HTML. If the answer is not available in the provided PDF, search for the answer externally and return it in HTML format. Additionally, clearly mention that the answer was not available in the PDF. Do not include the question itself and Don't add Any heading.Underline or Bold or italic or Highlight the text which is very important based on the question.`;

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    console.log(AiModelResult.response.text());
    const FinalAns = AiModelResult.response
      .text()
      .replace("```", "")
      .replace("html", "")
      .replace("```", "");
    console.log("Final Answer:", FinalAns);

    const AllText = editor.getHTML();
    console.log(AllText);
    editor.commands.setContent(
      AllText + "<p><strong> Answer: </strong>" + FinalAns + "</p>"
    );
  };

  const handleEdit = (n: any) => {
    setEditNote(n);
    // Set the editor content to the note's HTML (formatted)
    editor.commands.setContent(typeof n.note === "string" ? n.note : JSON.stringify(n.note));
  };

  const handleSaveEdit = async () => {
    if (!editNote) return;
    const updatedContent = editor.getHTML();
    await updateNote({ _id: editNote._id, note: updatedContent });
    setEditNote(null);
    // Restore the main editor content to the updated note
    editor.commands.setContent(updatedContent);
    toast("Note updated!");
  };

  const handleCancelEdit = () => {
    setEditNote(null);
    setEditContent("");
  };

  // For both copy buttons (in NoteEditPanel and EditorExtension)
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
    editor && (
      <div className="p-5">
        <div className="control-group flex flex-wrap gap-2 items-center">
          {!editNote && (
            <>
              <div className="relative group border border-black rounded p-2 flex gap-2 items-center">
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Heading Adjustment
                </span>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 1 })
                      ? "text-blue-500"
                      : ""
                  }
                >
                  <Heading1 />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 2 })
                      ? "text-blue-500"
                      : ""
                  }
                >
                  <Heading2 />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 3 })
                      ? "text-blue-500"
                      : ""
                  }
                >
                  <Heading3 />
                </button>
              </div>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={
                  editor.isActive("bold")
                    ? "text-blue-500 relative group"
                    : "relative group"
                }
              >
                <Bold />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Bold
                </span>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={
                  editor.isActive("italic")
                    ? "text-blue-500 relative group"
                    : "relative group"
                }
              >
                <Italic />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Italic
                </span>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={
                  editor.isActive("underline")
                    ? "text-blue-500 relative group"
                    : "relative group"
                }
              >
                <Underline />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Underline
                </span>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={
                  editor.isActive("code")
                    ? "text-blue-500 relative group"
                    : "relative group"
                }
              >
                <Code />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Code
                </span>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={
                  editor.isActive("bulletList")
                    ? "text-blue-500 relative group"
                    : "relative group"
                }
              >
                <List />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Bullet List
                </span>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={
                  editor.isActive("blockquote")
                    ? "text-blue-500 relative group"
                    : "relative group"
                }
              >
                <TextQuote />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Blockquote
                </span>
              </button>
              <button
                onClick={() =>
                  editor.chain().focus()?.toggleHighlight().run()
                }
                className={
                  editor.isActive("highlight")
                    ? "text-blue-500 relative group"
                    : "relative group"
                }
              >
                <Highlighter />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Highlight
                </span>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={
                  editor.isActive("strike")
                    ? "text-blue-500 relative group"
                    : "relative group"
                }
              >
                <Strikethrough />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Strikethrough
                </span>
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={
                  editor.isActive({ textAlign: "left" })
                    ? "text-blue-500 relative group"
                    : "relative group"
                }
              >
                <AlignLeft />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Align Left
                </span>
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={
                  editor.isActive({ textAlign: "center" })
                    ? "text-blue-500 relative group"
                    : "relative group"
                }
              >
                <AlignCenter />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Align Center
                </span>
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={
                  editor.isActive({ textAlign: "right" })
                    ? "text-blue-500 relative group"
                    : "relative group"
                }
              >
                <AlignRight />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  Align Right
                </span>
              </button>
              <button
                onClick={() => onAiClick()}
                className="hover:text-blue-500 mr-3 relative group"
              >
                <Sparkles />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 whitespace-nowrap">
                  Get AI to answer **ONLY** Selected Text
                </span>
              </button>
              <button
                className="relative group hover:text-blue-500"
                onClick={() => {
                  console.log(
                    "Notebook button clicked, setting showNote to true"
                  );
                  setShowNote(true);
                }}
                title="View your notes"
              >
                <NotebookIcon />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 whitespace-nowrap">
                  Press to access notes...
                </span>
              </button>
            </>
          )}

          {showNote && !editNote && (
            <div className="fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg z-50 overflow-y-auto p-6 border-l border-gray-300">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={() => setShowNote(false)}
              >
                ✕
              </button>
              <h2 className="text-lg font-bold mb-4">Your Notes</h2>
              <div className="space-y-4 max-h-[90vh] overflow-y-auto pr-2">
                {!note ? (
                  <div className="text-center py-10 text-gray-400">
                    Loading notes...
                  </div>
                ) : Array.isArray(note) && note.length > 0 ? (
                  note.map((n, idx) => (
                    <div
                      key={n._id || idx}
                      className="border border-gray-300 rounded p-4 relative max-h-[40vh] overflow-y-auto"
                    >
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                          onClick={() => handleEdit(n)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                          onClick={async () => {
                            handleCopy(
                              typeof n.note === "string" ? n.note : JSON.stringify(n.note)
                            );
                          }}
                        >
                          <Copy />
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                          onClick={async () => {
                            const confirmed = window.confirm(
                              "Are you sure you want to delete this note?"
                            );
                            if (!confirmed) return;
                            await deleteNote({ _id: n._id });
                            toast("Note deleted!");
                          }}
                        >
                          Delete
                        </button>
                      </div>
                      <div
                        className="prose max-w-none mt-6"
                        dangerouslySetInnerHTML={{
                          __html:
                            typeof n.note === "string"
                              ? n.note
                              : JSON.stringify(n.note),
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-2">
                      No notes found for this document.
                    </p>
                    <p className="text-sm text-gray-400">
                      Notes you create will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {editNote && (
            <NoteEditPanel
              editor={editor}
              onSave={handleSaveEdit}
              onBack={handleCancelEdit}
              onClose={handleCancelEdit}
            />
          )}
        </div>
      </div>
    )
  );
}

export default EditorExtension;
