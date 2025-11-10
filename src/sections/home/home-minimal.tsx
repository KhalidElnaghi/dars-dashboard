import Image from 'next/image';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/assets/Home/features/shopping-basket.svg',
    title: 'Delivery requests',
    description: "From the branch to the customer's address",
  },
  {
    icon: '/assets/Home/features/store.svg',
    title: 'Receipt requests',
    description: 'Order and receive it directly from the branch',
  },
  {
    icon: '/assets/Home/features/taxi.svg',
    title: 'Order from the car',
    description: 'Your order is delivered to your car',
  },
  {
    icon: '/assets/Home/features/layer-group.svg',
    title: 'Local order',
    description: 'Browse, order and pay at the table',
  },
];

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const { t } = useTranslate();
  const mdUp = useResponsive('up', 'md');

  return (
    <Stack overflow="visible" zIndex="15">
      {mdUp && (
        <m.div variants={varFade().inUp}>
          <Stack
            sx={{
              zIndex: 15,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: '-20vmin',
              mb: '-15vmin',
              transform: 'translate(-50,-50)',
            }}
          >
            <Image
              src="/assets/Home/features/Asset 1 3 (1).svg"
              alt="feathersSvg"
              width="619"
              height="399"
            />
          </Stack>
        </m.div>
      )}
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
          textAlign: 'center',
        }}
      >
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h4" color="#fff">
              {t('Different ordering methods for an exceptional experience')}
            </Typography>
          </m.div>
        </Stack>

        <Box
          gap={{ xs: 3, lg: 10 }}
          display="grid"
          alignItems="center"
          justifyContent="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <Stack
                key={card.title}
                sx={{
                  minWidth: 150,
                  borderRadius: 1,
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Image
                  alt={card.icon}
                  src={card.icon || '/Image-Not-Found.jpg'}
                  style={{ marginBottom: 1 }}
                  width={70}
                  height={70}
                />
                <Typography variant="h6" color="#fff">
                  {t(card.title)}
                </Typography>
                <Typography variant="subtitle2" color="#fff">
                  {t(card.description)}
                </Typography>
              </Stack>
            </m.div>
          ))}
        </Box>
      </Container>
    </Stack>
  );
}
