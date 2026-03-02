import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type WorkspaceQueryParams, type WorkspaceInput } from "@shared/routes";
import { staticWorkspaces } from "@shared/static-data";

export function useWorkspaces(params?: WorkspaceQueryParams) {
  return useQuery({
    queryKey: ["workspaces", params],
    queryFn: async () => {
      let results = [...staticWorkspaces];

      if (params) {
        if (params.city) {
          results = results.filter((w) => w.city === params.city);
        }
        if (params.type) {
          results = results.filter((w) => w.type === params.type);
        }
        if (params.minPrice !== undefined) {
          results = results.filter((w) => w.price >= params.minPrice!);
        }
        if (params.maxPrice !== undefined) {
          results = results.filter((w) => w.price <= params.maxPrice!);
        }
        if (params.minCapacity !== undefined) {
          results = results.filter((w) => w.capacity >= params.minCapacity!);
        }
        if (params.amenities) {
          const amenityList = typeof params.amenities === 'string'
            ? params.amenities.split(',').map((a: string) => a.trim())
            : params.amenities;

          results = results.filter((w) =>
            amenityList.every((a: string) => w.amenities.includes(a))
          );
        }
        if (params.available !== undefined) {
          results = results.filter((w) => w.available === params.available);
        }
      }

      return results;
    },
  });
}

export function useWorkspace(id: number) {
  return useQuery({
    queryKey: ["workspace", id],
    queryFn: async () => {
      const workspace = staticWorkspaces.find(w => w.id === id);
      if (!workspace) return null;
      return workspace;
    },
    enabled: !!id && !isNaN(id),
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: WorkspaceInput) => {
      // For static app, we just simulate a successful storage
      console.log("Mock creating workspace:", data);
      return { id: Math.random(), ...data, rating: "5.0", available: true } as any;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
}
