import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Try to get locale from [locale] segment first
  let locale = await requestLocale;

  // If no locale segment (middleware disabled), get from cookie
  if (!locale) {
    const cookieStore = await cookies();
    locale = cookieStore.get('Language')?.value;
  }

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
