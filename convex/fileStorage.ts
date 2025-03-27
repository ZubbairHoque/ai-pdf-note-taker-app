import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Generate the URL that you will upload the file to
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Mutation to save the uploaded PDF file metadata
export const savePdfFile = mutation({
  args: { 
    fileID:  v.string(),
    storageId:  v.string(), 
    fileName: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    // You can add user authentication check here if needed
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity) throw new Error("Unauthenticated");

    // Save the file metadata to your database
    const fileId = await ctx.db.insert("pdfFiles", {
      fileID: args.fileID,
      storageId: args.storageId,
      fileName: args.fileName,
      createdBy: args.createdBy,

      // You can add more fields like userId if you have authentication
    });
    
    return fileId;
  },

});