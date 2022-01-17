import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQuery } from "react-query";
import { UnSavedRow } from "~/types";
import { createCategory, getCategory, getCategories, deleteCategory } from "./request";
import { Category } from "./types";

export function useCategories() {
  return useQuery<Category[], PostgrestError, Category[]>(
    ['get-categories'],
    () => getCategories(),
    {
      initialData: []
    }
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

export function useUpdateCategory() {
  return useMutation((category: Category | UnSavedRow<Category>) => createCategory({ ...category }));
}

export function useDeleteCategory() {
  return useMutation(async (id: number) => await deleteCategory(id))
}
