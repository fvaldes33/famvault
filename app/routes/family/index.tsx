import { Box, Button, Col, Container, Grid, LoadingOverlay, Title, Text } from "@mantine/core";
import { PlusIcon } from "@modulz/radix-icons";
import { MetaFunction, LoaderFunction, Link } from "remix";
import { json } from "remix";
import { useFamily } from "~/api/families";

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
        <Container size="xl" sx={(theme) => ({
          position: 'relative',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
            paddingTop: '4rem',
            paddingBottom: '4rem',
          },
        })}>
          <Grid justify="space-between" align="center">
            <Col span={12} md={6}>
              <Title>{family!.name}</Title>
              <Text>Members: {family!.members?.length ?? 1}</Text>
            </Col>
            <Col span={12} md={6} sx={(theme) => ({
              display: 'flex',
              justifyContent: 'flex-start',
              [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                justifyContent: 'flex-end',
              },
            })}>
              <Link to="/family/new">
                <Button color="green" leftIcon={<PlusIcon />}>
                  Invite
                </Button>
              </Link>
            </Col>
          </Grid>
        </Container>
      </Box>
      <pre>{JSON.stringify(family, null, 2)}</pre>
    </>
  )
}
