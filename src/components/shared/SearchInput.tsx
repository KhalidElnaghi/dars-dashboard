import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import { TextField, InputAdornment } from '@mui/material';

import useCostomSearchParams from 'src/hooks/use-searchParams';

import { useTranslate } from 'src/locales';

import Iconify from '../iconify/iconify';

function SearchInput({ maxWidth }: { maxWidth?: string }) {
  const searchParams = useSearchParams();
  const { t } = useTranslate();
  const { createQueryString, pathname, router } = useCostomSearchParams();
  const search = typeof searchParams?.get('search') === 'string' ? searchParams?.get('search') : '';
  const [query, setQuery] = useState(search);
  const [value] = useDebounce(query, 1000);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (value)
      router.replace(`${pathname}?${createQueryString('search', value ?? '')}`, { scroll: false });
    else if (!value && typeof searchParams?.get('search') === 'string') {
      params.delete('search');
      router.push(`${pathname}?${params.toString()}`,{scroll:false});
    }
  }, [createQueryString, pathname, router, searchParams, value]);

  const handleSearchByName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);
  return (
    <TextField
      fullWidth
      value={query}
      onChange={handleSearchByName}
      placeholder={`${t('search')}...`}
      sx={{ maxWidth: { md: maxWidth || '40%', xs: '100%' } }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchInput;
