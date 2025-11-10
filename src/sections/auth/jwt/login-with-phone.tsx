'use client';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';
import { countries } from 'src/assets/data';
import { useAuthContext } from 'src/auth/hooks';
import { LoginWithPhone } from 'src/actions/auth';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import OtpConfirmDialog from './otp-confirm-dialog';
// ----------------------------------------------------------------------

export default function LoginBYPhoneView() {
  const { t } = useTranslate();
  const { login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const [confirm, setConfirm] = useState<null | {}>(null);
  const [phone, setPhone] = useState<string>('');

  const defaultValues = useMemo(
    () => ({
      key: '+966',
      phone: '',
    }),
    []
  );

  const LoginSchema = Yup.object().shape({
    phone: Yup.string()
      .required(t('Phone is required'))
      .min(9, t('Phone number must be 9 digits'))
      .max(9, t('Phone number must be 9 digits')),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const phoneNumber = {
      phone: `+966${data.phone}`,
    };
    try {
      const res = await LoginWithPhone(phoneNumber);
      if (res === 200) {
        setPhone(phoneNumber.phone);
        setConfirm({});
      } else {
        enqueueSnackbar(typeof res === 'object' && 'error' in res ? res.error : 'Unknown error', {
          variant: 'error',
        });
      }
    } catch (erro) {
      //
    }
  });

  const renderForm = (
    <Stack spacing={2.5} sx={{ minWidth: '100%' }}>
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 0.2,
          position: 'relative',
        }}
      >
        <TextField name="key" type="text" value="+966" disabled />
        <RHFTextField
          sx={{ width: '100%' }}
          inputProps={{
            maxLength: 9,
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          name="phone"
          label={t('Phone')}
          type="text" 
        />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        color="primary"
      >
        {t('login')}
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {confirm && (
        <OtpConfirmDialog
          open={!!confirm}
          onClose={() => setConfirm(null)}
          phone={phone}
          type="login"
        />
      )}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}
