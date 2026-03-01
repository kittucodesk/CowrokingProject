import { pgTable, text, serial, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'virtual_office', 'coworking', 'managed_office'
  description: text("description").notNull(),
  location: text("location").notNull(),
  city: text("city").notNull(),
  price: integer("price").notNull(), // monthly price
  capacity: integer("capacity").notNull(),
  amenities: text("amenities").array().notNull(),
  rating: numeric("rating").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  imageUrl: text("image_url").notNull(),
  available: boolean("available").default(true).notNull(),
});

export const insertWorkspaceSchema = createInsertSchema(workspaces).omit({ id: true });

export type Workspace = typeof workspaces.$inferSelect;
export type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>;

// Request Types
export type WorkspaceQueryParams = {
  city?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
  amenities?: string[];
  available?: boolean;
};

// Response Types
export type WorkspaceResponse = Workspace;
export type WorkspaceListResponse = Workspace[];
