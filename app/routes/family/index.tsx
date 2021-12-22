import { Box, Button, Col, Container, Grid, LoadingOverlay, Title, Text } from "@mantine/core";
import { PlusIcon } from "@modulz/radix-icons";
import { MetaFunction, LoaderFunction, Link } from "remix";
import { json } from "remix";
import { useFamily } from "~/api/families";
import Hero from "~/components/Hero";

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
export default function Index() {
  const { data: family, isLoading, isError, error } = useFamily();

  if (isLoading) {
    return (
      <LoadingOverlay visible={true} />
    )
  }

  if (isError) {
    return (
      <div>
        Whoops! {error?.message}.
      </div>
    )
  }

  return (
    <>
      <Box sx={(theme) => ({
        background: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[0]
      })}>
        <Hero
          heading={family!.name}
          subheading={`Members: ${family!.members?.length ?? 1}`}
        />
      </Box>
      <Box>
        <Container size="xl" sx={(theme) => ({
          position: 'relative',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
            paddingTop: '4rem',
            paddingBottom: '4rem',
          },
        })}>
          <Title order={3}>@todo 🙏🏽</Title>
        </Container>
      </Box>
    </>
  )
}
