import { Box, LoadingOverlay, Title, ActionIcon } from "@mantine/core"
import { ArrowRightIcon } from "@modulz/radix-icons"
import { Link } from "remix"

export const DashboardCard = ({ link, label, value, isLoading }: { link: string, label: string, value?: any, isLoading: boolean }) => {
  return (
    <Box sx={(theme) => ({
      background: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[0],
      padding: '2rem',
      position: 'relative',
    })}>
      <LoadingOverlay visible={isLoading} />
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Title order={4}>{label}</Title>
        <ActionIcon size="lg" color="green" variant="light" component={Link} to={link}>
          <ArrowRightIcon />
        </ActionIcon>
      </Box>
      {value && (<Title>{value}</Title>)}
    </Box>
  )
}
