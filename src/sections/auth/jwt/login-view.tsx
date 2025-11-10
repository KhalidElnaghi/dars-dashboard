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

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import LoginBYEmailView from './login-with-email';
import LoginBYPhoneView from './login-with-phone';

export default function LoginView() {
  const settings = useSettingsContext();
  const { t } = useTranslate();

  const [currentTab, setCurrentTab] = useState('by_email');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const TABS = [
    {
      value: 'by_email',
      label: t('By Email'),
      icon: <Iconify icon="tabler:password-user" width={24} />,
    },
    // Phone login disabled - only email/password login is supported
    // {
    //   value: 'by_phone',
    //   label: t('By Phone'),
    //   icon: <Iconify icon="tabler:password-mobile-phone" width={24} />,
    // },
  ];
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
          {TABS.length > 1 && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: { xs: 3, md: 5 } }}>
              <Tabs value={currentTab} onChange={handleChangeTab} variant="fullWidth" centered>
                {TABS.map((tab) => (
                  <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                ))}
              </Tabs>
            </Box>
          )}
          {currentTab === 'by_email' && <LoginBYEmailView />}

          {currentTab === 'by_phone' && <LoginBYPhoneView />}
        </Box>
      </Container>

    </Box>
  );
}
