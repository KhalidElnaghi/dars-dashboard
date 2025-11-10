import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme, Theme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import { useSettingsContext } from 'src/components/settings';

import AccountPopover from '../common/account-popover';
import LanguagePopover from '../common/language-popover';

import { NAV, HEADER } from '../config-layout';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const lgUp = useResponsive('up', 'lg');

  const isNavHorizontal = settings.themeLayout === 'horizontal';
  const isNavMini = settings.themeLayout === 'mini';

  const offsetLeft = lgUp && !isNavHorizontal ? (isNavMini ? NAV.W_MINI : NAV.W_VERTICAL) : 0;

  return (
    <AppBar
      position="fixed"
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.drawer - 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['width', 'left'], {
          duration: theme.transitions.duration.shorter,
        }),
        boxShadow: 'none',
        borderBottom: (theme: Theme) => `1px solid ${theme.palette.divider}`,
        ...(lgUp && {
          width: `calc(100% - ${offsetLeft}px)`,
          left: offsetLeft,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { xs: 2, lg: 3 },
        }}
      >
        {/* Spacer to push items to the right */}
        <Stack sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={1}>
          <LanguagePopover />
          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

