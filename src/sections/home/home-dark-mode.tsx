import Image from 'next/image';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import Carousel, { useCarousel } from 'src/components/carousel';
import { varFade, MotionViewport } from 'src/components/animate';


// ----------------------------------------------------------------------
const LOGOs1 = [
  {
    icon: '/assets/Home/our-clients/Ellipse 1-1.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 6-1.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 3.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 4.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 1-1.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 7.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 5.svg',
  },
];
const LOGOs2 = [
  {
    icon: '/assets/Home/our-clients/Ellipse 4.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 5.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 6.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 7.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 7-1.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 5-1.svg',
  },
  {
    icon: '/assets/Home/our-clients/Ellipse 4-1.svg',
  },
];
export default function HomeDarkMode() {
  const { t , i18n} = useTranslate();
  const isRTL = i18n.language !== 'ar' ;
  const carousel = useCarousel({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    pauseOnHover: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
    ],
  });
  return (
    <Stack textAlign="center" py={3} component={MotionViewport}>
      <Stack alignItems="center" spacing={2} py={3}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h3">{t('Customers who trusted on Talby')}</Typography>
        </m.div>
      </Stack>
      <Box sx={{ position: 'relative' }}>
        <Carousel ref={carousel.carouselRef} {...{ ...carousel.carouselSettings, rtl: isRTL }}>
          {LOGOs1.map(({ icon }, index) => (
            <Logo key={index} icon={icon} />
          ))}
        </Carousel>
      </Box>
      <Box sx={{ position: 'relative' }}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {LOGOs2.map(({ icon }, index) => (
            <Logo key={index} icon={icon} />
          ))}
        </Carousel>
      </Box>
    </Stack>
  );
}

function Logo({ icon, key }: { icon: string; key: number }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: (theme) => ({
          md: `8px solid ${
            theme.palette.mode === 'light'
              ? alpha(theme.palette.grey[500], 0.16)
              : alpha(theme.palette.grey[700], 0.4)
          }`,
        }),
        borderRadius: '50%',
        width: 150,
        height: 150,
        overflow: 'hidden',
      }}
    >
      <Image alt={icon} src={icon || '/Image-Not-Found.jpg'} width={150} height={150} />
    </Box>
  );
}
