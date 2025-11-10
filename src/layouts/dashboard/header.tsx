/* eslint-disable no-nested-ternary */

'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@mui/material/styles';
import { Box, Stack, AppBar, Button, Toolbar, IconButton, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';
import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { bgBlur } from 'src/theme/css';

import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';

import { NAV, HEADER } from '../config-layout';
import AccountPopover from '../common/account-popover';
import SettingsButton from '../common/settings-button';
import LanguagePopover from '../common/language-popover';

type SubscriptionState = {
  isInFreeTrial: boolean;
  trialPeriodEndAt: string;
  isSubscriptionActive: boolean;
};

export default function Header({ onOpenNav }: { onOpenNav?: VoidFunction }) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const { t } = useTranslation();
  const isNavHorizontal = settings.themeLayout === 'horizontal';
  const isNavMini = settings.themeLayout === 'mini';
  const lgUp = useResponsive('up', 'lg');
  const offset = useOffSetTop(HEADER.H_DESKTOP);
  const offsetTop = offset && !isNavHorizontal;

  return (
    <AppBar
      sx={{
        height: 'auto',
        mb: 2,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({ color: theme.palette.background.default }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          ...(offsetTop && { height: HEADER.H_DESKTOP_OFFSET }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: HEADER.H_MOBILE,
          px: { lg: 5 },
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {!lgUp && (
          <IconButton onClick={onOpenNav}>
            <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
          </IconButton>
        )}

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1 }}
          sx={{ marginLeft: 'auto' }}
        >
          <LanguagePopover />
          {/* <SettingsButton /> */}
          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
