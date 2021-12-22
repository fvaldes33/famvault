import { Box, Text, Title, createStyles, ActionIcon } from "@mantine/core"
import { useClipboard } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { CheckIcon, ClipboardCopyIcon, Share1Icon } from "@modulz/radix-icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    alignItems: 'center',
    border: `1px solid ${theme.colors.green[3]}`,
    borderRadius: '4px',
    display: 'flex',
    padding: `${theme.spacing.md}px`,
    marginBottom: `${theme.spacing.sm}px`,
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: theme.shadows.md
    }
  },
  main: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: `${theme.spacing.md}px`,
  },
  actions: {
    display: 'flex',
    gap: '8px',
    marginLeft: 'auto'
  }
}))

export type ClipboardableProps = {
  label: string;
  value: string;
}

export function Clipboardable({ label, value }: ClipboardableProps) {
  const { classes } = useStyles();
  const clipboard = useClipboard({ timeout: 1000 });
  const notifications = useNotifications();

  const isLink = value.startsWith('http');
  const isPass = label.toLowerCase() === 'password';
  return (
    <Box className={classes.wrapper}>
      <div className={classes.main}>
        <Title order={4}>{label}</Title>
        <Text>{isPass ? '**********' : value}</Text>
      </div>
      <div className={classes.actions}>
        {isLink && (
          <ActionIcon
            component="a"
            href={value}
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
            clipboard.copy(value);
            notifications.showNotification({
              color: 'green',
              autoClose: 2000,
              title: 'Success',
              message: `${label} copied`,
            })
          }}
          variant="light"
          color={clipboard.copied ? 'teal' : 'green'}
          size="lg"
        >
          {clipboard.copied ? (<CheckIcon />) : (<ClipboardCopyIcon />)}
        </ActionIcon>
      </div>
    </Box>
  );
}
