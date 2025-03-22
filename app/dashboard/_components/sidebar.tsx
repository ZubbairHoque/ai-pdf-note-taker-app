import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Sidebar() {
  return (

    /* sidebar header*/  

    <div className='shadow-md h-screen p-3'>
      <Image src={"/logo.PNG"} alt ="logo" width={75} height={45}/>
      <div className='mt-5'>
        <Button className="w-full">+ Upload PDF</Button>
      </div>

    {/* sidebar options */}

      <div>
        
      </div>
    </div>
  )
}

export default Sidebar