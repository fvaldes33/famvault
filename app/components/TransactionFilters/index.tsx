import { Box, Button, Text, TextInput, Card, Container, Group, Select, Title, Loader } from "@mantine/core";
import { DateRangePicker } from '@mantine/dates';
import { MagnifyingGlassIcon } from "@modulz/radix-icons";
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
  setFilters: React.Dispatch<React.SetStateAction<TransactionFilters>>;
  resetFilters: () => void;
}

export default function TransactionFilterComponent({
  accounts,
  categories,
  filters,
  loading,
  count,
  setFilters,
  resetFilters,
}: TransactionFiltersProps) {

  return (
    <Card style={{ marginBottom: '1rem' }}>
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
          <Text>Showing {(count ?? 0) > 50 ? 50 : count} of {count}</Text>
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
