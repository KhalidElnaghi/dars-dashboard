'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import LoginBYEmailView from './login-with-email';
import { useTranslations } from 'next-intl';

export default function LoginView() {
  const settings = useSettingsContext();
  const t = useTranslations();

  const [currentTab, setCurrentTab] = useState('by_email');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);


  const renderHead = (
    <Stack sx={{ mb: 2 }}>
      <Typography variant="h4" textTransform="capitalize" textAlign="center">
        {t('Title.sign_in')}
      </Typography>
    </Stack>
  );

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Stack
        spacing={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Image src="/logo/SLogo.png" alt="logo" width={80} height={160} />
      </Stack>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: '50dvh',
          }}
        >
          {renderHead}

          <LoginBYEmailView />
        </Box>
      </Container>
    </Box>
  );
}
