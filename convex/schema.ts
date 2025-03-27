import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users:defineTable({
        userName: v.string(),
        email:  v.string(),
        imagerUrl:  v.string(),
    }),

    pdfFiles: defineTable({
<<<<<<< HEAD
        fileID: v.string(),
        storageId: v.string(),
=======
        storageId: v.id("_storage"),
>>>>>>> 06c3cce27bea4b365fd51f23b838c92e6d483709
        fileName: v.string(),
        createdBy: v.string(),
    })
})

