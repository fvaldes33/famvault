import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQuery } from "react-query";
import { Sort, UnSavedRow } from "~/types";
import { client } from "~/utils/client";
import { TransactionFilters } from ".";
import { getTransaction, getTransactions, createTransaction, createTransactionBulk, getTransactionsCount, deleteTransaction } from "./request";
import { Transaction, TransactionQueryKeys } from "./types";

const queryKeys = (prefix: string, { ascending, sort, category, account, term, page, dates }: TransactionQueryKeys): string[] => {
  const keys = [`get-${prefix}`];
  if (ascending) keys.push(ascending ? 'ascending' : 'descending');
  if (sort) keys.push(sort);
  if (category) keys.push(category);
  if (account) keys.push(account);
  if (term) keys.push(term);
  if (page) keys.push(`${page}`);
  if (dates) keys.push(...dates.filter(d => !!d).map(d => d!.toString()))

  return keys;
}

export function useTransactions() {
  return useQuery<Transaction[], PostgrestError, Transaction[]>(
    ['get-transactions'],
    () => getTransactions()
  )
}

export function useFilteredTransactions({
  sort,
  filters
}: {
  sort: Sort<Transaction>;
  filters: TransactionFilters;
}) {
  return useQuery<Transaction[], PostgrestError, Transaction[]>(
    queryKeys('transactions', { ...sort, ...filters }),
    () => getTransactions({
      limit: 50,
      sort,
      categoryId: filters.category,
      accountId: filters.account,
      page: filters.page,
      term: filters.term.trimEnd(),
      dates: filters.dates
    }),
  )
}

export function useFilteredTransactionsCount({
  sort,
  filters
}: {
  sort: Sort<Transaction>;
  filters: TransactionFilters;
}) {
  return useQuery<number, PostgrestError, number>(
    queryKeys('transactions-count', { ...sort, ...filters }),
    () => getTransactionsCount({
      categoryId: filters.category,
      accountId: filters.account,
      page: filters.page,
      term: filters.term.trimEnd(),
      dates: filters.dates
    })
  )
}

export function useTransaction(uid: string) {
  return useQuery<Transaction | null, PostgrestError, Transaction | null>(
    ['get-transaction', uid],
    () => getTransaction(uid),
    {
      enabled: false
    }
  )
}

export function useCreateTransaction() {
  return useMutation((transaction: Transaction | UnSavedRow<Transaction>) => createTransaction({ ...transaction }));
}

export function useUpdateTransaction() {
  return useMutation(
    (transaction: Transaction | UnSavedRow<Transaction>) => createTransaction({ ...transaction }),
    {
      onSuccess: async (data) => {
        await client.invalidateQueries(['get-transactions', 'get-transactions', data?.uid])
      }
    }
  );
}

export function useCreateTransactionBulk() {
  return useMutation((transactions: Transaction[] | UnSavedRow<Transaction>[]) => createTransactionBulk(transactions));
}

export function useDeleteTransaction() {
  return useMutation(async (id: number) => await deleteTransaction(id))
}
