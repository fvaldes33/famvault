import { Box, Col, Container, Grid, LoadingOverlay, Title } from "@mantine/core";
import { MetaFunction, LoaderFunction, redirect, useLocation, useNavigate } from "remix";
import { useLoaderData, json } from "remix";
import { useFamily } from "~/api/families";
import { getLoggedInUser } from "~/utils/sessions";
import { supabase } from "~/utils/supabase";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {

  const user = await getLoggedInUser(request);
  if (!user) {
    return redirect('/login')
  }

  const { data: family, error } = await supabase
    .from('families')
    .select('*, members!inner(*)')
    .eq('members.user_id', user.id)
    .single()

  if (!family) {
    return redirect('/onboarding');
  }

  return json({
    user
  })
}

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { user } = useLoaderData<any>() || {};
  const { data: family, isLoading, isError, error } = useFamily();

  if (isLoading) {
    return (
      <LoadingOverlay visible={true} />
    )
  }

  if (isError) {
    return (
      <div>
        Whoops! {error?.message}.
      </div>
    )
  }

  return (
    <Box style={{
      height: '100%',
    }}>
      <Container size="xl" sx={(theme) => ({
        position: 'relative',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
          paddingTop: '4rem',
          paddingBottom: '4rem',
        },
      })}>
        <Grid justify="space-between" align="center">
          <Col span={12}>
            <Title>Welcome,<br/>{user.user_metadata.fullName}!</Title>
            <Title order={3}>@todo 🙏🏽</Title>
          </Col>
        </Grid>
      </Container>
    </Box>
  )
}
