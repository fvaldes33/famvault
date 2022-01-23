import { Box, Container, Title, Text, Button } from "@mantine/core";
import { useState } from "react";
import { MetaFunction, LoaderFunction, useParams, useNavigate, json } from "remix";
import { useDeleteTransaction, useTransaction } from "~/api/transactions";
import { DestructiveModal } from "~/components/DestructiveModal";
import { TransactionForm } from "~/components/TransactionForm";

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

// https://remix.run/guides/routing#index-routes
export default function TransactionEditRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const { data: transaction } = useTransaction(params.transactionUid!);
  const deleteMutation = useDeleteTransaction();
  const [opened, setOpened] = useState(false);

  return (
    <Container size="sm">
      <Box style={{
        padding: '40px 0',
      }}>
        <Text>Edit Transaction</Text>
        <Title sx={(theme) => ({
          fontSize: '40px',
          [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
            fontSize: '60px',
          },
        })}>{transaction && transaction.description}</Title>
      </Box>
      <Box>
        {transaction && <TransactionForm transaction={transaction} />}
      </Box>
      {transaction && (
        <Box sx={(theme) => ({
          alignItems: 'center',
          display: 'flex',
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: `1px solid ${theme.colors.red[4]}`
        })}>
          <Text size="sm" style={{ width: '75%' }}>
            Remove account <b>{transaction.description}</b>.
            <br />This action can't be un-done.
          </Text>
          <Box style={{ marginLeft: 'auto' }}>
            <Button loading={deleteMutation.isLoading} color={'red'} onClick={() => setOpened(true)}>
              Delete
            </Button>
          </Box>
        </Box>
      )}
      {transaction && (
        <DestructiveModal
          opened={opened}
          onClose={() => setOpened(false)}
          isLoading={deleteMutation.isLoading}
          onConfirm={async () => {
            await deleteMutation.mutateAsync(transaction);
            setOpened(false);
            navigate('/finance/transactions');
          }}
        />
      )}
    </Container>
  )
}
