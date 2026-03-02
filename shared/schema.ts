import { z } from "zod";

export const workspaceSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.string(), // 'virtual_office', 'coworking', 'managed_office'
  description: z.string(),
  location: z.string(),
  city: z.string(),
  price: z.number(),
  capacity: z.number(),
  amenities: z.array(z.string()),
  rating: z.string(),
  isFeatured: z.boolean(),
  imageUrl: z.string(),
  available: z.boolean(),
});

export const testimonialSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.string(),
  content: z.string(),
  avatarUrl: z.string(),
  rating: z.number(),
});

export const blogSchema = z.object({
  id: z.number(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  author: z.string(),
  date: z.string(),
  imageUrl: z.string(),
  category: z.string(),
});

export const insertWorkspaceSchema = workspaceSchema.omit({ id: true });
export const insertTestimonialSchema = testimonialSchema.omit({ id: true });
export const insertBlogSchema = blogSchema.omit({ id: true });

export type Workspace = z.infer<typeof workspaceSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Blog = z.infer<typeof blogSchema>;

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
