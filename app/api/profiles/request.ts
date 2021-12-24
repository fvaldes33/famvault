import { supabase } from "~/utils/supabase";
import { Profile } from '~/types';

export const getProfile = async (userId: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from<Profile>('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;

  return data as Profile;
}
