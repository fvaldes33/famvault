import { Box, Container, LoadingOverlay, Title } from "@mantine/core";
import { MetaFunction, LoaderFunction, useParams } from "remix";
import { json } from "remix";
import { EntryForm } from "~/components/EntryForm";
import { useFamily } from "~/api/families";
import { useSecret } from "~/api/secrets";

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
export default function PasswordEditRoute() {
  const { data: family } = useFamily();
  const params = useParams();
  const { data: secret, isLoading } = useSecret(params.passwordId ? params.passwordId : '');

  if (isLoading) {
    return (
      <LoadingOverlay visible={true} />
    )
  }

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
        })}>Edit Password</Title>
      </Box>
      <EntryForm family={family!} secret={secret} />
    </Container>
  )
}
