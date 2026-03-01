import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type WorkspaceQueryParams, type WorkspaceInput } from "@shared/routes";

// Utility to parse error properly
function parseZodError(error: unknown) {
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
}

export function useWorkspaces(params?: WorkspaceQueryParams) {
  return useQuery({
    queryKey: [api.workspaces.list.path, params],
    queryFn: async () => {
      // Build query string
      const url = new URL(api.workspaces.list.path, window.location.origin);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            if (Array.isArray(value)) {
              url.searchParams.append(key, value.join(','));
            } else {
              url.searchParams.append(key, String(value));
            }
          }
        });
      }

      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch workspaces");
      
      const data = await res.json();
      return api.workspaces.list.responses[200].parse(data);
    },
  });
}

export function useWorkspace(id: number) {
  return useQuery({
    queryKey: [api.workspaces.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.workspaces.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch workspace");
      
      const data = await res.json();
      return api.workspaces.get.responses[200].parse(data);
    },
    enabled: !!id && !isNaN(id),
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: WorkspaceInput) => {
      const validated = api.workspaces.create.input.parse(data);
      const res = await fetch(api.workspaces.create.path, {
        method: api.workspaces.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const errData = await res.json();
          throw new Error(errData.message || "Validation failed");
        }
        throw new Error("Failed to create workspace");
      }
      
      const responseData = await res.json();
      return api.workspaces.create.responses[201].parse(responseData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.workspaces.list.path] });
    },
  });
}
