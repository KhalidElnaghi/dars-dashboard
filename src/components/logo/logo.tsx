import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  enableText?: boolean;
  fullLogo?: boolean;
  disabledLink?: boolean;
  width?: number;
  height?: number;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ width = 27, height = 35, fullLogo, enableText, disabledLink = false, sx, ...other }, ref) => {
    const { t } = useTranslate();

    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Box
        component="div"
        sx={{ display: 'flex', gap: 1, width: 'auto', height: 'auto', cursor: 'pointer', ...sx }}
      >
        <Box
          component="img"
          src={`/logo/${fullLogo ? 'SLogo' : 'SOBJECT'}.png`}
          sx={{ width, height, cursor: 'pointer', ...sx }}
        />
        {enableText && (
          <Typography
            variant="h4"
            component="span"
            textTransform="capitalize"
            alignSelf="center"
            pt={1}
            sx={{ 
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Dars
          </Typography>
        )}
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
