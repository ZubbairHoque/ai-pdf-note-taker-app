import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action, mutation } from "./_generated/server.js";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.array(v.string()),
    fileID: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Ingesting Text:", args.splitText);
    console.log("File ID:", args.fileID);

    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.splitText.map(() => ({ fileID: args.fileID })), // Use fileID as the metadata key
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileID: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Search Query:", args.query);
    console.log("File ID:", args.fileID);

    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const results = await vectorStore.similaritySearch(args.query, 5);
    console.log("Raw Results:", results);

    const filteredResults = results.filter(
      (result) => result.metadata.fileID === args.fileID
    );
    console.log("Filtered Results:", filteredResults);

    return JSON.stringify(filteredResults);
  },
});

export const checkFileId = mutation({
  args: {
    fileID: v.string(),
  },
  handler: async (ctx, { fileID }) => {
    const result = await ctx.db
      .query("documents")
      .filter(q => q.eq(q.field("metadata.fileId"), fileID))
      .collect();
    return result.length > 0;
  }
});