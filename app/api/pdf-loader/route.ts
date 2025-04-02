import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
const pdfUrl ="https://courteous-spider-354.convex.cloud/api/storage/d406e480-b9d4-423a-9af6-ddc66f1f7d1a"
interface Request {
    method: string;
    headers: Headers;
    body?: any;
}

interface Document {
    pageContent: string;
}

interface SplitterOutput {
    pageContent: string;
}

export async function POST(req: Request): Promise<NextResponse> {
    // 1. load pdf file
    const response: Response = await fetch(pdfUrl);
    const data: Blob = await response.blob();
    const loader: WebPDFLoader = new WebPDFLoader(data);
    const docs: Document[] = await loader.load();

    let pdfTextContent: string = " ";
    docs.forEach((doc: Document) => {
        pdfTextContent = pdfTextContent + doc.pageContent;
    });

    // 2. split the text content into chunks
    const splitter: CharacterTextSplitter = new CharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
    const output: SplitterOutput[] = await splitter.createDocuments([pdfTextContent]);

    let splitterList: string[] = [];
    output.forEach((dpc: SplitterOutput) => {
        splitterList.push(dpc.pageContent);
    });

    return NextResponse.json({ message: splitterList });
}