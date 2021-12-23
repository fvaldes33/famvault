import { createStyles, Header, TextInput, Switch, useMantineColorScheme, Loader, Box, Popover, Text, ActionIcon } from "@mantine/core";
import { CheckIcon, ClipboardCopyIcon, LockClosedIcon, MagnifyingGlassIcon, MoonIcon, Share1Icon, SunIcon } from "@modulz/radix-icons";
import { useClipboard, useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from "react";
import { Link } from "remix";
import { useSearchSecrets } from "~/api/secrets";
import { Secret } from "~/types";
import { useNotifications } from "@mantine/notifications";

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
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 750);
  const { mutate, isLoading, data } = useSearchSecrets();
  const dark = colorScheme === 'dark';

  useEffect(() => {
    if (debounced && debounced.length > 0) {
      mutate(debounced);
    }
  }, [debounced]);

  useEffect(() => {
    if (data && data.length) {
      setOpened(true)
    } else {
      setOpened(false)
    }
  }, [data])

  return (
    <>
      <Header className={classes.header} height={80} padding="xs">

        <Link className={classes.logo} to={'/'} title="home">
          <LockClosedIcon className={classes.icon} />
        </Link>

        <div style={{ width: '100%'}}>
          <Popover
            noFocusTrap
            opened={opened}
            onClose={() => setOpened(false)}
            target={
              <TextInput
                type="search"
                aria-label="Search"
                placeholder="Search my vault"
                variant="unstyled"
                size="md"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                icon={<MagnifyingGlassIcon />}
                rightSection={isLoading && <Loader size="xs" />}
              />
            }
            width={320}
            position="bottom"
            placement="center"
          >
            {data && data.map((secret: Secret) => (
              <PopoverSearchItem
                key={secret.id}
                secret={secret}
                setOpened={setOpened}
              />
            ))}
          </Popover>
        </div>

        <div className={classes.avatar}>
          <div>
            <Switch
              checked={dark}
              color="green"
              aria-label="Toggle dark mode"
              onChange={() => toggleColorScheme()}
            />
          </div>
          {dark ? (
            <MoonIcon style={{ width: 18, height: 18 }} />
            ) : (
            <SunIcon style={{ width: 18, height: 18 }} />
          )}
          {/* <Link to="/profile">
            <Avatar
              radius="xl"
            />
          </Link> */}
        </div>
      </Header>
    </>
  );
}

const PopoverSearchItem = ({ secret, setOpened }: { secret: Secret; setOpened: (val: boolean) => void; }) => {
  const clipboard = useClipboard({ timeout: 1000 });
  const notifications = useNotifications();

  return (
    <Box
      key={secret.id}
      sx={(theme) => ({
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        paddingBottom: 8,
        marginBottom: 8,
        '&:not(:last-child)': {
          borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2]}`
        }
      })}
    >
      <Text style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>{secret.title}</Text>
      <Box
        sx={(theme) => ({
          alignItems: 'center',
          display: 'flex',
          gap: '4px'
        })}
      >
        {secret.website && (
          <ActionIcon
            component="a"
            href={secret.website}
            target="_blank"
            rel="noopener nofollow"
            variant="light"
            color={'green'}
            size="lg"
          >
            <Share1Icon />
          </ActionIcon>
        )}

        <ActionIcon
          onClick={() => {
            clipboard.copy(secret.website);
            notifications.showNotification({
              color: 'green',
              autoClose: 2000,
              title: 'Success',
              message: `${secret.title} copied`,
              onClose: () => {
                setOpened(false);
              }
            })
          }}
          variant="light"
          color={clipboard.copied ? 'teal' : 'green'}
          size="lg"
        >
          {clipboard.copied ? (<CheckIcon />) : (<ClipboardCopyIcon />)}
        </ActionIcon>
      </Box>
    </Box>
  );
}

export { NavHeader };
