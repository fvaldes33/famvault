import { Box, Container, Title, Text, Button, Group } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "react-query";
import { MetaFunction, LoaderFunction, useParams, Link, json, useLocation } from "remix";
import { useAccount } from "~/api/accounts";
import { useFamily } from "~/api/families";
import { getTransactions, Transaction, useTransactions } from "~/api/transactions";
import { AccountForm } from "~/components/AccountForm";
import { EditableTable } from "~/components/EditableTable";
import { Sort } from "~/types";
import { AccountTypeMap, formatCurrency } from "~/utils/helpers";

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
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export const FauxTableRow = ({ label, value }: { label: string, value: string }) => {

  return (
    <Box sx={(theme) => ({
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2]}`,
      display: 'flex',
      padding: '1rem'
    })}>
      <Text sx={(theme) => ({
        borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2]}`,
        width: '25%'
      })}>{label}</Text>
      <Text style={{ padding: '0 1rem' }}>{value}</Text>
    </Box>
  );
}

// https://remix.run/guides/routing#index-routes
export default function AccountDetailRoute() {
  const params = useParams();
  const location = useLocation();
  const [sort, setSort] = useState<Sort<Transaction>>({ column: 'date', ascending: false })
  const { data: family } = useFamily();
  const { data: account, isLoading, isError } = useAccount(params.accountId!);
  const { data: transactions } = useQuery(
    [`get-transactions-account`, account?.id, sort.column, sort.ascending],
    () => getTransactions({ accountId: account?.id.toString(), limit: 100, sort }),
    {
      enabled: !!account,
    }
  );

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (isError || !account) {
    return (
      <div>Error...</div>
    )
  }

  return (
    <>
      <Container size="xl">
        <Box sx={(theme) => ({
          padding: '40px 0 0',
        })}>
          <Title order={5} style={{ textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem' }}>Account Details</Title>

          <Box sx={(theme) => ({
            border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2]}`,
            borderRadius: '4px',
          })}>
            <FauxTableRow label="Name" value={account.name} />
            <FauxTableRow label="Type" value={AccountTypeMap[account.type]} />

            <Box style={{
              display: 'flex',
              padding: '1rem'
            }}>
              <Button color="green" variant="light" size="xs" compact component={Link} to={`${location.pathname}/edit`}>
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      <Container size="xl">
        <Box sx={(theme) => ({
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '40px 0 16px',
        })}>
          <Title order={5} style={{ textTransform: 'uppercase', letterSpacing: '1.5px' }}>Recent Transactions</Title>
          <Button component={Link} to="/finance/transactions/importer" color="green">
            Import
          </Button>
        </Box>
        <Box style={{ overflowX: 'auto' }}>
          <EditableTable<Transaction>
            headers={[
              { label: 'Description', key: 'description', sortable: true, sortFn: setSort },
              { label: 'Category', key: 'category', sortable: false },
              { label: 'Amount', key: 'amount', sortable: true, sortFn: setSort },
              { label: 'Date', key: 'date', sortable: true, sortFn: setSort },
            ]}
            data={transactions ?? []}
            renderRow={({ id, category, date, description, excludeFromTotals, amount, uid }) => (
              <tr key={id}>
                <td>
                  <Text component={Link} to={`/finance/transactions/${uid}`} sx={{
                    position: 'relative',
                    '--opacity': 0.25,
                    '&:hover': {
                      '--opacity': 0.45
                    }
                  }}>
                    {description}
                    <Box component="span" sx={(theme) => ({
                      height: '8px',
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      background: theme.colors.green[3],
                      opacity: 'var(--opacity)',
                      left: 0,
                      transition: 'all 0.3s ease-in-out'
                    })}/>
                  </Text>
                </td>
                <td>{category?.name}</td>
                <td><Text color={excludeFromTotals ? 'red' : ''}>{formatCurrency(amount)}</Text></td>
                <td>{date}</td>
              </tr>
            )}
          />
        </Box>
      </Container>
    </>
  )
}
