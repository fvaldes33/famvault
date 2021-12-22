import { createStyles, Header, ActionIcon, TextInput, Button, Menu, Avatar, Switch, useMantineColorScheme } from "@mantine/core";
import { FileIcon, GearIcon, LockClosedIcon, MagnifyingGlassIcon, MoonIcon, PlusIcon, SunIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { Link } from "remix";

const useStyles = createStyles(theme => ({
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'sticky',
    top: 0
  },
  avatar: {
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
    marginLeft: 'auto',
  },
  logo: {
    alignItems: 'center',
    color: theme.colors.green[4],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '80px',
    textDecoration: 'none',
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      display: 'none',
    },
  },
  icon: {
    height: '1.5rem',
    marginBottom: '0.25rem',
    width: '1.5rem',
  }
}));

const NavHeader = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Header className={classes.header} height={80} padding="xs">

      <Link className={classes.logo} to={'/'} title="home">
        <LockClosedIcon className={classes.icon} />
      </Link>

      <form style={{ width: '100%'}}>
        <TextInput
          type="search"
          aria-label="Search"
          placeholder="Search my vault"
          variant="unstyled"
          size="md"
          icon={<MagnifyingGlassIcon />}
        />
      </form>

      <div className={classes.avatar}>
        <div>
          <Switch
            checked={dark}
            aria-label="Toggle dark mode"
            onChange={() => toggleColorScheme()}
          />
        </div>
        {dark ? (
          <MoonIcon style={{ width: 18, height: 18 }} />
          ) : (
          <SunIcon style={{ width: 18, height: 18 }} />
        )}
        <Link to="/profile">
          <Avatar
            radius="xl"
          />
        </Link>
      </div>
    </Header>
  );
}

export { NavHeader };
