import { ActionIcon, Box, Col, Container, Grid, Text, createStyles } from "@mantine/core";
import { ActivityLogIcon, ArchiveIcon, BackpackIcon, DashboardIcon, FileTextIcon, LayoutIcon, RowsIcon } from "@modulz/radix-icons";
import { MetaFunction, LoaderFunction, Outlet, NavLink } from "remix";
import { json } from "remix";
import Hero from "~/components/Hero";

const useStyles = createStyles(theme => ({
  nav: {
    display: 'flex',
    padding: '16px 0',
    overflow: 'auto',
  },
  items: {
    alignItems: 'center',
    borderRadius: '8px',
    color: theme.colors.green[4],
    display: 'flex',
    justifyContent: 'center',
    height: '40px',
    textDecoration: 'none',
    padding: '0 16px',
    '& > div': {
      paddingLeft: '16px'
    }
  },
  active: {
    background: theme.colors.green[4],
    color: `${theme.colors.dark[9]} !important`,
    '& > div': {
      color: theme.colors.dark[9],
    }
  },
  icon: {
    height: '1.5rem',
    width: '1.5rem',
  }
}));

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
    title: "Settings | FAMVAULT | Family Password Sharing Tool",
    description: "A minimalist approach to family password sharing done right."
  };
};

// https://remix.run/guides/routing#index-routes
export default function FinanceIndexRoute() {
  const { classes } = useStyles();

  return (
    <>
      <Container size="xl">
        <Box component="nav" className={classes.nav}>
          <NavLink end className={({ isActive }) => isActive ? `${classes.items} ${classes.active}` : classes.items} to={'/finance'} title="finance">
            <BackpackIcon className={classes.icon} />
            <Text size="xs">Finance</Text>
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${classes.items} ${classes.active}` : classes.items} to={'/finance/accounts'} title="accounts">
            <ArchiveIcon className={classes.icon} />
            <Text size="xs">Accounts</Text>
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${classes.items} ${classes.active}` : classes.items} to={'/finance/transactions'} title="transactions">
            <FileTextIcon className={classes.icon} />
            <Text size="xs">Transactions</Text>
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${classes.items} ${classes.active}` : classes.items} to={'/finance/budgets'} title="budgets">
            <ActivityLogIcon className={classes.icon} />
            <Text size="xs">Budgets</Text>
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${classes.items} ${classes.active}` : classes.items} to={'/finance/categories'} title="categories">
            <LayoutIcon className={classes.icon} />
            <Text size="xs">Categories</Text>
          </NavLink>
        </Box>
      </Container>
      <Outlet />
    </>
  )
}
