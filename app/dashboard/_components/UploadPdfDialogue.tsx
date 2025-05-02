"use client"
import React, { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";

function UploadPdfDialogue() {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const savePdfFile = useMutation(api.fileStorage.savePdfFile);
  const { user } = useUser();
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);

  // JavaScript logic for handling file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [customFileName, setCustomFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Corrected state name to `setLoading`
  const embeddDocument = useAction(api.myAction.ingest);
  const [open, setOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : "No file chosen");
    setCustomFileName(file ? file.name : ""); // Default the input field to the file name
  };

  const handleChooseFile = () => {
    document.getElementById("fileInput")?.click(); // Programmatically trigger the file input
  };

  const handleClose = () => {
    setOpen(false);
    setFileName("No file chosen");
    setCustomFileName("");
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
    const fileUrl = await getFileUrl({ storage: storageId });

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

    await embeddDocument({
      splitText: ApiRes.data.result,
      fileID: fileID,
    });
    setLoading(false); // Set loading to false when the upload completes or fails
    setOpen(false); // Close the dialog after successful upload
  };


  return (
    <>
      {/* Trigger Button */}
      <Button onClick={() => setOpen(true)} className="w-full">
        + Upload PDF File
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upload PDF file?</h2>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 text-lg px-4 py-2"
                aria-label="Close"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div>
              <h3 className="text-sm font-medium mb-2">Select a file to upload:</h3>
              <div className="flex items-center gap-4">
                {/* Hidden File Input */}
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept=".pdf"
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
                  <span className="text-gray-600 text-sm italic">{fileName}</span>
                )}
              </div>

              {/* Input Field for Custom File Name */}
              <div className="mt-4">
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
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                className="hover:bg-gray-800"
                variant="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                className={`bg-blue-500 hover:bg-blue-700 text-white ${
                  fileName === "No file chosen" || customFileName.trim() === ""
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  if (fileName === "No file chosen" || customFileName.trim() === "") {
                    alert("Please select a file and provide a file name before uploading.");
                    return;
                  }
                  console.log("Uploading file...");
                  OnUpload(); // Trigger the upload process
                }}
                disabled={fileName === "No file chosen" || customFileName.trim() === ""}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UploadPdfDialogue;