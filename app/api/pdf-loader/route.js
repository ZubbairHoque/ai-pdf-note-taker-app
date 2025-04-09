import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function GET(req) {
  try {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const pdfUrl = searchParams.get("pdfUrl");

    if (!pdfUrl) {
      console.error("No PDF URL provided");
      return NextResponse.json({ error: "No PDF URL provided" }, { status: 400 });
    }

    // Fetch the PDF file
    let response;
    try {
      response = await fetch(pdfUrl);
      if (!response.ok) {
        console.error("Failed to fetch PDF:", response.statusText);
        return NextResponse.json({ error: "Failed to fetch PDF" }, { status: response.status });
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);
      return NextResponse.json({ error: "Error fetching PDF" }, { status: 500 });
    }

    // Load the PDF
    let docs;
    try {
      const data = await response.blob();
      const loader = new WebPDFLoader(data);
      docs = await loader.load();
    } catch (error) {
      console.error("Error loading PDF:", error);
      return NextResponse.json({ error: "Error loading PDF" }, { status: 500 });
    }

    // Combine text content
    let pdfTextContent = "";
    docs.forEach((doc) => {
      pdfTextContent += doc.pageContent;
    });

    if (!pdfTextContent) {
      console.error("No text content extracted from PDF");
      return NextResponse.json({ error: "No text content extracted from PDF" }, { status: 500 });
    }

    // Split the text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 20,
    });

    let output;
    try {
      output = await textSplitter.createDocuments([pdfTextContent]);
    } catch (error) {
      console.error("Error splitting text:", error);
      return NextResponse.json({ error: "Error splitting text" }, { status: 500 });
    }

    const splitterList = output.map((doc) => doc.pageContent);

    // Return the output as a JSON response
    return NextResponse.json({ result: splitterList });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}