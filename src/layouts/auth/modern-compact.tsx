import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthModernCompactLayout({ children }: Props) {
  return (
    <>
      <Box
        component="main"
        sx={{
          py: 10,
          display: 'flex',
          minHeight: '100vh',
          textAlign: 'center',
          px: { xs: 2, md: 0 },
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            'linear-gradient(to right top, #bc71e4, #f37ab9, #ff999e, #f6bca1, #ebdac1)',
        }}
      >
        <Card
          sx={{
            py: 2,
            px: 3,
            maxWidth: 620,
            borderRadius: '0 100px 0 100px',
          }}
        >
          {children}
        </Card>
      </Box>
    </>
  );
}
