import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
    fiLeUrl: v.string(),
    createdBy: v.string(),

  },
  handler: async (ctx, args) => {
    // You can add user authentication check here if needed
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity) throw new Error("Unauthenticated");

    // Save the file metadata to your database
    const fileID = await ctx.db.insert("pdfFiles", {

      fileID: args.fileID,
      storageId: args.storageId,
      fileName: args.fileName,
      fileUrl:args.fiLeUrl,
      createdBy: args.createdBy,

      // You can add more fields like userId if you have authentication
    });
    
    return fileID;
  },

});

export const getFileUrl=mutation({
  args:{
    storage:v.string()
  },
  handler:async(ctx,args)=>{
    const url=await ctx.storage.getUrl(args.storage)
    return url;
  }
})

export const GetFileRecord=query({
  args:{
    fileID:v.string()
  },
  handler:async(ctx,args)=>{
     const result = await ctx.db.query("pdfFiles").filter((q)=>q.eq(q.field("fileID"),args.fileID))
    .collect()
    console.log(result);
    return result;
  }
})