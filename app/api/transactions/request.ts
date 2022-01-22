import { UnSavedRow } from "~/types";
import { supabase } from "~/utils/supabase";
import { Transaction, TransactionsRequestParams } from "./types";

export const getTransactions = async ({ accountId, categoryId, limit = 50, sort, term, page, dates, excludeFromTotals }: TransactionsRequestParams = {}): Promise<Transaction[]> => {
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

  if (term) query.textSearch('description', `'${term}'`)

  if (page !== undefined) {
    const range = {
      from: (page - 1) * limit,
      to: page - 1 <= 0 ? limit : page * limit
    }
    query.range(range.from, range.to);
  }

  if (dates && dates.length) {
    if (dates[0]) {
      query.gte('date', dates[0].toLocaleDateString());
    }
    if (dates[1]) {
      query.lte('date', dates[1].toLocaleDateString());
    }
  }

  if (excludeFromTotals !== undefined) {
    query.eq('excludeFromTotals', excludeFromTotals);
  }

  if (sort) query.order(sort.column, { ascending: sort.ascending })

  const { data, error } = await query;

  if (error) throw error;

  return data ?? [];
}

export const getTransactionsCount = async ({ accountId, categoryId, term, dates, excludeFromTotals }: TransactionsRequestParams = {}): Promise<number> => {
  const query = supabase
    .from<Transaction>('transactions')
    .select('*', { count: 'exact', head: true });

  if (accountId) query.eq('account_id', accountId);
  if (categoryId) {
    if (categoryId === 'uncategorized') {
      query.is('category_id', null);
    } else {
      query.eq('category_id', categoryId);
    }
  }

  if (term) query.textSearch('description', `'${term}'`)

  if (dates && dates.length) {
    if (dates[0]) {
      query.gte('date', dates[0].toLocaleDateString());
    }
    if (dates[1]) {
      query.lte('date', dates[1].toLocaleDateString());
    }
  }

  if (excludeFromTotals !== undefined) {
    query.eq('excludeFromTotals', excludeFromTotals);
  }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
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

export const deleteTransaction = async (transaction: Transaction): Promise<Transaction | null> => {
  const { data, error } = await supabase
    .from<Transaction>('transactions')
    .delete()
    .match({ id: transaction.id })
    .single();

  if (error) throw error;

  return data;
}
