import { UnSavedRow } from "~/types";
import { supabase } from "~/utils/supabase";
import { Account } from "./types";

export const getAccounts = async (): Promise<Account[]> => {
  const { data, error } = await supabase
    .from<Account>('accounts')
    .select('*')
    .order('name');

  if (error) throw error;

  return data ?? [];
}

export const getAccount = async (uid: string): Promise<Account | null> => {
  const { data, error } = await supabase
    .from<Account>('accounts')
    .select()
    .eq('uid', uid)
    .single();

  if (error) throw error;

  return data;
}

export const createAccount = async (account: UnSavedRow<Account>): Promise<Account | null> => {
  const { data, error } = await supabase
    .from<Account>('accounts')
    .upsert({
      ...account
    })
    .limit(1)
    .single();

  if (error) throw error;

  return data;
}

export const createAccountBulk = async (accounts: UnSavedRow<Account>[]): Promise<Account[] | null> => {
  const { data, error } = await supabase
    .from<Account>('accounts')
    .upsert(accounts);

  if (error) throw error;

  return data;
}

export const deleteAccount = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from<Account>('accounts')
    .delete()
    .match({ id });

  if (error) throw error;

  return true;
}
