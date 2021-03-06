import { Box, Button, Text, TextInput, Card, Container, Group, Select, Title, Loader } from "@mantine/core";
import { DateRangePicker } from '@mantine/dates';
import { MagnifyingGlassIcon } from "@modulz/radix-icons";
import { useMemo } from "react";
import { Account } from "~/api/accounts";
import { Category } from "~/api/categories";
import { TransactionFilters } from "~/api/transactions";
import { uncategorizedCategory } from "~/utils/helpers";

export type TransactionFiltersProps = {
  accounts: Account[];
  categories: Category[];
  filters: TransactionFilters;
  loading: boolean;
  count: number;
  showSearch?: boolean;
  showCount?: boolean;
  setFilters: React.Dispatch<React.SetStateAction<TransactionFilters>>;
  resetFilters: () => void;
}

export default function TransactionFilterComponent({
  accounts,
  categories,
  filters,
  loading,
  count,
  showSearch = true,
  showCount = true,
  setFilters,
  resetFilters,
}: TransactionFiltersProps) {

  const { from, to } = useMemo(
    () => {
      if (!count) {
        return {
          from: 0,
          to: 0
        }
      }

      return {
        from: filters.page == 1 ? 1 : (filters.page - 1) * (filters.limit ?? 50),
        to: filters.page === 1 ? Math.min(count, (filters.limit ?? 50)) : filters.page * (filters.limit ?? 50)
      }
    },
    [filters.limit, filters.page, count]
  );

  return (
    <Card style={{ marginBottom: '1rem', position: 'sticky', top: 80, zIndex: 1 }}>
      {showSearch && (
        <Group style={{ marginBottom: '1rem' }}>
          <TextInput
            type="search"
            aria-label="Search"
            placeholder="Search transactions"
            variant="unstyled"
            size="md"
            value={filters.term}
            onChange={(e) => setFilters((prev) => ({
              ...prev,
              term: e.target.value
            }))}
            icon={loading ? (<Loader size="xs" />) : (<MagnifyingGlassIcon />)}
          />
        </Group>
      )}
      <Group position="apart">
        <Group>
          <DateRangePicker
            aria-label="Pick dates range"
            placeholder="Pick dates range"
            color="green"
            firstDayOfWeek="sunday"
            value={filters.dates}
            onChange={([start, end]) => setFilters((prev) => ({ ...prev, dates: [start, end] }))}
          />

          <Select
            aria-label="Accounts"
            placeholder="Accounts"
            data={(accounts || []).map((acct) => ({ label: acct.name, value: acct.id.toString() }))}
            value={filters.account}
            onChange={(newId) => {
              //prompt
              if (newId) {
                setFilters((prev) => ({
                  ...prev,
                  account: newId
                }));
              }
            }}
          />
          <Select
            aria-label="Categories"
            placeholder="Categories"
            data={[...(categories || []), uncategorizedCategory].map((cat) => ({ label: cat.name, value: cat.id.toString() }))}
            value={filters.category}
            onChange={(newId) => {
              //prompt
              if (newId) {
                setFilters((prev) => ({
                  ...prev,
                  category: newId
                }));
              }
            }}
          />
          {showCount && (
            <Text>Showing {from} - {to} of {count}</Text>
          )}
        </Group>
        <Group>
          <Button variant="light" color="green" onClick={() => {
            resetFilters();
          }}>
            Clear
          </Button>
        </Group>
      </Group>
    </Card>
  );
}
