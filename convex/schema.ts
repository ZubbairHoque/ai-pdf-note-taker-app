import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    Upgrade: v.boolean(),
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  }),

  pdfFiles: defineTable({
    fileID: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
  }).searchIndex("search_fileName", {
    searchField: "fileName",
  }),
  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 768,
  }),

  notes: defineTable({
    fileID: v.string(),
    note: v.any(),
    createdBy: v.string(),
    createdAt: v.number(), // Add a timestamp for sorting
  }),
});
