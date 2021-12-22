import {createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  },
}));

export function FullScreenCenter({ children }: { children: React.ReactChild }) {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      {children}
    </div>
  );
}
