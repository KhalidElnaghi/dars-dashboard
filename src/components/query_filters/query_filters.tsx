'use client';

import { useRef, useMemo, useEffect, useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import { QueryStringUpdate, useQueryString } from 'src/hooks/use-queryString';
import { useSearchParams } from 'next/navigation';

type BaseFilterConfig = {
  name: string;
  width?: number | string;
};

type SearchFilterConfig = BaseFilterConfig & {
  type: 'search';
  placeholder?: string;
  debounceMs?: number;
};

type SelectFilterConfig = BaseFilterConfig & {
  type: 'select';
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  allowClear?: boolean;
};

export type FilterConfig = SearchFilterConfig | SelectFilterConfig;

type QueryFiltersProps = {
  filters: FilterConfig[];
  spacing?: number;
};

export default function QueryFilters({ filters, spacing = 2 }: QueryFiltersProps) {
  const searchParams = useSearchParams();
  const querySignature = searchParams.toString();
  const { createQueryString } = useQueryString();
  const searchFilters = useMemo(
    () => filters.filter((filter): filter is SearchFilterConfig => filter.type === 'search'),
    [filters]
  );
  const [searchValues, setSearchValues] = useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {};
    searchFilters.forEach((filter) => {
      initialValues[filter.name] = searchParams.get(filter.name) ?? '';
    });
    return initialValues;
  });

  type TimerId = ReturnType<typeof setTimeout>;
  const debounceTimers = useRef<Record<string, TimerId | number>>({});

  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach((timer) => {
        clearTimeout(timer as TimerId);
      });
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(querySignature);
    setSearchValues((prev) => {
      const next = { ...prev };
      let changed = false;
      searchFilters.forEach((filter) => {
        const paramValue = params.get(filter.name) ?? '';
        if (next[filter.name] !== paramValue) {
          next[filter.name] = paramValue;
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [querySignature, searchFilters]);

  const applyUpdates = useCallback(
    (updates: QueryStringUpdate[]) => {
      const sanitizedUpdates = updates.map((update) => ({
        name: update.name,
        value: update.value && update.value.length > 0 ? update.value : undefined,
      }));

      createQueryString(sanitizedUpdates);
    },
    [createQueryString]
  );

  const handleSearchChange = useCallback(
    (name: string, value: string, debounceMs = 500) => {
      setSearchValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (debounceTimers.current[name]) {
        clearTimeout(debounceTimers.current[name] as TimerId);
      }

      debounceTimers.current[name] = window.setTimeout(() => {
        applyUpdates([{ name, value }]);
      }, debounceMs);
    },
    [applyUpdates]
  );

  const handleSelectChange = useCallback(
    (name: string, value: string) => {
      applyUpdates([{ name, value }]);
    },
    [applyUpdates]
  );

  const baseFieldSx = {
    '& .MuiInputBase-input': {
      py: 2,
      px: 1.5,
    },
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      spacing={spacing}
      sx={{ width: '100%' }}
    >
      {filters.map((filter) => {
        if (filter.type === 'search') {
          return (
            <TextField
              key={filter.name}
              size="small"
              value={searchValues[filter.name] ?? ''}
              onChange={(event) =>
                handleSearchChange(filter.name, event.target.value, filter.debounceMs)
              }
              placeholder={filter.placeholder}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="mingcute:search-line" />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                minWidth: filter.width || 240,
                ...baseFieldSx,
              }}
            />
          );
        }

        const selectFilter = filter as SelectFilterConfig;
        const currentValue = searchParams.get(selectFilter.name) ?? '';

        return (
          <TextField
            key={selectFilter.name}
            select
            size="small"
            label={selectFilter.label}
            value={currentValue}
            onChange={(event) => handleSelectChange(selectFilter.name, event.target.value)}
            sx={{
              minWidth: selectFilter.width || 200,
              ...baseFieldSx,
            }}
            placeholder={selectFilter.placeholder}
          >
            {selectFilter.allowClear && (
              <MenuItem value="">{selectFilter.placeholder || 'All'}</MenuItem>
            )}
            {selectFilter.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      })}
    </Stack>
  );
}
