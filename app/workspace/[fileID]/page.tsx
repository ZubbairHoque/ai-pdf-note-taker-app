"use client"
import React, { useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import { useParams } from 'next/navigation'
import PdfViewer from '../_components/PdfViewer'
import {  useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import TextEditor from '../_components/TextEditor'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { ParamValue } from 'next/dist/server/request/params'

function Workspace() {
  const {user} = useUser();
  const { fileID } = useParams()

  // get the file info from the Convex using the fileID
  const GetFileRecord = useQuery(api.fileStorage.GetFileRecord,{
    fileID: fileID as string || ''
  })

  useEffect(() => {
    console.log(GetFileRecord)
  },[GetFileRecord])

  const handleSave = async () => {
    const editorContent = document.querySelector(".ProseMirror")?.innerHTML; // Get the editor's content
    if (editorContent) {
      const createdBy = user?.fullName; // Replace this with the actual user id if available
      await addNotesMutation({ fileID, notes: editorContent, createdBy });
      alert("Notes saved successfully!");
    }
  };
    
    
  return (
    <div>
      <WorkspaceHeader fileName = {GetFileRecord?.[0]?.fileName || ''} onSave={handleSave}/> {/* Pass handleSave to WorkspaceHeader */}

      <div className='grid grid-cols-2 gap-5'>
        <div>
          {/* Text Editor */}
          <TextEditor fileID={fileID as string || ''} key={fileID as string || ''} onSave={handleSave} /> {/* Pass handleSave to TextEditor */}
        </div>
        <div>
          {/* PDF Viewer */}
          <PdfViewer fileUrl={GetFileRecord?.[0]?.fileUrl || ''} />
        </div>
      </div>
    </div>
  )
}

export default Workspace

function addNotesMutation(arg0: { fileID: ParamValue; notes: string; createdBy: string | null | undefined }) {
  throw new Error('Function not implemented.')
}
