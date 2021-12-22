import { createStyles, Header, ActionIcon, TextInput, Button, Menu, Avatar, Switch, useMantineColorScheme } from "@mantine/core";
import { FileIcon, GearIcon, LockClosedIcon, MagnifyingGlassIcon, MoonIcon, PlusIcon, SunIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { Link } from "remix";

const useStyles = createStyles(theme => ({
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  avatar: {
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
    marginLeft: 'auto',
  }
}));

const NavHeader = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Header className={classes.header} height={80} padding="xs">
      {/* <Menu
        control={
          <Button variant="filled" style={{ marginRight: '1rem' }}>
            <PlusIcon />
          </Button>
        }
      >
        <Menu.Item
          component={Link}
          to="/passwords/new"
          icon={<LockClosedIcon />}
          onClick={() => console.log('Hello')}
        >Password</Menu.Item>
        <Menu.Item
          component={Link}
          to="/files/new"
          icon={<FileIcon />}
          onClick={() => console.log('Hello')}
        >File</Menu.Item>
      </Menu> */}

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
