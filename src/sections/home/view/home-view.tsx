'use client';

import Box from '@mui/material/Box';

import MainLayout from 'src/layouts/main';

export default function HomeView() {
  return (
    <MainLayout>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        Home
      </Box>
    </MainLayout>
  );
}
