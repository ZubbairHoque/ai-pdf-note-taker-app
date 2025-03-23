import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";

import React, { useRef, useState } from "react";

function UploadPdfDialogue({
  children,
}: {
  children: React.ReactNode;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [customFileName, setCustomFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : "No file chosen");
    setCustomFileName(file ? file.name : ""); // Default the input field to the file name
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically trigger the file input
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF file?</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5">
              <h2 className="text-lg font-semibold mb-4">Select a file to upload:</h2>
              <div className="flex items-center gap-4 mt-5">
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf" // Restrict to PDF files
                  onChange={handleFileChange}
                />

                {/* Custom Choose File Button */}
                <button
                  type="button"
                  onClick={handleChooseFile}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Choose File
                </button>

                {/* Display Selected File Name */}
                <span className="text-gray-600 text-sm italic">{fileName}</span>
              </div>

              {/* Input Field for Custom File Name */}
              <div className="mt-5">
                <label htmlFor="customFileName" className="block text-sm font-medium text-gray-700">
                  File Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="customFileName"
                  type="text"
                  value={customFileName}
                  onChange={(e) => setCustomFileName(e.target.value)}
                  placeholder="Enter a custom file name"
                  className="mt-1"
                />
              </div>

              {/* Buttons Row */}
              <div className="flex justify-end gap-4 mt-5">
                {/* Close Button */}
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="hover:bg-gray-800"
                    variant="secondary"
                  >
                    Close
                  </Button>
                </DialogClose>

                {/* Upload Button */}
                <Button className="bg-blue-500 hover:bg-blue-700 text-white">
                  Upload
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialogue;