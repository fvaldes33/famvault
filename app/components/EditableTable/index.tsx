import { ActionIcon, Table } from '@mantine/core';
import { CaretDownIcon, CaretUpIcon } from '@modulz/radix-icons';
import { useState } from 'react';
import { Sort } from '~/types';

export type EditableTableProps<T> = {
  headers: {
    label: string;
    key: keyof T;
    sortable: boolean,
    sortFn?: (sort: Sort<T>) => void;
  }[];
  data: T[];
  renderRow: (row: T) => JSX.Element;
}

export type SortState<T> = {
  [K in keyof T]: boolean;
}

export function EditableTable<T>({ headers, data, renderRow }: EditableTableProps<T>) {
  const [sorted, setSorted] = useState(() => {
    return headers.reduce((map, header) => {
      return {
        ...map,
        [header.key]: false
      }
    }, {} as SortState<T>)
  })

  return (
    <Table verticalSpacing="md">
      <thead>
        <tr>
          {headers.map(({ label, key, sortable, sortFn }) => (
            <th style={{ verticalAlign: 'middle' }}>
              <span>{label}</span>
              {sortable && (
                <ActionIcon onClick={() => {
                  if (sortFn) {
                    setSorted({
                      ...sorted,
                      [key]: !sorted[key]
                    });
                    sortFn({ column: key, ascending: !sorted[key] })
                  }
                }} size="sm" style={{ display: 'inline-block', marginLeft: '1rem'}}>
                  {sorted[key] ? <CaretDownIcon /> : <CaretUpIcon />}
                </ActionIcon>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: T) => renderRow(row))}
      </tbody>
    </Table>
  );
}
