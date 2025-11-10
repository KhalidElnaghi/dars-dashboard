import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import Image from 'next/image';
// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const { t } = useTranslate();
  const theme = useTheme();

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 680,
        px: { xs: 2, md: 8 },
        pt: { xs: 5, md: 8 },
        pb: { xs: 5, md: 0 },
      }}
    >
      {children}
    </Stack>
  );

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        direction: theme.direction === 'rtl' ? 'rtl' : '',
        textAlign: theme.direction === 'rtl' ? 'left' : '',
      }}
    >
      <Stack
        direction="row"
        sx={{
          flex: 1,
          position: 'relative',
        }}
      >
        {/* Left Column - Login Form */}
        <Box
          sx={{
            flex: 1,
            bgcolor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {renderContent}
        </Box>

        {/* Right Column - Illustration */}
        <Box
          sx={{
            flex: 1,
            bgcolor: '#EAF0FC',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image width={500} height={500} src="/assets/auth/login.svg" alt="Login Illustration" />
        </Box>
      </Stack>
    </Box>
  );
}
