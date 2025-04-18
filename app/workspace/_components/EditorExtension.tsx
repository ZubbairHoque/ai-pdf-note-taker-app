import React from 'react'

import { Editor } from '@tiptap/react';
import { Bold } from 'lucide-react';

function EditorExtension({ editor }: { editor: Editor | null }) {
  return (
    <div className='p-5'>
        <div className="control-group">
        <div className="button-group">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={editor?.isActive('bold') ? 'is-active' : ''}
          >
            <Bold/>
          </button>
        </div>
        </div>
    </div>
  )
}

export default EditorExtension