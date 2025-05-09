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
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.splitText.map(() => ({ fileID: args.fileID})),
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        model: "text-embedding-004", // 768 dimensions
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
    fileID: v.string()
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      model: "text-embedding-004", 
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    }), { ctx });

    const results = await vectorStore.similaritySearch(args.query, 3);
    const filteredResults = results.filter(Result => Result.metadata.fileID === args.fileID);
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