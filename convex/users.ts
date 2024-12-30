import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";

export const createUserKinde = internalMutation({
  args: {
    kindeId: v.string(),
    email: v.string(),
    username: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    notificationType: v.optional(v.string()),
    communication_updates: v.optional(v.boolean()), // true or false : default = true
    marketing_updates: v.optional(v.boolean()), // true or false
    social_updates: v.optional(v.boolean()), // true or false
    security_updates: v.optional(v.boolean()), // true or false : default = true
    stripeId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    try {
      const newUserId = await ctx.db.insert("users", {
        kindeId: args.kindeId,
        email: args.email,
        username: args.username || "",
        imageUrl: args.imageUrl,
        imageStorageId: args.imageStorageId,
        notificationType: "all",
        communication_updates: true,
        marketing_updates: false,
        social_updates: false,
        security_updates: true,
        stripeId: args.stripeId || ""
      });
      const updatedUser = await ctx.db.get(newUserId);

      return updatedUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new ConvexError("Failed to create user.");
    }
  }
});

export const getUserKinde = internalQuery({
  args: { kindeId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("kindeId"), args.kindeId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const updateUserKinde = internalMutation({
  args: {
    kindeId: v.string(),
    imageUrl: v.optional(v.string()),
    email: v.optional(v.string()),
    username: v.optional(v.string()),
    stripeId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("kindeId"), args.kindeId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateFields = {
      ...(args.kindeId !== undefined && { kindeId: args.kindeId }),
      ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
      ...(args.email !== undefined && { email: args.email }),
      ...(args.username !== undefined && { username: args.username }),
      ...(args.stripeId !== undefined && { stripeId: args.stripeId })
    };

    await ctx.db.patch(user._id, updateFields);
    return user._id;
  },
});

export const deleteUserKinde = internalMutation({
  args: { kindeId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("kindeId"), args.kindeId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});

export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    email: v.optional(v.string()),
    username: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    notificationType: v.optional(v.string()),
    communication_updates: v.optional(v.boolean()), // true or false : default = true
    marketing_updates: v.optional(v.boolean()), // true or false
    social_updates: v.optional(v.boolean()), // true or false
    security_updates: v.optional(v.boolean()), // true or false : default = true
    stripeId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateFields = {
      ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
      ...(args.imageStorageId !== undefined && { imageStorageId: args.imageStorageId }),
      ...(args.notificationType !== undefined && { notificationType: args.notificationType }),
      ...(args.communication_updates !== undefined && { communication_updates: args.communication_updates }),
      ...(args.marketing_updates !== undefined && { marketing_updates: args.marketing_updates }),
      ...(args.social_updates !== undefined && { social_updates: args.social_updates }),
      ...(args.security_updates !== undefined && { security_updates: args.security_updates }),
      ...(args.email !== undefined && { email: args.email }),
      ...(args.username !== undefined && { username: args.username }),
      ...(args.stripeId !== undefined && { stripeId: args.stripeId })
    };

    await ctx.db.patch(args.userId, updateFields);
    return args.userId;
  },
});

export const getUserByKindeId = query({
  args: { kindeId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("kindeId"), args.kindeId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const getUserByConvexId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  }
});

export const deleteAndUpdateImage = mutation({
  args: {
    userId: v.id("users"),
    oldImageStorageId: v.id('_storage'),
    newImageUrl: v.string(),
    newImageStorageId: v.id("_storage")
  },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.oldImageStorageId);

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateProfileImage = {
      ...(args.newImageUrl !== undefined && { imageUrl: args.newImageUrl }),
      ...(args.newImageStorageId !== undefined && { imageStorageId: args.newImageStorageId })
    };

    await ctx.db.patch(args.userId, updateProfileImage);
  },
});

export const saveNewProfileImage = mutation({
  args: {
    userId: v.id("users"),
    newImageUrl: v.string(),
    newImageStorageId: v.id("_storage")
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateProfileImage = {
      ...(args.newImageUrl !== undefined && { imageUrl: args.newImageUrl }),
      ...(args.newImageStorageId !== undefined && { imageStorageId: args.newImageStorageId })
    };

    await ctx.db.patch(args.userId, updateProfileImage);
  },
});

export const deleteUser = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new ConvexError("User not found");
    }

    return await ctx.db.delete(args.userId);
  },
});

export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query('users').order('desc').collect()
  },
});