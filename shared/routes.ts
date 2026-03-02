import { z } from 'zod';
import { insertWorkspaceSchema, type Workspace, type WorkspaceQueryParams } from './schema';

export type WorkspaceInput = z.infer<typeof insertWorkspaceSchema>;
export type WorkspaceResponse = Workspace;
export type WorkspaceListResponse = Workspace[];

export { type WorkspaceQueryParams };
