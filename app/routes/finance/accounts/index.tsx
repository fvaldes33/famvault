import { Box, Col, Container, Button, Title, Text, TextInput, Card, Grid } from "@mantine/core";
import { MagnifyingGlassIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { MetaFunction, LoaderFunction, Link, useLocation, json, useNavigate } from "remix";
import { Account, useAccounts } from "~/api/accounts";
import { AccountTypeMap } from "~/utils/helpers";

const creditAccountType = ['checking', 'savings'];
const fuzzySearch = (value: string) => {
  return (account: Account) => {
    if (!value.length) {
      return true;
    }
    return account.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
  }
}

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
    title: "Finance -> Accounts | FAMVAULT | Family Password Sharing Tool",
    description: "A minimalist approach to family password sharing done right."
  };
};

// https://remix.run/guides/routing#index-routes
export default function AccountsRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const { data: accounts, isLoading, isError } = useAccounts();

  const creditAccounts = accounts ? accounts.filter(a => creditAccountType.includes(a.type)) : [];
  const debitAccounts = accounts ? accounts.filter(a => !creditAccountType.includes(a.type)) : [];

  return (
    <>
      <Container size="xl" sx={(theme) => ({
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
          paddingTop: '2rem',
          paddingBottom: '2rem',
        },
      })}>
        <TextInput
          type="search"
          aria-label="Search"
          placeholder="Search accounts"
          size="md"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          icon={<MagnifyingGlassIcon />}
        />
        <Box style={{
          display: 'flex'
        }}>
          <Button color="green" component={Link} to={`${location.pathname}/new`}>
            New
          </Button>
        </Box>
      </Container>

      <Container size="xl">
        <Grid>
          <Col span={12} md={6}>
            <Card>
              <Card.Section>
                <Box sx={{ borderRadius: '4px', margin: '0.5rem', padding: '1rem', border: '1px solid #eee' }}>
                  <Title order={5}>Credit</Title>
                </Box>
              </Card.Section>

              <Card.Section>
                <Box sx={{ borderRadius: '4px', margin: '0.5rem' }}>
                  {creditAccounts && creditAccounts.filter(fuzzySearch(value)).map((account) => (
                    <Box
                      component={Link}
                      to={`${location.pathname}/${account.uid}`}
                      key={account.id}
                      sx={(theme) => ({
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.5rem 1rem',
                        textDecoration: 'none',
                        ':hover': {
                          background: theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2]
                        }
                      })}
                    >
                      <Text>{account.name}</Text>
                      <Text>{AccountTypeMap[account.type]}</Text>
                    </Box>
                  ))}
                </Box>
              </Card.Section>
            </Card>
          </Col>
          <Col span={12} md={6}>
            <Card>
              <Card.Section>
                <Box sx={{ borderRadius: '4px', margin: '0.5rem', padding: '1rem', border: '1px solid #eee' }}>
                  <Title order={5}>Debit</Title>
                </Box>
              </Card.Section>

              <Card.Section>
                <Box sx={{ borderRadius: '4px', margin: '0.5rem' }}>
                  {debitAccounts && debitAccounts.filter(fuzzySearch(value)).map((account) => (
                    <Box
                      component={Link}
                      to={`${location.pathname}/${account.uid}`}
                      key={account.id}
                      sx={(theme) => ({
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.5rem 1rem',
                        textDecoration: 'none',
                        ':hover': {
                          background: theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2]
                        }
                      })}
                    >
                      <Text>{account.name}</Text>
                      <Text>{AccountTypeMap[account.type]}</Text>
                    </Box>
                  ))}
                </Box>
              </Card.Section>
            </Card>
          </Col>
        </Grid>
      </Container>
    </>
  )
}
