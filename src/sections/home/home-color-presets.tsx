import Image from 'next/image';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeColorPresets() {
  const renderContent = (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: {md:"744px",xs:"650px"},
        width:"380px"
      }}
    >

      <Box sx={{ position: 'absolute', top: 0, transform: 'translate(-50,-50)' }}>
        <m.div variants={varFade().inUp}>
          <Image height={744} width={380}  alt="screen" src="/assets/Home/phone/Item_phone.svg" />
        </m.div>
      </Box>

      <Box sx={{ position: 'absolute', top: -20, left: '25%' }}>
        <Box sx={{ position: 'absolute', top: 80, zIndex: 2, right: '27%' }}>
          <m.div variants={varFade().inRight}>
            <m.div animate={{ y: [-3, 0, -3] }} transition={{ duration: 3, repeat: Infinity }}>
              <Content text="منيو الكتروني" />
            </m.div>
          </m.div>
        </Box>

        <Box sx={{ position: 'absolute', top: {md:260,xs:230}, zIndex: 2, right: '22%' }}>
          <m.div variants={varFade().inRight}>
            <m.div animate={{ y: [-3, 0, -3] }} transition={{ duration: 3, repeat: Infinity }}>
              <Content text="منيو الكتروني" />
            </m.div>
          </m.div>
        </Box>

        <Box sx={{ position: 'absolute', top: {md:500,xs:450}, zIndex: 2, right: '27%' }}>
          <m.div variants={varFade().inRight}>
            <m.div animate={{ y: [-3, 0, -3] }} transition={{ duration: 3, repeat: Infinity }}>
              <Content text="منيو الكتروني" bgColor="#DD5183" />
            </m.div>
          </m.div>
        </Box>

        <Box sx={{ position: 'absolute', top: {md:690,xs:600}, zIndex: 2, right: '27%' }}>
          <m.div variants={varFade().inRight}>
            <m.div animate={{ y: [-3, 0, -3] }} transition={{ duration: 3, repeat: Infinity }}>
              <Content text="منيو الكتروني" />
            </m.div>
          </m.div>
        </Box>
      </Box>

      <Box sx={{ position: 'absolute', top: -20, right: '25%' }}>
        <Box sx={{ position: 'absolute', top: 130, zIndex: 2, left: '25%' }}>
          <m.div variants={varFade().inLeft}>
            <m.div animate={{ y: [-3, 0, -3] }} transition={{ duration: 3, repeat: Infinity }}>
              <Content text="منيو الكتروني" bgColor="#263238" />
            </m.div>
          </m.div>
        </Box>
        <Box sx={{ position: 'absolute', top: {md:290,xs:250}, zIndex: 2, left: '23%' }}>
          <m.div variants={varFade().inLeft}>
            <m.div animate={{ y: [-3, 0, -3] }} transition={{ duration: 3, repeat: Infinity }}>
              <Content text="منيو الكتروني" />
            </m.div>
          </m.div>
        </Box>
        <Box sx={{ position: 'absolute', top: {md:450,xs:400}, zIndex: 2, left: '23%' }}>
          <m.div variants={varFade().inLeft}>
            <m.div animate={{ y: [-3, 0, -3] }} transition={{ duration: 3, repeat: Infinity }}>
              <Content text="منيو الكتروني" bgColor="#263238" />
            </m.div>
          </m.div>
        </Box>
        <Box sx={{ position: 'absolute', top: {md:600,xs:500}, zIndex: 2, left: '23%' }}>
          <m.div variants={varFade().inLeft}>
            <m.div animate={{ y: [-3, 0, -3] }} transition={{ duration: 3, repeat: Infinity }}>
              <Content text="منيو الكتروني" bgColor="#DD5183" />
            </m.div>
          </m.div>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        bgcolor: (theme) => ({
          md: `${
            theme.palette.mode === 'light'
              ? alpha(theme.palette.grey[400], 0.16)
              : alpha(theme.palette.grey[600], 0.4)
          }`,
        }),
        p: 5,

      }}
    >
      <Container
        component={MotionViewport}
        sx={{
          position: 'relative',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderContent}
      </Container>
    </Box>
  );
}

function Content({ text, bgColor }: { text: string; bgColor?: string | undefined }) {
  return (
    <div
      style={{
        width: '125px',
        height: '48px',
        padding: 10,
        gap: '10px',
        borderRadius: 13,
        background: bgColor || '#7051DD',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      <Typography variant="body1" color="common.white">
        {text}
      </Typography>
    </div>
  );
}
