import { useRouter } from 'next/navigation';

import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper, { PaperProps } from '@mui/material/Paper';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { IKanbanTask } from 'src/types/kanban';

import Label from '../label';
import KeyValueTypography from '../label/KeyValueTypography';

// ----------------------------------------------------------------------

type Props = PaperProps & {
  index: number;
  task: IKanbanTask;
};

export default function KanbanTaskItem({ task, index, sx, ...other }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const openDetails = useBoolean();

  const renderInfo = (
    <Stack direction="row" alignItems="center">
      <Stack
        flexGrow={1}
        gap={1.2}
        direction="column"
        sx={{
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        <KeyValueTypography _key="order_reports.Order_Number" value={task?.orderNumber} />
        <KeyValueTypography _key="Created Time" value={fDateTime(task?.createdAt)} />
        <KeyValueTypography _key="order_reports.Branch" value={task?.branch} />
        <KeyValueTypography _key="order_reports.Payment" value={task?.paymentMethod} />
        <KeyValueTypography _key="Cash" value={fCurrency(task?.cash)} />
        <KeyValueTypography _key="order_reports.Source" value={task?.source} />
        <KeyValueTypography _key="order_reports.Type" value={task?.type} />
      </Stack>
    </Stack>
  );

  return (
    <Paper
      sx={{
        width: 1,
        borderRadius: 1.5,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.default',
        boxShadow: theme.customShadows.z1,
        cursor: 'pointer',
        '&:hover': {
          boxShadow: theme.customShadows.z20,
        },
        ...(openDetails.value && {
          boxShadow: theme.customShadows.z20,
        }),
        ...sx,
      }}
      {...other}
      onClick={() => {
        router.push(`${paths.dashboard.reports.orders}/${task?.id}`);
      }}
    >
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 1 }}
      >
        <Typography
          variant="body1"
          sx={{
            py: 0.75,
            borderRadius: 1,
            typography: 'h6',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'transparent',
          }}
        >
          {task?.client.name}
        </Typography>

        <Label
          variant="soft"
          color={
            (task?.status === 'Completed' && 'success') ||
            (task?.status === 'Ready' && 'info') ||
            (task?.status === 'Preparing' && 'warning') ||
            'default'
          }
        >
          {task?.status}
        </Label>
      </Stack>
      <Divider variant="fullWidth" sx={{ mt: -0.7 }} />

      <Stack spacing={2} sx={{ px: 1, py: 2, position: 'relative' }}>
        {renderInfo}
      </Stack>
    </Paper>
  );
}
