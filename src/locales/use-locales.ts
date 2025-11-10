'use client';

import { useLocale } from 'next-intl';
import { allLocales, localesSettings } from 'src/i18n/config-locale';

export default function useLocales() {
  const locale = useLocale();
  const currentLang = localesSettings[locale as keyof typeof localesSettings];

  return {
    allLangs: allLocales,
    currentLang,
  };
}
