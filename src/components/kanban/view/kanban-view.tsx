'use client';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useTranslations } from 'next-intl';

import Scrollbar from 'src/components/scrollbar';
import EmptyContent from 'src/components/empty-content';
import { CustomPageHeadding } from 'src/components/custom-page-headding';

import { IKanban } from 'src/types/kanban';

import KanbanColumn from '../kanban-column';

// ----------------------------------------------------------------------
interface IProps {
  title: string;
  board: IKanban;
  boardEmpty: boolean;
}

export default function KanbanView({ title, board, boardEmpty }: IProps) {
  const t = useTranslations();
  return (
    <Container
      maxWidth={false}
      sx={{
        height: 1,
      }}
    >
      <Stack
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <CustomPageHeadding headding={`${t(title)}`} backTo={paths.dashboard.root} />
      </Stack>
      {boardEmpty && (
        <EmptyContent
          filled
          title="No Data"
          sx={{
            py: 10,
            maxHeight: { md: 480 },
          }}
        />
      )}

      {!!board?.columns.length && (
        <Box>
          <Scrollbar
            sx={{
              height: 1,
              minHeight: {
                xs: '80vh',
                md: 'unset',
              },
            }}
          >
            <Stack
              spacing={3}
              direction="row"
              alignItems="flex-start"
              sx={{
                p: 0.25,
                height: 1,
              }}
            >
              {board?.columns.map((column, index) => (
                <KanbanColumn index={index} key={column?.id} column={column} tasks={board?.tasks} />
              ))}
            </Stack>
          </Scrollbar>
        </Box>
      )}
    </Container>
  );
}
