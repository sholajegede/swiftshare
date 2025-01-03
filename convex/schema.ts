import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    kindeId: v.string(),
    orgId: v.string(),
    username: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    permissions: v.optional(v.string()), // create, read, update, delete
  }),

  files: defineTable({
    userId: v.id("users"),
    accountId: v.string(), //orgId from users
    name: v.string(),
    type: v.string(), //document, image, video, audio, other
    url: v.string(),
    storageId: v.id("_storage"),
    extension: v.optional(v.string()),
    size: v.optional(v.number()),
    users: v.optional(v.array(v.string())), //users to share to
  }),
});