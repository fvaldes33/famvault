import { Box, Button, Col, Container, Grid, LoadingOverlay, Title, Text } from "@mantine/core";
import { PlusIcon } from "@modulz/radix-icons";
import { MetaFunction, LoaderFunction, Link, useLoaderData } from "remix";
import { json } from "remix";
import { useFamily, useMakeAdmin, useRemoveMember } from "~/api/families";
import Hero from "~/components/Hero";
import { FamilyCard } from "~/components/FamilyCard";
import { getLoggedInUser } from "~/utils/sessions";
import { User } from "@supabase/supabase-js";
import { client } from "~/utils/client";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {
  const user = await getLoggedInUser(request);
  return json({
    user
  })
}

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Family | FAMVAULT | Family Password Sharing Tool",
    description: "A minimalist approach to family password sharing done right."
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { user } = useLoaderData<{ user: User }>();
  const { data: family, isLoading, isError, error } = useFamily();
  const makeAdmin = useMakeAdmin();
  const removeMember = useRemoveMember();

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

  const isAdmin: boolean = family?.members.find(m => m.user_id === user.id)?.admin ?? false;

  const toggleMemberAdmin = (userId: string, admin: boolean) => {
    makeAdmin.mutate({ userId, admin }, {
      onSuccess: () => {
        client.invalidateQueries(['get-family']);
      }
    })
  }

  const removeMemberAction = (userId: string) => {
    removeMember.mutate(userId, {
      onSuccess: () => {
        client.invalidateQueries(['get-family']);
      }
    })
  }

  return (
    <>
      <Box sx={(theme) => ({
        background: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[0],
        marginBottom: theme.spacing.xl
      })}>
        <Hero
          heading={family!.name}
          action={isAdmin && (
            <Link to="/family/invite">
              <Button color="green" leftIcon={<PlusIcon />}>
                Invite
              </Button>
            </Link>
          )}
        />
      </Box>

      <Container size="xl">
        <Grid>
          {family?.members?.map((member) => {
            //{ user_id: string; profiles: Profile }
            const { user_id, profiles, admin } = member;
            return (
              <Col span={12} md={6} lg={4} key={user_id}>
                <FamilyCard
                  {...profiles}
                  admin={admin}
                  canEdit={isAdmin && user_id !== user.id}
                  onMakeAdmin={() => toggleMemberAdmin(user_id, !admin)}
                  onRemoveMember={() => removeMemberAction(user_id)}
                />
              </Col>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}
