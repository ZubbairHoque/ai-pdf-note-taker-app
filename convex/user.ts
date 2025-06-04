import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createUser = mutation({
    args: {
        email: v.string(),
        userName: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx,  args ) => {
        // validates if user already exists
        const user = await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email'),args.email))
        .collect();

        if(user?.length==0)
        {
            // User doesn't exist, create a new one
            await ctx.db.insert("users",{
                email:args.email,
                userName:args.userName,
                imageUrl:args.imageUrl,
                Upgrade: false,
            });

            return { isNewUser: true, message: "User created successfully!" };
        }
        
        // User already exists
        return { isNewUser: false, message: "User already exists" };
    }
});

export const userUpgrade = mutation({
    args: {
        userEmail: v.string(),
    },
    handler: async (ctx, args) => {
        console.log("Upgrading user with email:", args.userEmail);
        const result = await ctx.db.query("users")
            .filter((q) => q.eq(q.field("email"), args.userEmail))
            .collect();
        console.log("Query result:", result);
        if (result.length > 0) {
            await ctx.db.patch(result[0]._id, { Upgrade: true });
            return "User upgraded successfully!";
        } else {
            throw new Error("User not found for upgrade.");
        }
    }
});

export const GetUserInfo = query({
    args: {
        userEmail: v.optional(v.string()),

    },
    handler:async(ctx,args)=>{
        if(!args?.userEmail)
        {
            return null;
        };
        const result = await ctx.db.query("users")
        .filter((q) => q.eq(q.field("email"), args.userEmail))
        .collect();
        return result[0] || null;
    }
});