'use client';


import CloseIcon from '@mui/icons-material/Close';
import { Card, Stack, Dialog, IconButton } from '@mui/material';


interface Props {
  open: boolean;
  onClose: () => void;
  phone?: string;
  type: string
}

export default function OtpConfirmDialog({ open, onClose, phone, type }: Props) {
  const handleClose = (event: object, reason: string) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth disableEscapeKeyDown>
      <Card >
        <Stack direction="row" justifyContent="space-between" alignItems="center" m={1}>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Stack>
  
      </Card>
    </Dialog>
  );
}
