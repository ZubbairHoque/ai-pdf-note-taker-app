import React ,{useEffect}from 'react'
import { useEditor } from '@tiptap/react'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent } from '@tiptap/react'
import EditorExtension from './EditorExtension';
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Text from '@tiptap/extension-text'
import Highlight from '@tiptap/extension-highlight'


function TextEditor() {
    

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
            Text,
            TextStyle.configure({ mergeNestedSpanStyles: true }),
            Highlight.configure({ multicolor: true }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: "focus:outline-none h-screen p-5",
            },
        },
    })

    return (
        <div>
            <EditorExtension editor={editor} />
            <div>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default TextEditor