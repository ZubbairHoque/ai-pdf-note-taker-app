"use client";
import React from "react";
import SidebarFunction from "./_components/sidebar";


function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="w-64  h-screen fixed">
        <SidebarFunction />
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout;