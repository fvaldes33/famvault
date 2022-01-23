import { Text, TextInput, Button, createStyles, Box, Select, NumberInput, Group, Checkbox } from "@mantine/core"
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { PersonIcon, ArchiveIcon } from "@modulz/radix-icons";
import { PostgrestError } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { Form, useNavigate } from "remix"
import { Account, AccountType, useAccounts, useCreateAccount } from "~/api/accounts";
import { useCategories } from "~/api/categories";
import { Transaction, useCreateTransaction } from "~/api/transactions";
import { Family, UnSavedRow } from "~/types";
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

export type TransactionFormProps = {
  transaction?: Transaction;
}

export interface TransactionFormValues extends Omit<Transaction, 'id' | 'date'> {
  id?: number;
  date: Date;
};

export function TransactionForm({ transaction }: TransactionFormProps) {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const transactionMutation = useCreateTransaction();
  const { classes } = useStyles();
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();

  const { onSubmit, getInputProps, validate } = useForm<TransactionFormValues>({
    initialValues: transaction ? {
      id: transaction.id,
      account_id: transaction.account_id?.toString(),
      category_id: transaction.category_id?.toString(),
      amount: transaction.amount,
      date: dayjs(transaction.date).toDate(),
      description: transaction.description,
      excludeFromTotals: transaction.excludeFromTotals
    } : {
      id: undefined,
      account_id: undefined,
      category_id: undefined,
      amount: 0,
      date: dayjs().toDate(),
      description: '',
      excludeFromTotals: false,
    },
    validationRules: {
      account_id: (value) => !!value,
      category_id: (value) => !!value,
      description: (value) => !!value,
    },
    errorMessages: {
      account_id: 'Account is required',
      category_id: 'Category is required',
      description: 'Description is required',
    }
  })

  const handleSubmit = async ({
    id,
    account_id,
    category_id,
    amount,
    date,
    description,
    excludeFromTotals
  }: TransactionFormValues) => {
    if (!validate()) {
      return;
    }

    transactionMutation.mutate({
      id,
      account_id,
      category_id,
      amount,
      date: dayjs(date).format('YYYY-MM-DD'),
      description,
      excludeFromTotals
    }, {
      onSuccess: (data) => {
        notifications.showNotification({
          color: 'green',
          autoClose: 2000,
          title: `Success`,
          message: `Transaction was ${id ? `updated` : `created`}`,
          onClose: () => {
            navigate('/finance/transactions')
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
        <Select
          searchable
          required
          label={<Text component="span" transform="uppercase" inherit>Account</Text>}
          placeholder="Account"
          data={(accounts || []).map(a => ({ label: a.name, value: a.id.toString() }))}
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('account_id')}
        />

        <TextInput
          required
          label={<Text component="span" transform="uppercase" inherit>Description</Text>}
          placeholder="Description"
          type="text"
          name="description"
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('description')}
        />

        <Group
          style={{
            alignItems: 'flex-end',
            marginBottom: '1rem'
          }}
        >
          <NumberInput
            required
            label={<Text component="span" transform="uppercase" inherit>Amount</Text>}
            placeholder="Amount"
            name="amount"
            style={{
              flex: '1'
            }}
            {...getInputProps('amount')}
          />

          <Checkbox
            label={<Text component="span" transform="uppercase" inherit>Exclude From Totals</Text>}
            color="green"
            style={{
              marginBottom: '0.5rem'
            }}
            {...getInputProps('excludeFromTotals', { type: 'checkbox' })}
          />
        </Group>

        <DatePicker
          required
          label={<Text component="span" transform="uppercase" inherit>Date</Text>}
          name="date"
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('date')}
        />

        <Select
          searchable
          required
          label={<Text component="span" transform="uppercase" inherit>Category</Text>}
          placeholder="Category"
          data={(categories||[]).map(a => ({ label: a.name, value: a.id.toString() }))}
          style={{
            marginBottom: '1.5rem'
          }}
          {...getInputProps('category_id')}
        />

        <Button loading={transactionMutation.isLoading} type="submit" color={'green'}>{transaction ? 'Update' : 'Create'} Transaction</Button>
        {transactionMutation.isError && <p>{(transactionMutation.error as PostgrestError).message}</p>}
      </Form>
    </Box>
  );
}
