import { Box, Container, Title, Text, Button } from "@mantine/core";
import { useState } from "react";
import { MetaFunction, LoaderFunction, useParams, useNavigate, json } from "remix";
import { useAccount, useDeleteAccount } from "~/api/accounts";
import { useFamily } from "~/api/families";
import { AccountForm } from "~/components/AccountForm";
import { DestructiveModal } from "~/components/DestructiveModal";

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
export default function AccountsEditRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const { data: family } = useFamily();
  const { data: account, isLoading, isError } = useAccount(params.accountId!);
  const deleteAccountMutation = useDeleteAccount();
  const [opened, setOpened] = useState(false);

  return (
    <Container size="sm">
      <Box style={{
        padding: '40px 0',
      }}>
        <Title sx={(theme) => ({
          fontSize: '40px',
          [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
            fontSize: '60px',
          },
        })}>{account && account.name}</Title>
      </Box>
      <Box>
        {family && account && <AccountForm family={family} account={account} />}
      </Box>
      {account && (
        <Box sx={(theme) => ({
          alignItems: 'center',
          display: 'flex',
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: `1px solid ${theme.colors.red[4]}`
        })}>
          <Text size="sm" style={{ width: '75%' }}>
            Remove account <b>{account.name}</b>.
            <br />This action can't be un-done.
          </Text>
          <Box style={{ marginLeft: 'auto' }}>
            <Button loading={deleteAccountMutation.isLoading} color={'red'} onClick={() => setOpened(true)}>
              Delete
            </Button>
          </Box>
        </Box>
      )}
      {account && (
        <DestructiveModal
          opened={opened}
          onClose={() => setOpened(false)}
          isLoading={deleteAccountMutation.isLoading}
          onConfirm={async () => {
            await deleteAccountMutation.mutateAsync(account.id);
            setOpened(false);
            navigate('/finance/accounts');
          }}
        />
      )}
    </Container>
  )
}
