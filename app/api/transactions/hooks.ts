import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQuery } from "react-query";
import { UnSavedRow } from "~/types";
import { client } from "~/utils/client";
import { getTransaction, getTransactions, createTransaction, createTransactionBulk, deleteTransaction } from "./request";
import { Transaction, TransactionsRequestParams } from "./types";

export function useTransactions() {
  return useQuery<Transaction[], PostgrestError, Transaction[]>(
    ['get-transactions'],
    () => getTransactions()
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
