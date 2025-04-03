import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";

const pdfUrl = "https://courteous-spider-354.convex.cloud/api/storage/d406e480-b9d4-423a-9af6-ddc66f1f7d1a";

export async function GET(req) {
  try {
    // 1. Load the PDF file
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    // Combine the text content from all pages
    let pdfTextContent = "";
    docs.forEach((doc) => {
      pdfTextContent += doc.pageContent;
    });

    // 2. Split the text content into chunks
    const splitter = new CharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 20,
    });

    // Pass the text content as an array of strings
    const output = await splitter.createDocuments([pdfTextContent]);

    // Return the output as a JSON response
    return NextResponse.json({ message: output });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}