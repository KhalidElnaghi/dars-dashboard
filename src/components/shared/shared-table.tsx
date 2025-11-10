'use client';

/* eslint-disable no-restricted-globals */

/* eslint-disable no-restricted-syntax */

/* eslint-disable import/no-extraneous-dependencies */

import { CSVLink } from 'react-csv';
import { useSnackbar } from 'notistack';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useRef, useMemo, useState, useCallback, ChangeEvent } from 'react';

import {
  Box,
  Tab,
  Card,
  Tabs,
  Stack,
  Table,
  Theme,
  Button,
  SxProps,
  Divider,
  TableRow,
  MenuItem,
  Checkbox,
  TableBody,
  TableCell,
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material';

import PdfComp from 'src/utils/createPdf';

import Scrollbar from '../scrollbar';
import SearchInput from './SearchInput';
import Label, { LabelColor } from '../label';
import Iconify, { IconifyProps } from '../iconify';
import CustomPopover, { usePopover } from '../custom-popover';
import {
  emptyRows,
  TableProps,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../table';

type TableHeader = { id: string; label: string; align?: string };

interface SharedTableProps {
  table: TableProps;
  tableHeaders: TableHeader[];
  dataFiltered: any[];
  summaryHeadding?: { primary: string; secondary: string };
  tabs?: {
    name?: string;
    tabs: { id: string; label: string; count?: number; countColor?: LabelColor }[];
  };
  exportableDataKey?: string;
  enableExportFile?: boolean;
  exportFileName?: string;
  count: number;
  additionalTableProps: { [key: string]: (item: any) => void };
  handleFilters?: (name: string, value: string) => void;
  onImport?: (formData: FormData) => void;
  onExport?: () => Promise<any>;
  filters?: { name: string };
  enableActions?: boolean;
  enableExportImport?: boolean;
  enableAdd?: boolean;
  disablePagination?: boolean;
  showFromClients?: boolean;
  custom_add_title?: string;
  handleAdd?: () => void;
  actions?: {
    label: string;
    icon?: IconifyProps;
    onClick: (selectedRow: any) => void;
    sx?: SxProps<Theme>;
  }[];
  noShadow?: boolean;
  shoeIcon?: boolean;
  hiddenSecondEnableAdd?: boolean;
  onSelectAllRows?: (checkedOrders: string[] | string) => void;
  selectedItems?: any[];
  pdfColunms?: any;
  pdfTitle?: string;
  printTitle?: string;
}

const SharedTable = (props: SharedTableProps) => {
  const {
    table,
    tableHeaders,
    dataFiltered,
    summaryHeadding,
    tabs,
    enableExportFile,
    exportableDataKey,
    exportFileName = 'Report',
    additionalTableProps,
    enableActions = false,
    actions,
    disablePagination,
    showFromClients,
    hiddenSecondEnableAdd,
    handleFilters,
    filters,
    count,
    enableExportImport = false,
    enableAdd = false,
    custom_add_title,
    handleAdd,
    onImport,
    onExport,
    noShadow,
    shoeIcon,
    onSelectAllRows,
    selectedItems,
    pdfTitle,
    pdfColunms,
    printTitle,
  }: SharedTableProps = props;
  const [selectedRow, setSelectedRow] = useState({});
  const popover = usePopover();
  const popoverTableEXport = usePopover();
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const page =
    typeof searchParams?.get('page') === 'string' ? Number(searchParams?.get('page')) : 1;
  const limit =
    typeof searchParams?.get('limit') === 'string' ? Number(searchParams?.get('limit')) : 5;
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      if (value === '') params.delete(name);

      return params.toString();
    },
    [searchParams]
  );

  const getItem = (item: any, header: any, index: number): any => {
    const name = `onRender${header.id}`;
    if (additionalTableProps[name]) {
      // eslint-disable-next-line react/destructuring-assignment
      return additionalTableProps[name](item);
      // eslint-disable-next-line no-else-return
    } else {
      return item[header?.id];
    }
  };

  const handleExportItems = async () => {
    if (onExport) {
      try {
        const data = await onExport();
        const url = window.URL.createObjectURL(
          new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          })
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sections.xlsx');
        document.body.appendChild(link);
        link.click();
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        enqueueSnackbar('Exported successfully', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(`${error}`, { variant: 'error' });
      }
    }
  };
  const handleImportItems = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setIsLoading(true);
    if (file) {
      if (onImport) {
        try {
          const formdata = new FormData();
          formdata.append('flie', file);
          await onImport(formdata);
          event.target.value = '';
          enqueueSnackbar('Imported successfully', { variant: 'success' });
        } catch (error) {
          enqueueSnackbar(`${error?.message}`, { variant: 'error' });
        }
      }
      setIsLoading(false);
    }
  };

  const exportableData = useMemo(() => {
    if (exportableDataKey) {
      const newArr: any[] = [];
      dataFiltered.forEach((item) => {
        const newObj: any = {};

        Object.keys(item).forEach((key) => {
          if (key !== 'id') {
            const value = item[key];

            if (value && !isNaN(new Date(value).getTime())) {
              newObj[t(`${key}`)] = new Date(value).toLocaleString();
            } else {
              newObj[t(`${key}`)] = value;
            }
          }
        });
        newArr.push(newObj);
      });
      return newArr;
    }
    return dataFiltered;
  }, [dataFiltered, exportableDataKey, t]);

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      router.replace(`${pathname}?${createQueryString(tabs?.name ?? 'tab', newValue)}`, {
        scroll: false,
      });
    },
    [createQueryString, pathname, router, tabs?.name]
  );
  function handleSelectOne(event: ChangeEvent<HTMLInputElement>, item: any): void {
    throw new Error('Function not implemented.');
  }
  function printDataToPaper(data: any, title = 'Print Data') {
    // Open a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>${t(title)}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1 {
              text-align: center;
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
            .item {
              page-break-inside: avoid; /* Prevent page breaks inside an item */
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <h1>${t(title)}</h1>
    `);

    // Loop through the data and add it to the HTML
    data.forEach((item: any, index: any) => {
      printWindow?.document.write(`
        <div class="item">
          <h2>${t('Item')} ${index + 1}</h2>
          <table>
            <thead>
              <tr>
                <th>${t('Field')}</th>
                <th>${t('Value')}</th>
              </tr>
            </thead>
            <tbody>
      `);

      const renderData = (obj: any, depth = 0) => {
        for (const [key, value] of Object.entries(obj)) {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            if (key !== 'id') {
              printWindow?.document.write(`
                <tr>
                  <td><strong>${t(key)}</strong></td>
                  <td></td>
                </tr>
              `);
              renderData(value, depth + 1);
            }
          } else if (Array.isArray(value)) {
            printWindow?.document.write(`
              <tr>
                <td><strong>${t(key)}</strong></td>
                <td>
                  <ul>
                    ${value.map((itemToPrint: any) => `<li>${itemToPrint}</li>`).join('')}
                  </ul>
                </td>
              </tr>
            `);
          } else if (key !== 'id') {
            if (value && !isNaN(new Date(value as any).getTime())) {
              printWindow?.document.write(`
                <tr>
                  <td><strong>${t(key)}</strong></td>
                  <td>${
                    value === null ? 'N/A' : t(new Date(value as any).toLocaleDateString() as any)
                  }</td>
                </tr>
              `);
            } else {
              printWindow?.document.write(`
                <tr>
                  <td><strong>${t(key)}</strong></td>
                  <td>${value === null ? 'N/A' : t(value as string)}</td>
                </tr>
              `);
            }
          }
        }
      };

      // Render the current item
      renderData(item);

      printWindow?.document.write(`
            </tbody>
          </table>
        </div>
      `);
    });

    // Close the HTML document
    printWindow?.document.write(`
        </body>
      </html>
    `);
    printWindow?.document.close();

    // Trigger the print dialog
    printWindow?.print();
  }
  return (
    <Card sx={{ boxShadow: noShadow ? 'none' : undefined }}>
      {tabs ? (
        <Box p={2.5} pb={0}>
          <Tabs
            value={searchParams.get('tab') || tabs.tabs[0].id}
            onChange={handleChangeTab}
            aria-label="report type"
          >
            {tabs.tabs.map((tab) => (
              <Tab
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <span>{tab.label}</span>
                    {typeof tab.count === 'number' ? (
                      <Label color={tab.countColor || 'default'}>{tab.count}</Label>
                    ) : null}
                  </Stack>
                }
                value={tab.id}
                aria-controls={`${tab.id}-tab`}
              />
            ))}
          </Tabs>
          <Divider />
        </Box>
      ) : null}
      {summaryHeadding ? (
        <Stack>
          <Stack p={2.5} pb={0} direction="row" alignItems="center" spacing={1}>
            <Typography variant="h4" fontWeight="normal">
              {summaryHeadding.secondary}
            </Typography>
            <Typography variant="h4" color="primary">
              {summaryHeadding.primary}
            </Typography>
          </Stack>
          <Divider sx={{ mt: 1 }} variant="fullWidth" />
        </Stack>
      ) : null}
      {(enableAdd || !disablePagination) && (
        <Stack
          spacing={1}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          direction={{
            xs: 'column',
            md: 'row',
          }}
          sx={{
            p: 2.5,
            pr: 0,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            flexGrow={1}
            sx={{ width: '100%' }}
          >
            {!disablePagination && <SearchInput />}

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              {!hiddenSecondEnableAdd && enableAdd && handleAdd && (
                <Button
                  sx={{ margin: { whiteSpace: 'nowrap' }, width: 'content-fit', marginX: '10px' }}
                  variant="outlined"
                  onClick={() => handleAdd()}
                  startIcon={<Iconify icon="mingcute:add-line" />}
                >
                  {t(`${custom_add_title}`)}
                </Button>
              )}
              {enableExportFile && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                  }}
                >
                  {enableAdd && handleAdd && (
                    <Button
                      sx={{
                        margin: { whiteSpace: 'nowrap' },
                        width: 'content-fit',
                        marginX: '10px',
                      }}
                      variant="outlined"
                      onClick={() => handleAdd()}
                      startIcon={<Iconify icon="mingcute:add-line" />}
                    >
                      {t(`${custom_add_title}`)}
                    </Button>
                  )}
                  <IconButton
                    color={popoverTableEXport.open ? 'inherit' : 'default'}
                    onClick={(event) => {
                      popoverTableEXport.onOpen(event);
                    }}
                  >
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
                  <CustomPopover
                    open={popoverTableEXport.open}
                    onClose={popoverTableEXport.onClose}
                    arrow={i18n.language === 'ar' ? 'top-right' : 'top-left'}
                  >
                    <MenuItem
                      onClick={() => {
                        // onClick(selectedRow);
                        popover.onClose();
                      }}
                    >
                      <Iconify icon="file-icons:microsoft-excel" />
                      <CSVLink
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        data={exportableData}
                        filename={t(exportFileName) ?? 'download'}
                      >
                        {t('Export Excel')}
                      </CSVLink>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        popover.onClose();
                      }}
                    >
                      <PDFDownloadLink
                        document={
                          <PdfComp data={dataFiltered} columns={pdfColunms} title={pdfTitle} />
                        }
                        fileName={`${t(exportFileName)}.pdf`}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Iconify icon="dashicons:pdf" />

                        {t('Export PDF')}
                      </PDFDownloadLink>

                      {/*   {t('Export PDF')} */}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        printDataToPaper(dataFiltered, printTitle);
                        popover.onClose();
                      }}
                    >
                      <Iconify icon="uil:print" />

                      {t('Print')}
                    </MenuItem>
                  </CustomPopover>
                </Box>
              )}
            </Box>

            {(enableExportImport || enableAdd) && (
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {enableExportImport && (
                  <Stack direction="row" spacing={1}>
                    <input
                      type="file"
                      name="file"
                      accept=".xlsx"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleImportItems}
                    />
                    <Button
                      sx={{ width: '50%' }}
                      size="small"
                      variant="outlined"
                      onClick={() => fileInputRef?.current?.click()}
                      startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                    >
                      {t('Import')}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleExportItems()}
                      startIcon={<Iconify icon="solar:export-bold" />}
                    >
                      {t('Export')}
                    </Button>
                  </Stack>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
      <TableContainer sx={{ position: 'relative' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={enableActions ? [...tableHeaders, { id: '', label: '' }] : tableHeaders}
              rowCount={dataFiltered?.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              sx={{ width: 'content-fit', whiteSpace: 'nowrap' }}
              onSelectAllRows={onSelectAllRows}
              items={dataFiltered}
              selectedItems={selectedItems}
            />

            <TableBody>
              {dataFiltered?.map((item: any) => (
                <TableRow
                  hover
                  key={item?.id}
                  sx={{ width: 'content-fit', whiteSpace: 'nowrap', textAlign: 'center' }}
                >
                  {onSelectAllRows && (
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        py={0.25}
                      >
                        <Checkbox
                          checked={selectedItems?.includes(item?.id)}
                          onChange={(event) => onSelectAllRows(item?.id)}
                          inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                      </Stack>
                    </TableCell>
                  )}
                  {tableHeaders?.map((header, index) => (
                    <TableCell key={header.id}>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        py={0.25}
                      >
                        {getItem(item, header, index)}
                      </Stack>
                    </TableCell>
                  ))}
                  {enableActions ? (
                    <TableCell align="right" sx={{ px: 1 }}>
                      <IconButton
                        color={popover.open ? 'inherit' : 'default'}
                        onClick={(event) => {
                          popover.onOpen(event);
                          setSelectedRow(item);
                        }}
                      >
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}

              {/* Actions Popover */}
              <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow={i18n.language === 'ar' ? 'left-top' : 'right-top'}
                hiddenArrow
                // sx={{ width: 160 }}
              >
                {actions?.map(({ label, icon, onClick, sx }) => (
                  <MenuItem
                    key={label}
                    onClick={() => {
                      onClick(selectedRow);
                      popover.onClose();
                    }}
                    sx={sx}
                  >
                    {icon ? <Iconify icon={icon} /> : null}
                    {label}
                  </MenuItem>
                ))}
              </CustomPopover>

              {/* Table Skeleton */}
              <TableEmptyRows
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered?.length)}
              />

              {/* NO data table view */}
              <TableNoData notFound={!dataFiltered?.length} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      {/* Table Pagination */}
      {(!disablePagination || showFromClients) && (
        <TablePaginationCustom
          count={count}
          page={page - 1}
          rowsPerPage={limit}
          labelRowsPerPage={t('rows_per_page')}
          labelDisplayedRows={({ from, to, count: rows }: any) =>
            `${from}-${to} ${t('of')} ${rows !== -1 ? rows : `${t('more_than')} ${to}`}`
          }
          onPageChange={(event: any, newPage: number) => {
            router.push(`${pathname}?${createQueryString('page', `${newPage + 1}`)}`, {
              scroll: false,
            });
          }}
          onRowsPerPageChange={(e: any) => {
            const newLimit = e?.target?.value;
            router.push(`${pathname}?${createQueryString('limit', newLimit)}`, { scroll: false });
          }}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      )}
    </Card>
  );
};

export default SharedTable;
