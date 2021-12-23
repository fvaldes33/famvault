import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQuery } from "react-query";
import { Secret } from '~/types';
import { client } from "~/utils/client";
import { createSecret, deleteSecret, getSecrets, getSecret, searchSecrets } from "./request";

export function useSecrets() {
  return useQuery<Secret[], PostgrestError, Secret[]>(
    ['get-secret'],
    () => getSecrets(),
  )
}

export function useSecret(uid: string) {
  return useQuery<Secret | null, PostgrestError, Secret>(
    ['get-secret', uid],
    () => getSecret(uid),
    {
      enabled: Boolean(uid),
      onSuccess: () => {
        client.invalidateQueries(['get-secrets', 'get-secret'])
      }
    }
  )
}

export function useSearchSecrets() {
  return useMutation(async (search: string) => await searchSecrets(search));
}

export function useDeleteSecret() {
  return useMutation(async (id: number) => await deleteSecret(id))
}

export function useMakeSecret() {
  return useMutation(async (secret: Secret) => await createSecret({ ...secret }));
}
