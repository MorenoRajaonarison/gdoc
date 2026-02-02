import { query } from "./_generated/server";

export const getDocuments = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("documents").collect();
    }
});