'use client';

import { useCallback, useEffect, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';

import CloseButton from 'src/components/dialog/CloseButton';
import FormProvider from 'src/components/hook-form/form-provider';
import RHFTextField from 'src/components/hook-form/rhf-text-field';
import RHFSwitch from 'src/components/hook-form/rhf-switch';
import { Country, CountryFormValues } from 'src/types/country';
import { createCountryAction, updateCountryAction } from 'src/actions/countries';

type CountryFormDialogProps = {
  open: boolean;
  onClose: () => void;
  country?: Country | null;
};

const defaultValues: CountryFormValues = {
  nameAr: '',
  nameEn: '',
  isActive: true,
};

export default function CountryFormDialog({ open, onClose, country }: CountryFormDialogProps) {
  const tLabel = useTranslations('Label');
  const tTitle = useTranslations('Title');
  const tButton = useTranslations('Button');
  const tMessage = useTranslations('Message');
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();
  const schema = useMemo(
    () =>
      yup.object({
        nameAr: yup.string().trim().required(tMessage('Error.name_ar_required')),
        nameEn: yup.string().trim().required(tMessage('Error.name_en_required')),
        isActive: yup.boolean().default(true),
      }),
    [tMessage]
  );

  const methods = useForm<CountryFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (open) {
      reset(
        country
          ? {
              nameAr: country.nameAr,
              nameEn: country.nameEn,
              isActive: country.isActive,
            }
          : defaultValues
      );
    }
  }, [country, open, reset]);

  const onSubmit = handleSubmit((formValues) => {
    startTransition(async () => {
      const response = country
        ? await updateCountryAction(country.id, formValues)
        : await createCountryAction(formValues);

      if (response.success) {
        enqueueSnackbar(
          country
            ? tMessage('Success.updated', { item: tLabel('country') })
            : tMessage('Success.created', { item: tLabel('country') }),
          {
            variant: 'success',
          }
        );
        onClose();
        return;
      }

      const errorMessage =
        response.error && typeof response.error === 'string'
          ? response.error
          : tMessage('Error.something_went_wrong');

      enqueueSnackbar(errorMessage, { variant: 'error' });
    });
  });

  const dialogTitle = country
    ? tTitle('edit', { item: tLabel('country') })
    : tTitle('add', { item: tLabel('country') });
  const handleSafeClose = useCallback(() => {
    if (!isPending) {
      onClose();
    }
  }, [isPending, onClose]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleSafeClose}>
      <CloseButton onClose={handleSafeClose} />
      <DialogTitle>{dialogTitle}</DialogTitle>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <RHFTextField name="nameAr" label={tLabel('name_ar')} />
            <RHFTextField name="nameEn" label={tLabel('name_en')} />
            <RHFSwitch name="isActive" label={tLabel('status')} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleSafeClose} disabled={isPending}>
            {tButton('cancel')}
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isPending}>
            {country ? tButton('save_changes') : tButton('create')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

