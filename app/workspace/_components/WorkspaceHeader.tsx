import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader() {
  return (
    <div className='p-4 flex justify-between shadow-md'>
        <Image 
        src={"/logo.PNG"} 
        alt="logo" 
        width={65} 
        height={40}  
        className="  border-5 border-black p-2 rounded-lg shadow-sm"
        />
        
        <UserButton />
    </div>
  )
}

export default WorkspaceHeader