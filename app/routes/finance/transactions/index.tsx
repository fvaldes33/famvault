import { Box, Button, Text, TextInput, Card, Container, Group, Select, Title, Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { DateRangePicker } from '@mantine/dates';
import { MagnifyingGlassIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { MetaFunction, LoaderFunction, Link, useLocation, json } from "remix";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

import { useAccounts } from "~/api/accounts";
import { useCategories } from "~/api/categories";
import { Transaction, useFilteredTransactions, useFilteredTransactionsCount } from "~/api/transactions";
import { EditableTable } from "~/components/EditableTable";
import { Sort } from "~/types";
import { formatCurrency, uncategorizedCategory } from "~/utils/helpers";
import { CategorySelector } from "~/components/CategorySelector";

dayjs.extend(objectSupport);

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {
  return json({});
}

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Finance -> Transactions | FAMVAULT | Family Password Sharing Tool",
    description: "A minimalist approach to family password sharing done right."
  };
};

type TransactionQueryKeys = {
  ascending?: boolean;
  sort?: string;
  category?: string;
  account?: string;
  term?: string;
  page?: number;
  dates?: [Date | null, Date | null]
};

type TransactionFilters = {
  category: string | undefined;
  account: string | undefined;
  term: string;
  page: number;
  dates?: [Date | null, Date | null]
}

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

// https://remix.run/guides/routing#index-routes
export default function TransactionsRoute() {
  const { search } = useLocation();
  const qs = new URLSearchParams(search);
  const categoryId = qs.has('category') ? qs.get('category') as string : undefined;

  // filters
  // const [value, setValue] = useState('');
  const [sort, setSort] = useState<Sort<Transaction>>({ column: 'date', ascending: false });
  const [filters, setFilters] = useState<TransactionFilters>({
    category: categoryId ?? undefined,
    account: undefined,
    page: 1,
    dates: [
      null,
      null
    ],
    term: ''
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
      dates: [null, null]
    })
  }

  return (
    <>
      <Container size="xl">
        <Box sx={(theme) => ({
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '40px 0 16px',
        })}>
          <Title order={5} style={{ textTransform: 'uppercase', letterSpacing: '1.5px' }}>All Transactions</Title>
          <Group>
            <Button component={Link} to="/finance/transactions/importer" color="green">
              Import
            </Button>
          </Group>
        </Box>

        <Card style={{ marginBottom: '1rem' }}>
          <Group style={{ marginBottom: '1rem' }}>
            <TextInput
              type="search"
              aria-label="Search"
              placeholder="Search transactions"
              variant="unstyled"
              size="md"
              value={filters.term}
              onChange={(e) => setFilters((prev) => ({
                ...prev,
                term: e.target.value
              }))}
              icon={isLoading ? (<Loader size="xs" />) : (<MagnifyingGlassIcon />)}
            />
          </Group>
          <Group position="apart">
            <Group>
              <DateRangePicker
                aria-label="Pick dates range"
                placeholder="Pick dates range"
                color="green"
                firstDayOfWeek="sunday"
                value={filters.dates}
                onChange={([start, end]) => setFilters((prev) => ({ ...prev, dates: [start, end]}))}
              />

              <Select
                aria-label="Accounts"
                placeholder="Accounts"
                data={(accounts || []).map((acct) => ({ label: acct.name, value: acct.id.toString() }))}
                value={filters.account}
                onChange={(newId) => {
                  //prompt
                  if (newId) {
                    setFilters((prev) => ({
                      ...prev,
                      account: newId
                    }));
                  }
                }}
              />
              <Select
                aria-label="Categories"
                placeholder="Categories"
                data={[...(categories || []), uncategorizedCategory].map((cat) => ({ label: cat.name, value: cat.id.toString() }))}
                value={filters.category}
                onChange={(newId) => {
                  //prompt
                  if (newId) {
                    setFilters((prev) => ({
                      ...prev,
                      category: newId
                    }));
                  }
                }}
              />
              <Text>Showing {(count ?? 0) > 50 ? 50 : count} of {count}</Text>
            </Group>
            <Group>
              <Button variant="light" color="green" onClick={() => {
                resetFilters();
              }}>
                Clear
              </Button>
            </Group>
          </Group>
        </Card>

        <Box>
          <EditableTable<Transaction>
            headers={[
              { label: 'Description', key: 'description', sortable: true, sortFn: setSort },
              { label: 'Account', key: 'account', sortable: false },
              { label: 'Category', key: 'category', sortable: false },
              { label: 'Amount', key: 'amount', sortable: true, sortFn: setSort },
              { label: 'Date', key: 'date', sortable: true, sortFn: setSort },
            ]}
            data={transactions ?? []}
            paginateProps={{
              total: count ? Math.ceil(count / 50) : 0,
              onPaginate: (page: number) => setFilters((prev) => ({ ...prev, page }))
            }}
            renderRow={({ category, account, ...transaction }) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{account?.name}</td>
                <td>
                  <CategorySelector
                    transaction={transaction}
                    category={category}
                    categories={categories}
                  />
                </td>
                <td>{formatCurrency(transaction.amount)}</td>
                <td>{transaction.date}</td>
              </tr>
            )}
          />
        </Box>
      </Container>
    </>
  )
}
