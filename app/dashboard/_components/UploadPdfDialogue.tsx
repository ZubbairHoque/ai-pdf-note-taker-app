import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function UploadPdfDialogue() {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [customFileName, setCustomFileName] = useState<string>("");

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
                  handleClose();
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