"use client"
import React, { useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import { useParams } from 'next/navigation'
import PdfViewer from '../_components/PdfViewer'
import {  useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import TextEditor from '../_components/TextEditor'

function Workspace() {
  const { fileID } = useParams()

  // get the file info from the Convex using the fileID
  const fileInfo = useQuery(api.fileStorage.GetFileRecord,{
    fileID: fileID as string || ''
  })

  useEffect(() => {
    console.log(fileInfo)
  },[fileInfo])
    
    
  return (
    <div>
      <WorkspaceHeader/>

      <div className='grid grid-cols-2 gap-5'>
        <div>
          {/* Text Editor */}
          <TextEditor />
        </div>
        <div>
          {/* PDF Viewer */}
          <PdfViewer fileUrl={fileInfo?.[0]?.fileUrl || ''} />
        </div>
      </div>
    </div>
  )
}

export default Workspace