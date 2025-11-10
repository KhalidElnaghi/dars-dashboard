import { t } from 'i18next';
import { m, MotionProps } from 'framer-motion';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------
const servicesData = [
  {
    title: "We help you increase your profits without conditions or commissions",
    description: "We help you to develop your relationship with your customers directly by seeing their data, their depression and the movement of requests, in addition to your association with other systems such as payment, delivery and other services without additional technical costs.",
    icon: '/assets/icons/home/video-3.svg',
    direction: 'right',
  },
  {
    title: "Provide delivery services to your customers",
    description: "We have provided you with linking solutions with the best delivery companies in the region in addition to a special application for drivers management if you have your own fleet.",
    icon: '/assets/icons/home/Video.svg',
    direction: 'left',
  },
  {
    title: "Received and judge the requests easily",
    description: "Full control for you, you can control and receive requests from several channels such as application of requests, web page, vodix or flexible sale ...",
    icon: '/assets/icons/home/Video-1.svg',
    direction: 'right',
  },
  {
    title: "Emphasize your relationship with your customers",
    description: "Keep your current customers and encourage them to repeat the purchase through a flexible loyalty program that helps you to provide discounts and points in more than one way, in addition to marketing solutions such as discount coupons and cashback and linking with other platforms.",
    icon: '/assets/icons/home/Video-2.svg',
    direction: 'left',
  },
];
export default function HomeServices() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const {mode} = theme.palette;
  const darkerColor = theme.palette.grey[800];
  const bgColorSwitch  = ( direction:string) => {
    let bg = 'none';
  // eslint-disable-next-line default-case
  if(direction === 'right' && mode === 'light') {
    bg = 'none'
  }
  if(direction === 'left' && mode === 'dark') {
    bg = 'grey.800'
  }
  if(direction === 'left' && mode === 'light') {
    bg = '#f1f1f1'
  }
  if(direction === 'right' && mode === 'dark') {
    bg = 'grey.900'
  }
  return bg;
};
  return (
    <Box >

    <Stack
      component={MotionViewport}

    >
      {servicesData.map((item: any, index: number) => (

        <Grid sx={{py:4, bgcolor: bgColorSwitch( item?.direction)}} key={index}  container alignItems="center" flexDirection={{ md: 'row', xs: 'column' }} justifyContent={{ md: "space-around", xs: 'center' }} gap={{ xs: 5, md: 0 }}>

        


          {mdUp && item?.direction === 'left' && (
            <Grid item xs={12} md={6}>
              <Stack
                sx={{
                  textAlign: { xs: 'center', md: 'unset' },
                  px: { md: 14, xs: 5 },
                  position: 'relative',

                }}
              >
                <m.div  variants={item?.direction === 'right' ?  varFade().inLeft : varFade().inRight}>
                  <Image delayTime={1000}  effect="blur"   alt="rocket" src={item?.icon || "/assets/icons/home/Video-1.svg"} />
                </m.div>
              </Stack>
            </Grid>
          )}

           {mdUp && (
            <Grid item xs={12} md={6} >

              <Stack
                sx={{
                  textAlign: { xs: 'center', md: 'unset' },
                  px: { md: 14, xs: 5 },


                }}
              >


                <m.div variants={varFade().inUp}>
                  <Typography variant="h6" sx={{  my: 3 }}>
                    {t(item?.title) || t('Unknown')}

                  </Typography>
                </m.div>

                <m.div variants={varFade().inDown}>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{
                      mb: 5,

                      color: 'text.secondary',
                    }}
                  >
                    {t(item?.description)}
                  </Typography>
                </m.div>


              </Stack>
            </Grid>
          )}
           {mdUp && item?.direction === 'right' && (
            <Grid item xs={12} md={6}>
              <Stack
                sx={{
                  textAlign: { xs: 'center', md: 'unset' },
                  px: { md: 14, xs: 5 },
                  position: 'relative',

                }}
              >
                <m.div variants={item?.direction === 'right' ?  varFade().inLeft: varFade().inRight}>
                  <Image delayTime={1000}  effect="blur"   alt="rocket" src={item?.icon || "/assets/icons/home/Video-1.svg"} />
                </m.div>
              </Stack>
            </Grid>
          )}
          {!mdUp && (
            <Grid  item xs={12} md={6}>
              <Stack
                sx={{
                  textAlign: { xs: 'center', md: 'unset' },
                  px: { md: 14, xs: 5 },
                  position: 'relative',

                }}
              >
                <m.div variants={item?.direction === 'right' ?  varFade().inLeft: varFade().inRight}>
                  <Image delayTime={1000}  effect="blur"   alt="rocket" src={item?.icon || "/assets/icons/home/Video-1.svg"} />
                </m.div>
              </Stack>
            </Grid>
          )}
          {!mdUp && (
            <Grid item xs={12} md={6} >

              <Stack
                sx={{
                  textAlign: { xs: 'center', md: 'unset' },
                  px: { md: 14, xs: 5 },


                }}
              >


                <m.div variants={varFade().inUp}>
                  <Typography variant="h6" sx={{  my: 3 }}>
                    {t(item?.title) || t('Unknown')}

                  </Typography>
                </m.div>

                <m.div variants={varFade().inDown}>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{
                      mb: 5,

                      color: 'text.secondary',
                    }}
                  >
                    {t(item?.description)}
                  </Typography>
                </m.div>


              </Stack>
            </Grid>
          )}
          {/*  {!mdUp && (
        <Grid xs={12} sx={{ textAlign: 'center' }}>
          <m.div variants={varFade().inDown}>
        <Typography variant="overline" component="div" sx={{ color: 'text.disabled' }}>
          Looking For a
        </Typography>
      </m.div>
        </Grid>
      )} */}
        </Grid>
      ))}
    </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

type TextAnimateProps = BoxProps &
  MotionProps & {
    text: string;
  };

function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

const mm = () => (
  <div>
    <TextAnimate text="How" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
    <br />
    {/* #F1F1F1 <Container component={MotionContainer}> <SvgColor src="/assets/icons/navbar/ic_dashboard.svg" sx={{ color: 'action.active' }} /> */}

    <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
      <TextAnimate text="can" />
      <TextAnimate text="we" />
      <TextAnimate text="help" />
      <TextAnimate text="you?" />
    </Stack>
  </div>
)
