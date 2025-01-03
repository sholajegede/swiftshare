import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";

export const createUserKinde = internalMutation({
  args: {
    kindeId: v.string(),
    orgId: v.string(),
    email: v.string(),
    username: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    permissions: v.optional(v.string()), // create, read, update, delete
  },
  handler: async (ctx, args) => {
    try {
      await ctx.db.insert("users", {
        kindeId: args.kindeId,
        orgId: args.orgId,
        email: args.email,
        username: args.username || "",
        imageUrl: args.imageUrl,
        imageStorageId: args.imageStorageId,
        permissions: args.permissions
      });
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
    orgId: v.string(),
    email: v.optional(v.string()),
    username: v.optional(v.string())
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
      ...(args.orgId !== undefined && { orgId: args.orgId }),
      ...(args.email !== undefined && { email: args.email }),
      ...(args.username !== undefined && { username: args.username })
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
    email: v.string(),
    username: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    permissions: v.optional(v.string()), // create, read, update, delete
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
      ...(args.permissions !== undefined && { permissions: args.permissions }),
      ...(args.email !== undefined && { email: args.email }),
      ...(args.username !== undefined && { username: args.username })
    };

    await ctx.db.patch(args.userId, updateFields);
    return args.userId;
  },
});

export const getUserByKindeId = query({
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

export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query('users').order('desc').collect()
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