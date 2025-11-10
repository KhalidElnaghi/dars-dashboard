import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import { FormLabel, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useTranslate } from 'src/locales';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  Modeltitle: string;
  selectedSettings: {
    title: string;
    logo: string;
    androidAppLink: string;
    OSAppLink: string;
    backGroundColor: string;
    BlockColor: string;
  }|undefined;
};

export default function AddSettings({ open, onClose, selectedSettings, Modeltitle }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();

  const SettingsSchema = Yup.object().shape({
    title: Yup.string().required(t('This field is required')),
    logo: Yup.mixed<any>().nullable().required(t('Logo is required')),
    androidAppLink: Yup.string().required(t('This field is required')),
    OSAppLink: Yup.string().required(t('this field is required')),
    backGroundColor: Yup.string().required(t('This field is required')),
    BlockColor: Yup.string().required(t('this field is required')),
  });

  const defaultValues = useMemo(
    () => ({
      logo: selectedSettings?.logo || '',
      title: selectedSettings?.title || '',
      androidAppLink: selectedSettings?.androidAppLink || '',
      OSAppLink: selectedSettings?.OSAppLink || '',
      backGroundColor: selectedSettings?.backGroundColor || '',
      BlockColor: selectedSettings?.BlockColor || '',
    }),
    [selectedSettings]
  );

  const methods = useForm({
    resolver: yupResolver(SettingsSchema),
    defaultValues: selectedSettings ? defaultValues : undefined,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('logo', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  const onSubmit = handleSubmit(async (data) => {
    alert(JSON.stringify(data));
  });
  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{Modeltitle}</DialogTitle>
        <DialogContent>
          <Box rowGap={3} columnGap={2} display="grid" mt={1} height="100%" overflow="hidden">
          <FormLabel htmlFor="Logo" sx={{ cursor: 'pointer' }}>
              <Typography>{t('Logo')}</Typography>
            </FormLabel>
            <RHFUploadAvatar
                name="logo"
                maxSize={3145728}
                onDrop={handleDrop}
              />
            <RHFTextField name="title" label={t('Page Title')} type="upload" />
            <RHFTextField name="androidAppLink" label={t('Android Application Link')} type="text" />
            <RHFTextField name="OSAppLink" label={t('IPhone Application Link')} type="text" />
            <RHFTextField name="backGroundColor" label={t('Background Color')} type="color" />
            <RHFTextField name="BlockColor" label={t('Block Color')} type="color" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t('cancel')}
          </Button>

          <LoadingButton type="submit" variant="contained" color='primary' loading={isSubmitting}>
            {t('Save')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
