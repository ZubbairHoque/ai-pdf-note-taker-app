"use client";
import React, { useState } from "react";
import Sidebar from "./_components/sidebar";
import UploadPdfDialogue from "./_components/UploadPdfDialogue";
import HeaderComponent from './_components/HeaderComponent'
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.emailAddresses[0]?.emailAddress || "email@email.com",
  });
  const maxFiles = 5;
  const filesCount = fileList?.length ?? 0;
  const isLimitReached = filesCount >= maxFiles;

  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <Sidebar
          onUploadClick={() => setShowModal(true)}
          isLimitReached={isLimitReached}
          filesCount={filesCount}
          maxFiles={maxFiles}
        />
      </div>
      <div className="md:ml-64">
        <HeaderComponent />
        <div className="p-10">
          {children}
        </div>
        <div className="fixed bottom-0 w-full">
          <footer className="w-full text-center py-4 text-xs text-gray-500">
            Uicons by <a href="https://www.flaticon.com/uicons" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Flaticon</a>
          </footer>
        </div>
      </div>
      {showModal && (
        <UploadPdfDialogue onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default DashboardLayout;
