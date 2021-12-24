import { Box, LoadingOverlay, Title, Text, Avatar, Menu, Divider, Modal, useMantineTheme, Button } from "@mantine/core"
import { ArrowRightIcon, DoubleArrowDownIcon, DoubleArrowUpIcon, TrashIcon } from "@modulz/radix-icons"
import { useState } from "react"
import { Link } from "remix"
import { deleteSecret } from "~/api/secrets/request"
import { Profile } from "~/types"
import gravatarUrl from "~/utils/helpers"

type FamilyCardProp = Profile & {
  canEdit: boolean;
  admin: boolean;
  onMakeAdmin: () => void;
  onRemoveMember: () => void;
}
export const FamilyCard = ({ admin, name, email, canEdit, onMakeAdmin, onRemoveMember }: FamilyCardProp) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <>
      <Box sx={(theme) => ({
        background: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[0],
        padding: '1rem',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      })}>
        <Avatar radius="xl" src={gravatarUrl(email)}/>
        <Box style={{ flex: 1, marginLeft: '1rem' }}>
          <Title order={5}>{name}</Title>
          <Text>{email}</Text>
        </Box>
        {canEdit && (
          <Menu>
            <Menu.Label>Options</Menu.Label>
            <Menu.Item
              icon={admin ? <DoubleArrowDownIcon /> : <DoubleArrowUpIcon />}
              onClick={() => onMakeAdmin()}
            >
              {admin ? 'Downgrade Access' : 'Make Admin'}
            </Menu.Item>
            <Divider />
            <Menu.Label>Danger Zone</Menu.Label>
            <Menu.Item icon={<TrashIcon />} onClick={() => setOpened(true)}>Delete</Menu.Item>
          </Menu>
        )}
      </Box>

      {/* modal */}
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
                onRemoveMember()
              }}
              color="red"
            >
              I am sure
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
