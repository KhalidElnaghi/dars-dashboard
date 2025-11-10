import { Box, Stack, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

interface props {
  icon: string;
  title: string;
  link?: string;
  href: string;
}

export default function HomeCardHeader({ icon, title, link, href }: props) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3} mb={1}>
      {/* Title */}
      <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
        <Box
          width={40}
          height={40}
          borderRadius="10rem"
          bgcolor="primary.main"
          color="white"
          display="grid"
          sx={{ placeItems: 'center' }}
        >
          <Iconify icon={icon} />
        </Box>
        <Typography variant="h6"> {title}</Typography>
      </Stack>

      {/* Progress */}
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color="primary"
        component={RouterLink}
        href={href}
      >
        {link}
      </Typography>
    </Stack>
  );
}
