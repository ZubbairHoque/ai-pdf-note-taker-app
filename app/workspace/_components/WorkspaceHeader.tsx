import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function WorkspaceHeader({ fileName, onSave }: { fileName: string; onSave: () => void }) {
  return (
    <div className="p-4 flex justify-between shadow-md">
      <Image
        src={"/logo.PNG"}
        alt="logo"
        width={65}
        height={40}
        className="  border-5 border-black p-2 rounded-lg shadow-sm"
      />

      <h2>{fileName}</h2>

      <div className="flex gap-2 items-center">
        <Button onClick={onSave}>Save</Button>

        <UserButton />
      </div>
    </div>
  );
}

export default WorkspaceHeader;
