import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value?: string, replace?: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      if (replace) {
        router.replace(`${pathname}?${params.toString()}`,{scroll:false});
      } else {
        router.push(`${pathname}?${params.toString()}`,{scroll:false});
      }
    },
    [pathname, router, searchParams]
  );

  const setQueryString = useCallback(
    (name: string, value: string, replace?: boolean) => {
      const params = new URLSearchParams();

      params.set(name, value);

      if (replace) {
        router.replace(`${pathname}?${params.toString()}`,{scroll:false});
      } else {
        router.push(`${pathname}?${params.toString()}`,{scroll:false});
      }
    },
    [pathname, router]
  );

  return { createQueryString, setQueryString };
}
