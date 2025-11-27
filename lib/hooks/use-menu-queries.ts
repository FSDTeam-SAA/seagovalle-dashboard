"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";
import {
  MenuItem,
  MenuFormData,
  MenuApiResponse,
} from "@/lib/services/menu-service";
import { AxiosError } from "axios";
import { format } from "path";

// Query keys for menu operations
export const menuQueryKeys = {
  all: ["menu"] as const,
  lists: () => [...menuQueryKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) =>
    [...menuQueryKeys.lists(), { ...filters }] as const,
  details: () => [...menuQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...menuQueryKeys.details(), id] as const,
};

// Hook to fetch all menus (public)
export function useGetMenus(): UseQueryResult<MenuApiResponse, AxiosError> {
  return useQuery({
    queryKey: menuQueryKeys.list(),
    queryFn: async () => {
      const response = await axiosInstance.get<MenuApiResponse>(
        "/menu/all-menus"
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook to fetch all menus (admin)
export function useAdminGetMenus(): UseQueryResult<
  MenuApiResponse,
  AxiosError
> {
  return useQuery({
    queryKey: [...menuQueryKeys.lists(), "admin"],
    queryFn: async () => {
      const response = await axiosInstance.get<MenuApiResponse>("/menu/all");
      return response.data;
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

// Hook to fetch single menu item
export function useGetMenu(
  id: string
): UseQueryResult<MenuApiResponse, AxiosError> {
  return useQuery({
    queryKey: menuQueryKeys.detail(id),
    queryFn: async () => {
      const response = await axiosInstance.get<MenuApiResponse>(`/menu/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook to create new menu item
export function useCreateMenu(): UseMutationResult<
  MenuItem,
  AxiosError,
  MenuFormData,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: MenuFormData) => {
      const data = new FormData();

      // Append form fields
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("description", formData.description);

      // price can be either legacy object { small, medium, large } or an array -> handle both
      if (Array.isArray(formData.price)) {
        formData.price.forEach((p) => data.append("price", String(p)));
      } else if (formData.price && typeof formData.price === "object") {
        data.append("price[small]", String((formData.price as any).small || ""));
        data.append("price[medium]", String((formData.price as any).medium || ""));
        data.append("price[large]", String((formData.price as any).large || ""));
      }

      // append sizes and pieces if present (arrays)
      if (Array.isArray((formData as any).sizes)) {
        (formData as any).sizes.forEach((s: any) => data.append("sizes", String(s)));
      }
      if (Array.isArray((formData as any).pieces)) {
        (formData as any).pieces.forEach((p: any) => data.append("pieces", String(p)));
      }

      // Append images
      formData.images.forEach((image) => {
        data.append("images", image);
      });

      const response = await axiosInstance.post<MenuItem>(
        "/menu/new-menu",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuQueryKeys.lists() });
    },
  });
}

// Hook to update menu item
export function useUpdateMenu(
  id: string
): UseMutationResult<MenuItem, AxiosError, MenuFormData, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: MenuFormData) => {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("description", formData.description);

      // Handle both array and legacy object shapes for price
      if (Array.isArray(formData.price)) {
        formData.price.forEach((p) => data.append("price", String(p)));
      } else if (formData.price && typeof formData.price === "object") {
        data.append("price[small]", String((formData.price as any).small || ""));
        data.append("price[medium]", String((formData.price as any).medium || ""));
        data.append("price[large]", String((formData.price as any).large || ""));
      }

      // append sizes and pieces if present (arrays)
      if (Array.isArray((formData as any).sizes)) {
        (formData as any).sizes.forEach((s: any) => data.append("sizes", String(s)));
      }
      if (Array.isArray((formData as any).pieces)) {
        (formData as any).pieces.forEach((p: any) => data.append("pieces", String(p)));
      }

      // Append new images
      formData.images.forEach((image) => {
        data.append("images", image);
      });

      console.log(formData);

      // Append existing images to keep
      if (formData.existingImages?.length) {
        formData.existingImages.forEach((img) => {
          data.append("existingImages", img);
        });
      }

      const response = await axiosInstance.put<MenuItem>(
        `/menu/update-menu/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    onSuccess: (updatedItem) => {
      queryClient.setQueryData(menuQueryKeys.detail(id), updatedItem);
      queryClient.invalidateQueries({ queryKey: menuQueryKeys.lists() });
    },
  });
}

// Hook to delete menu item
export function useDeleteMenu(): UseMutationResult<
  void,
  AxiosError,
  string,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/menu/delete-menu/${id}`);
    },
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: menuQueryKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: menuQueryKeys.lists() });
    },
  });
}

// Hook to toggle menu status
export function useToggleMenuStatus(): UseMutationResult<
  MenuItem,
  AxiosError,
  string,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.put<MenuItem>(
        `/menu/toggle-status/${id}`
      );
      return response.data;
    },
    onSuccess: (updatedItem, id) => {
      queryClient.setQueryData(menuQueryKeys.detail(id), updatedItem);
      queryClient.invalidateQueries({ queryKey: menuQueryKeys.lists() });
    },
  });
}
