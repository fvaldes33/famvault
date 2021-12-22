import { Family, UnSavedRow } from "~/types";
import { supabase } from "~/utils/supabase";

export const getFamily = async (): Promise<Family | null> => {
  const { data, error } = await supabase
    .from<Family>('families')
    .select('*, members (user_id, profiles(name, email))')
    .limit(1)
    .single();

  if (error) throw error;

  return data;
}
export const createFamily = async (family: UnSavedRow<Family>): Promise<Family | null> => {
  const { data, error } = await supabase
    .from<Family>('families')
    .upsert({
      ...family
    })
    .limit(1)
    .single();

  if (error) throw error;

  return data;
}
