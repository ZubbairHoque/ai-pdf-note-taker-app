import React, { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import Image from "next/image";


function HeaderComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  // Optional: debounce input to prevent too many API calls
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Query search results using debounced term
  const results = useQuery(api.fileStorage.searchPdfFiles, debouncedTerm ? { fileNameQuery: debouncedTerm } : "skip");

  const typeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex justify-end p-5 shadow-sm">
      <div className="flex flex-col items-end gap-2">
        <UserButton />
        <input
          onChange={typeEventHandler}
          type="text"
          placeholder="Search"
          className="rounded-md bg-gray-100 px-2 py-3 w-[150%] text-black"
        />
        {/* Display search results */}
        {results && results.length > 0 && (
          <ul className="bg-white border p-2 w-[680px] rounded shadow max-h-[400px] overflow-y-auto z-10">
            {results.map((file: Doc<"pdfFiles">) => (
              <li key={file._id} className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                <Link href={`/workspace/${file.fileID}`} className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <Image src="/pdf.png" alt="PDF" width={30} height={30} />
                  </div>
                  <span className="text-sm font-medium">{file.fileName}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HeaderComponent;