import { Box, Text, Button, Select } from "@mantine/core"
import { useForm } from "@mantine/hooks"
import { TransactionImportMapKeys } from "~/types"
import { transactionFieldMap } from "~/utils/helpers"

export type MapperProps = {
  headers: string[];
  onNext: (map: TransactionImportMapKeys) => void;
}

export type GenericFieldValidation = {
  [K in keyof TransactionImportMapKeys]: (val: string) => boolean;
}

export function Mapper({ headers, onNext }: MapperProps) {
  const { onSubmit, getInputProps, validate } = useForm<TransactionImportMapKeys>({
    initialValues: transactionFieldMap.reduce((map: TransactionImportMapKeys, field) => {
      return {
        ...map,
        [field.value]: ''
      }
    }, {} as TransactionImportMapKeys),
    validationRules: transactionFieldMap.reduce((map: GenericFieldValidation, field) => {
      if (!field.required) {
        return {
          ...map
        }
      }
      return {
        ...map,
        [field.value]: (val: string) => !!val
      }
    }, {} as GenericFieldValidation),
  })

  const submitMappingForm = (values: TransactionImportMapKeys) => {
    if (validate()) {
      onNext(values);
    }
  }

  return (
    <form onSubmit={onSubmit(submitMappingForm)} style={{ margin: '1rem 0'}}>
      {headers && headers.length > 0 && (
        <Box>
          {transactionFieldMap.map((field, index: number) => (
            <Box key={index} sx={(theme) => ({
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1rem',
              width: '100%'
            })}>
              <Text style={{ width: '150px' }}>{field.label}{field.required ? '*' : ' (optional)'}</Text>
              <Select
                aria-label="header"
                placeholder="Choose column"
                data={(headers || []).map((header) => ({ value: header, label: header }))}
                {...getInputProps(field.value)}
              />
            </Box>
          ))}

          <Button type="submit" color="green">Next</Button>
        </Box>
      )}
    </form>
  )
}
