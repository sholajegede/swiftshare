import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createFile = mutation({
  args: {
    userId: v.id("users"),
    accountId: v.string(),
    name: v.string(),
    type: v.string(), //document, image, video, audio, other
    url: v.string(),
    storageId: v.id("_storage"),
    extension: v.optional(v.string()),
    size: v.optional(v.number()),
    users: v.optional(v.array(v.string())) //users to share to
  },
  handler: async (ctx, args) => {
    const newFileId = await ctx.db.insert("files", {
      userId: args.userId,
      accountId: args.accountId,
      name: args.name,
      type: args.type,
      url: args.url,
      storageId: args.storageId,
      extension: args.extension,
      size: args.size,
      users: args.users
    });

    return newFileId;
  },
});

export const updateFile = mutation({
  args: {
    fileId: v.id("files"),
    userId: v.optional(v.id("users")),
    accountId: v.optional(v.string()),
    name: v.optional(v.string()),
    type: v.optional(v.string()), //document, image, video, audio, other
    url: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    extension: v.optional(v.string()),
    size: v.optional(v.number()),
    users: v.optional(v.array(v.string())) //users to share to
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId)

    if (!file) {
      throw new ConvexError("file not found")
    }

    const updateFields = {
      ...(args.userId !== undefined && {
        userId: args.userId,
      }),
      ...(args.accountId !== undefined && {
        accountId: args.accountId,
      }),
      ...(args.name !== undefined && { name: args.name }),
      ...(args.type !== undefined && {
        type: args.type,
      }),
      ...(args.url !== undefined && {
        url: args.url,
      }),
      ...(args.storageId !== undefined && {
        storageId: args.storageId,
      }),
      ...(args.extension !== undefined && {
        extension: args.extension,
      }),
      ...(args.size !== undefined && {
        size: args.size,
      }),
      ...(args.users !== undefined && {
        users: args.users,
      }),
    }

    await ctx.db.patch(args.fileId, updateFields)

    return args.fileId;
  },
});

export const deleteFile = mutation({
  args: {
    fileId: v.id("files"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId)

    if (!file) {
      throw new ConvexError(`File with ID ${args.fileId} not found.`);
    }

    await ctx.storage.delete(args.storageId);

    return await ctx.db.delete(args.fileId);
  },
});

export const getFileById = query({
  args: {
    fileId: v.id("files"),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId)

    return file
  },
});

export const getSingleFileByUserId = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const { userId } = args

    const file = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("userId"), userId))
      .unique()

    return file
  },
});

export const getUserFiles = query({
  args: {
    userId: v.optional(v.id("users")),
    searchText: v.optional(v.string()),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, searchText, type } = args;

    let query = ctx.db.query("files")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc");

    if (type) {
      query = query.filter((q) => q.eq(q.field("type"), type));
    }

    let results = await query.collect();

    if (searchText) {
      results = results.filter((file) =>
        file?.name?.includes(searchText) ||
        file?.type?.includes(searchText) ||
        file?.extension?.includes(searchText)
      );
    }

    return results;
  },
});

export const getFilesByType = query({
  args: {
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const { type } = args

    const files = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("type"), type))
      .order("desc")
      .collect()

    return files
  },
});

export const getAllFiles = query({
  handler: async (ctx) => {
    return await ctx.db.query("files").order("desc").collect()
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