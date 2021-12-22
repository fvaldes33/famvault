import { Avatar, createStyles, Title, Text, Badge, Box } from "@mantine/core";
import { LockClosedIcon } from "@modulz/radix-icons";
import { Link } from "remix";
import { Secret } from "~/types";

const useStyles = createStyles((theme) => ({
  wrapper: {
    alignItems: 'center',
    border: `1px solid ${theme.colors.green[3]}`,
    borderRadius: '4px',
    display: 'flex',
    padding: `${theme.spacing.md}px`,
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: theme.shadows.md
    },
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      marginBottom: `${theme.spacing.sm}px`,
    },
  },
  main: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'inherit',
    position: 'relative',
    marginLeft: `${theme.spacing.md}px`,
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      flexDirection: 'row',
      alignItems: 'center'
    },
  },
  badge: {
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      marginLeft: 'auto',
    },
  }
}));

export type PasswordItemProps = {
  secret: Secret;
}

export default function PasswordItem({ secret }: PasswordItemProps) {
  const { classes } = useStyles();

  return (
    <Link className={classes.wrapper} to={`/passwords/${secret.uid}`}>
      <Avatar alt="it's me">
        <LockClosedIcon />
      </Avatar>
      <div className={classes.main}>
        <Box sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignSelf: 'stretch',
          textOverflow: 'ellipsis',
          overflow: 'inherit',
        })}>
          <Title order={5} style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>{secret.title}</Title>
          <Text>{secret.username}</Text>
        </Box>
        <Box className={classes.badge}>
          <Badge variant="dot" color={(secret.strength || 0) > 80 ? 'green' : 'red'}>
            {secret.strength || 0}%
          </Badge>
        </Box>
      </div>
    </Link>
  );
}
