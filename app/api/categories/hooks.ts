import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UnSavedRow } from "~/types";
import { createCategory, createCategoryBulk, getCategory, getCategories, deleteCategory } from "./request";
import { Category } from "./types";

export function useCategories() {
  return useQuery<Category[], PostgrestError, Category[]>(
    ['get-categories'],
    () => getCategories()
  )
}

export function useCategory(id: string) {
  return useQuery<Category | null, PostgrestError, Category | null>(
    ['get-category', id],
    () => getCategory(id),
  )
}

export function useCreateCategory() {
  return useMutation((category: Category | UnSavedRow<Category>) => createCategory({ ...category }));
}

export function useCreateCategoryBulk() {
  const queryClient = useQueryClient();
  return useMutation(
    (categories: UnSavedRow<Category>[]) => createCategoryBulk(categories),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['get-categories'])
      }
    }
  );
}

export function useUpdateCategory() {
  return useMutation((category: Category | UnSavedRow<Category>) => createCategory({ ...category }));
}

export function useDeleteCategory() {
  return useMutation(async (id: number) => await deleteCategory(id))
}
