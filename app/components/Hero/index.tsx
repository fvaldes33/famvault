import { createStyles, Title, Col, Container, Grid, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      paddingTop: '4rem',
      paddingBottom: '4rem',
    },
  },
  heading: {
    fontSize: '3rem',
    lineHeight: 1,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: '4rem',
      lineHeight: 1,
    },
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      fontSize: '5rem',
      lineHeight: 1,
    },
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: '6rem',
      lineHeight: 1.125,
    },
  },
  action: {
    display: 'flex',
    justifyContent: 'flex-start',
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      justifyContent: 'flex-end',
    },
  },
}));

export type HeroProps = {
  heading: string;
  subheading?: string;
  action?: React.ReactNode;
}

export default function Hero({ heading, subheading, action }: HeroProps) {
  const { classes } = useStyles();

  return (
    <Container size="xl" className={classes.container}>
      <Grid justify="space-between" align="center">
        <Col span={12} md={8}>
          <Title className={classes.heading} dangerouslySetInnerHTML={{ __html: heading }}/>
          {subheading && <Text>{subheading}</Text>}
        </Col>

        {action && (
          <Col span={12} md={4} className={classes.action}>
            {action}
          </Col>
        )}
      </Grid>
    </Container>
  );
}
