import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQuery } from "react-query";
import { Family } from '~/types';
import { createFamily, getFamily } from "./request";

export function useFamily() {
  return useQuery<Family | null, PostgrestError, Family>(
    ['get-family'],
    () => getFamily()
  )
}
export function useMakeFamily() {
  return useMutation(async (family: Family) => await createFamily({ ...family }));
}
