import { Box, Card, Grid, Group, Container, Button, Title, Text, Col, Table } from "@mantine/core";
import { MetaFunction, LoaderFunction, json, Link } from "remix";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import styles from "billboard.js/dist/billboard.css";
import theme from "billboard.js/dist/theme/insight.css";

import TransactionFilters from "~/components/TransactionFilters";
import { useTransactionFilters } from "~/utils/useTransactionFilters";
import { useMemo } from "react";
import { Account } from "~/api/accounts";
import BillboardChart from "~/components/BillboardChart";
import { formatCurrency } from "~/utils/helpers";
import { spline } from "billboard.js";

dayjs.extend(objectSupport);

export type ByDateType = {
  date: string;
  index: number;
  expenses: number;
  income: number;
}

export type Cashflow = {
  date: string;
  index: number;
  expenses: number;
  income: number;
  cashflow: number;
}

export type TotalCashflow = {
  income: number;
  expenses: number;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }, { rel: "stylesheet", href: theme }];
}

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
    title: "Finance | FAMVAULT | Family Password Sharing Tool",
    description: "A minimalist approach to family password sharing done right."
  };
};

// https://remix.run/guides/routing#index-routes
export default function FinanceRoute() {

  const today = dayjs();
  const {
    accounts,
    categories,
    filters,
    transactions,
    count,
    loading,
    setSort,
    setFilters,
    resetFilters
  } = useTransactionFilters({
    initialFilters: {
      limit: 1000,
      dates: [
        dayjs().set({ year: today.year(), month: today.month(), date: 1 }).toDate(),
        dayjs().set({ year: today.year(), month: today.month() + 1, date: 1 }).toDate(),
      ],
      // (where excludeFromTotals = false)
      excludeFromTotals: false
    }
  });

  const { income, expenses } = useMemo(
    () => {
      if (!transactions) {
        return {
          income: 0,
          expenses: 0
        }
      };

      return transactions.reduce((acc, transaction) => ({
        ...acc,
        income: transaction.amount > 0 ? acc.income + transaction.amount : acc.income,
        expenses: transaction.amount < 0 ? acc.expenses + transaction.amount : acc.expenses,
      }), {
        income: 0,
        expenses: 0
      } as TotalCashflow)
    },
    [transactions]
  )

  const cashflow = useMemo(
    () => {
      const [start, end] = (filters.dates || [new Date(), new Date()]);
      const days = dayjs(end).diff(dayjs(start), 'days');

      if (!days) {
        return [];
      }

      return Array.from(Array(days).keys()).reduce((acc, index: number) => {
        const date = index === 0 ? dayjs(start) : dayjs(start).add(index, 'day');
        const expenses = (transactions || [])
          .filter(t => t.date === date.format('YYYY-MM-DD') && t.amount < 0)
          .reduce((acc, t) => {
            return acc + t.amount;
          }, 0);
        const income = (transactions || [])
          .filter(t => t.date === date.format('YYYY-MM-DD') && t.amount > 0)
          .reduce((acc, t) => {
            return acc + t.amount;
          }, 0);

        const today = income + expenses;
        return [
          ...acc,
          {
            date: date.format('YYYY-MM-DD'),
            index,
            expenses: +(expenses.toFixed(2)),
            income: +(income.toFixed(2)),
            cashflow: index === 0 ? today : acc[index - 1].cashflow + today
          }
        ];
      }, [] as Cashflow[]);
    },
    [filters.dates, transactions]
  )

  const byDate = useMemo(
    () => {
      const [start, end] = (filters.dates || [new Date(), new Date()]);
      const days = dayjs(end).diff(dayjs(start), 'days');

      if (!days) {
        return [];
      }

      return Array.from(Array(days).keys()).reduce((acc, index: number) => {
        const date = index === 0 ? dayjs(start) : dayjs(start).add(index, 'day');
        const expenses = (transactions||[])
          .filter(t => t.date === date.format('YYYY-MM-DD') && t.amount < 0)
          .reduce((acc, t) => {
            return acc + t.amount;
          }, 0);
        const income = (transactions||[])
          .filter(t => t.date === date.format('YYYY-MM-DD') && t.amount > 0)
          .reduce((acc, t) => {
            return acc + t.amount;
          }, 0);

        return [
          ...acc,
          {
            date: date.format('YYYY-MM-DD'),
            index,
            expenses: +(expenses.toFixed(2)),
            income: +(income.toFixed(2))
          }
        ];
      }, [] as ByDateType[]);
    },
    [filters.dates, transactions]
  );

  const { data: byAccount, total: byAccountTotal } = useMemo(
    () => {
      if (!accounts || !transactions) {
        return {
          data: [],
          total: 0
        }
      }

      let rollup = 0;
      const accountTotals = accounts?.map((account) => {
        const total = transactions?.filter(t => t.account_id === account.id && t.amount < 0).reduce((acc, trans) => acc + (trans.amount * -1), 0);
        rollup = rollup + (total ?? 0);
        return {
          ...account,
          total: total ?? 0
        }
      }).filter(c => c && c.total > 0);

      return {
        data: accountTotals,
        total: rollup
      }
    },
    [accounts, transactions]
  )

  const { data: byCategory, total: byCategoryTotal } = useMemo(
    () => {
      if (!categories || !transactions) {
        return {
          data: [],
          total: 0
        }
      }

      let rollup = 0;
      let categoryTotals = categories.map((category) => {
        const total = transactions?.filter(t => t.category_id === category.id && t.amount < 0).reduce((acc, trans) => acc + (trans.amount * -1), 0);
        rollup = rollup + (total ?? 0);
        return {
          ...category,
          total: total ?? 0
        }
      }).filter(c => c && c.total > 0);

      const uncategorized = transactions.filter(t => t.category_id === null).reduce((acc, trans) => acc + (trans.amount * -1), 0);
      rollup = rollup + uncategorized;
      categoryTotals.push({
        id: 0,
        name: 'Uncategorized',
        total: uncategorized,
        family_id: 0,
      });

      return {
        data: categoryTotals,
        total: rollup
      }
    },
    [categories, transactions]
  )

  return (
    <>
      <Container size="xl">
        <Box sx={(theme) => ({
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '40px 0 16px',
        })}>
          <Title order={5} style={{ textTransform: 'uppercase', letterSpacing: '1.5px' }}>Cash Flow</Title>
          <Group>
            <Button component={Link} to="/finance/transactions/importer" color="green">
              Import
            </Button>
          </Group>
        </Box>

        <TransactionFilters
          showCount={false}
          showSearch={false}
          accounts={accounts ?? []}
          categories={categories ?? []}
          filters={filters}
          loading={loading}
          count={count ?? 0}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />
      </Container>
      <Container size="xl" style={{ marginBottom: '2rem' }}>
        {/* {JSON.stringify(byDate, null, 2)} */}
        <Grid>
          <Col span={4}>
            <Card>
              <Text>Income: {formatCurrency(income)}</Text>
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Text>Expenses: {formatCurrency(expenses)}</Text>
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Text color={(income + expenses) > 0 ? '' : 'red'}>Surplus: {formatCurrency(income + expenses)}</Text>
            </Card>
          </Col>
        </Grid>
        <Grid>
          <Col span={12}>
            <BillboardChart options={{
              data: {
                x: "date",
                columns: [
                  ["date", ...cashflow.map(b => b.date)],
                  ["cashflow", ...cashflow.map(b => b.cashflow)],
                  // ["expenses", ...cashflow.map(b => b.expenses)],
                  // ["income", ...cashflow.map(b => b.income)],
                ],
                type: 'spline',
              },
              tooltip: {
                format: {
                  value: (value) => {
                    return formatCurrency(value);
                  }
                }
              },
              axis: {
                y: {
                  tick: {
                    format: (val) => {
                      return formatCurrency(val);
                    }
                  }
                },
                x: {
                  type: "timeseries",
                  tick: {
                    format: "%Y-%m-%d",
                  }
                }
              },
            }} />
          </Col>
        </Grid>
        <Grid>
          <Col span={12} md={4}>
            <Card>
              <Text>Accounts: {formatCurrency(byAccountTotal)}</Text>
              <BillboardChart options={{
                data: {
                  columns: byAccount?.map((account) => ([account.name, account.total])),
                  type: 'donut',
                },
              }} />

              {/* <Table striped>
                <thead>
                  <tr>
                    <th>Account</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {byAccount?.map((account) => (
                    <tr key={account.id}>
                      <td>{account.name}</td>
                      <td align="right">{formatCurrency(account.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table> */}
            </Card>
          </Col>
          <Col span={12} md={8}>
            <Card>
              <Text>Categories: {formatCurrency(byCategoryTotal)}</Text>
              <BillboardChart options={{
                data: {
                  columns: byCategory?.map((account) => ([account.name, account.total])),
                  type: 'donut',
                },
                legend: {
                  position: 'right'
                }
              }} />

              {/* <Table striped>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {byCategory?.map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td align="right">{formatCurrency(category.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table> */}
            </Card>
          </Col>
        </Grid>
      </Container>
    </>
  )
}
