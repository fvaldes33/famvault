import { Box, Col, Container, Grid, Title } from "@mantine/core";
import { MetaFunction, LoaderFunction } from "remix";
import { json } from "remix";

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
export default function SettingsRoute() {
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
              <Title>Settings</Title>
            </Col>
            {/* <Col span={12} md={6} sx={(theme) => ({
              display: 'flex',
              justifyContent: 'flex-start',
              [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                justifyContent: 'flex-end',
              },
            })}>
              <Link to="/family/new">
                <Button color="green" leftIcon={<PlusIcon />}>
                  Add
                </Button>
              </Link>
            </Col> */}
          </Grid>
        </Container>
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