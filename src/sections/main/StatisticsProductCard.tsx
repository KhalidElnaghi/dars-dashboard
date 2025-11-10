import React from 'react';
import { useRouter } from 'next/navigation';

import { Box, Card, Stack, Button, Divider, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

const StatisticsProductCard = ({ storeProducts }: any) => {
  const { t } = useTranslate();
  const router = useRouter();

  return (
    <Card sx={{ p: 2.5 }}>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h6" textAlign="center">
          {t('Store products')}
        </Typography>
        <Stack width="100%" direction="row" justifyContent="space-between">
          <Box textAlign="center">
            <Typography variant="h4" component="span" color="success.main">
              {storeProducts?.activeProducts ?? 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('Active')}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box textAlign="center">
            <Typography variant="h4" component="span" color="error.main">
              {storeProducts?.outOfStockProducts ?? 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('Out Of Stock')}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box textAlign="center">
            <Typography variant="h4" component="span" color="text.secondary">
              {storeProducts?.inactiveProducts ?? 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('Not active')}
            </Typography>
          </Box>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Iconify icon="ic:baseline-plus" />}
          onClick={() => router.push('/dashboard/products/add')}
        >
          {t('Add new product')}
        </Button>
      </Stack>
    </Card>
  );
};

export default StatisticsProductCard;
