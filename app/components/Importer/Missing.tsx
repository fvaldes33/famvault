import { Box, Text, Button, Select } from "@mantine/core"
import { useForm } from "@mantine/hooks"
import { useMemo } from "react"
import { AccountType } from "~/api/accounts"
import { accountTypes, transactionFieldMap } from "~/utils/helpers"

export type MissingProps = {
  accounts?: string[];
  onNext: (accounts: { name: string, type: AccountType }[]) => void;
}

export type MissingFormValues = {
  accounts: {
    name: string;
    type: AccountType;
  }[]
}

export function Missing({ accounts, onNext }: MissingProps) {
  const { onSubmit, setValues, getInputProps, validate, values } = useForm<MissingFormValues>({
    initialValues: {
      accounts: (accounts || []).map(a => ({
        name: a,
        type: AccountType.CREDITCARD
      }))
    },
    validationRules: {
      accounts: (val) => {
        return val.every(a => a.name && a.type);
      }
    }
  })

  const submitMappingForm = (values: MissingFormValues) => {
    if (validate()) {
      onNext(values.accounts);
    }
  }

  return (
    <form onSubmit={onSubmit(submitMappingForm)} style={{ margin: '1rem 0' }}>
      {accounts && accounts.length > 0 && (
        <Box>
          {accounts.map((field, index: number) => (
            <Box key={index} sx={(theme) => ({
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1rem',
              width: '100%'
            })}>
              <Text style={{ width: '50%' }}>{field}</Text>
              <Select
                aria-label="Account Type"
                placeholder="Account Type"
                data={accountTypes}
                onChange={(val: any) => {
                  console.log(val);
                  setValues((currentValues) => ({
                    ...currentValues,
                    accounts: [
                      ...currentValues.accounts.filter(a => a.name !== field),
                      { name: field, type: val },
                    ]
                  }))
                }}
              />
            </Box>
          ))}

          <Button type="submit" color="green">Start Import</Button>
        </Box>
      )}
    </form>
  )
}
