import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import { Box, Grid, Stack, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { shadows } from 'src/theme/shadows';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';

// eslint-disable-next-line import/no-cycle

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  reports: any;
}

export default function Reports({ title, subheader, reports: data, sx, ...other }: Props) {
  const settings = useSettingsContext();
  return (
    <Card {...other} sx={{ pb: Math.PI }}>
      <CardHeader sx={{ textAlign: 'center' }} title={title} subheader={subheader} />
      <Stack spacing={4} sx={{ px: 3, pt: 4, pb: 2 }}>
        <Grid container spacing={3}>
          {data.map((report: any) => (
            <Grid item xs={12} md={3} key={report.title}>
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 70,
                  p: 1.5,
                  '&:hover': {
                    boxShadow: shadows(settings.themeMode),
                    cursor: 'pointer',
                  },
                  textDecoration: 'none',
                  ...sx,
                }}
                href={report?.url}
                component={RouterLink}
                {...other}
              >
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  <Iconify
                    width={35}
                    icon={report?.icon}
                    sx={{
                      mr: 1,
                      color: 'primary.main',
                    }}
                  />

                  <Box sx={{ width: 50 }}>
                    <Image
                      delayTime={1000}
                      effect="blur"
                      alt="rocket"
                      src={report?.icon || '/assets/icons/dashboard/main/Frame-1.svg'}
                    />
                  </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">{report?.title}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Card>
  );
}
