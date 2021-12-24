import { ActionIcon, Box, Col, Container, Grid, LoadingOverlay, ThemeIcon, Title } from "@mantine/core";
import { ArrowRightIcon } from "@modulz/radix-icons";
import { MetaFunction, LoaderFunction, redirect, useLocation, useNavigate, Link } from "remix";
import { useLoaderData, json } from "remix";
import { useFamily } from "~/api/families";
import { useProfile } from "~/api/profiles";
import { useSecrets } from "~/api/secrets";
import Hero from "~/components/Hero";
import { DashboardCard } from "~/components/DashboardCard";
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
    title: "FAMVAULT | Family Password Sharing Tool",
    description: "A minimalist approach to family password sharing done right."
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { user } = useLoaderData<any>() || {};
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
    error: errorProfile
  } = useProfile(user);
  const {
    data: family,
    isLoading: isLoadingFamily,
    isError: isErrorFamily,
    error
  } = useFamily();
  const {
    data: secrets,
    isLoading: isLoadingSecrets,
    isError: isErrorSecrets,
    error: errorSecrets
  } = useSecrets();

  if (isLoadingFamily) {
    return (
      <LoadingOverlay visible={true} />
    )
  }

  if (isErrorFamily) {
    return (
      <div>
        Whoops! {error?.message}.
      </div>
    )
  }

  return (
    <Box style={{
      minHeight: 'calc(100% - 80px)',
    }}>
      <Hero
        heading={`Welcome,<br/>${profile?.name}!`}
      />

      <Container size="xl">
        <Grid>
          <Col span={12} md={6} lg={4}>
            <DashboardCard
              link="/passwords"
              label="Passwords"
              value={secrets ? secrets.length.toString() : `0`}
              isLoading={isLoadingSecrets} />
          </Col>
          <Col span={12} md={6} lg={4}>
            <DashboardCard
              link="/files"
              label="Files"
              value={`0`}
              isLoading={isLoadingSecrets}
            />
          </Col>
          <Col span={12} md={6} lg={4}>
            <DashboardCard
              link="/family"
              label="Family"
              value={family ? family.members?.length.toString() : `0`}
              isLoading={isLoadingFamily}
            />
          </Col>
        </Grid>
      </Container>

    </Box>
  )
}
