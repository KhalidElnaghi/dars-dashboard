'use client';

import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useSettingsContext } from 'src/components/settings';

const SUPPORTED_LOCALES = new Set(['ar', 'en']);

export default function useTranslate() {
  const router = useRouter();
  const t = useTranslations();
  const { onChangeDirectionByLang } = useSettingsContext();

  const onChangeLang = (nextLocale: string) => {
    if (!SUPPORTED_LOCALES.has(nextLocale)) {
      return;
    }

    Cookies.set('Language', nextLocale, { path: '/' });
    onChangeDirectionByLang(nextLocale);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = nextLocale;
      document.documentElement.dir = nextLocale === 'ar' ? 'rtl' : 'ltr';
    }

    router.refresh();
  };

  return {
    t,
    onChangeLang,
  };
}
