import { Box, Container, Title } from "@mantine/core";
import { MetaFunction, LoaderFunction, ActionFunction, json } from "remix";
import { FamilyForm } from "~/components/FamilyForm";
import { useFamily } from "~/api/families";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {
  return json({});
}

export let action: ActionFunction = async ({ request }) => {
  const data = await request.json();

  console.log(data);

  return json({
    data
  })
}

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Invite | FAMVAULT | Family Password Sharing Tool",
    description: "A minimalist approach to family password sharing done right."
  };
};

// https://remix.run/guides/routing#index-routes
export default function FamilyInviteRoute() {
  const { data: family, isLoading } = useFamily();

  return (
    <Container size="sm">
      <Box sx={(theme) => ({
        padding: '40px 0',
      })}>
        <Title sx={(theme) => ({
          fontSize: '40px',
          [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
            fontSize: '60px',
          },
        })}>Invite Family Member</Title>
      </Box>
      {family && (
        <FamilyForm family={family!} />
      )}
    </Container>
  )
}
