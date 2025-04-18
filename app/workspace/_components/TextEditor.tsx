import React from 'react'
import { useEditor,  } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent } from '@tiptap/react'

function TextEditor() {
    const editor = useEditor({
        extensions: [StarterKit,
            Placeholder.configure({
                placeholder: 'Start Creating New Notes...',
              }), 
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
        <EditorContent editor={editor} />
        <div>
        <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default TextEditor