import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const pdfUrl = "https://courteous-spider-354.convex.cloud/api/storage/afbff115-0c8a-4274-8baa-80dc9686da1b"
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
      pdfTextContent =pdfTextContent + doc.pageContent;
    });

    // 2. Split the text content into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
      });

    // Pass the text content as an array of strings
    const output = await textSplitter.createDocuments([pdfTextContent]);

    let splitterList = [];
    output.forEach(doc =>{
        splitterList.push(doc.pageContent)
    })

    // Return the output as a JSON response
    return NextResponse.json({ result: splitterList});
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}