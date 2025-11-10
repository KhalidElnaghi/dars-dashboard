import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';

import { fNumber, fCurrency } from 'src/utils/format-number';

import { shadows } from 'src/theme/shadows';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  description?: string;
  total?: number;
  total_Currency?: number;
  percent?: number;
  icon: string;
  customIcon?: boolean;
  fontWeight?: number;
  href?: string;
}

export default function AppWidgetSummary({
  fontWeight = 200,
  title,
  description,
  percent = 0,
  total,
  icon,
  customIcon,
  sx,
  total_Currency,
  href,
  ...other
}: Props) {
  const settings = useSettingsContext();

  const router = useRouter();

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight: 110,
        p: 1.5,
        '&:hover': {
          boxShadow: shadows(settings.themeMode),
        },
        cursor: href && 'pointer',
        ...sx,
      }}
      onClick={() => href && router.push(href)}
      {...other}
    >
      <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {!customIcon && (
          <Iconify
            width={35}
            icon={icon}
            sx={{
              mr: 1,
              color: 'primary.main',
            }}
          />
        )}
        {customIcon && (
          <Box sx={{ width: 50 }}>
            <Image
              delayTime={1000}
              effect="blur"
              alt="rocket"
              src={icon || '/assets/icons/dashboard/main/Frame-1.svg'}
            />
          </Box>
          /*   <SvgIcon fontSize="small"  component={svgImport.default} /> */
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{total || 0}</Typography>
        <Typography variant="body2" fontWeight={fontWeight}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        )}
      </Box>
    </Card>
  );
}
