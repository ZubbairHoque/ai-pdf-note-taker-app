import React, { useEffect } from "react";
import { useEditor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent } from "@tiptap/react";
import EditorExtension from "./EditorExtension";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Text from "@tiptap/extension-text";
import Highlight from "@tiptap/extension-highlight";
import { Italic } from "@tiptap/extension-italic";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function TextEditor({ fileID, onSave }: { fileID: string, onSave?: (content: string) => void }) {
  /*
   * Used to get notes from the database
   */

  // Fetch notes for the current file
  const notes = useQuery(api.notes.GetNotes, { fileID });

  // Debug notes data
  console.log("Notes in TextEditor:", notes);
  console.log("FileID:", fileID);
  console.log("Notes type:", typeof notes, "Notes is array:", Array.isArray(notes));

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start Creating New Notes...",
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"], // Enable text alignment for these node types
      }),
      Italic.extend({
        addKeyboardShortcuts() {
          return {
            // Remove the default "Mod-i" shortcut
            // You can add a custom shortcut here if needed
          };
        },
      }),
      Text,
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      Highlight.configure({ multicolor: true }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
  });

  // Set the initial content of the editor using the fetched data

  useEffect(() => {
    // Only update editor content if editor exists and notes have been loaded
    if (editor && notes) {
      // If there are notes, set the content to the first note, otherwise set to empty string
      editor.commands.setContent(notes[0]?.note || "");
    }
  }, [notes, editor]);
  
  return (
    <div>
      <EditorExtension editor={editor} note={notes} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
      {/* Optionally, you can add a Save button here for testing */}
      {/* <button onClick={handleSave}>Save</button> */}
    </div>
  );
}

export default TextEditor;
