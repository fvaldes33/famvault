import { Button, Group, Modal, Select, Text } from "@mantine/core";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { Category } from "~/api/categories";
import { getTransactions, Transaction, useCreateTransactionBulk, useUpdateTransaction } from "~/api/transactions";

export type CategorySelectorProps = {
  transaction: Transaction;
  categories?: Category[];
  category?: Category;
}

export function CategorySelector({ categories, category, transaction }: CategorySelectorProps) {
  const [opened, setOpened] = useState(false);
  const [newCategory, setNewCategory] = useState<Category>();
  const [currenCategory, setCurrentCategory] = useState<Category | undefined>(category);
  const updateTransaction = useUpdateTransaction();
  const updateTransactionBulk = useCreateTransactionBulk();
  const queryClient = useQueryClient();

  const updateAllTransactions = async () => {
    if (!newCategory || !currenCategory) {
      return;
    }

    const matchingTransactions = await getTransactions({
      limit: 1000,
      categoryId: currenCategory.id.toString(),
    });

    const newTransactions = matchingTransactions.map((trans: Transaction): Transaction => ({
      id: trans.id,
      description: trans.description,
      amount: trans.amount,
      date: trans.date,
      account_id: trans.account_id,
      category_id: newCategory.id
    }))

    updateTransactionBulk.mutate(newTransactions, {
      onSuccess: async () => {
        await queryClient.invalidateQueries();

        setOpened(false);
        setCurrentCategory(newCategory)
        setNewCategory(undefined);

      }
    })
  }

  const updateSingleTransaction = () => {
    if (!newCategory) {
      return;
    }

    updateTransaction.mutate({
      ...transaction,
      category_id: newCategory.id
    }, {
      onSuccess: () => {
        setOpened(false);
        setCurrentCategory(newCategory)
        setNewCategory(undefined);
      }
    })
  }

  return (
    <>
      <Select
        aria-label="Category"
        data={(categories || []).map((cat) => ({ label: cat.name, value: cat.id.toString() }))}
        value={category?.id.toString()}
        onChange={(newId) => {
          //prompt
          console.log('newid', newId)
          if (newId) {
            setNewCategory(categories?.find(c => c.id === +newId))
            setOpened(true);
            // updateTransaction.mutate({
            //   ...transaction,
            //   category_id: +newId
            // })
          }
        }}
      />
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Update Transactions"
      >
        <Text>Update all transactions matching "{transaction.description}" to "{newCategory?.name}"?</Text>

        <Group position="apart" style={{ marginTop: '1rem' }}>
          <Button color="green" variant="light" size="xs" onClick={() => updateAllTransactions()} loading={updateTransactionBulk.isLoading}>
            Update All
          </Button>
          <Button color="green" variant="subtle" size="xs" onClick={() => updateSingleTransaction()}>
            Just this one!
          </Button>
        </Group>
      </Modal>
    </>
  );
}
