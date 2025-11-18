'use client';

import { useMemo, useState, useTransition, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSnackbar } from 'notistack';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { ListHeader } from 'src/components/page_header';
import { QueryFilters, FilterConfig } from 'src/components/query_filters';
import SharedTable from 'src/components/custom-shared-table/shared-table/SharedTable';
import ConfirmDialog from 'src/components/custom-dialog/confirm-dialog';
import { Country, CountryFormValues } from 'src/types/country';
import CountryFormDialog from './country_form_dialog';
import { deleteCountryAction, updateCountryAction } from 'src/actions/countries';

type CountriesViewProps = {
  countries: Country[];
  totalCount: number;
  error?: string | null;
};

export default function CountriesView({ countries, totalCount, error }: CountriesViewProps) {
  const tLabel = useTranslations('Label');
  const tTitle = useTranslations('Title');
  const tButton = useTranslations('Button');
  const tMessage = useTranslations('Message');
  const tDescription = useTranslations('Description');
  const tDialog = useTranslations('Dialog');
  const { enqueueSnackbar } = useSnackbar();

  const [formOpen, setFormOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Country | null>(null);
  const [toggleTargetId, setToggleTargetId] = useState<string | null>(null);

  const [isDeleting, startDeleteTransition] = useTransition();
  const [isToggling, startToggleTransition] = useTransition();

  const filters = useMemo<FilterConfig[]>(() => {
    return [
      {
        type: 'search',
        name: 'Name',
        placeholder: tLabel('search'),
      },
      {
        type: 'select',
        name: 'IsActive',
        label: tLabel('status'),
        placeholder: tLabel('all_statuses'),
        allowClear: true,
        options: [
          { label: tLabel('active'), value: 'true' },
          { label: tLabel('inactive'), value: 'false' },
        ],
      },
    ];
  }, [tLabel]);

  const tableHead = useMemo(
    () => [
      { id: 'nameAr', label: 'Label.name_ar' },
      { id: 'nameEn', label: 'Label.name_en' },
      { id: 'isActive', label: 'Label.status' },
      { id: 'rowsActions', label: 'Label.actions' },
    ],
    []
  );

  const handleAddCountry = useCallback(() => {
    setEditingCountry(null);
    setFormOpen(true);
  }, []);

  const handleEditCountry = useCallback((country: Country) => {
    setEditingCountry(country);
    setFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setFormOpen(false);
    setEditingCountry(null);
  }, []);

  const handleToggleStatus = useCallback(
    (country: Country) => {
      if (isToggling) {
        return;
      }
      setToggleTargetId(country.id);
      const payload: CountryFormValues = {
        nameAr: country.nameAr,
        nameEn: country.nameEn,
        isActive: !country.isActive,
      };

      startToggleTransition(async () => {
        const response = await updateCountryAction(country.id, payload);

        if (response.success) {
          enqueueSnackbar(
            country.isActive
              ? tMessage('Success.deactivated', { item: tLabel('country') })
              : tMessage('Success.activated', { item: tLabel('country') }),
            { variant: 'success' }
          );
          setToggleTargetId(null);
          return;
        }

        setToggleTargetId(null);
        const errorMessage =
          response.error && typeof response.error === 'string'
            ? response.error
            : tMessage('Error.something_went_wrong');
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
    },
    [enqueueSnackbar, isToggling, tLabel, tMessage]
  );

  const handleConfirmDelete = () => {
    if (!deleteTarget || isDeleting) {
      return;
    }

    startDeleteTransition(async () => {
      const response = await deleteCountryAction(deleteTarget.id);

      if (response.success) {
        enqueueSnackbar(tMessage('Success.deleted', { item: tLabel('country') }), {
          variant: 'success',
        });
        setDeleteTarget(null);
        return;
      }

      const errorMessage =
        response.error && typeof response.error === 'string'
          ? response.error
          : tMessage('Error.something_went_wrong');
      enqueueSnackbar(errorMessage, { variant: 'error' });
    });
  };

  const actions = useMemo(
    () => [
      {
        label: tLabel('edit'),
        icon: 'solar:pen-bold',
        onClick: (row: Country) => handleEditCountry(row),
      },
      {
        label: tLabel('delete'),
        icon: 'solar:trash-bin-2-bold',
        sx: { color: 'error.main' },
        onClick: (row: Country) => setDeleteTarget(row),
      },
    ],
    [handleEditCountry, tLabel]
  );

  const customRender = useMemo(
    () => ({
      isActive: (row: Country) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Switch
            checked={row.isActive}
            onChange={() => handleToggleStatus(row)}
            color="primary"
            size="small"
            disabled={isToggling && toggleTargetId === row.id}
          />
          <Typography variant="body2" color="text.secondary">
            {row.isActive ? tLabel('active') : tLabel('inactive')}
          </Typography>
        </Stack>
      ),
    }),
    [handleToggleStatus, isToggling, tLabel, toggleTargetId]
  );

  return (
    <Stack spacing={3}>
      <ListHeader
        title={tLabel('countries')}
        subtitle={tDescription('countries')}
        actionLabel={`${tButton('add')} ${tLabel('country')}`}
        onAction={handleAddCountry}
      />

      {error && (
        <Alert severity="error" variant="outlined">
          {error}
        </Alert>
      )}

      <Card sx={{ p: 2 }}>
        <Stack spacing={2}>
          <QueryFilters filters={filters} />
          <SharedTable<Country>
            data={countries}
            tableHead={tableHead}
            actions={actions}
            customRender={customRender}
            count={totalCount}
          />
        </Stack>
      </Card>

      <CountryFormDialog open={formOpen} onClose={handleCloseForm} country={editingCountry} />

      <ConfirmDialog
        title={tTitle('delete', { item: tLabel('country') })}
        content={
          deleteTarget ? tDialog('delete_confirm', { item: deleteTarget.nameEn }) : undefined
        }
        buttonTitle={isDeleting ? tLabel('deleting') : tButton('delete')}
        open={!!deleteTarget}
        onClose={() => {
          if (!isDeleting) {
            setDeleteTarget(null);
          }
        }}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Stack>
  );
}
