"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';


function Dashboard() {
  const { user } = useUser();

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.emailAddresses[0]?.emailAddress || 'example@example.com'
  });

  

  return (
    <div>
      <h2 className="font-medium text-3xl font-bold mb-4">Workspace</h2>
      <div id="dashboard-main-content"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10"
      >
        {Array.isArray(fileList) && fileList.length > 0 ? (
          fileList.map((file: any, index: number) => (
            <div
              key={index}
              className='relative flex shadow-md rounded-lg p-6 gap-4 mb-4 
              flex-col items-center cursor-pointer hover:scale-105 transition-all 
              duration-200 ease-in-out'
            >
              <Link href={'workspace/' + file.fileID} className="w-full">
                <div className='flex flex-col items-center'>
                  <Image src={"/pdf.png"} alt="file" width={50} height={50} />
                  <h2 className='mt-3 font-medium text-lg'>{file.fileName}</h2>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className='bg-slate-200 rounded-md h-[150px] animated-pulse flex 
          items-center justify-center'></div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;