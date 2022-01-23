import { Text, TextInput, Button, createStyles, Box, Select } from "@mantine/core"
import { useForm } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { PersonIcon, ArchiveIcon } from "@modulz/radix-icons";
import { PostgrestError } from "@supabase/supabase-js";
import { Form, useNavigate } from "remix"
import { Account, AccountType, useCreateAccount } from "~/api/accounts";
import { Family } from "~/types";
import { accountTypes } from "~/utils/helpers";

const useStyles = createStyles(theme => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  }
}));

export type AccountFormProps = {
  family: Family;
  account?: Account;
}

export type AccountFormValues = {
  id?: number;
  name: string;
  type: AccountType;
  family_id: number;
};

export function AccountForm({ family, account }: AccountFormProps) {
  const navigate = useNavigate();
  const accountMutation = useCreateAccount();
  const { classes } = useStyles();
  const notifications = useNotifications();

  const { onSubmit, getInputProps, validate } = useForm<AccountFormValues>({
    initialValues: account ? {
      id: account.id,
      name: account.name,
      type: account.type,
      family_id: family.id
    } : {
        family_id: family.id,
        type: AccountType.CHECKING,
        name: '',
    },
    validationRules: {
      name: (value) => !!value,
    },
    errorMessages: {
      name: 'Name is required',
    }
  })

  const handleSubmit = async ({ id, family_id, type, name }: AccountFormValues) => {
    if (!validate()) {
      return;
    }

    accountMutation.mutate({
      id,
      family_id,
      type,
      name,
    }, {
      onSuccess: (data) => {
        notifications.showNotification({
          color: 'green',
          autoClose: 2000,
          title: `Success`,
          message: `Account ${name} was ${id ? `updated` : `created`}`,
          onClose: () => {
            navigate('/finance/accounts')
          }
        })
      },
      onError: (error) => {
        console.log(error);
      }
    })
  }

  return (
    <Box className={classes.wrapper} sx={(theme) => ({
      color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.dark[9],
      fontSize: theme.fontSizes.xs,
    })}>
      <Form className={classes.form} onSubmit={onSubmit(handleSubmit)}>
        <TextInput
          icon={<PersonIcon />}
          label={<Text transform="uppercase" inherit>Name</Text>}
          placeholder="Name"
          type="text"
          name="name"
          size="md"
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('name')}
        />

        <Select
          label={<Text transform="uppercase" inherit>Type</Text>}
          icon={<ArchiveIcon />}
          placeholder="Account Type"
          data={accountTypes}
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('type')}
        />

        <Button loading={accountMutation.isLoading} type="submit" color={'green'}>{account ? 'Update' : 'Create'} Account</Button>
        {accountMutation.isError && <p>{(accountMutation.error as PostgrestError).message}</p>}
      </Form>
    </Box>
  )
}
