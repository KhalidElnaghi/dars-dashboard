import * as Yup from 'yup';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card, Grid, InputAdornment } from '@mui/material';
import { filledInputClasses } from '@mui/material/FilledInput';

import { bgGradient } from 'src/theme/css';
import InputIcon from 'src/assets/icons/input-icon';

import Image from 'src/components/image';
import { MotionViewport } from 'src/components/animate';
import FormProvider, {

  RHFTextField,

} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AreYouReady() {
  const _theme = useTheme();
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required(t('Name is required')),
    phone: Yup.number().moreThan(0, t('Phone should not be 0')),
    email: Yup.string().required(t('Email is required')),
    activity: Yup.string().required(t('Activity is required')),


    // not required

  });
  const defaultValues = useMemo(
    () => ({
      name: '',
      phone: 0,
      activity: '',
      email: '',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {

    reset(defaultValues);

  }, [defaultValues, reset]);


  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      //  enqueueSnackbar(currentProduct ? 'Update success!' : 'Create success!');
      //   router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  const renderDescription = (
    <FormProvider methods={methods} onSubmit={onSubmit}>


      <Card variant="elevation" elevation={7} sx={{borderBottomLeftRadius:0, borderBottomRightRadius:0, mx: 'auto', p: 3, maxWidth: { md: 850 } }} >
        <Grid container spacing={1} alignItems="center">
          <Grid display="flex" item xs={12} md={6} gap={3} flexDirection="column" justifyContent="flex-start" textAlign="left">
            <Typography variant="h4">
              {t("Are you ready to know more ?")}
            </Typography>
            <RHFTextField
              name="email"

              placeholder={t("Email")}
              type="email"
              variant="filled"
              sx={{
                maxWidth: { md: 350,  },
                [`& .${filledInputClasses.root}`]: {
                  bgcolor: '#f8f7f9',
                  borderRadius: 40,
                },
                [`& .${filledInputClasses.input}`]: {
                  typography: 'body2',
                  outline: 'none',
                  py: 2,

                  border: 'none',
                },
              }}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment sx={{ mt: '0 !important', }} position="start">
                    <InputIcon />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="phone"

              placeholder={t("Phone")}
              type="number"
              variant="filled"
              sx={{
                maxWidth: { md: 350,  },
                [`& .${filledInputClasses.root}`]: {
                  bgcolor: '#f8f7f9',
                  borderRadius: 40,
                },
                [`& .${filledInputClasses.input}`]: {
                  typography: 'body2',
                  outline: 'none',

                  py: 2,
                  border: 'none',
                },
              }}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment sx={{ mt: '0 !important', }} position="start">
                    <InputIcon />
                  </InputAdornment>
                ),
              }}

            />
            <RHFTextField
              name="activity"

              placeholder={t("Activity name")}
              variant="filled"
              type="text"
              sx={{
                maxWidth: { md: 350,  },
                [`& .${filledInputClasses.root}`]: {
                  bgcolor: '#f8f7f9',
                  borderRadius: 40,
                },
                [`& .${filledInputClasses.input}`]: {
                  typography: 'body2',
                  outline: 'none',

                  py: 2,
                  border: 'none',
                },
              }}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment sx={{ mt: '0 !important', }} position="start">
                    <InputIcon />
                  </InputAdornment>
                ),
              }}

            />
            <RHFTextField
              name="name"

              placeholder={t("Responsible name")}
              variant="filled"
              type="text"
              sx={{
                maxWidth: { md: 350,  },
                [`& .${filledInputClasses.root}`]: {
                  bgcolor: '#f8f7f9',
                  borderRadius: 40,
                },
                [`& .${filledInputClasses.input}`]: {
                  typography: 'body2',
                  outline: 'none',
                  py: 2,
                  border: 'none',
                },
              }}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment sx={{ mt: '0 !important', }} position="start">
                    <InputIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box>
              <LoadingButton sx={{px:4, borderRadius: 20}} color="primary" type="submit" variant="contained" size="large" loading={isSubmitting}>
                {t("Send")}
              </LoadingButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
            <Image delayTime={1000}  effect="blur"   alt="rocket" src="/assets/icons/home/Frame 5.svg" />
              {/* <AreYouReadyIcon /> */}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>

  );

  return (
    <Box
      sx={{
        textAlign: 'center',

        ...bgGradient({

          type: 'circle',
          startColor: _theme.palette.primary.light,
          endColor: _theme.palette.primary.main,
        }),

        pt: 10,
        pb:0,
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}


      </Container>
    </Box>
  );
}
