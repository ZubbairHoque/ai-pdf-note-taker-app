"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { toast } from 'sonner';

function Dashboard() {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.emailAddresses[0]?.emailAddress || 'example@example.com'
  });

  const handleMenuToggle = (fileID: string) => {
    setMenuOpen(menuOpen === fileID ? null : fileID);
  };

  const handleView = (fileID: string) => {
    window.location.href = `/workspace/${fileID}`;
  };

  const deleteFile = useMutation(api.fileStorage.DeleteFile);

  const handleDelete = async (fileID: string) => {
    try {
      await deleteFile({ fileID : fileID as any});
      toast.success('File deleted successfully');
      setMenuOpen(null);
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

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

              {/* 3 dots menu button */}
              <button
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
                onClick={e => {
                  e.stopPropagation();
                  handleMenuToggle(file.fileID);
                }}
              > 
                <span className="text-xl font-bold">⋮</span>
              </button>

              {/* Dropdown menu */}
              {menuOpen === file.fileID && (
                <div className="absolute top-8 right-2 bg-white border rounded 
                shadow z-20 flex flex-col min-w-[120px]">
                  <button
                    className="px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => handleView(file.fileID)}
                  >
                    View file
                  </button>
                  <button
                    className="px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this file?")) {
                        handleDelete(file.fileID);
                      }
                    }}
                  >
                    Delete file
                  </button>
                </div>
              )}
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