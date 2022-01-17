import { UnSavedRow } from "~/types";
import { supabase } from "~/utils/supabase";
import { Transaction, TransactionsRequestParams } from "./types";

export const getTransactions = async ({ accountId, categoryId, limit, sort, term }: TransactionsRequestParams = {}): Promise<Transaction[]> => {
  const query = supabase
    .from<Transaction>('transactions')
    .select('*, account:accounts(*), category:categories(*)');

  if (accountId) query.eq('account_id', accountId);
  if (categoryId) {
    if (categoryId === 'uncategorized') {
      query.is('category_id', null);
    } else {
      query.eq('category_id', categoryId);
    }
  }

  if (term) query.textSearch('description', `${term.replace(' ', ' | ')}`)

  if (limit) query.limit(limit);
  if (sort) query.order(sort.column, { ascending: sort.ascending })

  const { data, error } = await query;

  if (error) throw error;

  return data ?? [];
}

export const getTransaction = async (uid: string): Promise<Transaction | null> => {
  const { data, error } = await supabase
    .from<Transaction>('transactions')
    .select()
    .eq('uid', uid)
    .single();

  if (error) throw error;

  return data;
}

export const createTransaction = async (transaction: UnSavedRow<Transaction>): Promise<Transaction | null> => {
  const { data, error } = await supabase
    .from<Transaction>('transactions')
    .upsert({
      ...transaction
    })
    .limit(1)
    .single();

  if (error) throw error;

  return data;
}

export const createTransactionBulk = async (transactions: UnSavedRow<Transaction>[]): Promise<Transaction[] | null> => {
  const { data, error } = await supabase
    .from<Transaction>('transactions')
    .upsert(transactions);

  if (error) throw error;

  return data;
}

export const deleteTransaction = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from<Transaction>('transactions')
    .delete()
    .match({ id });

  if (error) throw error;

  return true;
}
