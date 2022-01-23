import { Box, Button, Text, Modal, Container, Group, Title, Divider, Menu } from "@mantine/core";
import { Cross1Icon, GearIcon, TrashIcon } from "@modulz/radix-icons";
import { MetaFunction, LoaderFunction, Link, useLocation, json } from "remix";
import { useState } from "react";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

import { Transaction, getTransactions, useCreateTransactionBulk, useDeleteTransaction, useUpdateTransaction } from "~/api/transactions";
import { EditableTable } from "~/components/EditableTable";
import { formatCurrency} from "~/utils/helpers";
import { CategorySelector } from "~/components/CategorySelector";
import { useTransactionFilters } from "~/utils/useTransactionFilters";
import TransactionFilters from "~/components/TransactionFilters";
import { useQueryClient } from "react-query";

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

// https://remix.run/guides/routing#index-routes
export default function TransactionsRoute() {
  const { search } = useLocation();
  const [updater, setUpdater] = useState<{ open: boolean; transaction?: Transaction }>({
    open: false
  });
  const qs = new URLSearchParams(search);
  const categoryId = qs.has('category') ? qs.get('category') as string : undefined;

  const queryClient = useQueryClient();
  const updateTransaction = useUpdateTransaction();
  const updateTransactionBulk = useCreateTransactionBulk();
  const deleteTransaction = useDeleteTransaction();

  const {
    accounts,
    categories,
    filters,
    transactions,
    count,
    loading,
    setSort,
    setFilters,
    resetFilters
  } = useTransactionFilters({
    initialFilters: {
      category: categoryId ?? undefined,
    }
  });

  const updateSingleTransaction = () => {
    const { transaction } = updater;
    if (!transaction) {
      return;
    }

    updateTransaction.mutate({
      ...transaction,
      excludeFromTotals: !transaction.excludeFromTotals
    }, {
      onSuccess: () => {
        setUpdater({ open: false, transaction: undefined });
      }
    })
  }

  const updateAllTransactions = async () => {
    const { transaction } = updater;
    if (!transaction) {
      return;
    }

    const matchingTransactions = await getTransactions({
      limit: 1000,
      accountId: transaction.account_id?.toString(),
      categoryId: transaction.category_id?.toString(),
      term: transaction.description
    });

    const newTransactions = matchingTransactions.map((trans: Transaction): Transaction => ({
      id: trans.id,
      description: trans.description,
      amount: trans.amount,
      date: trans.date,
      account_id: trans.account_id,
      category_id: trans.category_id,
      excludeFromTotals: !transaction.excludeFromTotals
    }))

    updateTransactionBulk.mutate(newTransactions, {
      onSuccess: async () => {
        await queryClient.invalidateQueries();

        setUpdater({ open: false, transaction: undefined });
      }
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
            <Button component={Link} to="/finance/transactions/new" color="green">
              New
            </Button>
            <Button component={Link} to="/finance/transactions/importer" color="green">
              Import
            </Button>
          </Group>
        </Box>

        <TransactionFilters
          accounts={accounts ?? []}
          categories={categories ?? []}
          filters={filters}
          loading={loading}
          count={count ?? 0}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />

        <Box style={{ overflowX: 'auto' }}>
          <EditableTable<Transaction>
            headers={[
              { label: 'Description', key: 'description', sortable: true, sortFn: setSort },
              { label: 'Account', key: 'account', sortable: false },
              { label: 'Category', key: 'category', sortable: false },
              { label: 'Amount', key: 'amount', sortable: true, sortFn: setSort },
              { label: 'Date', key: 'date', sortable: true, sortFn: setSort },
              { label: '', key: 'id', sortable: false }
            ]}
            data={transactions ?? []}
            paginateProps={{
              total: count ? Math.ceil(count / 50) : 0,
              onPaginate: (page: number) => setFilters((prev) => ({ ...prev, page }))
            }}
            renderRow={({ category, account, ...transaction }) => (
              <tr key={transaction.id} data-id={transaction.id}>
                <td>
                  <Text component={Link} to={`/finance/transactions/${transaction.uid}`} sx={{
                    position: 'relative',
                    '--opacity': 0.25,
                    '&:hover': {
                      '--opacity': 0.45
                    }
                  }}>
                    {transaction.description}
                    <Box component="span" sx={(theme) => ({
                      height: '8px',
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      background: theme.colors.green[3],
                      opacity: 'var(--opacity)',
                      left: 0,
                      transition: 'all 0.3s ease-in-out'
                    })} />
                  </Text>
                </td>
                <td>{account?.name}</td>
                <td>
                  <CategorySelector
                    transaction={transaction}
                    category={category}
                    categories={categories}
                  />
                </td>
                <td><Text color={transaction.excludeFromTotals ? 'red' : ''}>{formatCurrency(transaction.amount)}</Text></td>
                <td>{transaction.date}</td>
                <td>
                  <Menu>
                    <Menu.Label>Options</Menu.Label>
                    <Menu.Item icon={<GearIcon />}>Edit</Menu.Item>
                    <Menu.Item icon={<Cross1Icon />} onClick={() => setUpdater({ open: true, transaction: transaction })}>
                      {transaction.excludeFromTotals ? 'Include in Totals' : 'Exclude From Totals'}
                    </Menu.Item>
                    <Divider />
                    <Menu.Label>Danger Zone</Menu.Label>
                    <Menu.Item color="red" icon={<TrashIcon />} onClick={() => {
                      deleteTransaction.mutate(transaction);
                    }}>Delete</Menu.Item>
                  </Menu>
                </td>
              </tr>
            )}
          />
        </Box>

        {/* exclude from totals */}
        <Modal
          centered
          opened={updater.open}
          onClose={() => setUpdater({ open: false, transaction: undefined })}
          title="Update Transactions"
        >
          <Text>Apply rule to all matching transactions?</Text>

          <Group position="apart" style={{ marginTop: '1rem' }}>
            <Button color="green" variant="light" size="xs" onClick={() => updateAllTransactions()} loading={updateTransactionBulk.isLoading}>
              Update All
            </Button>
            <Button color="green" variant="subtle" size="xs" onClick={() => updateSingleTransaction()}>
              Just this one!
            </Button>
          </Group>
        </Modal>
      </Container>
    </>
  )
}
