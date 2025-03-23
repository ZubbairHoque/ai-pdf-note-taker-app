import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

function Sidebar() {
  return (
    <div className="shadow-md h-screen p-3 bg-white">
      {/* Sidebar Header */}
      <div className=" flex justify-right">
        <Image src={"/logo.PNG"} alt="logo" width={65} height={40}  
        className="  border-5 border-black p-2 rounded-lg shadow-sm"
        />
      </div>
      <div className="mt-5 mb-4">
        <Button className="w-full">+ Upload PDF</Button>
      </div>

      {/* Sidebar Options */}
      <div>
        <button
          className="flex items-center gap-2 p-2 w-full text-left
         hover:bg-gray-100 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-gray-600"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="m12.593 23.258l-.011.002l-
              .071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.
              004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l
              .104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.
              113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008
              .007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-
              .02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.
              018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.
              43l-.003-.012l-.01-.01z"
              />
              <path
                fill="currentColor"
                d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 
                2 0 0 1-2 2H5a2 2 0 0 1-2-2zm16 0H5v3h14zM5 
                19v-9h4v9zm6 0h8v-9h-8z"
              />
            </g>
          </svg>
          <h2 className="text-gray-800">Workspace</h2>
        </button>
      </div>
      <div className="mt-2">
        <button
          className="flex items-center 
        gap-2 p-2 w-full text-left hover:bg-gray-100 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="grey-100"
              d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 
          3.8-2.262 6.913T12 22m0-2.1q2.6-.825 
          4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 
          5.5t4.3 3.3m0-7.9"
            />
          </svg>
          <h2>Upgrade</h2>
        </button>
      </div>
      <div className="absolute bottom-20 w-[85%]">
        <Progress value={30} />
        <p className="text-sm mt-1">{/*TODO: add page usage here*/}</p>
        <p className="text-xs text-gray-500 mt-2">Upgrade to Upload more PDFs</p>
      </div>
    </div>
  );
}

export default Sidebar;
