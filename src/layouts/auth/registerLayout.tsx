import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { useTranslations } from 'next-intl';
import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function RegisterLayout({ children, image, title }: Props) {
  const t = useTranslations();
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 680,
        px: { xs: 2, md: 8 },
        pt: { xs: 15, md: 2 },
        pb: { xs: 15, md: 0 },
      }}
    >
      {children}
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
        direction: theme.direction === 'rtl' ? 'rtl' : '',
        textAlign: theme.direction === 'rtl' ? 'left' : '',
        backgroundImage:
          'linear-gradient(to right top, #bc71e4, #f37ab9, #ff999e, #f6bca1, #ebdac1)',
      }}
    >
      {/* {renderLogo}

      {mdUp && renderSection} */}

      {renderContent}
    </Stack>
  );
}
