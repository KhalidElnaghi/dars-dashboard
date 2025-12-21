'use server';

import { revalidatePath } from 'next/cache';

import { ApiResponse } from 'src/types/crud-types';
import { Country, CountryFormValues, CountryListResponse, CountryQuery } from 'src/types/country';
import { deleteData, editData, getData, postData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import { cacheTags } from 'src/utils/cache-tags';

const COUNTRIES_ENDPOINT = endpoints.countries.root;

const buildCountriesQueryString = (query: CountryQuery) => {
  const params = new URLSearchParams();

  params.set('MaxResultCount', String(query.MaxResultCount));
  params.set('SkipCount', String(query.SkipCount));
  if (query.Name) {
    params.set('Name', query.Name);
  }

  if (query.IsActive) {
    params.set('IsActive', query.IsActive);
  }

  return params.toString();
};

export async function getCountries(query: CountryQuery) {
  const queryString = buildCountriesQueryString(query);
  return getData<CountryListResponse>(`${COUNTRIES_ENDPOINT}?${queryString}`, {
    tags: [cacheTags.countries],
  });
}

export async function createCountryAction(
  payload: CountryFormValues
): Promise<ApiResponse<Country>> {
  const response = await postData<Country, CountryFormValues>(COUNTRIES_ENDPOINT, payload, {
    cache: 'no-store',
  });

  if (response.success) {
    revalidatePath('/dashboard/countries');
  }

  return response;
}

export async function updateCountryAction(
  id: string,
  payload: CountryFormValues
): Promise<ApiResponse<Country>> {
  const response = await editData<Country, CountryFormValues>(
    `${COUNTRIES_ENDPOINT}/${id}`,
    'PUT',
    payload,
    {
      cache: 'no-store',
    }
  );

  if (response.success) {
    revalidatePath('/dashboard/countries');
  }

  return response;
}

export async function deleteCountryAction(id: string) {
  const response = await deleteData<Country>(`${COUNTRIES_ENDPOINT}/${id}`, {
    cache: 'no-store',
  });

  if (response.success) {
    revalidatePath('/dashboard/countries');
  }

  return response;
}
