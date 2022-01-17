import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQuery } from "react-query";
import { UnSavedRow } from "~/types";
import { getAccount, getAccounts, createAccount, deleteAccount } from "./request";
import { Account } from "./types";

export function useAccounts() {
  return useQuery<Account[], PostgrestError, Account[]>(
    ['get-acounts'],
    () => getAccounts(),
  )
}

export function useAccount(uid: string) {
  return useQuery<Account | null, PostgrestError, Account | null>(
    ['get-acount', uid],
    () => getAccount(uid),
  )
}

export function useCreateAccount() {
  return useMutation((account: Account | UnSavedRow<Account>) => createAccount({ ...account }));
}

export function useDeleteAccount() {
  return useMutation(async (id: number) => await deleteAccount(id))
}
