import { pgTable, text, serial, integer, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
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

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  rating: integer("rating").notNull(),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
});

export const insertWorkspaceSchema = createInsertSchema(workspaces).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertBlogSchema = createInsertSchema(blogs).omit({ id: true });

export type Workspace = typeof workspaces.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Blog = typeof blogs.$inferSelect;

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
