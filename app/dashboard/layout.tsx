"use client"
import React from 'react'
import Header from './_components/header'
import Sidebar from './_components/sidebar'
function DashboardLayout(
    {children}
    : {
        children: React.ReactNode;
    }
) {
  return (
    <div>
        <Header />
        <div className='md:w-64 h-screen fixed'>
            <Sidebar />
        </div>
        <div className='md:ml-64'>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout