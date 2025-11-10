'use client';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Card, Paper, Container, TextField } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';
import { Register } from 'src/actions/auth';
import { useAuthContext } from 'src/auth/hooks';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import OtpConfirmDialog from './otp-confirm-dialog';
// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  const [confirm, setConfirm] = useState<null | {}>(null);
  const [phone, setPhone] = useState<string>('');

  const { enqueueSnackbar } = useSnackbar();

  const password = useBoolean();
  const confirmPassword = useBoolean();

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required(t('First name required')),
    email: Yup.string()
      .required(t('Email is required'))
      .email(t('Email must be a valid email address')),
    password: Yup.string()
      .required(t('Password is required'))
      .min(8, t('Password must be at least 8 characters long'))
      .matches(/[0-9]/, t('Password must contain at least one digit'))
      .matches(/[a-z]/, t('Password must contain at least one lowercase letter'))
      .matches(/[A-Z]/, t('Password must contain at least one uppercase letter'))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t('Password must contain at least one special character')),
    confirm_password: Yup.string()
      .required(t('Confirm password is required'))
      .oneOf([Yup.ref('password')], t('Passwords must match')),
    phone: Yup.string()
      .required(t('Phone is required'))
      .min(9, t('Phone number must be 9 digits'))
      .max(9, t('Phone number must be 9 digits')),
    domin: Yup.string()
      .required(t('Domain is required'))
      .matches(/^[a-zA-Z0-9_]+$/, t('Domain can only contain letters, numbers, and underscores')),
  });
  const defaultValues = useMemo(
    () => ({
      fullName: '',
      email: '',
      password: '',
      confirm_password: '',
      key: '+966',
      phone: '',
      domin: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const user = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      projectName: data.domin,
      phoneNumber: `+966${data.phone}`,
    };
    try {
      const res = await Register(user);
      if (res === 200) {
        setPhone(user?.phoneNumber);
        setConfirm({});
      } else {
        enqueueSnackbar(typeof res === 'object' && 'error' in res ? res.error : 'Unknown error', {
          variant: 'error',
        });
      }
    } catch (erro) {
      enqueueSnackbar(`${erro}`, { variant: 'error' });
    }
  });

  const renderHead = (
    <Stack sx={{ my: 1, position: 'relative' }}>
      <Typography variant="h4" textAlign="center">
        {t('Create a new account')}
      </Typography>
      <Typography variant="subtitle2" textAlign="center" color="text.disabled">
        {t('Create your new account, please enter your details')}
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5} sx={{ mb: 1 }}>
      <RHFTextField name="fullName" label={t('Full name')} />
      <RHFTextField name="email" label={t('Email address')} />
      <RHFTextField name="domin" label={t('Project name')} />
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
      <RHFTextField
        name="password"
        label={t('Password')}
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
      <RHFTextField
        name="confirm_password"
        label={t('Confirm password')}
        // @ts-ignore
        type={confirmPassword.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={confirmPassword.onToggle} edge="end">
                <Iconify
                  icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {t('Create account')}
      </LoadingButton>
    </Stack>
  );

  return (
    <Card sx={{ borderRadius: '0 100px 0 100px', p: 1 }}>
      <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Logo fullLogo width={130} height={55.1} />
      </Stack>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            minWidth: '100%',
            minHeight: '50dvh',
          }}
        >
          {renderHead}

          <FormProvider methods={methods} onSubmit={onSubmit}>
            {renderForm}
          </FormProvider>
          {confirm && (
            <OtpConfirmDialog
              open={!!confirm}
              onClose={() => setConfirm(null)}
              phone={phone}
              type="register"
            />
          )}
        </Box>
      </Container>
      <Paper>
        <Stack
          direction="row"
          width="100%"
          bgcolor={settings?.themeMode === 'light' ? '#FAFAFB' : '#141414db'}
          minHeight="48px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="caption" mx={0.2}>
            {t('Already have an account?')}

            <Link href="/auth/jwt/login" style={{ fontSize: '12px' }}>
              {t('Sign in')}
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Card>
  );
}
