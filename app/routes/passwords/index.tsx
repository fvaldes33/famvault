import { Button, Container, Grid, Col, Box, LoadingOverlay, TextInput, Loader } from "@mantine/core";
import { MetaFunction, LoaderFunction, json, Link } from "remix";
import { useEffect, useRef, useState } from "react";
import PasswordItem from "~/components/PasswordItem";
import { useSearchSecrets, useSecrets } from "~/api/secrets";
import { Secret } from "~/types";
import { MagnifyingGlassIcon, PlusIcon } from "@modulz/radix-icons";
import Hero from "~/components/Hero";
import { useDebouncedValue } from "@mantine/hooks";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async ({ request }) => {
  return json({});
}

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Passwords | FAMVAULT | Family Password Sharing Tool",
    description: "A minimalist approach to family password sharing done right."
  };
};

// https://remix.run/guides/routing#index-routes
export default function PasswordsIndexRoute() {
  const firstUpdate = useRef(true);
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 750);
  const { data: secrets, isLoading, isError, error } = useSecrets();
  const { mutate, isLoading: searchLoading, data: searchSecrets } = useSearchSecrets();

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    mutate(debounced);
  }, [debounced]);

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

  const filteredSecrets = searchSecrets && searchSecrets.length > 0 ? searchSecrets : (secrets || []);

  return (
    <>
      <Box sx={(theme) => ({
        background: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[0]
      })}>
        <Hero
          heading={`Passwords`}
          subheading={`A collection of website passwords, password generator and security checks.`}
          action={
            <Link to="/passwords/new">
              <Button color="green" leftIcon={<PlusIcon />}>
                New
              </Button>
            </Link>
          }
        />
      </Box>

      <Container size="xl" sx={(theme) => ({
        paddingTop: '2rem',
        paddingBottom: '2rem',
      })}>
        <Box style={{
          marginBottom: '1rem'
        }}>
          <TextInput
            type="search"
            aria-label="Search"
            placeholder="Search passwords"
            variant="unstyled"
            size="md"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            icon={searchLoading ? (<Loader size="xs" />) : (<MagnifyingGlassIcon />)}
          />
        </Box>
        <Grid>
          {filteredSecrets && filteredSecrets.map((secret: Secret) => (
            <Col span={12} md={6} lg={4} key={secret.id}>
              <PasswordItem secret={secret} />
            </Col>
          ))}
        </Grid>
      </Container>
    </>
  )
}
