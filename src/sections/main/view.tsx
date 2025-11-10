'use client';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function MainPage() {
  return (
    <Container maxWidth="xl">
      <Stack gap={3}>
        <Typography variant="h4">Main</Typography>
      </Stack>
    </Container>
  );
}
