import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const AddNotes = mutation({
    args:{
        fileID:v.string(),
        note:v.any(),
        createdBy:v.string(),
    },
    handler:async(ctx, args) => {
        await ctx.db.insert("notes", {
            fileID: args.fileID,
            note: args.note,
            createdBy: args.createdBy,
            createdAt: Date.now(),
        });
    }
});

export const GetNotes = query({
    args: { fileID: v.string() },
    handler: async (ctx, args) => {
        const records = await ctx.db.query("notes")
            .filter((q) => q.eq(q.field("fileID"), args.fileID))
            .order("desc") // newest first
            .collect();
        return records;
    }
});

export const DeleteNote = mutation({
  args: { _id: v.id("notes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args._id);
  },
});
