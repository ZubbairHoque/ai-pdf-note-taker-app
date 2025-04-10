"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";

import React, { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";

function UploadPdfDialogue({ children }: { children: React.ReactNode }) {
  // Generating a URL and uploading it to convex storage
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const savePdfFile = useMutation(api.fileStorage.savePdfFile);
  const { user } = useUser();
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);

  // JavaScript logic for handling file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [customFileName, setCustomFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Corrected state name to `setLoading`
  const embeddDocument = useAction(api.myAction.ingest)

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

  const OnUpload = async () => {
    setLoading(true); // Set loading to true when the upload starts
  
    // Step 1: Get short-lived upload URL
    const postUrl = await generateUploadUrl();
  
    // Step 2: POST the file to the URL
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      console.error("No file selected");
      setLoading(false); // Stop loading if no file is selected
      return;
    }
  
    const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
  
    const { storageId } = await result.json();
    console.log("storageId", storageId);
      
    // creates a file ID
    const fileID = uuidv4();

    // Generate public URL using the storage ID
    const fileUrl = await getFileUrl({storage: storageId});
  
    // Step 3: Save the newly allocated storage ID to the database
    const response = await savePdfFile({
        fileID: fileID,
        fileName: customFileName ?? "Untitled",
        storageId: storageId,
        fiLeUrl: fileUrl ?? "",
        createdBy: user?.primaryEmailAddress?.emailAddress ?? "unknown",
      });

      console.log(response);
      
      //API Call to fetch the pdf loader
      const ApiRes = await Axios.get(`/api/pdf-loader?pdfUrl=${fileUrl}`);      
      console.log(ApiRes.data.result);
      setFileName("No file chosen");
      setCustomFileName("");

      const emmbeddedResult = embeddDocument({
        splitText:ApiRes.data.result,
        fileID:"123"
      });
      console.log(emmbeddedResult);
      setLoading(false); // Set loading to false when the upload completes or fails
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF file?</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5">
              <h2 className="text-lg font-semibold mb-4">
                Select a file to upload:
              </h2>
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
                {fileName !== "No file chosen" && (
                  <span className="text-gray-600 text-sm italic">
                    {fileName}
                  </span>
                )}
              </div>

              {/* Input Field for Custom File Name */}
              <div className="mt-5">
                <label
                  htmlFor="customFileName"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white flex items-center"
                  onClick={OnUpload}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : null}
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
