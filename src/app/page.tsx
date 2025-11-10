'use client';

import { useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();
  const { authenticated, loading } = useAuthContext();

  useEffect(() => {
    if (!loading) {
      if (authenticated) {
        router.replace('/dashboard');
      } else {
        router.replace('/auth/jwt/login');
      }
    }
  }, [authenticated, loading, router]);

  return <SplashScreen />;
}
