import { Navbar, Text, createStyles } from "@mantine/core";
import { ArchiveIcon, DashboardIcon, DotsHorizontalIcon, ExitIcon, GearIcon, LightningBoltIcon, LockClosedIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { Link, useNavigate } from "remix";
import { supabase } from "~/utils/supabase";

const useStyles = createStyles(theme => ({
  logo: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '80px'
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
    textDecoration: 'none'
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

  const logout = async () => {
    try {
      const { error: signUpError } = await supabase.auth.signOut();
      if (signUpError) throw signUpError;
      navigate('/login');
    } catch (error: unknown) {

    }
  }
  return (
    <Navbar
      width={{ base: 80 }}
      fixed
      position={{ top: 0, left: 0 }}
      hiddenBreakpoint="sm"
      hidden={!opened}
    >
      <Navbar.Section className={classes.logo}>
        <Link className={classes.items} to={'/'} title="home">
          <LockClosedIcon className={classes.icon} />
        </Link>
      </Navbar.Section>

      <Navbar.Section>
        <nav className={classes.nav}>
          <Link className={classes.items} to={'/'} title="home">
            <DashboardIcon className={classes.icon} />
            <Text size="xs">Dashboard</Text>
          </Link>
          <Link className={classes.items} to={'/passwords'} title="passwords">
            <DotsHorizontalIcon className={classes.icon} />
            <Text size="xs">Passwords</Text>
          </Link>
          <Link className={classes.items} to={'/files'} title="files">
            <ArchiveIcon className={classes.icon} />
            <Text size="xs">Files</Text>
          </Link>
          <Link className={classes.items} to={'/family'} title="family">
            <LightningBoltIcon className={classes.icon} />
            <Text size="xs">Family</Text>
          </Link>
          <Link className={classes.items} to={'/settings'} title="setttings">
            <GearIcon className={classes.icon} />
            <Text size="xs">Settings</Text>
          </Link>
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
