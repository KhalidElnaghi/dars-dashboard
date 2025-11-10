// import HomeStepsCoverImage from 'src/assets/illustrations/home-steps-cover';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useMemo, useCallback } from 'react';

import {
  Box,
  Card,
  Grid,
  List,
  Stack,
  Checkbox,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  ListItemButton,
} from '@mui/material';

import { useLocales, useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

interface Step {
  id: string;
  label_en: string;
  label_ar: string;
  to: string;
}

interface Props {
  steps: Step[];
  setupSteps: any;
}

// object have all permissions as a values for spacific Ids
const stepToPermissionMap: Record<string, string> = {
  add_category: 'isAddedCategory',
  add_addon: 'isAddedAddon',
  add_product: 'isAddedProduct',
  add_city: 'isAddedCity',
  add_branch: 'isAddedBranch',
  add_driver: 'isAddedDriver',
  website_design: 'isDesignedWebsite',
};

export default function HomeStepper({ steps, setupSteps }: Props) {
  const { t } = useTranslate();
  const router = useRouter();
  const { currentLang } = useLocales();

  const cookiesSteps = Cookies.get('steps') || '{}';
  const parsedSteps = JSON.parse(cookiesSteps);
  const hideSteps = Object.keys(parsedSteps).length === 7 || setupSteps.isAllStepsCompleted;


  const stepsCount = steps.length;

  const checkedCount = useMemo(
    () => steps.filter((step) => setupSteps[stepToPermissionMap[step.id]]).length,
    [setupSteps, steps]
  );

  const handleRoute = useCallback(
    (isCompleted: boolean, path: string) => {
      if (!isCompleted) {
        router.push(path);
      }
    },
    [router]
  );

  const renderHeader = useMemo(
    () => (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={3}
        pb={1}
        mb={1}
        borderBottom="2px solid"
        sx={{ borderBottomColor: 'divider' }}
      >
        <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
          <Box
            width={40}
            height={40}
            borderRadius="10rem"
            bgcolor="primary.main"
            color="white"
            display="grid"
            sx={{ placeItems: 'center' }}
          >
            <Iconify icon="solar:widget-add-bold" />
          </Box>
          <Typography variant="h6"> {t('Main steps')}</Typography>
        </Stack>

        <Box width="min(30rem, 100%)">
          <Box marginInlineStart="auto" width="fit-content" mb={0.5}>
            <Typography fontWeight="bold" color="primary" display="inline">
              {checkedCount}
            </Typography>
            <Typography color="primary" display="inline">{`/${stepsCount} `}</Typography>
            <Typography color="text.secondary" display="inline">
              {t('Completed')}
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={(checkedCount / stepsCount) * 100}
            sx={{ height: 8 }}
          />
        </Box>
      </Stack>
    ),
    [checkedCount, stepsCount, t]
  );

  const renderSteps = useMemo(
    () => (
      <Box height="100%">
        <List sx={{ width: '100%' }}>
          {steps.map((step) => {
            const labelId = `checkbox-list-label-${step.id}`;
            const permissionKey = stepToPermissionMap[step.id];
            const isCompleted = setupSteps[permissionKey] === true;

            return (
              <ListItem
                key={step.id}
                secondaryAction={<Iconify icon="raphael:arrowright2" />}
                disablePadding
                sx={{ opacity: isCompleted ? 0.4 : 1 }}
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => handleRoute(isCompleted, step.to)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isCompleted}
                      disabled={isCompleted}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={currentLang.value === 'en' ? step.label_en : step.label_ar}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    ),
    [currentLang.value, handleRoute, setupSteps, steps]
  );

  return hideSteps ? null : (
    <Card sx={{ p: 2.5 }}>
      {renderHeader}
      <Grid container>
        <Grid item xs={12}>
          {renderSteps}
        </Grid>
      </Grid>
    </Card>
  );
}
