import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CountriesView } from 'src/sections/countries';
import { getCountries } from 'src/actions/countries';
import { Country } from 'src/types/country';

type IProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('countries_and_cities'),
  };
}

export default async function CountriesPage({ searchParams }: Readonly<IProps>) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const Name = typeof resolvedSearchParams?.Name === 'string' ? resolvedSearchParams.Name : '';

  const IsActive =
    typeof resolvedSearchParams?.IsActive === 'string' ? resolvedSearchParams.IsActive : '';

  const MaxResultCount =
    typeof resolvedSearchParams?.MaxResultCount === 'string'
      ? Number(resolvedSearchParams.MaxResultCount)
      : 20;

  const SkipCount =
    typeof resolvedSearchParams?.SkipCount === 'string'
      ? Number(resolvedSearchParams.SkipCount)
      : 0;

  const response = await getCountries({
    Name,
    IsActive,
    MaxResultCount,
    SkipCount,
  });

  const countries: Country[] = response.success ? response.data.items : [];
  const totalCount = response.success ? response.data.totalCount : 0;
  const errorMessage = response.success
    ? null
    : typeof response.error === 'string'
      ? response.error
      : null;

  return <CountriesView countries={countries} totalCount={totalCount} error={errorMessage} />;
}
