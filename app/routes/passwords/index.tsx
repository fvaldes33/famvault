import { Button, Container, Title, Text, Grid, Col, Box, Drawer, LoadingOverlay } from "@mantine/core";
import { MetaFunction, LoaderFunction, json, useNavigate, useParams, Link } from "remix";
import { useEffect, useState } from "react";
import PasswordItem from "~/components/PasswordItem";
import { useSecrets } from "~/api/secrets";
import { Record, Secret } from "~/types";
import { PlusIcon } from "@modulz/radix-icons";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async ({ request }) => {
  return json({});
}

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function PasswordsIndexRoute() {
  const { data: secrets, isLoading, isError, error } = useSecrets();
  const navigate = useNavigate();
  const params = useParams();
  const [opened, setOpened] = useState(params && params.passwordId ? true : false);

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
              <Title>Passwords</Title>
              <Text>A collection of website passwords, password generator and security checks.</Text>
            </Col>
            <Col span={12} md={6} sx={(theme) => ({
              display: 'flex',
              justifyContent: 'flex-start',
              [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                justifyContent: 'flex-end',
              },
            })}>
              <Link to="/passwords/new">
                <Button color="green" leftIcon={<PlusIcon />}>
                  New
                </Button>
              </Link>
            </Col>
          </Grid>
        </Container>
      </Box>

      <Container size="xl" sx={(theme) => ({
        paddingTop: '2rem',
        paddingBottom: '2rem',
      })}>
        <Grid>
          {secrets && secrets.map((secret: Secret) => (
            <Col span={12} md={6} lg={4} key={secret.id}>
              <PasswordItem secret={secret} />
            </Col>
          ))}
        </Grid>
      </Container>

      <Drawer
        opened={opened}
        position="right"
        onClose={() => {
          setOpened(false);
          navigate('/passwords')
        }}
        padding="xl"
        size="xl"
      >
        drawer
      </Drawer>
    </>
  )
}
