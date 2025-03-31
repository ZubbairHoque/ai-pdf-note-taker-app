import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
const pdfUrl ="https://courteous-spider-354.convex.cloud/api/storage/d406e480-b9d4-423a-9af6-ddc66f1f7d1a"
export async function Get(req){

    //1. load pdf file
    const response= await fetch(pdfUrl);
    const data =await response.blob();
    const loader= new WebPDFLoader(data);
    const docs= await loader.load();

    let pdfTextContent=" ";
    docs.forEach(doc=>{
        pdfTextContent=pdfTextContent+doc.pageContent;
    })


    // 2. split the text content into chunks

    const splitter =new CharacterTextSplitter({
        chunkSize:100,
        chunkOverlap:20,
    });
    const output = await splitter.createDocuments({pdfTextContent})



    return NextResponse.json({message:output});
}