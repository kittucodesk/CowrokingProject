import { z } from 'zod';
import { insertWorkspaceSchema, workspaces } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  workspaces: {
    list: {
      method: 'GET' as const,
      path: '/api/workspaces' as const,
      input: z.object({
        city: z.string().optional(),
        type: z.string().optional(),
        minPrice: z.coerce.number().optional(),
        maxPrice: z.coerce.number().optional(),
        minCapacity: z.coerce.number().optional(),
        amenities: z.string().optional(), // Comma-separated
        available: z.coerce.boolean().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof workspaces.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/workspaces/:id' as const,
      responses: {
        200: z.custom<typeof workspaces.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/workspaces' as const,
      input: insertWorkspaceSchema,
      responses: {
        201: z.custom<typeof workspaces.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type WorkspaceInput = z.infer<typeof api.workspaces.create.input>;
export type WorkspaceResponse = z.infer<typeof api.workspaces.create.responses[201]>;
export type WorkspaceListResponse = z.infer<typeof api.workspaces.list.responses[200]>;
