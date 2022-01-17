import { Box, Button, TextInput, Card, Container, Group, Select, Title, Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { MagnifyingGlassIcon } from "@modulz/radix-icons";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { MetaFunction, LoaderFunction, Link, useLocation, json } from "remix";
import { useAccounts } from "~/api/accounts";
import { useCategories } from "~/api/categories";
import { getTransactions, Transaction, useUpdateTransaction } from "~/api/transactions";
import { EditableTable } from "~/components/EditableTable";
import { Sort } from "~/types";
import { formatCurrency, uncategorizedCategory } from "~/utils/helpers";

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
  term?: string
};

const queryKeys = ({ ascending, sort, category, account, term }: TransactionQueryKeys): string[] => {
  const keys = ['get-transactions'];
  if (ascending) keys.push(ascending ? 'ascending' : 'descending');
  if (sort) keys.push(sort);
  if (category) keys.push(category);
  if (account) keys.push(account);
  if (term) keys.push(term);

  return keys;
}

// https://remix.run/guides/routing#index-routes
export default function TransactionsRoute() {
  const { search } = useLocation();
  const qs = new URLSearchParams(search);
  const categoryId = qs.has('category') ? qs.get('category') as string : undefined;

  const [sort, setSort] = useState<Sort<Transaction>>({ column: 'date', ascending: false });
  const [filters, setFilters] = useState<{ category: string | undefined; account: string | undefined; term: string}>({
    category: categoryId ?? undefined,
    account: undefined,
    term: ''
  });

  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500, { leading: true });

  const updateTransaction = useUpdateTransaction();
  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();

  const { data: transactions, isLoading } = useQuery(
    queryKeys({ ...sort, ...filters }),
    () => getTransactions({
      limit: 100,
      sort,
      categoryId: filters.category,
      accountId: filters.account,
      term: debounced
    }),
  );

  const resetFilters = () => {
    setFilters({
      category: undefined,
      account: undefined,
      term: ''
    })
    setValue('');
  }

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      term: debounced
    }))
  }, [debounced])

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
          <Group position="apart">
            <TextInput
              type="search"
              aria-label="Search"
              placeholder="Search transactions"
              variant="unstyled"
              size="md"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              icon={isLoading ? (<Loader size="xs" />) : (<MagnifyingGlassIcon />)}
            />

            <Group>
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
            renderRow={({ category, account, ...transaction }) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{account?.name}</td>
                <td>
                  <Select
                    aria-label="Category"
                    data={(categories||[]).map((cat) => ({ label: cat.name, value: cat.id.toString() }))}
                    defaultValue={category?.id.toString()}
                    onChange={(newId) => {
                      //prompt
                      if (newId) {
                        updateTransaction.mutate({
                          ...transaction,
                          category_id: +newId
                        })
                      }
                    }}
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
