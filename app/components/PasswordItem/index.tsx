import { Avatar, createStyles, Title, Text, Badge } from "@mantine/core";
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
  badge: {
    marginLeft: 'auto'
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
        <Title style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '250px' }} order={5}>{secret.title}</Title>
        <Text>{secret.username}</Text>
      </div>
      <div className={classes.badge}>
        <Badge variant="dot" color={(secret.strength||0) > 80 ? 'green' : 'red'}>
          {secret.strength || 0}%
        </Badge>
      </div>
    </Link>
  );
}
