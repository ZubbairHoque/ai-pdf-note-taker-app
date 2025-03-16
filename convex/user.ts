import { v } from "convex/values"
import { mutation } from "./_generated/server"

export const createUser = mutation({
    args: {
        email: v.string(),
        userName: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx,  args ) => {
        // validates if user alreafy exists

        const user=await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email'),args.email))
        .collect();

        if(user?.length==0)
        {
            await ctx.db.insert("users",{
                email:args.email,
                userName:args.userName,
                imagerUrl:args.imageUrl
            });

            return "user created successfully! "
        }

        // otherwise insert new user entry
    },
});

export default createUser;