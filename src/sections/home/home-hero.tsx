import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    clipPath: ' polygon(50% 0%, 100% 0, 100% 35%, 100% 85%, 50% 100%, 0 85%, 0% 35%, 0 0)',
  },
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'visible',
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    minHeight: '85vmin',
  }
}));

// ----------------------------------------------------------------------

export default function HomeHero() {

  const { t } = useTranslate();

  return (
    <StyledRoot>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          mx: 'auto',
          maxWidth: 480,
        }}
      >
        <m.div variants={varFade().in}>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              lineHeight: '28px',
            }}
          >
            {t('No commissions or hidden costs')}
          </Typography>
        </m.div>
        <m.div variants={varFade().in}>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              lineHeight: '48px',
              fontWeight: '600',
            }}
          >
            {t(
              'Launch a new sales channel, increase your sales, and receive your orders through your website and application!'
            )}
          </Typography>
        </m.div>

        <m.div variants={varFade().in}>
          <Typography variant="body2" sx={{ textAlign: 'center', lineHeight: '28px' }}>
            {t('Start reaching new clients and increasing direct orders')}
          </Typography>
        </m.div>

        <m.div variants={varFade().in}>
          <Stack spacing={2} direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ my: 4 }}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
              target="_blank"
              rel="noopener"
              href={paths.dashboard.root}
            >
              {t('Try and start now')}
            </Button>
          </Stack>
        </m.div>
      </Stack>
    </StyledRoot>
  );
}
