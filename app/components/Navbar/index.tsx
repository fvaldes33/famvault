import { Navbar, Text, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ArchiveIcon, DashboardIcon, DotsHorizontalIcon, ExitIcon, GearIcon, LightningBoltIcon, LockClosedIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "remix";
import { supabase } from "~/utils/supabase";

const useStyles = createStyles(theme => ({
  logo: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '80px',
    width: '100%'
  },
  nav: {
    padding: '5rem 0'
  },
  items: {
    alignItems: 'center',
    color: theme.colors.green[4],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '80px',
    textDecoration: 'none',
    width: '100%',
    '> div': {
      display: 'none',
      [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
        display: 'block'
      },
    }
  },
  active: {
    background: theme.colors.green[4],
    color: theme.colors.dark[9],
    '> div': {
      color: theme.colors.dark[9],
    }
  },
  icon: {
    height: '1.5rem',
    marginBottom: '0.25rem',
    width: '1.5rem',
  }
}));

const FullNavbar = () => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width: 576px)');

  const logout = async () => {
    try {
      const { error: signUpError } = await supabase.auth.signOut();
      if (signUpError) throw signUpError;
      navigate('/login');
    } catch (error: unknown) {

    }
  }

  const navItems = (
    <>
      <NavLink end className={({isActive}) => isActive ? `${classes.items} ${classes.active}` : classes.items} to={'/'} title="home">
        <DashboardIcon className={classes.icon} />
        <Text size="xs">Dashboard</Text>
      </NavLink>
      <NavLink end className={({isActive}) => isActive ? `${classes.items} ${classes.active}` : classes.items} to={'/passwords'} title="passwords">
        <DotsHorizontalIcon className={classes.icon} />
        <Text size="xs">Passwords</Text>
      </NavLink>
      <NavLink end className={({isActive}) => isActive ? `${classes.items} ${classes.active}` : classes.items} to={'/files'} title="files">
        <ArchiveIcon className={classes.icon} />
        <Text size="xs">Files</Text>
      </NavLink>
      <NavLink end className={({isActive}) => isActive ? `${classes.items} ${classes.active}` : classes.items} to={'/family'} title="family">
        <LightningBoltIcon className={classes.icon} />
        <Text size="xs">Family</Text>
      </NavLink>
      <NavLink end className={({isActive}) => isActive ? `${classes.items} ${classes.active}` : classes.items} to={'/settings'} title="setttings">
        <GearIcon className={classes.icon} />
        <Text size="xs">Settings</Text>
      </NavLink>
    </>
  );

  if (!matches) {
    return (
      <Navbar
        height={80}
        width={{ base: '100%' }}
        fixed
        position={{ bottom: 0, left: 0, right: 0 }}
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[0]
        })}
      >
        <nav style={{ display: 'flex' }}>
          {navItems}
        </nav>
      </Navbar>
    )
  }

  return (
    <Navbar
      width={{ base: 80 }}
      fixed
      position={{ top: 0, left: 0 }}
      hiddenBreakpoint="xs"
      hidden={!opened}
    >
      <Navbar.Section className={classes.logo}>
        <Link className={classes.items} to={'/'} title="home">
          <LockClosedIcon className={classes.icon} />
        </Link>
      </Navbar.Section>

      <Navbar.Section>
        <nav className={classes.nav}>
          {navItems}
        </nav>
      </Navbar.Section>

      <Navbar.Section style={{ marginTop: 'auto' }}>
        <span className={classes.items} onClick={() => logout()} title="logout">
          <ExitIcon className={classes.icon} />
          <Text size="xs">Logout</Text>
        </span>
      </Navbar.Section>
    </Navbar>
  );
}

export { FullNavbar as Navbar };
