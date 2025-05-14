import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const AddNotes = mutation({
    args:{
        fileID:v.string(),
        note:v.any(),
        createdBy:v.string(),
    },
    handler:async(ctx, args) => {
        const recordID = await ctx.db.query("notes")
        .filter((q) => q.eq(q.field("fileID"), args.fileID))
        .collect();

    if (recordID.length === 0) 
    {
        await ctx.db.insert("notes", {
            fileID: args.fileID,
            note: args.note,
            createdBy: args.createdBy,
        })
    }
    else {
        await ctx.db.patch(recordID[0]._id, {
            note: args.note,
        })
    }
    }
})

export const GetNotes = mutation({
    args:{
        fileID:v.string(),
    },
    handler:async(ctx, args) => {
        const record = await ctx.db.query("notes")
        .filter((q) => q.eq(q.field("fileID"), args.fileID))
        .collect();
        return record[0]?.note || null;
    }
})
    