import { db } from "./db";
import {
  workspaces,
  type Workspace,
  type InsertWorkspace,
  type WorkspaceQueryParams
} from "@shared/schema";
import { eq, and, gte, lte, arrayContains } from "drizzle-orm";

export interface IStorage {
  getWorkspaces(params?: WorkspaceQueryParams): Promise<Workspace[]>;
  getWorkspace(id: number): Promise<Workspace | undefined>;
  createWorkspace(workspace: InsertWorkspace): Promise<Workspace>;
}

export class DatabaseStorage implements IStorage {
  async getWorkspaces(params?: WorkspaceQueryParams): Promise<Workspace[]> {
    let query = db.select().from(workspaces).$dynamic();
    
    if (params) {
      const conditions = [];
      
      if (params.city) {
        conditions.push(eq(workspaces.city, params.city));
      }
      if (params.type) {
        conditions.push(eq(workspaces.type, params.type));
      }
      if (params.minPrice !== undefined) {
        conditions.push(gte(workspaces.price, params.minPrice));
      }
      if (params.maxPrice !== undefined) {
        conditions.push(lte(workspaces.price, params.maxPrice));
      }
      if (params.minCapacity !== undefined) {
        conditions.push(gte(workspaces.capacity, params.minCapacity));
      }
      if (params.amenities && params.amenities.length > 0) {
        conditions.push(arrayContains(workspaces.amenities, params.amenities));
      }
      if (params.available !== undefined) {
        conditions.push(eq(workspaces.available, params.available));
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }

    return await query;
  }

  async getWorkspace(id: number): Promise<Workspace | undefined> {
    const [workspace] = await db.select().from(workspaces).where(eq(workspaces.id, id));
    return workspace;
  }

  async createWorkspace(insertWorkspace: InsertWorkspace): Promise<Workspace> {
    const [workspace] = await db.insert(workspaces).values(insertWorkspace).returning();
    return workspace;
  }
}

export const storage = new DatabaseStorage();
