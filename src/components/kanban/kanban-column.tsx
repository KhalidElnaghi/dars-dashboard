import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Box, Badge, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

import { useSnackbar } from 'src/components/snackbar';

import { IKanbanTask, IKanbanColumn } from 'src/types/kanban';

import KanbanTaskItem from './kanban-task-item';

// ----------------------------------------------------------------------

type Props = {
  column: IKanbanColumn;
  tasks: IKanbanTask[];
  index: number;
};

export default function KanbanColumn({ column, tasks, index }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();

  return (
    <Paper
      sx={{
        px: 2,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        maxHeight: '77vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        minWidth: 'fit-content',
        
        scrollbarWidth: 'none', // Hide the scrollbar for firefox
        '&::-webkit-scrollbar': {
          display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
        },
      }}
      
    >
      <Stack>
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pt: 3 }}
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
            {!(typeof column?.name === "string") ?  column?.name.toDateString() : column?.name}
          </Typography>

          <Badge sx={{ px: 1 }} badgeContent={7} color="primary" />
        </Stack>

        <Box>
          <Stack
            spacing={2}
            sx={{
              py: 3,
              width: { xs: 325, sm: 400 },
            }}
          >
            {column.taskIds?.length ? tasks
              .filter((task) => column?.taskIds.includes(task.id))
              ?.map((task, taskIndex) => (
                <KanbanTaskItem key={task?.id} index={taskIndex} task={task} />
              )):
             <Typography variant="body1" sx={{textAlign:"center",p:2}}>{t("There Are No Orders")}</Typography> }
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
