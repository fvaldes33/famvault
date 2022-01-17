import { Modal, Box, Text, Title, Button, useMantineTheme } from "@mantine/core";
// import { useState } from "react";

export type DestructiveModalProps = {
  opened: boolean;
  isLoading: boolean;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export const DestructiveModal = ({ opened, isLoading, onClose, onConfirm }: DestructiveModalProps) => {
  // const [opened, setOpened] = useState(isOpened);
  const theme = useMantineTheme();

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => onClose()}
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
            onClick={() => onClose()}
            color="green"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await onConfirm();
            }}
            color="red"
            loading={isLoading}
          >
            I am sure
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
