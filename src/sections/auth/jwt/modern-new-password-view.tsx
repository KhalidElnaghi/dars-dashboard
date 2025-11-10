'use client';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Image from 'next/image';
import { useCallback, useState } from 'react';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import i18n from 'src/locales/i18n';
import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';
import { ForgetPassword, ResetPassword } from 'src/actions/auth';

// ----------------------------------------------------------------------
interface IProps {
  email: string;
}
export default function ModernNewPasswordView({ email }: IProps) {
  const password = useBoolean();
  const { t } = useTranslate();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [step, setStep] = useState<'verify' | 'reset'>('verify');
  const [verificationCode, setVerificationCode] = useState('');

  const CodeSchema = Yup.object().shape({
    code: Yup.string()
      .required(t('Message.Error.code_required'))
      .length(4, t('Message.Error.code_length')),
  });

  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, t('Message.Error.password_min'))
      .required(t('Message.Error.password_required')),
    confirmPassword: Yup.string()
      .required(t('Message.Error.confirm_password_required'))
      .oneOf([Yup.ref('password')], t('Message.Error.passwords_must_match')),
  });

  const codeMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver(CodeSchema),
    defaultValues: { code: '' },
  });

  const {
    handleSubmit: handleCodeSubmit,
    formState: { isSubmitting: isVerifying },
  } = codeMethods;

  const passwordMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver(PasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit: handlePasswordSubmit,
    formState: { isSubmitting: isSubmittingPassword },
  } = passwordMethods;

  const [isResending, setIsResending] = useState(false);

  const onVerifyCode = handleCodeSubmit(async (data) => {
    setVerificationCode(data.code);
    setStep('reset');
  });

  const onSubmitPassword = handlePasswordSubmit(async (data) => {
    const code = verificationCode || codeMethods.getValues('code');

    if (!code) {
      enqueueSnackbar(t('Message.Error.code_required'), { variant: 'error' });
      setStep('verify');
      return;
    }

    const resetPass = {
      email,
      code,
      newPassword: data.password,
    };
    try {
      const res = await ResetPassword(resetPass);
      if (res === 200) {
        push('/auth/jwt/login');
        enqueueSnackbar(t('Message.Success.password_reset'), { variant: 'success' });
      } else {
        enqueueSnackbar(
          typeof res === 'object' && 'error' in res ? res.error : t('Message.Error.unknown_error'),
          {
            variant: 'error',
          }
        );
      }
    } catch (erro) {
      enqueueSnackbar(`${erro}`, { variant: 'error' });
    }
  });
  const handleResendCode = useCallback(async () => {
    setIsResending(true);
    try {
      const res = await ForgetPassword({ email });
      if (res === 200) {
        enqueueSnackbar(t('Message.Success.code_resent'), { variant: 'success' });
        codeMethods.reset({ code: '' });
        passwordMethods.reset({
          password: '',
          confirmPassword: '',
        });
        setVerificationCode('');
        setStep('verify');
      } else {
        enqueueSnackbar(
          typeof res === 'object' && 'error' in res ? res.error : t('Message.Error.unknown_error'),
          {
            variant: 'error',
          }
        );
      }
    } catch (erro) {
      enqueueSnackbar(`${erro}`, { variant: 'error' });
    } finally {
      setIsResending(false);
    }
  }, [codeMethods, email, enqueueSnackbar, passwordMethods, t]);

  const renderVerifyHead = (
    <Stack
      spacing={1.5}
      sx={{
        width: 1,
        maxWidth: 420,
        textAlign: 'center',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Typography variant="h4">{t('Title.verify_email')}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {t('Description.verify_email_line1', { email })}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {t('Description.verify_email_line2')}
      </Typography>
    </Stack>
  );

  const renderVerifyForm = (
    <Stack
      spacing={3}
      sx={{
        width: 1,
        maxWidth: 420,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <RHFCode name="code" length={4} />
      </Box>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        loading={isVerifying}
      >
        {t('Button.verify_code')}
      </LoadingButton>
    </Stack>
  );

  const renderResetHead = (
    <Stack
      spacing={1.5}
      sx={{
        width: 1,
        maxWidth: 420,
        textAlign: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">{t('Title.reset_password')}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {t('Description.reset_password')}
      </Typography>
    </Stack>
  );

  const renderResetForm = (
    <Stack spacing={3} sx={{ width: 1, maxWidth: 420 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 1,
          width: 1,
        }}
      >
        <RHFTextField
          name="password"
          label={t('Label.new_password')}
          type={password.value ? 'text' : 'password'}
          sx={{ width: '100%' }}
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
          name="confirmPassword"
          label={t('Label.confirm_new_password')}
          type={password.value ? 'text' : 'password'}
          fullWidth
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
      </Box>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        loading={isSubmittingPassword}
      >
        {t('Button.update_password')}
      </LoadingButton>
    </Stack>
  );

  const renderResend = (
    <Stack
      spacing={2}
      sx={{
        width: 1,
        maxWidth: 420,
        alignItems: 'center',
        mt: 3,
      }}
    >
      <LoadingButton
        fullWidth
        size="large"
        type="button"
        variant="text"
        onClick={handleResendCode}
        loading={isResending}
        color="primary"
      >
        {t('Button.resend_code')}
      </LoadingButton>

      {/* <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          flexDirection: i18n.language === 'ar' ? 'row-reverse' : 'row',
          gap: 0.5,
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        {t('Label.return_to_sign_in')}
      </Link> */}
    </Stack>
  );
  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Stack
        spacing={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: { xs: 4, md: 6 },
          mb: 3,
        }}
      >
        <Image src="/logo/SLogo.png" alt="logo" width={80} height={160} />
      </Stack>

      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: { xs: '50dvh', md: '60dvh' },
            gap: 3,
          }}
        >
          {step === 'verify' ? (
            <>
              <FormProvider methods={codeMethods} onSubmit={onVerifyCode}>
                <Stack
                  spacing={3}
                  sx={{
                    width: 1,
                    maxWidth: 520,
                    mx: 'auto',
                  }}
                >
                  {renderVerifyHead}
                  {renderVerifyForm}
                </Stack>
              </FormProvider>

              {renderResend}
            </>
          ) : (
            <>
              <FormProvider methods={passwordMethods} onSubmit={onSubmitPassword}>
                <Stack
                  spacing={3}
                  sx={{
                    width: '420px',
                    maxWidth: '420px',
                    mx: 'auto',
                  }}
                >
                  {renderResetHead}
                  {renderResetForm}
                </Stack>
              </FormProvider>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
