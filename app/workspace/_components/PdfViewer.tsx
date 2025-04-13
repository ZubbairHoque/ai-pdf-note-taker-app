import React from 'react';

function PdfViewer({ fileUrl }: { fileUrl: string }) {
  console.log(fileUrl);

  // Conditionally render the iframe only if fileUrl is valid
  return (
    <div>
      {fileUrl ? (
        <iframe
          src={fileUrl+"#toolbar=0"}
          width="100%"
          height="90vh"
          className="h-[90vh]"
        />
      ) : (
        <p className="text-gray-500 text-center">No PDF file selected.</p>
      )}
    </div>
  );
}

export default PdfViewer;