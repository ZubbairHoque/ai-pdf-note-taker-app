"use client";
import React from "react";
import Sidebar from "./_components/sidebar";
import Header from "./_components/Header";


function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="md:w-48 h-screen fixed">
        <Sidebar />
      </div>
      <div className="md:ml-48">
        <Header />
        <div className="p-10 overflow-x-auto"> {/* Add overflow-x-auto here */}
          {children}
        </div>
        <div className="fixed bottom-0 w-full">
          <footer className="w-full text-center py-4 text-xs text-gray-500">
            Uicons by <a href="https://www.flaticon.com/uicons" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Flaticon</a>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout;