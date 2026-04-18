'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownAZ, ArrowUpAZ, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Column<T> = {
  key: string;
  header: string;
  sortable?: boolean;
  className?: string;
  render: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  pageSize?: number;
};

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchKeys = [],
  searchPlaceholder = 'Search records...',
  pageSize = 5,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return data;

    return data.filter((item) =>
      searchKeys.some((key) => String(item[key] ?? '').toLowerCase().includes(normalized)),
    );
  }, [data, query, searchKeys]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const column = columns.find((item) => item.key === sort.key);
    if (!column) return filtered;

    return [...filtered].sort((a, b) => {
      const aValue = column.sortValue ? column.sortValue(a) : column.render(a)?.toString() ?? '';
      const bValue = column.sortValue ? column.sortValue(b) : column.render(b)?.toString() ?? '';
      const result = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return sort.direction === 'asc' ? result : -result;
    });
  }, [columns, filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageItems = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <Input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          className="pl-9"
          placeholder={searchPlaceholder}
        />
      </motion.div>

      <div className="buzzy-card overflow-hidden rounded-[20px] bg-white dark:bg-[#2A2A2D]">
        <div className="max-h-[540px] overflow-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3 font-medium text-gray-700 backdrop-blur dark:border-gray-700 dark:bg-[#1C1C1E] dark:text-gray-200',
                      column.className,
                    )}
                  >
                    <button
                      type="button"
                      className={cn('inline-flex items-center gap-2', column.sortable ? 'cursor-pointer' : 'cursor-default')}
                      onClick={() => {
                        if (!column.sortable) return;
                        setSort((current) => {
                          if (!current || current.key !== column.key) return { key: column.key, direction: 'asc' };
                          return { key: column.key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
                        });
                      }}
                    >
                      {column.header}
                      {sort?.key === column.key ? (
                        sort.direction === 'asc' ? <ArrowUpAZ className="h-4 w-4" /> : <ArrowDownAZ className="h-4 w-4" />
                      ) : null}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.length ? (
                pageItems.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: index * 0.03 }}
                    whileHover={{ y: -1 }}
                    className="group bg-white dark:bg-[#1C1C1E]"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          'border-b border-gray-200 px-4 py-4 align-middle text-gray-900 transition-colors group-hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:group-hover:bg-[#2A2A2D]',
                          column.className,
                        )}
                      >
                        {column.render(row)}
                      </td>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    No records match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {pageItems.length} of {sorted.length} records
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500 dark:text-gray-400">Page {page} / {totalPages}</span>
          <Button variant="outline" size="sm" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
