import { UnSavedRow } from "~/types";
import { supabase } from "~/utils/supabase";
import { Category } from "./types";

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from<Category>('categories')
    .select('*')
    .order('name');

  if (error) throw error;

  return data ?? [];
}

export const getCategory = async (id: string): Promise<Category | null> => {
  const { data, error } = await supabase
    .from<Category>('categories')
    .select()
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}

export const createCategory = async (category: UnSavedRow<Category>): Promise<Category | null> => {
  const { data, error } = await supabase
    .from<Category>('categories')
    .upsert({
      ...category
    })
    .limit(1)
    .single();

  if (error) throw error;

  return data;
}

export const createCategoryBulk = async (categories: UnSavedRow<Category>[]): Promise<Category[] | null> => {
  const { data, error } = await supabase
    .from<Category>('categories')
    .upsert(categories);

  if (error) throw error;

  return data;
}

export const deleteCategory = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from<Category>('categories')
    .delete()
    .match({ id });

  if (error) throw error;

  return true;
}
