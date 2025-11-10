import React from 'react';

import { Card, Stack, Button, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import HomeCoverImage from 'src/assets/illustrations/home-cover-image';

const CoverCard = () => {
  const { t } = useTranslate();

  return (
    <Card sx={{ height: '100%' }}>
      <Stack height="100%" sx={{ '& svg': { width: '100%', height: 'auto', mb: '-25%' } }}>
        <HomeCoverImage />
        <Stack
          flexGrow={1}
          padding={2}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          sx={{ whiteSpace: 'balance' }}
        >
          <Typography color="text.disabled" lineHeight={1.3}>
            {t('your store still yet')}
          </Typography>
          <Typography mb={1.5} variant="h6">
            {t('upgrade your package now and enjoy')}
          </Typography>
          <Button variant="contained" color="warning" sx={{ color: 'white' }}>
            {t('Launch store')}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CoverCard;
