import React, { useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent } from '@tiptap/react';
import EditorExtension from './EditorExtension';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Text from '@tiptap/extension-text';
import Highlight from '@tiptap/extension-highlight';
import { Italic } from '@tiptap/extension-italic';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

function TextEditor({ fileID }: { fileID: string }) {

    /*
    * Used to get notes from the database
    */

    // Make sure to use a query function, not a mutation
    const notes = useQuery(api.notes.GetNotes, {
    fileID: fileID,
  });

    console.log(notes);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Start Creating New Notes...',
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'], // Enable text alignment for these node types
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
        content: '',
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-screen p-5',
            },
        },
    });

    useEffect(() => {
        editor&&editor?.commands.setContent(notes)
    }, [notes&& editor]);
    // Set the initial content of the editor using the fetched data

    editor?.commands.setContent(
        notes?.[0]?.note || '<p></p>'
      );

    return (
        <div>
            <EditorExtension editor={editor} />
            <div className='overflow-scroll h-[88vh]'>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default TextEditor;