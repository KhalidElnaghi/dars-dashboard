import { useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useReactToPrint } from 'react-to-print';

import {
  Button,
  Dialog,
  Divider,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { useTranslate } from 'src/locales';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify/iconify';



type ModelProps = {
  open: boolean;
  onClose: () => void;
  src: string | null;
  title: string | null;
};

export function QrCode({ open, onClose, src, title }: ModelProps) {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => canvasRef.current,
    documentTitle: title || '',
    // onAfterPrint: () =>  enqueueSnackbar(t('Printed successfully'), { variant: 'success' }),
    removeAfterPrint: true,
    pageStyle: `body {
        height: 100%; 
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden;
        text-align:center;
      }  
      img{margin:10% 0;z-index:15}`,
  });
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: { sm: 500, xs: '100%' }, textAlign: 'center' },
      }}
    >
      <DialogTitle>{t('Code', { title: `${t(`${title}`)}` })}</DialogTitle>
      <DialogContent>
        {src && (
          <Image
            sx={{ verticalAlign: 'middle', width: { md: '329px', xs: 250 }, height: '315px' }}
            effect="blur"
            alt="QrCode"
            src={src}
            id="QrCode"
            ref={canvasRef}
          />
        )}
        <Divider variant="fullWidth" sx={{ mt: 2 }} />
      </DialogContent>
      <DialogActions
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}
      >
        {src && (
          <Button
            component="a"
            href={src}
            download="qrCode.png"
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="material-symbols:download" />}
          >
            {t('download')}
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          startIcon={<Iconify icon="material-symbols:print-outline" />}
        >
          {t('Print')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
