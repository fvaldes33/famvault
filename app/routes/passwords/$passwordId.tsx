import { Box, Container, LoadingOverlay, Button, Title, Text, useMantineTheme, Modal } from "@mantine/core";
import { TrashIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { json, Link, LoaderFunction, MetaFunction, useNavigate, useParams } from "remix";
import { useDeleteSecret, useSecret } from "~/api/secrets";
import { Clipboardable } from "~/components/Clipboardable";

export const loader: LoaderFunction = async ({ params }) => {
  return json({})
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Passwords | FAMVAULT | Family Password Sharing Tool",
    description: "A minimalist approach to family password sharing done right."
  };
};

export default function PasswordRoute() {
  const params = useParams();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const { data: secret, isLoading } = useSecret(params.passwordId ? params.passwordId : '');
  const deleteSecret = useDeleteSecret();

  if (isLoading) {
    return (
      <LoadingOverlay visible={true} />
    )
  }

  if (!secret) {
    return (
      <>
        Whoops
      </>
    );
  }

  return (
    <Container size="sm">
      <Box sx={(theme) => ({
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '40px 0',
      })}>
        <Title sx={(theme) => ({
          fontSize: '40px',
          [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
            fontSize: '60px',
          },
        })}>{secret.title}</Title>
      </Box>
      <Box>
        <Clipboardable label="Username" value={secret.username} />
        <Clipboardable label="Password" value={secret.pass} />
        {secret.website && (
          <Clipboardable label="Website" value={secret.website} />
        )}

        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            component={Link}
            to={`/passwords/${secret.uid}/edit`}
            color="green"
          >
            Edit
          </Button>
          <Button
            onClick={() => setOpened(true)}
            color="dark"
            leftIcon={<TrashIcon />}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        overlayColor={theme.colors.red[2]}
        overlayOpacity={0.95}
      >
        <Box sx={(theme) => ({
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        })}>
          <Title order={3}>Are you sure?</Title>
          <Text>You cannot undo this action.</Text>
          <Box style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
            <Button
              onClick={() => setOpened(false)}
              color="green"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await deleteSecret.mutateAsync(secret.id!);
                setOpened(false);
                navigate('/passwords');
              }}
              color="red"
              loading={deleteSecret.isLoading}
            >
              I am sure
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

// export function CatchBoundary() {
//   const params = useParams();
//   const caught = useCatch();

//   if (caught.status === 404) {
//     return (
//       <div>
//         Huh... Couldn't find an client with the ID of: {params.passwordId}
//       </div>
//     );
//   }

//   throw new Error(`Unexpected caught response with status: ${caught.status}`);
// }

// export function ErrorBoundary({ error }: { error: Error }) {
//   console.error(error);

//   return <div>Uh oh. I did a whoopsies</div>;
// }
