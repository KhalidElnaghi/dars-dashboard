'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Link } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useTranslations } from 'next-intl';
// ----------------------------------------------------------------------

export default function LoginBYEmailView() {
  const t = useTranslations();
  const { login } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid username address'),
    password: Yup.string()
      .required(t('Message.Error.password_required'))
      .min(8, t('Message.Error.password_must_be_at_least_8_characters_long'))
      .matches(/[0-9]/, t('Message.Error.password_must_contain_at_least_one_digit'))
      .matches(/[a-z]/, t('Message.Error.password_must_contain_at_least_one_lowercase_letter'))
      .matches(/[A-Z]/, t('Message.Error.password_must_contain_at_least_one_uppercase_letter'))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t('Message.Error.password_must_contain_at_least_one_special_character')),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const user = {
      email: data?.email,
      password: data?.password,
    };

    try {
      const res = await login(user?.email, user?.password);

      if (res?.error) {
        enqueueSnackbar(res.error, { variant: 'error' });
      }
    } catch (error: any) {
      enqueueSnackbar(error.message || t('unexpected_error'), { variant: 'error' });
    }
  });

  const renderForm = (
    <Stack spacing={2.5} sx={{ minWidth: '100%' }}>
      <RHFTextField name="email" label={t('Label.email')} />

      <RHFTextField
        name="password"
        label={t('Label.password')}
        // @ts-ignore
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link variant="body2" color="#2B6DDD" underline="always" href="/auth/jwt/forgot-password">
        {t('Label.forgot_password')}
      </Link>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        color="primary"
      >
        {t('Button.sign_in')}
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}
