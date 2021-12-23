import { supabase } from "~/utils/supabase";
import { Profile } from '~/types';

export const getProfile = async (): Promise<Profile> => {
  const { data, error } = await supabase
    .from<Profile>('profiles')
    .select('*')
    .single();

  if (error) throw error;

  return data as Profile;
}
