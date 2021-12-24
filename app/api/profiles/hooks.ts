import { PostgrestError, User } from "@supabase/supabase-js";
import { useQuery } from "react-query";
import { Profile } from '~/types';
import { getProfile } from "./request";

export function useProfile(user: User) {
  return useQuery<Profile, PostgrestError, Profile>(
    ['get-profile', user.id],
    () => getProfile(user.id),
    {
      enabled: Boolean(user.id),
    }
  )
}
