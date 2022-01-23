import { Box, Button, Col, Container, Grid, Title, Text, Select, Checkbox, Timeline, Progress } from "@mantine/core";
import { MetaFunction, LoaderFunction, json, useNavigate } from "remix";
import { useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import { csvToArray, spliceIntoChunks } from "~/utils/helpers";
import { ImporterDropzone, Mapper, Missing } from "~/components/Importer";
import { useFamily } from "~/api/families";
import { useCreateCategoryBulk, useCategories, useUpdateCategory, Category } from "~/api/categories";
import { AccountType, useCreateAccountBulk, useAccounts, Account } from "~/api/accounts";
import { TransactionImportMapKeys, UnSavedRow } from "~/types";
import { Transaction, useCreateTransactionBulk } from "~/api/transactions";
import { useNotifications } from "@mantine/notifications";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {
  return json({});
}

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Finance -> Importer | FAMVAULT | Family Password Sharing Tool",
    description: "A minimalist approach to family password sharing done right."
  };
};

export type TransactionImport = {
  account: string | undefined;
  category: string | undefined;
  description: string;
  amount: string;
  date: string;
}

export type NewMappedAccount = { name: string, type: AccountType };

// https://remix.run/guides/routing#index-routes
export default function ImporterRoute() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  const { data: family } = useFamily();
  const { data: categories, refetch: refetchCategories } = useCategories();
  const { data: accounts, refetch: refetchAccounts } = useAccounts();

  // const createAccount = useCreateAccount();
  const updateCategory = useUpdateCategory();
  const createTransactionBulk = useCreateTransactionBulk();
  const createAccountBulk = useCreateAccountBulk();
  const createCategoryBulk = useCreateCategoryBulk();

  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [headers, setHeaders] = useState<string[]>();
  const [data, setData] = useState<{ [key: string]: string }[]>();
  const [accountMapped, setAccountMapped] = useState<boolean>(false);
  const [categoriesMapped, setCategoriesMapped] = useState<boolean>(false);

  const [missingAccounts, setMissingAccounts] = useState<string[]>([]);
  const [missingCategories, setMissingCategories] = useState<string[]>([]);
  const [importMapping, setImportMapping] = useState<TransactionImport[]>([]);
  const [accountMapping, setAccountMapping] = useState<{ name: string, type: AccountType }[]>([]);
  const [importInto, setImportInto] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const uploadFile = (file: File) => {
    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const { headers, data } = csvToArray(event.target?.result as string);
        setFile(file);
        setHeaders(headers);
        setData(data);
        setLoading(false);
        setStep(1);
      };
      reader.onerror = () => {
        notifications.showNotification({
          color: 'red',
          autoClose: 2000,
          title: 'Sorry',
          message: `Error uploading file`,
        })
      }
      reader.readAsText(file);
    } catch (error) {
      setLoading(false);
    }
  }

  const setTransactionMapping = (mapping: TransactionImportMapKeys) => {
    if (!data) {
      return;
    }

    const transactions: TransactionImport[] = [];
    for (const transaction of data) {
      const mapped = Object.keys(mapping).reduce((acc, key) => {
        const tkey = mapping[key as keyof TransactionImportMapKeys];
        return {
          ...acc,
          [key]: transaction[tkey]
        }
      }, {} as TransactionImport)

      transactions.push(mapped);
    }

    setImportMapping(transactions);

    if (Object.keys(mapping).includes('account') && mapping.account) {
      // create unique set of accounts
      const accountMatches = new Set(transactions.map(m => m.account as string));
      const missingAcct = [...accountMatches].filter(a => a && !accounts?.find(c => a.toLowerCase() === c.name.toLowerCase()));

      setMissingAccounts(missingAcct);
      setAccountMapped(true);
    }

    if (Object.keys(mapping).includes('category') && mapping.category) {
      // create unique set of categories
      const categoryMatches = new Set(transactions.map(m => m.category as string));
      const missingCats = [...categoryMatches].filter(a => a && !categories?.find(c => a.toLowerCase() === c.name.toLowerCase()));

      setMissingCategories(missingCats);
      setCategoriesMapped(true);
    }

    setStep(2);
  }

  const beforeFinalizeResolveCategories = async (): Promise<Category[]> => {
    return await new Promise((resolve, reject) => {
      if (categoriesMapped && missingCategories.length) {
        createCategoryBulk.mutate(
          missingCategories.map((a) => ({ family_id: family!.id, name: a })),
          {
            onSuccess: async (data) => {
              refetchCategories();
              resolve(data ? [...data, ...(categories ?? [])] : categories ?? []);
            },
            onError: () => {
              reject();
            }
          }
        )
      } else {
        resolve(categories ?? []);
      }
    })
  }

  const beforeFinalizeResolveAccounts = async (newAccounts: NewMappedAccount[] | undefined): Promise<Account[]> => {
    return await new Promise((resolve, reject) => {
      if (accountMapped && newAccounts && newAccounts.length) {
        createAccountBulk.mutate(
          newAccounts.map((a) => ({ family_id: family!.id, ...a })),
          {
            onSuccess: async (data) => {
              refetchAccounts();
              resolve(data ? [...data, ...(accounts ?? [])] : accounts ?? []);
            },
            onError: () => {
              reject();
            }
          }
        )
      } else {
        resolve(accounts ?? []);
      }
    })
  }

  const finalizeImport = async ({
    newAccounts,
  }: {
      newAccounts?: NewMappedAccount[]
  } = {}) => {
    // implement
    const savedCategories = await beforeFinalizeResolveCategories();
    const savedAccounts = await beforeFinalizeResolveAccounts(newAccounts);

    const transactions: UnSavedRow<Transaction>[] = importMapping.map((row) => {

      let accountId: number | undefined;
      if (accountMapped && savedAccounts) {
        accountId = savedAccounts.find(a => a.name === row.account)?.id
      } else {
        accountId = +importInto;
      }

      let categoryId: number | undefined;
      if (categoriesMapped && savedCategories) {
        categoryId = savedCategories.find(a => a.name === row.category)?.id
      } else {
        if (categories) {
          categoryId = categories.find(c => c.match_rules?.includes(row.description))?.id;
        }
      }

      return {
        amount: parseFloat(row.amount),
        description: row.description ?? "[Missing]",
        date: row.date,
        account_id: accountId,
        category_id: categoryId ?? null,
        excludeFromTotals: false
      }
    });

    saveTransactions(transactions, savedCategories);
  }

  const saveTransactions = async (
    transactions: UnSavedRow<Transaction>[],
    savedCategories: Category[]
  ) => {
    await queryClient.invalidateQueries();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return prev;
        }
        return prev + 10;
      })
    }, 100);

    const mutate = (transactions: UnSavedRow<Transaction>[], isLast: boolean = false) => {
      createTransactionBulk.mutate(transactions, {
        onSuccess: async (data) => {
          await saveMatchRules(data!, savedCategories);

          if (isLast) {
            await queryClient.invalidateQueries(['get-transactions']);
            setProgress(100);
            completeImport();
          }
        },
        onError: (err) => {
          console.log('err', err)
        }
      })
    }

    if (transactions.length >= 1000) {
      // chunk it
      const chunks = spliceIntoChunks<UnSavedRow<Transaction>>(transactions, 1000);
      chunks.forEach((chunk, index) => mutate(chunk, index === (chunks.length - 1) ? true : false));
    } else {
      mutate(transactions, true)
    }
  }

  const completeImport = () => {
    notifications.showNotification({
      color: 'green',
      autoClose: 2000,
      title: 'Complete',
      message: `Your transactions have been imported`,
      onClose: () => {
        if (!categoriesMapped) {
          navigate('/finance/transactions?category=uncategorized')
        } else {
          navigate('/finance/transactions')
        }
      }
    })
  }

  /**
   * @todo batch this
   */
  const saveMatchRules = useCallback(
    async (rows: Transaction[], savedCategories: Category[]) => {
      if (!savedCategories) {
        return;
      }

      let catsToSave: { [key: number]: UnSavedRow<Category> } = {};

      rows.filter(r => !!r.category_id).forEach(r => {
        const cat: Category = savedCategories.find(c => c.id === r.category_id)!;
        if (!cat) {
          console.log('no cat exists for ', r.category_id);
        } else {
          let match_rules = cat.match_rules ?? [];
          match_rules.push(r.description);

          if (catsToSave[cat.id]) {
            match_rules = [
              ...match_rules,
              ...(catsToSave[cat.id].match_rules ?? [])
            ]
          }

          catsToSave = {
            ...catsToSave,
            [cat.id]: {
              ...cat,
              match_rules: [...(new Set(match_rules))]
            }
          };
        }

      });

      return await createCategoryBulk.mutateAsync(Object.values(catsToSave));
    },
    [categories, createCategoryBulk]
  );

  return (
    <Box style={{ padding: '40px 0'}}>
      <Container size="sm">
        <Timeline active={step} bulletSize={24} lineWidth={2}>
          {/* dropzone */}
          <Timeline.Item title="Upload CSV File">
            <ImporterDropzone
              loading={loading}
              onDrop={(files) => uploadFile(files[0])}
              onReject={(files) => console.log('rejected files', files)}
              afterParse={file && (
                <div>
                  <Text size="xl" inline>
                    {file.name}
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Transaction file contains {data?.length} rows;
                  </Text>
                </div>
              )}
            />
          </Timeline.Item>

          {/* match columns */}
          <Timeline.Item title="Match Columns">
            <Text color="dimmed" size="sm">To properly import the data we need you to match each of the fields below with the corresponding columns from your CSV.</Text>
            {headers && headers.length > 0 && (
              <Mapper headers={headers} onNext={setTransactionMapping} />
            )}
          </Timeline.Item>

          {/* account configuration */}
          <Timeline.Item title="Configure Accounts">
            <Text color="dimmed" size="sm">If your file contains an "Account" column and includes accounts you have not already created, you can do so here. If not, choose an account to import these transactions into.</Text>
            {missingAccounts && missingAccounts.length > 0 && (
              <Missing accounts={missingAccounts} onNext={(newAccounts) => finalizeImport({ newAccounts })} />
            )}
            {step === 2 && !accountMapped && (
              <Box style={{ margin: '1rem 0'}}>
                <Select
                  style={{ margin: '0.5rem 0' }}
                  aria-label="Account"
                  placeholder="Choose Account"
                  data={(accounts || []).map((account) => ({ value: `${account.id}`, label: account.name }))}
                  onChange={(val: string) => setImportInto(val)}
                />
                <Button disabled={!importInto} color="green" onClick={() => finalizeImport()}>Start Import</Button>
              </Box>
            )}
            {step === 2 && accountMapped && !missingAccounts.length && (
              <Button color="green" onClick={() => finalizeImport()}>Start Import</Button>
            )}
          </Timeline.Item>

          {/* upload */}
          <Timeline.Item title="Upload">
            <Text color="dimmed" size="sm">Imports over 100 rows, we take time. Progress will be shown below.</Text>
            <Progress value={progress} style={{ margin: '1rem 0' }}/>
          </Timeline.Item>
        </Timeline>
      </Container>
    </Box>
  )
}
