import { Box, Container, Title, Text } from "@mantine/core";
import { MetaFunction, LoaderFunction } from "remix";
import { json } from "remix";
import { useFamily } from "~/api/families";
import { AccountForm } from "~/components/AccountForm";
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
export default function TransactionsNewRoute() {

  return (
    <Container size="sm">
      <Box sx={(theme) => ({
        padding: '40px 0',
      })}>
        <Title sx={(theme) => ({
          fontSize: '40px',
          [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
            fontSize: '60px',
          },
        })}>New Transaction</Title>
      </Box>
      <Box>
        <TransactionForm />
      </Box>
    </Container>
  )
}
