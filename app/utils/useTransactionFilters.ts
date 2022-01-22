import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";
import { useAccounts } from "~/api/accounts";
import { useCategories } from "~/api/categories";
import { Transaction, TransactionFilters, useFilteredTransactions, useFilteredTransactionsCount } from "~/api/transactions";
import { Sort } from "~/types";

export function useTransactionFilters({
  initialFilters
}: {
    initialFilters: Partial<TransactionFilters>
}) {

  const [sort, setSort] = useState<Sort<Transaction>>({ column: 'date', ascending: false });
  const [filters, setFilters] = useState<TransactionFilters>(() => {
    return Object.assign({}, {
      category: undefined,
      account: undefined,
      page: 1,
      limit: 50,
      dates: [
        null,
        null
      ],
      term: '',
    }, initialFilters)
  });
  const [debouncedFilters] = useDebouncedValue(filters, 500, { leading: true });

  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();

  const { data: transactions, isLoading } = useFilteredTransactions({
    sort,
    filters: debouncedFilters,
  })

  const { data: count } = useFilteredTransactionsCount({
    sort,
    filters: debouncedFilters,
  })

  const resetFilters = () => {
    setFilters({
      category: undefined,
      account: undefined,
      term: '',
      page: 1,
      dates: [null, null],
      ...initialFilters
    })
  }

  return {
    accounts,
    categories,
    count,
    filters,
    sort,
    transactions,
    loading: isLoading,
    setSort,
    setFilters,
    resetFilters
  };
}
