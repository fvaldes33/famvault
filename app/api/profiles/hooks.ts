import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "react-query";
import { Profile } from '~/types';
import { getProfile } from "./request";

export function useProfile() {
  return useQuery<Profile, PostgrestError, Profile>(
    ['get-profile'],
    () => getProfile(),
  )
}
